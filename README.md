# Negative Viewer

Negative Viewer is a free browser-based tool for previewing film negatives as positive images in real time. It uses the device camera, inverts the video frame locally in the browser, and never uploads the camera feed.

Live site: https://negativeviewer.tokugai.com

## What It Does

- Converts 35mm, 120, 4x5, APS, 110, and other backlit negatives into a live positive preview.
- Runs in modern mobile and desktop browsers with camera access.
- Saves the current preview frame as a PNG.
- Provides multilingual guide pages for viewing, digitizing, and comparing film workflows.
- Publishes SEO and AI-readable surfaces including `robots.txt`, `sitemap.xml`, JSON-LD, and `llms.txt`.

## Privacy

The camera stream stays on the user's device. Processing is done with Web APIs in the browser, and the app does not expose an upload endpoint for video or photo data.

## Content

- `/` - live negative viewer and summary FAQ
- `/how-to-use` - setup, lighting, focus, browser compatibility, and saving
- `/faq` - privacy, supported formats, color cast, browser, and workflow answers
- `/guides/film-negatives` - film negative basics, formats, storage, and viewing
- `/guides/digitize-35mm` - browser, phone, camera scanning, and flatbed workflows
- `/guides/film-vs-digital` - practical comparison of film and digital photography
- `/llms.txt` - compact context file for AI assistants and answer engines

Localized versions are available under `/ru`, `/es`, `/fr`, `/it`, and `/el`.

## Development

```sh
npm install
npm run dev
```

Camera access requires HTTPS or `localhost`. For local HTTPS testing:

```sh
npm run dev:https
```

## Validation

```sh
npm run lint
npm run build
```

## Tech Stack

- Next.js 15 App Router
- React 19
- `getUserMedia`
- Canvas 2D and WebGL image processing

## License

MIT

## 片基の自動校正

カメラ開始時に画面の安定を確認し、均一で未飽和の片基候補を自動検出します。
白い光源や齒孔を除外し、連続した領域と3フレームの色の一致を確認してから補正を固定します。
片縁を少し入れて撮影してください。均一な橙色の被写体と片基を完全に識別できるわけではありません。
同じフィルム・光源では補正を保持し、変更時は調整パネルの再検出ボタンで校正し直します。

手動校正では元の負片を静止表示し、片縁をタップまたはドラッグして拡大確認できます。
過曝・模様のある領域は確認できず、キャンセルすると以前の補正を保持します。
カメラの露出とホワイトバランスを固定できないブラウザでは、その状態を明示します。

```sh
npm run test
```

回帰テストは光源混入、過曝、片縁、模様、複数フレームの一致、カメラ制約の無視、キャンセルを検証します。
実際の色再現・長時間の安定性は、実機と実フィルムを同じ光源で比較して確認してください。
