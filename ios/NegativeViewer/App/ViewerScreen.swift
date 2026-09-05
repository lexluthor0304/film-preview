import SwiftUI

/// Phase 0 validation screen: live preview + auto base sampling + the controls
/// needed for an A/B comparison against the web app. Gestures, frame guides,
/// capture and i18n come in later phases.
struct ViewerScreen: View {
    @StateObject private var capture = CaptureService()
    @StateObject private var render = RenderState()

    @State private var calibrating = false
    @State private var calibrationNotice = ""

    var body: some View {
        VStack(spacing: 0) {
            viewport
            controls
        }
        .background(Color.black.ignoresSafeArea())
        .preferredColorScheme(.dark)
        .onChange(of: capture.status) { _, status in
            if status == .running { sampleNow() }
        }
    }

    private var viewport: some View {
        ZStack {
            Color.black
            if capture.status == .running {
                MetalPreview(capture: capture, render: render)
                    .aspectRatio(render.videoAspect, contentMode: .fit)
            } else {
                placeholder
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var placeholder: some View {
        VStack(spacing: 8) {
            Text("Point the camera at a film negative on a light source.")
                .font(.headline)
            switch capture.status {
            case .denied:
                Text("Camera access denied — enable it in Settings.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            case .failed(let message):
                Text(message)
                    .font(.subheadline)
                    .foregroundStyle(.red)
            default:
                Text("Phase 0 build: preview + auto base sampling only.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
        .multilineTextAlignment(.center)
        .padding(24)
    }

    private var controls: some View {
        VStack(spacing: 12) {
            HStack(spacing: 10) {
                if capture.status == .running {
                    Button("Stop") { calibrating = false; capture.stop(); render.resetCorrection() }
                        .buttonStyle(.bordered)
                    Button(calibrating ? "片基を検出中…" : "片基を自動検出") { sampleNow() }
                        .buttonStyle(.borderedProminent)
                        .disabled(render.filmType == .positive || calibrating)
                    if render.isCorrected {
                        Button("Reset") { render.resetCorrection() }
                            .buttonStyle(.bordered)
                    }
                } else {
                    Button("Start Camera") { capture.start() }
                        .buttonStyle(.borderedProminent)
                }
                Spacer()
            }

            if capture.status == .running {
                Picker("Film type", selection: $render.filmType) {
                    ForEach(FilmType.allCases) { type in
                        Text(type.label).tag(type)
                    }
                }
                .pickerStyle(.segmented)
                .disabled(calibrating)
                .onChange(of: render.filmType) { _, _ in render.resetCorrection(); calibrationNotice = "" }

                if render.isCorrected && render.filmType != .positive {
                    sliderRow(label: "Contrast", value: $render.gamma, range: 1.0...2.4, step: 0.05,
                              display: String(format: "%.2f", render.gamma))
                }
                sliderRow(label: "EV", value: $render.ev, range: -2...2, step: 0.1,
                          display: String(format: "%+.1f", render.ev))

                statusLine
                if !calibrationNotice.isEmpty {
                    Text(calibrationNotice).font(.caption).foregroundStyle(.secondary)
                }
            }
        }
        .padding(16)
        .background(.black)
    }

    private var statusLine: some View {
        HStack(spacing: 12) {
            if let base = render.sampledBase {
                Text(String(format: "base %.0f/%.0f/%.0f", base.r, base.g, base.b))
            } else {
                Text("uncorrected")
            }
            Text(capture.colorLocked ? "AWB/AE locked" : "AWB/AE auto")
                .foregroundStyle(capture.colorLocked ? .green : .orange)
            Spacer()
        }
        .font(.system(.caption, design: .monospaced))
        .foregroundStyle(.secondary)
    }

    private func sliderRow(
        label: String,
        value: Binding<Double>,
        range: ClosedRange<Double>,
        step: Double,
        display: String
    ) -> some View {
        HStack(spacing: 10) {
            Text(label)
                .font(.caption)
                .frame(width: 60, alignment: .leading)
            Slider(value: value, in: range, step: step)
            Text(display)
                .font(.system(.caption, design: .monospaced))
                .frame(width: 44, alignment: .trailing)
        }
    }

    private func sampleNow() {
        guard !calibrating, capture.status == .running, render.filmType != .positive else { return }
        calibrating = true
        calibrationNotice = "動かさずに、画像のないきれいな片縁を映してください。"
        capture.calibrate(filmType: render.filmType) { base, locked in
            calibrating = false
            guard capture.status == .running else { return }
            if let base {
                render.apply(base: base)
                calibrationNotice = locked ? "片基を推定・固定しました。別のフィルムや光源では再校正してください。" : "片基を固定しました。カメラの色が変わる場合は再校正してください。"
            } else {
                calibrationNotice = "信頼できる片基を検出できませんでした。きれいな片縁を映して再試行してください。"
            }
        }
    }
}

#Preview {
    ViewerScreen()
}
