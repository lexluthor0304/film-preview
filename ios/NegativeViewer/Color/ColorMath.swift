import Foundation
import simd

// Ports of lib/color.js and correctionFromSample in lib/webgl-pipeline.js.

let defaultGamma = 1.6
let defaultWhite = 0.1

func srgbToLinear(_ v: Double) -> Double {
    v <= 0.04045 ? v / 12.92 : pow((v + 0.055) / 1.055, 2.4)
}

func linearToSrgb(_ v: Double) -> Double {
    v <= 0.0031308 ? v * 12.92 : 1.055 * pow(v, 1 / 2.4) - 0.055
}

/// Sampled film base color, 0-255 per channel (same convention as the web app).
struct BaseRGB {
    var r: Double
    var g: Double
    var b: Double
}

/// Base in linear light plus the white transmittance, ready for the shader.
struct Correction {
    var base: SIMD3<Float>
    var white: Float
}

func correctionFromSample(_ base255: BaseRGB, white: Double = defaultWhite) -> Correction {
    // Clamp to 254: a blown-out base sample would make srgbToLinear ≈ 1 and
    // the per-channel division a no-op.
    func lin(_ v: Double) -> Float {
        Float(max(srgbToLinear(min(v, 254) / 255), 1e-4))
    }
    return Correction(
        base: SIMD3(lin(base255.r), lin(base255.g), lin(base255.b)),
        white: Float(white)
    )
}
