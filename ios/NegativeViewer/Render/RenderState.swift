import Foundation
import simd

/// GPU uniforms. Field order and alignment must match `struct Uniforms`
/// in NegativeShader.metal (float3 pads to 16 bytes, float2 aligns to 8).
struct ShaderUniforms {
    var base: SIMD3<Float> = SIMD3(1, 1, 1)
    var gamma: Float = Float(defaultGamma)
    var white: Float = Float(defaultWhite)
    var ev: Float = 0
    var zoom: Float = 1
    var pan: SIMD2<Float> = .zero
    var mode: Int32 = 0
    var filmType: Int32 = 0
    var rotateQ: Int32 = 0
    var mirror: Int32 = 0
}

enum FilmType: Int32, CaseIterable, Identifiable {
    case color = 0
    case bw = 1
    case positive = 2

    var id: Int32 { rawValue }
    var label: String {
        switch self {
        case .color: return "Color"
        case .bw: return "B&W"
        case .positive: return "Positive"
        }
    }
}

/// Color/adjust state feeding the shader — the equivalent of the refs +
/// pushColorState() dance in NegativeViewer.jsx, minus the view transform
/// (Phase 0 renders the full frame; zoom/pan/rotate come in Phase 1).
final class RenderState: ObservableObject {
    @Published var sampledBase: BaseRGB?
    @Published var gamma: Double = defaultGamma
    @Published var ev: Double = 0
    @Published var filmType: FilmType = .color
    @Published var videoAspect: CGFloat = 9.0 / 16.0

    var isCorrected: Bool { sampledBase != nil }

    func apply(base: BaseRGB) {
        sampledBase = base
    }

    func resetCorrection() {
        sampledBase = nil
    }

    func uniforms() -> ShaderUniforms {
        var u = ShaderUniforms()
        if let base = sampledBase {
            let correction = correctionFromSample(base)
            u.mode = 1
            u.base = correction.base
            u.white = correction.white
        }
        u.gamma = Float(gamma)
        u.ev = Float(ev)
        u.filmType = filmType.rawValue
        return u
    }
}
