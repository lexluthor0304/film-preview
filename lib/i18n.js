import { siteConfig } from "./site-config";

export const defaultLocale = "en";
export const translatedLocales = ["zh", "ru", "es", "fr", "it", "el", "vi", "id", "ja", "hi", "ko", "uk"];
export const supportedLocales = [defaultLocale, ...translatedLocales];

export const localeOptions = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "zh", label: "简体中文", shortLabel: "ZH" },
  { code: "ru", label: "Русский", shortLabel: "RU" },
  { code: "es", label: "Español", shortLabel: "ES" },
  { code: "fr", label: "Français", shortLabel: "FR" },
  { code: "it", label: "Italiano", shortLabel: "IT" },
  { code: "el", label: "Ελληνικά", shortLabel: "EL" },
  { code: "vi", label: "Tiếng Việt", shortLabel: "VI" },
  { code: "id", label: "Bahasa Indonesia", shortLabel: "ID" },
  { code: "ja", label: "日本語", shortLabel: "JA" },
  { code: "hi", label: "हिन्दी", shortLabel: "HI" },
  { code: "ko", label: "한국어", shortLabel: "KO" },
  { code: "uk", label: "Українська", shortLabel: "UK" },
];

export const routePaths = [
  "/",
  "/how-to-use",
  "/faq",
  "/guides/film-negatives",
  "/guides/digitize-35mm",
  "/guides/film-vs-digital",
  "/about",
];

