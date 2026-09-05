import AVFoundation
import Foundation

/// Native replacement for getUserMedia + lockCameraColor() in NegativeViewer.jsx.
/// 固定状態は実際のデバイス設定を読み戻して確認する。
final class CaptureService: NSObject, ObservableObject {
    enum Status: Equatable {
        case idle
        case running
        case denied
        case failed(String)
    }

    @Published var status: Status = .idle
    @Published var colorLocked = false

    let session = AVCaptureSession()

    private let sessionQueue = DispatchQueue(label: "nv.capture.session")
    private let frameQueue = DispatchQueue(label: "nv.capture.frames")
    private let output = AVCaptureVideoDataOutput()
    private var device: AVCaptureDevice?
    private var configured = false
    private var sawFirstFrame = false
    private var calibrationGeneration = 0
    private var frameRevision = 0

    private let latestLock = NSLock()
    private var _latestBuffer: CVPixelBuffer?

    /// Called on the frame queue for every frame (render side).
    var onFrame: ((CVPixelBuffer) -> Void)?
    /// Called once on the main thread when the first frame arrives after start().
    var onFirstFrame: (() -> Void)?

    /// Most recent camera frame, for sampling (equivalent of reading the <video> element).
    var latestPixelBuffer: CVPixelBuffer? {
        latestLock.lock()
        defer { latestLock.unlock() }
        return _latestBuffer
    }

    func start() {
        switch AVCaptureDevice.authorizationStatus(for: .video) {
        case .authorized:
            startSession()
        case .notDetermined:
            AVCaptureDevice.requestAccess(for: .video) { [weak self] granted in
                DispatchQueue.main.async {
                    if granted {
                        self?.startSession()
                    } else {
                        self?.status = .denied
                    }
                }
            }
        default:
            status = .denied
        }
    }

    func stop() {
        sessionQueue.async { [weak self] in
            guard let self else { return }
            self.calibrationGeneration += 1
            self.unlockColorOnQueue()
            self.session.stopRunning()
            DispatchQueue.main.async {
                self.status = .idle
                self.colorLocked = false
            }
        }
        latestLock.lock()
        _latestBuffer = nil
        latestLock.unlock()
    }

    /// AE/AWBの収束を待ち、固定後の新しいフレームを3枚確認してから校正する。
    func calibrate(filmType: FilmType, completion: @escaping (BaseRGB?, Bool) -> Void) {
        sessionQueue.async { [weak self] in
            guard let self else { return }
            self.calibrationGeneration += 1
            let generation = self.calibrationGeneration
            self.waitForColor(filmType: filmType, generation: generation, attempts: 0, stable: 0, completion: completion)
        }
    }

    private func waitForColor(filmType: FilmType, generation: Int, attempts: Int, stable: Int,
                              completion: @escaping (BaseRGB?, Bool) -> Void) {
        guard generation == calibrationGeneration, session.isRunning, let device else { return }
        let settled = !device.isAdjustingExposure && !device.isAdjustingWhiteBalance
        let count = settled ? stable + 1 : 0
        if count >= 3 {
            var locked = false
            do {
                try device.lockForConfiguration()
                if device.isWhiteBalanceModeSupported(.locked) { device.whiteBalanceMode = .locked }
                if device.isExposureModeSupported(.locked) { device.exposureMode = .locked }
                locked = device.whiteBalanceMode == .locked && device.exposureMode == .locked
                device.unlockForConfiguration()
            } catch { locked = false }
            latestLock.lock()
            let revision = frameRevision
            latestLock.unlock()
            let confirmedLock = locked
            DispatchQueue.main.async { self.colorLocked = confirmedLock }
            sampleAfterLock(filmType: filmType, generation: generation, previousRevision: revision,
                            samples: [], attempts: 0, locked: locked, completion: completion)
        } else if attempts >= 24 {
            DispatchQueue.main.async { completion(nil, false) }
        } else {
            sessionQueue.asyncAfter(deadline: .now() + 0.12) { [weak self] in
                self?.waitForColor(filmType: filmType, generation: generation, attempts: attempts + 1,
                                   stable: count, completion: completion)
            }
        }
    }

