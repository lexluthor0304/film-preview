# Negative Viewer — iOS (Phase 0)

Native SwiftUI + AVFoundation + Metal port of the web viewer. Phase 0 scope:
live camera preview through the ported negative-inversion shader, automatic
orange-mask base sampling, and native AWB/AE locking — enough for an A/B
comparison against the web app on the same negative.

## Requirements

- Xcode (16+; an Xcode beta works for development, but App Store submissions
  must be built with a release Xcode)
- A physical iPhone — **the Simulator has no camera**
- XcodeGen (`brew install xcodegen`) to regenerate the project file

## Build & run

```sh
cd ios
xcodegen generate          # regenerates NegativeViewer.xcodeproj from project.yml
open NegativeViewer.xcodeproj
```

In Xcode: select the NegativeViewer target → Signing & Capabilities → pick your
Team (bundle id `com.tokugai.negativeviewer`, automatic signing), select your
iPhone as the destination, Run.

Edit `project.yml` (not the .xcodeproj) when adding files or settings, then
re-run `xcodegen generate`.

## Phase 0 acceptance checklist

- [ ] Preview runs at full frame rate on device, portrait, correct aspect
- [ ] AE/AWB の収束後、固定後の新しい3フレームで片基を検出する。固定表示は実際のカメラ設定と一致する。
- [ ] 白い光源・齒孔だけの画面では片基を検出したことにせず、片縁を映す案内を表示する。
- [ ] 停止・再開時に古い校正処理が新しいセッションへ反映されない。
- [ ] Same negative + same light source: colors match the web app side by side
- [ ] With AWB/AE locked, the inverted image does not drift over 10 minutes
      (verify on the actual device; browser locking support varies)
- [ ] On a Pro phone, check how close you can fill the frame with a 35mm strip

## Code map (web → native)

| Native file | Ported from |
| --- | --- |
| `Render/NegativeShader.metal` | `lib/webgl-pipeline.js` fragment shader (1:1) |
| `Color/ColorMath.swift` | `lib/color.js` + `correctionFromSample` |
| `Color/BaseSampler.swift` | `lib/sample-base.js` (1:1, thresholds identical) |
| `Camera/CaptureService.swift` | `getUserMedia` + `lib/camera-calibration.js` |
| `Render/MetalPreview.swift` | `createWebGLPipeline()` + `processVideo()` render loop |
| `Render/RenderState.swift` | color-state refs + `pushColorState()` in `NegativeViewer.jsx` |
| `App/ViewerScreen.swift` | Phase 0 subset of the `NegativeViewer.jsx` UI |

Keep the shader math and sampler thresholds in sync with the web versions when
tuning either side.