const dictionaries = {
  en: {
    htmlLang: "en",
    languageLabel: "Language",
    site: {
      titleSuffix: "Online Film Negative Viewer",
      description: siteConfig.description,
    },
    nav: {
      homeAria: "Negative Viewer home",
      primaryAria: "Primary",
      howToUse: "How to use",
      guides: "Guides",
      faq: "FAQ",
      about: "About",
    },
    footer: {
      tagline:
        "A free, browser-based tool for previewing film negatives in real time.",
      tool: "Tool",
      openViewer: "Open viewer",
      howToUse: "How to use",
      faq: "FAQ",
      guides: "Guides",
      filmNegatives: "Film negatives explained",
      digitize35mm: "Digitize 35mm at home",
      filmVsDigital: "Film vs. digital",
      about: "About",
      aboutSite: "About this site",
      builtBy: "Built by",
      at: "at",
    },
    viewer: {
      insecureNotice:
        "Camera access requires HTTPS. Open this page over HTTPS or via localhost to use the live viewer.",
      cameraUnsupported: "Camera access is not supported in this browser.",
      cameraError:
        "Could not start the camera. Make sure you granted permission and that you're on HTTPS.",
      videoAria: "Live camera feed for negative film conversion",
      canvasAria: "Processed image preview after negative color inversion",
      placeholder: "Camera preview will appear here.",
      placeholderSub:
        "Your video never leaves this device — all processing runs in your browser.",
      live: "● Live",
      startCamera: "▶ Start camera",
      savePhoto: "Save photo",
      openConverter: "Orange-mask tool",
      openConverterAria: "Process saved negatives and remove orange mask with Negative Converter",
      sampleBase: "Sample base",
      tapOrangeFilm: "Tap on the orange film…",
      resetColorCast: "Reset color cast",
      fullscreen: "Fullscreen",
      exitFullscreen: "Exit fullscreen",
      statusUncorrected: "Color cast: uncorrected",
      statusAuto: "Color cast: corrected (auto)",
      statusManual: "Color cast: corrected (sampled)",
      contrast: "Contrast",
      contrastAria: "Adjust preview contrast",
    },
  },
  zh: {
    htmlLang: "zh-CN",
    languageLabel: "语言",
    site: {
      titleSuffix: "在线胶片负片查看器",
      description:
        "免费的在线胶片负片查看器。使用手机或笔记本摄像头实时把负片预览成正片，无需上传、扫描仪或安装应用。",
    },
    nav: {
      homeAria: "Negative Viewer 首页",
      primaryAria: "主导航",
      howToUse: "使用方法",
      guides: "指南",
      faq: "FAQ",
      about: "关于",
    },
    footer: {
      tagline:
        "一个免费的浏览器工具，用来实时预览胶片负片的正片效果。",
      tool: "工具",
      openViewer: "打开查看器",
      howToUse: "使用方法",
      faq: "FAQ",
      guides: "指南",
      filmNegatives: "胶片负片说明",
      digitize35mm: "在家数字化 35mm",
      filmVsDigital: "胶片与数码",
      about: "关于",
      aboutSite: "关于本站",
      builtBy: "由",
      at: "于",
    },
    viewer: {
      insecureNotice:
        "摄像头访问需要 HTTPS。请通过 HTTPS 或 localhost 打开此页面来使用实时查看器。",
      cameraUnsupported: "此浏览器不支持摄像头访问。",
      cameraError:
        "无法启动摄像头。请确认已授予权限，并且当前页面使用 HTTPS。",
      videoAria: "用于负片转换的实时摄像头画面",
      canvasAria: "负片颜色反转后的处理预览",
      placeholder: "摄像头预览会显示在这里。",
      placeholderSub:
        "视频不会离开这台设备，所有处理都在浏览器中完成。",
      live: "● 实时",
      startCamera: "▶ 开启摄像头",
      savePhoto: "保存照片",
      openConverter: "去色罩工具",
      openConverterAria: "使用 Negative Converter 处理已保存的负片并去除橙色片基色罩",
      sampleBase: "取样片基",
      tapOrangeFilm: "点击橙色片基…",
      resetColorCast: "重置偏色",
      fullscreen: "全屏",
      exitFullscreen: "退出全屏",
      statusUncorrected: "偏色：未校正",
      statusAuto: "偏色：已自动校正",
      statusManual: "偏色：已按取样校正",
      contrast: "对比度",
      contrastAria: "调整预览对比度",
    },
  },
  ru: {
    htmlLang: "ru",
    languageLabel: "Язык",
    site: {
      titleSuffix: "онлайн-просмотр негативов",
      description:
        "Бесплатный онлайн-просмотр фотонегативов. Используйте камеру телефона или ноутбука, чтобы в реальном времени увидеть негатив как позитив — без загрузки, сканера и установки.",
    },
    nav: {
      homeAria: "Главная Negative Viewer",
      primaryAria: "Основная навигация",
      howToUse: "Как пользоваться",
      guides: "Гиды",
      faq: "FAQ",
      about: "О проекте",
    },
    footer: {
      tagline:
        "Бесплатный браузерный инструмент для просмотра фотонегативов в реальном времени.",
      tool: "Инструмент",
      openViewer: "Открыть просмотр",
      howToUse: "Как пользоваться",
      faq: "FAQ",
      guides: "Гиды",
      filmNegatives: "Что такое фотонегатив",
      digitize35mm: "Оцифровка 35 мм дома",
      filmVsDigital: "Пленка и цифра",
      about: "О проекте",
      aboutSite: "Об этом сайте",
      builtBy: "Разработано",
      at: "в",
    },
    viewer: {
      insecureNotice:
        "Для доступа к камере нужен HTTPS. Откройте страницу по HTTPS или через localhost, чтобы пользоваться просмотром.",
      cameraUnsupported: "Этот браузер не поддерживает доступ к камере.",
      cameraError:
        "Не удалось запустить камеру. Проверьте разрешение для камеры и HTTPS.",
      videoAria: "Живой видеопоток камеры для конвертации фотонегатива",
      canvasAria: "Предпросмотр изображения после инверсии негатива",
      placeholder: "Здесь появится изображение с камеры.",
      placeholderSub:
        "Видео не покидает это устройство — обработка идет в браузере.",
      live: "● В эфире",
      startCamera: "▶ Запустить камеру",
      savePhoto: "Сохранить фото",
      openConverter: "Конвертировать файлы",
      openConverterAria: "Обработать готовые негативы в Negative Converter",
      sampleBase: "Замерить базу",
      tapOrangeFilm: "Коснитесь оранжевой базы…",
      resetColorCast: "Сбросить цветовой сдвиг",
      fullscreen: "На весь экран",
      exitFullscreen: "Выйти из полноэкранного режима",
      statusUncorrected: "Цветовой сдвиг: не исправлен",
      statusAuto: "Цветовой сдвиг: исправлен автоматически",
      statusManual: "Цветовой сдвиг: исправлен по замеру",
      contrast: "Контраст",
      contrastAria: "Настроить контраст предпросмотра",
    },
  },
  es: {
    htmlLang: "es",
    languageLabel: "Idioma",
    site: {
      titleSuffix: "visor online de negativos",
      description:
        "Visor online gratuito de negativos fotográficos. Usa la cámara del móvil o portátil para convertir negativos en positivos en tiempo real, sin subir archivos, sin escáner y sin instalar nada.",
    },
    nav: {
      homeAria: "Inicio de Negative Viewer",
      primaryAria: "Navegación principal",
      howToUse: "Cómo usarlo",
      guides: "Guías",
      faq: "FAQ",
      about: "Acerca de",
    },
    footer: {
      tagline:
        "Una herramienta gratuita en el navegador para previsualizar negativos en tiempo real.",
      tool: "Herramienta",
      openViewer: "Abrir visor",
      howToUse: "Cómo usarlo",
      faq: "FAQ",
      guides: "Guías",
      filmNegatives: "Negativos explicados",
      digitize35mm: "Digitalizar 35 mm en casa",
      filmVsDigital: "Película vs. digital",
      about: "Acerca de",
      aboutSite: "Sobre este sitio",
      builtBy: "Creado por",
      at: "en",
    },
    viewer: {
      insecureNotice:
        "El acceso a la cámara requiere HTTPS. Abre esta página con HTTPS o desde localhost para usar el visor en vivo.",
      cameraUnsupported: "Este navegador no admite acceso a la cámara.",
      cameraError:
        "No se pudo iniciar la cámara. Comprueba el permiso de cámara y que estés en HTTPS.",
      videoAria: "Señal de cámara en vivo para convertir negativos",
      canvasAria: "Vista previa procesada tras invertir el negativo",
      placeholder: "La vista de la cámara aparecerá aquí.",
      placeholderSub:
        "Tu video nunca sale de este dispositivo: todo se procesa en el navegador.",
      live: "● En vivo",
      startCamera: "▶ Iniciar cámara",
      savePhoto: "Guardar foto",
      openConverter: "Convertir archivos",
      openConverterAria: "Procesar negativos guardados con Negative Converter",
      sampleBase: "Muestrear base",
      tapOrangeFilm: "Toca la base naranja…",
      resetColorCast: "Restablecer dominante",
      fullscreen: "Pantalla completa",
      exitFullscreen: "Salir de pantalla completa",
      statusUncorrected: "Dominante de color: sin corregir",
      statusAuto: "Dominante de color: corregida automáticamente",
      statusManual: "Dominante de color: corregida por muestra",
      contrast: "Contraste",
      contrastAria: "Ajustar el contraste de la vista previa",
    },
  },
  fr: {
    htmlLang: "fr",
    languageLabel: "Langue",
    site: {
      titleSuffix: "visionneuse de négatifs en ligne",
      description:
        "Visionneuse gratuite de négatifs photo en ligne. Utilisez la caméra de votre téléphone ou ordinateur pour convertir les négatifs en positifs en temps réel, sans envoi, sans scanner et sans installation.",
    },
    nav: {
      homeAria: "Accueil Negative Viewer",
      primaryAria: "Navigation principale",
      howToUse: "Mode d'emploi",
      guides: "Guides",
      faq: "FAQ",
      about: "À propos",
    },
    footer: {
      tagline:
        "Un outil gratuit dans le navigateur pour prévisualiser les négatifs photo en temps réel.",
      tool: "Outil",
      openViewer: "Ouvrir la visionneuse",
      howToUse: "Mode d'emploi",
      faq: "FAQ",
      guides: "Guides",
      filmNegatives: "Comprendre les négatifs",
      digitize35mm: "Numériser du 35 mm chez soi",
      filmVsDigital: "Argentique vs numérique",
      about: "À propos",
      aboutSite: "À propos du site",
      builtBy: "Créé par",
      at: "chez",
    },
    viewer: {
      insecureNotice:
        "L'accès à la caméra nécessite HTTPS. Ouvrez cette page en HTTPS ou via localhost pour utiliser la visionneuse.",
      cameraUnsupported: "Ce navigateur ne prend pas en charge l'accès à la caméra.",
      cameraError:
        "Impossible de démarrer la caméra. Vérifiez l'autorisation caméra et l'usage de HTTPS.",
      videoAria: "Flux caméra en direct pour convertir un négatif photo",
      canvasAria: "Aperçu traité après inversion du négatif",
      placeholder: "L'aperçu caméra apparaîtra ici.",
      placeholderSub:
        "Votre vidéo ne quitte jamais cet appareil — tout est traité dans le navigateur.",
      live: "● En direct",
      startCamera: "▶ Démarrer la caméra",
      savePhoto: "Enregistrer la photo",
      openConverter: "Convertir des fichiers",
      openConverterAria: "Traiter des négatifs enregistrés avec Negative Converter",
      sampleBase: "Échantillonner la base",
      tapOrangeFilm: "Touchez la base orange…",
      resetColorCast: "Réinitialiser la dominante",
      fullscreen: "Plein écran",
      exitFullscreen: "Quitter le plein écran",
      statusUncorrected: "Dominante couleur : non corrigée",
      statusAuto: "Dominante couleur : corrigée automatiquement",
      statusManual: "Dominante couleur : corrigée par échantillon",
      contrast: "Contraste",
      contrastAria: "Régler le contraste de l'aperçu",
    },
  },
  it: {
    htmlLang: "it",
    languageLabel: "Lingua",
    site: {
      titleSuffix: "visualizzatore online di negativi",
      description:
        "Visualizzatore online gratuito di negativi fotografici. Usa la fotocamera del telefono o del laptop per trasformare i negativi in positivi in tempo reale, senza upload, scanner o installazione.",
    },
    nav: {
      homeAria: "Home di Negative Viewer",
      primaryAria: "Navigazione principale",
      howToUse: "Come si usa",
      guides: "Guide",
      faq: "FAQ",
      about: "Info",
    },
    footer: {
      tagline:
        "Uno strumento gratuito nel browser per vedere i negativi fotografici in tempo reale.",
      tool: "Strumento",
      openViewer: "Apri visualizzatore",
      howToUse: "Come si usa",
      faq: "FAQ",
      guides: "Guide",
      filmNegatives: "Negativi spiegati",
      digitize35mm: "Digitalizzare 35 mm a casa",
      filmVsDigital: "Pellicola e digitale",
      about: "Info",
      aboutSite: "Informazioni sul sito",
      builtBy: "Creato da",
      at: "presso",
    },
    viewer: {
      insecureNotice:
        "L'accesso alla fotocamera richiede HTTPS. Apri questa pagina in HTTPS o tramite localhost per usare il visualizzatore live.",
      cameraUnsupported: "Questo browser non supporta l'accesso alla fotocamera.",
      cameraError:
        "Impossibile avviare la fotocamera. Controlla il permesso e che la pagina usi HTTPS.",
      videoAria: "Feed live della fotocamera per convertire il negativo",
      canvasAria: "Anteprima elaborata dopo l'inversione del negativo",
      placeholder: "Qui apparirà l'anteprima della fotocamera.",
      placeholderSub:
        "Il video non lascia mai questo dispositivo: tutto viene elaborato nel browser.",
      live: "● Live",
      startCamera: "▶ Avvia fotocamera",
      savePhoto: "Salva foto",
      openConverter: "Converti file",
      openConverterAria: "Elabora negativi salvati con Negative Converter",
      sampleBase: "Campiona base",
      tapOrangeFilm: "Tocca la base arancione…",
      resetColorCast: "Reimposta dominante",
      fullscreen: "Schermo intero",
      exitFullscreen: "Esci da schermo intero",
      statusUncorrected: "Dominante colore: non corretta",
      statusAuto: "Dominante colore: corretta automaticamente",
      statusManual: "Dominante colore: corretta da campione",
      contrast: "Contrasto",
      contrastAria: "Regola il contrasto dell'anteprima",
    },
  },
  vi: {
    htmlLang: "vi",
    languageLabel: "Ngôn ngữ",
    site: {
      titleSuffix: "Trình xem phim âm bản trực tuyến",
      description:
        "Trình xem phim âm bản trực tuyến miễn phí. Sử dụng camera điện thoại hoặc laptop để chuyển đổi phim âm bản thành ảnh dương bản theo thời gian thực — không tải lên, không máy quét, không cần cài đặt.",
    },
    nav: {
      homeAria: "Trang chủ Negative Viewer",
      primaryAria: "Điều hướng chính",
      howToUse: "Cách sử dụng",
      guides: "Hướng dẫn",
      faq: "FAQ",
      about: "Giới thiệu",
    },
    footer: {
      tagline:
        "Công cụ miễn phí trên trình duyệt để xem trước phim âm bản theo thời gian thực.",
      tool: "Công cụ",
      openViewer: "Mở trình xem",
      howToUse: "Cách sử dụng",
      faq: "FAQ",
      guides: "Hướng dẫn",
      filmNegatives: "Tìm hiểu về phim âm bản",
      digitize35mm: "Số hóa 35mm tại nhà",
      filmVsDigital: "Phim và kỹ thuật số",
      about: "Giới thiệu",
      aboutSite: "Về trang web này",
      builtBy: "Được tạo bởi",
      at: "tại",
    },
    viewer: {
      insecureNotice:
        "Truy cập camera yêu cầu HTTPS. Mở trang này qua HTTPS hoặc localhost để sử dụng trình xem trực tiếp.",
      cameraUnsupported: "Trình duyệt này không hỗ trợ truy cập camera.",
      cameraError:
        "Không thể khởi động camera. Đảm bảo bạn đã cấp quyền và đang sử dụng HTTPS.",
      videoAria: "Luồng camera trực tiếp để chuyển đổi phim âm bản",
      canvasAria: "Xem trước ảnh đã xử lý sau khi đảo ngược màu âm bản",
      placeholder: "Xem trước camera sẽ xuất hiện ở đây.",
      placeholderSub:
        "Video của bạn không bao giờ rời khỏi thiết bị này — tất cả xử lý diễn ra trong trình duyệt.",
      live: "● Trực tiếp",
      startCamera: "▶ Bật camera",
      savePhoto: "Lưu ảnh",
      openConverter: "Chuyển đổi tệp",
      openConverterAria: "Xử lý âm bản đã lưu với Negative Converter",
      sampleBase: "Lấy mẫu nền",
      tapOrangeFilm: "Chạm vào nền cam…",
      resetColorCast: "Đặt lại cân bằng màu",
      fullscreen: "Toàn màn hình",
      exitFullscreen: "Thoát toàn màn hình",
      statusUncorrected: "Cân bằng màu: chưa chỉnh",
      statusAuto: "Cân bằng màu: đã chỉnh tự động",
      statusManual: "Cân bằng màu: đã chỉnh theo mẫu",
      contrast: "Tương phản",
      contrastAria: "Điều chỉnh độ tương phản xem trước",
    },
  },
  id: {
    htmlLang: "id",
    languageLabel: "Bahasa",
    site: {
      titleSuffix: "Penampil Negatif Film Online",
      description:
        "Penampil negatif film online gratis. Gunakan kamera ponsel atau laptop untuk mengubah negatif film menjadi positif secara real-time — tanpa unggah, tanpa pemindai, tanpa instalasi.",
    },
    nav: {
      homeAria: "Beranda Negative Viewer",
      primaryAria: "Navigasi utama",
      howToUse: "Cara menggunakan",
      guides: "Panduan",
      faq: "FAQ",
      about: "Tentang",
    },
    footer: {
      tagline:
        "Alat gratis berbasis browser untuk melihat pratinjau negatif film secara real-time.",
      tool: "Alat",
      openViewer: "Buka penampil",
      howToUse: "Cara menggunakan",
      faq: "FAQ",
      guides: "Panduan",
      filmNegatives: "Penjelasan negatif film",
      digitize35mm: "Digitalisasi 35mm di rumah",
      filmVsDigital: "Film vs. digital",
      about: "Tentang",
      aboutSite: "Tentang situs ini",
      builtBy: "Dibuat oleh",
      at: "di",
    },
    viewer: {
      insecureNotice:
        "Akses kamera memerlukan HTTPS. Buka halaman ini melalui HTTPS atau localhost untuk menggunakan penampil langsung.",
      cameraUnsupported: "Browser ini tidak mendukung akses kamera.",
      cameraError:
        "Tidak dapat memulai kamera. Pastikan Anda memberikan izin dan menggunakan HTTPS.",
      videoAria: "Umpan kamera langsung untuk konversi negatif film",
      canvasAria: "Pratinjau gambar yang diproses setelah inversi warna negatif",
      placeholder: "Pratinjau kamera akan muncul di sini.",
      placeholderSub:
        "Video Anda tidak pernah meninggalkan perangkat ini — semua pemrosesan berjalan di browser.",
      live: "● Langsung",
      startCamera: "▶ Mulai kamera",
      savePhoto: "Simpan foto",
      openConverter: "Konversi file",
      openConverterAria: "Proses negatif tersimpan dengan Negative Converter",
      sampleBase: "Sampel dasar",
      tapOrangeFilm: "Ketuk film oranye…",
      resetColorCast: "Reset warna",
      fullscreen: "Layar penuh",
      exitFullscreen: "Keluar layar penuh",
      statusUncorrected: "Warna: belum dikoreksi",
      statusAuto: "Warna: dikoreksi otomatis",
      statusManual: "Warna: dikoreksi sampel",
      contrast: "Kontras",
      contrastAria: "Sesuaikan kontras pratinjau",
    },
  },
  ja: {
    htmlLang: "ja",
    languageLabel: "言語",
    site: {
      titleSuffix: "オンラインフィルムネガビューワー",
      description:
        "無料のオンラインフィルムネガビューワー。スマホやノートPCのカメラを使って、ネガフィルムをリアルタイムでポジティブに変換します。アップロード不要、スキャナー不要、インストール不要。",
    },
    nav: {
      homeAria: "Negative Viewer ホーム",
      primaryAria: "メインナビゲーション",
      howToUse: "使い方",
      guides: "ガイド",
      faq: "FAQ",
      about: "概要",
    },
    footer: {
      tagline:
        "フィルムネガをリアルタイムでプレビューできる無料のブラウザツール。",
      tool: "ツール",
      openViewer: "ビューワーを開く",
      howToUse: "使い方",
      faq: "FAQ",
      guides: "ガイド",
      filmNegatives: "フィルムネガとは",
      digitize35mm: "自宅で35mmをデジタル化",
      filmVsDigital: "フィルム vs. デジタル",
      about: "概要",
      aboutSite: "このサイトについて",
      builtBy: "制作",
      at: "",
    },
    viewer: {
      insecureNotice:
        "カメラへのアクセスにはHTTPSが必要です。ライブビューワーを使用するには、HTTPSまたはlocalhostでこのページを開いてください。",
      cameraUnsupported: "このブラウザはカメラアクセスをサポートしていません。",
      cameraError:
        "カメラを起動できませんでした。カメラの権限を許可し、HTTPSで接続していることを確認してください。",
      videoAria: "ネガフィルム変換用のライブカメラ映像",
      canvasAria: "ネガ反転処理後のプレビュー画像",
      placeholder: "カメラのプレビューがここに表示されます。",
      placeholderSub:
        "映像がデバイスから外部に送信されることはありません。すべての処理はブラウザ内で実行されます。",
      live: "● ライブ",
      startCamera: "▶ カメラを起動",
      savePhoto: "写真を保存",
      openConverter: "ファイルを変換",
      openConverterAria: "保存済みのネガをNegative Converterで処理",
      sampleBase: "ベースをサンプリング",
      tapOrangeFilm: "オレンジのフィルムベースをタップ…",
      resetColorCast: "色かぶりをリセット",
      fullscreen: "フルスクリーン",
      exitFullscreen: "フルスクリーンを終了",
      statusUncorrected: "色かぶり：未補正",
      statusAuto: "色かぶり：自動補正済み",
      statusManual: "色かぶり：サンプリング補正済み",
      contrast: "コントラスト",
      contrastAria: "プレビューのコントラストを調整",
    },
  },
  hi: {
    htmlLang: "hi",
    languageLabel: "भाषा",
    site: {
      titleSuffix: "ऑनलाइन फिल्म नेगेटिव व्यूअर",
      description:
        "मुफ़्त ऑनलाइन फिल्म नेगेटिव व्यूअर। अपने फ़ोन या लैपटॉप कैमरे से नेगेटिव को रीयल-टाइम में पॉज़िटिव में बदलें — कोई अपलोड नहीं, कोई स्कैनर नहीं, कोई इंस्टॉलेशन नहीं।",
    },
    nav: {
      homeAria: "Negative Viewer होम",
      primaryAria: "मुख्य नेविगेशन",
      howToUse: "उपयोग कैसे करें",
      guides: "गाइड",
      faq: "FAQ",
      about: "हमारे बारे में",
    },
    footer: {
      tagline:
        "फिल्म नेगेटिव का रीयल-टाइम में पूर्वावलोकन करने के लिए एक मुफ़्त ब्राउज़र-आधारित टूल।",
      tool: "टूल",
      openViewer: "व्यूअर खोलें",
      howToUse: "उपयोग कैसे करें",
      faq: "FAQ",
      guides: "गाइड",
      filmNegatives: "फिल्म नेगेटिव की व्याख्या",
      digitize35mm: "घर पर 35mm डिजिटाइज़ करें",
      filmVsDigital: "फिल्म बनाम डिजिटल",
      about: "हमारे बारे में",
      aboutSite: "इस साइट के बारे में",
      builtBy: "द्वारा निर्मित",
      at: "पर",
    },
    viewer: {
      insecureNotice:
        "कैमरा एक्सेस के लिए HTTPS आवश्यक है। लाइव व्यूअर का उपयोग करने के लिए इस पेज को HTTPS या localhost के माध्यम से खोलें।",
      cameraUnsupported: "इस ब्राउज़र में कैमरा एक्सेस समर्थित नहीं है।",
      cameraError:
        "कैमरा प्रारंभ नहीं किया जा सका। सुनिश्चित करें कि आपने अनुमति दी है और आप HTTPS पर हैं।",
      videoAria: "नेगेटिव फिल्म रूपांतरण के लिए लाइव कैमरा फ़ीड",
      canvasAria: "नेगेटिव रंग उलटने के बाद संसाधित छवि पूर्वावलोकन",
      placeholder: "कैमरा पूर्वावलोकन यहाँ दिखाई देगा।",
      placeholderSub:
        "आपका वीडियो कभी भी इस डिवाइस को नहीं छोड़ता — सारी प्रोसेसिंग आपके ब्राउज़र में होती है।",
      live: "● लाइव",
      startCamera: "▶ कैमरा शुरू करें",
      savePhoto: "फ़ोटो सहेजें",
      openConverter: "फ़ाइलें कन्वर्ट करें",
      openConverterAria: "सहेजे गए नेगेटिव को प्रोसेस करें और Negative Converter से ऑरेंज मास्क हटाएँ",
      sampleBase: "बेस सैंपल करें",
      tapOrangeFilm: "ऑरेंज फिल्म पर टैप करें…",
      resetColorCast: "रंग कास्ट रीसेट करें",
      fullscreen: "फ़ुल स्क्रीन",
      exitFullscreen: "फ़ुल स्क्रीन से बाहर निकलें",
      statusUncorrected: "रंग कास्ट: असंशोधित",
      statusAuto: "रंग कास्ट: स्वचालित रूप से संशोधित",
      statusManual: "रंग कास्ट: सैंपल द्वारा संशोधित",
      contrast: "कंट्रास्ट",
      contrastAria: "पूर्वावलोकन कंट्रास्ट समायोजित करें",
    },
  },
  el: {
    htmlLang: "el",
    languageLabel: "Γλώσσα",
    site: {
      titleSuffix: "online προβολή αρνητικών φιλμ",
      description:
        "Δωρεάν online προβολή φωτογραφικών αρνητικών. Χρησιμοποιήστε την κάμερα κινητού ή laptop για να μετατρέπετε αρνητικά σε θετικά σε πραγματικό χρόνο, χωρίς ανέβασμα, scanner ή εγκατάσταση.",
    },
    nav: {
      homeAria: "Αρχική Negative Viewer",
      primaryAria: "Κύρια πλοήγηση",
      howToUse: "Πώς χρησιμοποιείται",
      guides: "Οδηγοί",
      faq: "FAQ",
      about: "Σχετικά",
    },
    footer: {
      tagline:
        "Δωρεάν εργαλείο στο πρόγραμμα περιήγησης για άμεση προεπισκόπηση φωτογραφικών αρνητικών.",
      tool: "Εργαλείο",
      openViewer: "Άνοιγμα προβολής",
      howToUse: "Πώς χρησιμοποιείται",
      faq: "FAQ",
      guides: "Οδηγοί",
      filmNegatives: "Τι είναι τα αρνητικά",
      digitize35mm: "Ψηφιοποίηση 35 mm στο σπίτι",
      filmVsDigital: "Φιλμ και ψηφιακή",
      about: "Σχετικά",
      aboutSite: "Σχετικά με τον ιστότοπο",
      builtBy: "Δημιουργήθηκε από",
      at: "στο",
    },
    viewer: {
      insecureNotice:
        "Η πρόσβαση στην κάμερα απαιτεί HTTPS. Ανοίξτε τη σελίδα με HTTPS ή μέσω localhost για να χρησιμοποιήσετε τη ζωντανή προβολή.",
      cameraUnsupported:
        "Αυτό το πρόγραμμα περιήγησης δεν υποστηρίζει πρόσβαση στην κάμερα.",
      cameraError:
        "Δεν ήταν δυνατή η εκκίνηση της κάμερας. Ελέγξτε την άδεια κάμερας και ότι χρησιμοποιείτε HTTPS.",
      videoAria: "Ζωντανή ροή κάμερας για μετατροπή φωτογραφικού αρνητικού",
      canvasAria: "Επεξεργασμένη προεπισκόπηση μετά την αντιστροφή του αρνητικού",
      placeholder: "Η προεπισκόπηση της κάμερας θα εμφανιστεί εδώ.",
      placeholderSub:
        "Το βίντεο δεν φεύγει ποτέ από τη συσκευή — η επεξεργασία γίνεται στο πρόγραμμα περιήγησης.",
      live: "● Ζωντανά",
      startCamera: "▶ Εκκίνηση κάμερας",
      savePhoto: "Αποθήκευση φωτογραφίας",
      openConverter: "Μετατροπή αρχείων",
      openConverterAria: "Επεξεργασία αποθηκευμένων αρνητικών με Negative Converter",
      sampleBase: "Δείγμα βάσης",
      tapOrangeFilm: "Πατήστε στην πορτοκαλί βάση…",
      resetColorCast: "Επαναφορά χρωματικής απόκλισης",
      fullscreen: "Πλήρης οθόνη",
      exitFullscreen: "Έξοδος από πλήρη οθόνη",
      statusUncorrected: "Χρωματική απόκλιση: χωρίς διόρθωση",
      statusAuto: "Χρωματική απόκλιση: αυτόματη διόρθωση",
      statusManual: "Χρωματική απόκλιση: διόρθωση από δείγμα",
      contrast: "Αντίθεση",
      contrastAria: "Ρύθμιση αντίθεσης προεπισκόπησης",
    },
  },
  ko: {
    htmlLang: "ko",
    languageLabel: "언어",
    site: {
      titleSuffix: "온라인 필름 네거티브 뷰어",
      description:
        "무료 온라인 필름 네거티브 뷰어. 스마트폰이나 노트북 카메라로 네거티브 필름을 실시간 포지티브로 변환합니다. 업로드 불필요, 스캐너 불필요, 설치 불필요.",
    },
    nav: {
      homeAria: "Negative Viewer 홈",
      primaryAria: "주 내비게이션",
      howToUse: "사용 방법",
      guides: "가이드",
      faq: "FAQ",
      about: "소개",
    },
    footer: {
      tagline:
        "필름 네거티브를 실시간으로 미리 볼 수 있는 무료 브라우저 도구.",
      tool: "도구",
      openViewer: "뷰어 열기",
      howToUse: "사용 방법",
      faq: "FAQ",
      guides: "가이드",
      filmNegatives: "필름 네거티브란",
      digitize35mm: "집에서 35mm 디지털화하기",
      filmVsDigital: "필름 vs. 디지털",
      about: "소개",
      aboutSite: "사이트 소개",
      builtBy: "제작:",
      at: "·",
    },
    viewer: {
      insecureNotice:
        "카메라 접근에는 HTTPS가 필요합니다. 라이브 뷰어를 사용하려면 HTTPS 또는 localhost로 이 페이지를 열어 주세요.",
      cameraUnsupported: "이 브라우저에서는 카메라 접근을 지원하지 않습니다.",
      cameraError:
        "카메라를 시작할 수 없습니다. 권한을 허용했는지, HTTPS로 접속했는지 확인해 주세요.",
      videoAria: "네거티브 필름 변환용 라이브 카메라 영상",
      canvasAria: "네거티브 색상 반전 처리 후 미리보기 이미지",
      placeholder: "카메라 미리보기가 여기에 표시됩니다.",
      placeholderSub:
        "영상은 이 기기를 벗어나지 않으며, 모든 처리는 브라우저 안에서 실행됩니다.",
      live: "● 라이브",
      startCamera: "▶ 카메라 시작",
      savePhoto: "사진 저장",
      openConverter: "오렌지 마스크 도구",
      openConverterAria: "저장된 네거티브를 Negative Converter로 처리하고 오렌지 마스크를 제거합니다",
      sampleBase: "베이스 샘플링",
      tapOrangeFilm: "오렌지색 필름을 탭하세요…",
      resetColorCast: "색조 초기화",
      fullscreen: "전체 화면",
      exitFullscreen: "전체 화면 종료",
      statusUncorrected: "색조: 미보정",
      statusAuto: "색조: 보정됨 (자동)",
      statusManual: "색조: 보정됨 (샘플링)",
      contrast: "대비",
      contrastAria: "미리보기 대비 조정",
    },
  },
  uk: {
    htmlLang: "uk",
    languageLabel: "Мова",
    site: {
      titleSuffix: "Онлайн-переглядач фотоплівкових негативів",
      description:
        "Безкоштовний онлайн-переглядач фотоплівкових негативів. Перетворюйте негативи на позитиви в реальному часі за допомогою камери смартфона чи ноутбука. Без завантаження, без сканера, без встановлення.",
    },
    nav: {
      homeAria: "Головна Negative Viewer",
      primaryAria: "Основна навігація",
      howToUse: "Як користуватися",
      guides: "Посібники",
      faq: "Питання й відповіді",
      about: "Про застосунок",
    },
    footer: {
      tagline:
        "Безкоштовний браузерний інструмент для перегляду фотоплівкових негативів у реальному часі.",
      tool: "Інструмент",
      openViewer: "Відкрити переглядач",
      howToUse: "Як користуватися",
      faq: "Питання й відповіді",
      guides: "Посібники",
      filmNegatives: "Що таке негативи",
      digitize35mm: "Оцифрувати 35 мм удома",
      filmVsDigital: "Плівка vs. цифра",
      about: "Про застосунок",
      aboutSite: "Про сайт",
      builtBy: "Створено:",
      at: "·",
    },
    viewer: {
      insecureNotice:
        "Для доступу до камери потрібен HTTPS. Щоб скористатися живим переглядачем, відкрийте цю сторінку через HTTPS або localhost.",
      cameraUnsupported: "Цей браузер не підтримує доступ до камери.",
      cameraError:
        "Не вдалося запустити камеру. Переконайтеся, що ви надали дозвіл і відкрили сторінку через HTTPS.",
      videoAria: "Живе відео з камери для перетворення негативів",
      canvasAria: "Зображення попереднього перегляду після інверсії кольорів негатива",
      placeholder: "Тут з’явиться попередній перегляд камери.",
      placeholderSub:
        "Відео не залишає цей пристрій — уся обробка відбувається у вашому браузері.",
      live: "● У прямому ефірі",
      startCamera: "▶ Запустити камеру",
      savePhoto: "Зберегти фото",
      openConverter: "Інструмент помаранчевої маски",
      openConverterAria: "Обробити збережені негативи в Negative Converter і видалити помаранчеву маску",
      sampleBase: "Зразок основи",
      tapOrangeFilm: "Торкніться помаранчевої плівки…",
      resetColorCast: "Скинути відтінок",
      fullscreen: "На весь екран",
      exitFullscreen: "Вийти з повноекранного режиму",
      statusUncorrected: "Відтінок: без корекції",
      statusAuto: "Відтінок: скориговано (авто)",
      statusManual: "Відтінок: скориговано (зразок)",
      contrast: "Контраст",
      contrastAria: "Регулювання контрасту попереднього перегляду",
    },
  },
};

export function isSupportedLocale(locale) {
  return supportedLocales.includes(locale);
}

export function isTranslatedLocale(locale) {
  return translatedLocales.includes(locale);
}

export function normalizeLocale(locale) {
  return isSupportedLocale(locale) ? locale : defaultLocale;
}

export function getDictionary(locale = defaultLocale) {
  return dictionaries[normalizeLocale(locale)];
}

export function localizedPath(path = "/", locale = defaultLocale) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (normalizeLocale(locale) === defaultLocale) {
    return normalizedPath;
  }
  return normalizedPath === "/"
    ? `/${locale}`
    : `/${locale}${normalizedPath}`;
}

export function stripLocalePrefix(pathname = "/") {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isSupportedLocale(segments[0])) {
    const stripped = `/${segments.slice(1).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "");
  }
  return pathname || "/";
}

export function languageAlternates(path = "/") {
  const alternates = Object.fromEntries(
    supportedLocales.map((locale) => [
      locale,
      `${siteConfig.url}${localizedPath(path, locale)}`,
    ])
  );
  alternates["x-default"] = `${siteConfig.url}${localizedPath(path, defaultLocale)}`;
  return alternates;
}