    private func sampleAfterLock(filmType: FilmType, generation: Int, previousRevision: Int,
                                 samples: [BaseRGB], attempts: Int, locked: Bool,
                                 completion: @escaping (BaseRGB?, Bool) -> Void) {
        sessionQueue.asyncAfter(deadline: .now() + 0.15) { [weak self] in
            guard let self, generation == self.calibrationGeneration, self.session.isRunning else { return }
            self.latestLock.lock()
            let revision = self.frameRevision
            let buffer = self._latestBuffer
            self.latestLock.unlock()
            var next = samples
            if revision != previousRevision, let buffer {
                if let base = BaseSampler.autoSampleBase(from: buffer, filmType: filmType) {
                    next.append(base)
                    next = Array(next.suffix(3))
                } else { next = [] }
            }
            if let base = BaseSampler.stableBase(next) {
                DispatchQueue.main.async { completion(base, locked) }
            } else if attempts >= 44 {
                DispatchQueue.main.async { completion(nil, locked) }
            } else {
                self.sampleAfterLock(filmType: filmType, generation: generation, previousRevision: revision,
                                     samples: next, attempts: attempts + 1, locked: locked, completion: completion)
            }
        }
    }

    private func startSession() {
        sessionQueue.async { [weak self] in
            guard let self else { return }
            do {
                try self.configureIfNeeded()
            } catch {
                DispatchQueue.main.async { self.status = .failed(error.localizedDescription) }
                return
            }
            self.sawFirstFrame = false
            self.session.startRunning()
            DispatchQueue.main.async { self.status = .running }
        }
    }

    private func configureIfNeeded() throws {
        guard !configured else { return }
        session.beginConfiguration()
        defer { session.commitConfiguration() }

        // Match the web app's constraints: back camera, 1920x1080. Keeping the
        // resolution identical makes the Phase 0 A/B comparison apples-to-apples.
        if session.canSetSessionPreset(.hd1920x1080) {
            session.sessionPreset = .hd1920x1080
        }
        guard let camera = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back) else {
            throw NSError(domain: "nv", code: 1, userInfo: [NSLocalizedDescriptionKey: "No back camera found"])
        }
        let input = try AVCaptureDeviceInput(device: camera)
        guard session.canAddInput(input) else {
            throw NSError(domain: "nv", code: 2, userInfo: [NSLocalizedDescriptionKey: "Cannot add camera input"])
        }
        session.addInput(input)
        device = camera

        output.videoSettings = [
            kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA
        ]
        output.alwaysDiscardsLateVideoFrames = true
        output.setSampleBufferDelegate(self, queue: frameQueue)
        guard session.canAddOutput(output) else {
            throw NSError(domain: "nv", code: 3, userInfo: [NSLocalizedDescriptionKey: "Cannot add video output"])
        }
        session.addOutput(output)

        // Rotate in the connection so buffers arrive portrait; the shader's
        // rotateQ then stays 0, same as the web (the browser pre-rotates <video>).
        if let connection = output.connection(with: .video),
           connection.isVideoRotationAngleSupported(90) {
            connection.videoRotationAngle = 90
        }

        configured = true
    }

    private func unlockColorOnQueue() {
        guard let device else { return }
        do {
            try device.lockForConfiguration()
            if device.isWhiteBalanceModeSupported(.continuousAutoWhiteBalance) {
                device.whiteBalanceMode = .continuousAutoWhiteBalance
            }
            if device.isExposureModeSupported(.continuousAutoExposure) {
                device.exposureMode = .continuousAutoExposure
            }
            device.unlockForConfiguration()
        } catch {
            // Best effort.
        }
    }
}

extension CaptureService: AVCaptureVideoDataOutputSampleBufferDelegate {
    func captureOutput(
        _ output: AVCaptureOutput,
        didOutput sampleBuffer: CMSampleBuffer,
        from connection: AVCaptureConnection
    ) {
        guard let buffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        latestLock.lock()
        _latestBuffer = buffer
        frameRevision += 1
        latestLock.unlock()
        onFrame?(buffer)
        if !sawFirstFrame {
            sawFirstFrame = true
            DispatchQueue.main.async { [weak self] in self?.onFirstFrame?() }
        }
    }
}
