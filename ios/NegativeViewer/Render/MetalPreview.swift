import MetalKit
import SwiftUI

/// Camera frames → CVMetalTextureCache (zero copy) → NegativeShader → MTKView.
/// Native equivalent of createWebGLPipeline() + processVideo() on the web.
struct MetalPreview: UIViewRepresentable {
    let capture: CaptureService
    @ObservedObject var render: RenderState

    func makeCoordinator() -> Renderer {
        Renderer(render: render)
    }

    func makeUIView(context: Context) -> MTKView {
        let view = MTKView()
        view.backgroundColor = .black
        // Frame-driven drawing: render when a camera frame arrives (~30fps)
        // instead of a free-running 60fps loop.
        view.isPaused = true
        view.enableSetNeedsDisplay = true
        view.framebufferOnly = true
        view.colorPixelFormat = .bgra8Unorm
        context.coordinator.attach(to: view, capture: capture)
        return view
    }

    func updateUIView(_ uiView: MTKView, context: Context) {
        // Uniforms are read from RenderState on every draw; nothing to push here.
        uiView.setNeedsDisplay()
    }

    final class Renderer: NSObject, MTKViewDelegate {
        private let render: RenderState
        private var device: MTLDevice?
        private var queue: MTLCommandQueue?
        private var pipeline: MTLRenderPipelineState?
        private var textureCache: CVMetalTextureCache?
        private weak var view: MTKView?

        private let bufferLock = NSLock()
        private var pendingBuffer: CVPixelBuffer?

        init(render: RenderState) {
            self.render = render
        }

        func attach(to view: MTKView, capture: CaptureService) {
            let device = MTLCreateSystemDefaultDevice()!
            self.device = device
            view.device = device
            self.view = view
            queue = device.makeCommandQueue()

            let library = device.makeDefaultLibrary()
            let descriptor = MTLRenderPipelineDescriptor()
            descriptor.vertexFunction = library?.makeFunction(name: "fullscreenVertex")
            descriptor.fragmentFunction = library?.makeFunction(name: "negativeFragment")
            descriptor.colorAttachments[0].pixelFormat = view.colorPixelFormat
            pipeline = try? device.makeRenderPipelineState(descriptor: descriptor)

            CVMetalTextureCacheCreate(nil, nil, device, nil, &textureCache)

            view.delegate = self
            capture.onFrame = { [weak self] buffer in
                guard let self else { return }
                self.bufferLock.lock()
                self.pendingBuffer = buffer
                self.bufferLock.unlock()
                DispatchQueue.main.async { [weak self] in
                    self?.view?.setNeedsDisplay()
                }
            }
        }

        func mtkView(_ view: MTKView, drawableSizeWillChange size: CGSize) {}

        func draw(in view: MTKView) {
            bufferLock.lock()
            let buffer = pendingBuffer
            bufferLock.unlock()
            guard let buffer,
                  let pipeline,
                  let queue,
                  let textureCache,
                  let drawable = view.currentDrawable,
                  let passDescriptor = view.currentRenderPassDescriptor else { return }

            let width = CVPixelBufferGetWidth(buffer)
            let height = CVPixelBufferGetHeight(buffer)
            var cvTexture: CVMetalTexture?
            CVMetalTextureCacheCreateTextureFromImage(
                nil, textureCache, buffer, nil, .bgra8Unorm, width, height, 0, &cvTexture
            )
            guard let cvTexture, let texture = CVMetalTextureGetTexture(cvTexture) else { return }

            let aspect = CGFloat(width) / CGFloat(height)
            if abs(render.videoAspect - aspect) > 0.001 {
                render.videoAspect = aspect
            }

            guard let commandBuffer = queue.makeCommandBuffer(),
                  let encoder = commandBuffer.makeRenderCommandEncoder(descriptor: passDescriptor) else { return }
            encoder.setRenderPipelineState(pipeline)
            encoder.setFragmentTexture(texture, index: 0)
            var uniforms = render.uniforms()
            encoder.setFragmentBytes(&uniforms, length: MemoryLayout<ShaderUniforms>.stride, index: 0)
            encoder.drawPrimitives(type: .triangle, vertexStart: 0, vertexCount: 3)
            encoder.endEncoding()
            commandBuffer.present(drawable)
            // Keep the CV texture alive until the GPU is done with it.
            commandBuffer.addCompletedHandler { _ in _ = cvTexture }
            commandBuffer.commit()
        }
    }
}
