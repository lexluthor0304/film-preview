import CoreImage
import CoreVideo
import Foundation

// Port of lib/sample-base.js. All thresholds mirror the web app; keep the two
// implementations in sync when tuning.
enum BaseSampler {
    static let sampleWidth = 256
    static let saturatedLevel = 250.0

    // No color management: we want the raw encoded pixel values, matching what
    // canvas drawImage + getImageData sees on the web.
    private static let ciContext = CIContext(options: [.workingColorSpace: NSNull()])

    private struct Frame {
        var pixels: [UInt8] // BGRA rows, tightly packed
        var width: Int
        var height: Int
    }

    /// Downscale to `sampleWidth` and return tightly packed BGRA bytes
    /// (the equivalent of drawVideoToShared in the web app).
    private static func downsample(_ buffer: CVPixelBuffer) -> Frame? {
        let vw = CVPixelBufferGetWidth(buffer)
        let vh = CVPixelBufferGetHeight(buffer)
        guard vw > 0, vh > 0 else { return nil }
        let scale = min(1, Double(sampleWidth) / Double(vw))
        let w = max(1, Int((Double(vw) * scale).rounded()))
        let h = max(1, Int((Double(vh) * scale).rounded()))

        var scaled: CVPixelBuffer?
        let attrs = [kCVPixelBufferIOSurfacePropertiesKey: [:] as CFDictionary] as CFDictionary
        guard CVPixelBufferCreate(nil, w, h, kCVPixelFormatType_32BGRA, attrs, &scaled) == kCVReturnSuccess,
              let dst = scaled else { return nil }

        let image = CIImage(cvPixelBuffer: buffer)
            .transformed(by: CGAffineTransform(scaleX: CGFloat(scale), y: CGFloat(scale)))
        ciContext.render(image, to: dst, bounds: CGRect(x: 0, y: 0, width: w, height: h), colorSpace: nil)

        CVPixelBufferLockBaseAddress(dst, .readOnly)
        defer { CVPixelBufferUnlockBaseAddress(dst, .readOnly) }
        guard let baseAddress = CVPixelBufferGetBaseAddress(dst) else { return nil }
        let bytesPerRow = CVPixelBufferGetBytesPerRow(dst)
        let src = baseAddress.assumingMemoryBound(to: UInt8.self)

        var pixels = [UInt8](repeating: 0, count: w * h * 4)
        for row in 0..<h {
            pixels.withUnsafeMutableBytes { dstRaw in
                let dstRow = dstRaw.baseAddress!.advanced(by: row * w * 4)
                dstRow.copyMemory(from: src + row * bytesPerRow, byteCount: w * 4)
            }
        }
        return Frame(pixels: pixels, width: w, height: h)
    }

    // Saturated pixels are bare backlight (sprocket holes, edges past the film).
    private static func isOrangeBaseCandidate(r: Double, g: Double, b: Double) -> Bool {
        if r >= saturatedLevel || g >= saturatedLevel { return false }
        guard r > g * 1.04, g > b * 1.04 else { return false }
        let sat = (r - b) / max(r, 1)
        return sat >= 0.12 && sat <= 0.75
    }

    private static func median(_ values: [Double]) -> Double {
        let sorted = values.sorted()
        return sorted[sorted.count >> 1]
    }

    private static func channelMedians(_ pixels: [(Double, Double, Double)]) -> BaseRGB {
        BaseRGB(
            r: median(pixels.map { $0.0 }),
            g: median(pixels.map { $0.1 }),
            b: median(pixels.map { $0.2 })
        )
    }

    /// Web版と同じ5×5領域の均一性・飽和判定。白い光源へのフォールバックは行わない。
    static func autoSampleBase(from buffer: CVPixelBuffer, filmType: FilmType = .color) -> BaseRGB? {
        guard filmType != .positive, let frame = downsample(buffer),
              frame.width >= 5, frame.height >= 5 else { return nil }
        var patches: [(base: BaseRGB, x: Int, y: Int)] = []
        for y in stride(from: 0, through: frame.height - 5, by: 5) {
            for x in stride(from: 0, through: frame.width - 5, by: 5) {
                var pixels: [(Double, Double, Double)] = []
                var clipped = 0
                for py in y..<(y + 5) {
                    for px in x..<(x + 5) {
                        let i = (py * frame.width + px) * 4
                        let r = Double(frame.pixels[i + 2])
                        let g = Double(frame.pixels[i + 1])
                        let b = Double(frame.pixels[i])
                        if max(r, max(g, b)) >= saturatedLevel { clipped += 1; continue }
                        if min(r, min(g, b)) < 16 { continue }
                        if filmType == .color && !isOrangeBaseCandidate(r: r, g: g, b: b) { continue }
                        pixels.append((r, g, b))
                    }
                }
                guard clipped <= 1, pixels.count >= 22 else { continue }
                let channels = [pixels.map { $0.0 }.sorted(), pixels.map { $0.1 }.sorted(), pixels.map { $0.2 }.sorted()]
                let lo = Int(Double(pixels.count) * 0.1)
                let hi = Int(Double(pixels.count) * 0.9)
                guard channels.allSatisfy({ $0[hi] - $0[lo] <= 12 }) else { continue }
                patches.append((base: channelMedians(pixels), x: x, y: y))
            }
        }
        guard patches.count >= 3 else { return nil }
        func luma(_ p: BaseRGB) -> Double { 0.2126 * p.r + 0.7152 * p.g + 0.0722 * p.b }
        let brightest = patches.max { luma($0.base) < luma($1.base) }!
        let cluster = patches.filter { baseDistance($0.base, brightest.base) <= 12 }
        guard cluster.count >= 3 else { return nil }
        let positions = Set(cluster.map { "\($0.x),\($0.y)" })
        let hasRun = cluster.contains { p in
            (positions.contains("\(p.x - 5),\(p.y)") && positions.contains("\(p.x + 5),\(p.y)")) ||
            (positions.contains("\(p.x),\(p.y - 5)") && positions.contains("\(p.x),\(p.y + 5)"))
        }
        guard hasRun else { return nil }
        return channelMedians(cluster.map { ($0.base.r, $0.base.g, $0.base.b) })
    }

    static func baseDistance(_ a: BaseRGB, _ b: BaseRGB) -> Double {
        max(abs(a.r - b.r), max(abs(a.g - b.g), abs(a.b - b.b)))
    }

    static func stableBase(_ samples: [BaseRGB]) -> BaseRGB? {
        guard samples.count == 3 else { return nil }
        let base = channelMedians(samples.map { ($0.r, $0.g, $0.b) })
        return samples.allSatisfy { baseDistance($0, base) <= 4 } ? base : nil
    }
}
