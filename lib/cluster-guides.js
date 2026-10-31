export const clusterGuidePaths = [
  "/guides/scan-negatives-without-scanner",
  "/guides/invert-negatives-iphone",
  "/guides/view-negatives-android",
  "/guides/orange-mask-removal",
  "/guides/best-free-negative-viewer",
];

export const clusterGuides = {
  "/guides/scan-negatives-without-scanner": {
    title: "How to Scan Film Negatives Without a Scanner",
    description:
      "Practical ways to view and digitize film negatives without buying a scanner, including browser preview, phone capture, and camera scanning.",
    readTime: "PT6M",
    displayReadTime: "6-minute read",
    keywords: [
      "scan negatives without scanner",
      "view film negatives without scanner",
      "phone negative scanner",
      "negative viewer",
    ],
    about: ["film scanning", "film negatives", "phone scanning"],
    lede:
      "You can scan film negatives without a scanner by lighting the film from behind, photographing it with a phone or camera, and inverting the image. For quick sorting, a browser-based viewer is fastest. For keepers, capture a still photo and color-correct it after inversion.",
    converterCta: {
      eyebrow: "For saved captures",
      title: "Turn photographed negatives into finished positives",
      text: "After you capture a frame with your phone or camera, open Negative Converter to remove the orange mask, tune exposure, and export a clean positive image.",
      linkText: "Open Negative Converter",
    },
    sections: [
      {
        title: "Fastest free workflow",
        paragraphs: [
          "Put the negative on a bright, even white screen or lightbox. Open Negative Viewer, allow camera access, and point the camera at one frame. The browser converts the live negative into a positive preview without uploading the image.",
          "This workflow is best for identifying subjects, sorting a roll, and sharing a quick reference. It is not a replacement for a high-resolution archive scan.",
        ],
      },
      {
        title: "When to use each method",
        table: {
          headers: ["Goal", "Best method", "Tradeoff"],
          rows: [
            ["Just see what is on the roll", "Browser live viewer", "Fastest, but preview quality"],
            ["Share family photos", "Phone still photo + invert", "Better resolution, manual color work"],
            ["Archive important frames", "Camera + macro lens", "Best quality, more setup"],
            ["Scan medium format in batches", "Flatbed scanner", "Convenient, not free"],
          ],
        },
      },
      {
        title: "Minimum setup",
        list: [
          "A phone, tablet, or laptop with a working camera.",
          "A second screen or lightbox showing plain white.",
          "A clean film strip held flat and parallel to the camera.",
          "A browser-based inverter or photo editor to turn the negative positive.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I scan negatives without buying any hardware?",
        a: "Yes. If you already have a phone or laptop camera and a second screen for backlight, you can preview negatives for free in the browser. Higher-quality saves require a still photo and more editing.",
      },
      {
        q: "Is a phone good enough for old family negatives?",
        a: "A phone is usually good enough for identifying people, choosing keepers, and sharing small images. For prints or long-term archive files, use a camera scan or dedicated film scanner.",
      },
      {
        q: "What is the biggest quality problem?",
        a: "The common failures are uneven backlight, camera shake, dust, and color cast from the orange film base. A stable camera and neutral light solve most of the visible issues.",
      },
    ],
    sources: [
      {
        title: "FADGI Technical Guidelines for Digitizing Cultural Heritage Materials",
        url: "https://www.digitizationguidelines.gov/guidelines/digitize-technical.html",
      },
      {
        title: "Library of Congress: Care, Handling and Storage of Photographs",
        url: "https://www.loc.gov/preservation/care/photo.html",
      },
    ],
  },
  "/guides/invert-negatives-iphone": {
    title: "How to Invert Film Negatives on iPhone",
    description:
      "A practical iPhone workflow for viewing, photographing, and inverting film negatives without uploading private images.",
    readTime: "PT6M",
    displayReadTime: "6-minute read",
    keywords: [
      "invert negatives on iPhone",
      "iPhone negative viewer",
      "convert negative to positive iPhone",
      "film negative app",
      "Classic Invert negatives",
      "iPhone invert colors negative",
    ],
    about: ["iPhone film scanning", "negative inversion", "film negatives"],
    lede:
      "The easiest way to invert film negatives on iPhone is to open Negative Viewer in Safari, hold the negative against a white backlight, and allow camera access: the page shows a live positive and removes the orange cast automatically. iOS can also flip the whole screen with Classic Invert, but color negatives then look blue and you can't save the positive. For the largest files, take a still with the Camera app and convert it afterwards.",
    converterCta: {
      eyebrow: "iPhone negative files",
      title: "Remove the orange mask from saved iPhone photos",
      text: "Use Negative Converter when you have already photographed the negative and want a cleaner positive export than a live preview can provide.",
      linkText: "Open Negative Converter",
    },
    sections: [
      {
        title: "Use live preview first",
        paragraphs: [
          "Open Negative Viewer in Safari or Chrome on the iPhone you will point at the film. Use another phone, tablet, or laptop as the white backlight. Once the camera starts, the page shows a live positive and, for color negatives, finds a clear film edge and removes the orange cast.",
          "Press Capture to keep a frame, then save it as a PNG or share it. Live preview is also the quickest way to sort a roll before deciding which frames deserve a higher-resolution capture.",
        ],
      },
      {
        title: "Use iPhone's built-in Classic Invert",
        paragraphs: [
          "iOS can invert everything on the screen, including the Camera app's viewfinder. Turn it on in Settings → Accessibility → Display & Text Size → Classic Invert. To switch it on and off quickly, choose Classic Invert under Settings → Accessibility → Accessibility Shortcut, then triple-click the side button (or the Home button).",
          "Use Classic Invert, not Smart Invert: Smart Invert leaves images and video alone, so the camera view stays negative.",
          "It is only a display effect. Color negatives show a strong blue-cyan cast because the orange base is inverted too, photos you take are still negatives, and screenshots usually save in normal colors, so it is not a reliable way to keep a positive.",
        ],
      },
      {
        title: "Classic Invert vs. Negative Viewer",
        table: {
          headers: ["Task", "Classic Invert (iOS)", "Negative Viewer"],
          rows: [
            ["Remove the orange cast", "No, color negatives look blue", "Yes, automatically from a clear film edge"],
            ["Black-and-white negatives", "Yes", "Yes, in B&W negative mode"],
            ["Slides", "Inverts them too, so they look negative", "Positive (slide) mode shows them as they are"],
            ["Keep a positive", "No, photos stay negative", "Capture, then save as PNG or share"],
            ["Brightness and contrast", "No", "Yes, plus zoom and frame guides"],
            ["Setup", "Built into iOS", "Opens in Safari, nothing to install"],
          ],
        },
      },
      {
        title: "Capture a better still",
        list: [
          "Use the rear camera, not the selfie camera.",
          "Keep the iPhone parallel to the film to avoid keystone distortion.",
          "Lock focus and exposure if your camera app allows it.",
          "Save the original capture before editing so you can redo color later.",
        ],
      },
      {
        title: "Browser preview vs. edited still",
        table: {
          headers: ["Workflow", "Best for", "Limit"],
          rows: [
            ["Browser live preview + Capture", "Sorting, instant viewing, quick saves", "Less control than a dedicated scan"],
            ["iPhone photo + inversion", "Sharing and light editing", "Needs manual color correction"],
            ["Camera scan", "Archival frames", "Requires extra gear"],
          ],
        },
      },
    ],
    faqs: [
      {
        q: "Does iPhone need an app to invert negatives?",
        a: "No. Negative Viewer inverts the live camera feed in Safari and removes the orange cast automatically. An editor or Negative Converter only matters when you want larger still files and finer color control.",
      },
      {
        q: "Can I use the iPhone's Invert Colors setting to view negatives?",
        a: "Yes, for a quick look: turn on Classic Invert in Settings → Accessibility → Display & Text Size and point the Camera app at the negative. Color negatives will look blue because the orange base is inverted too, and you can't save the positive. Smart Invert won't work because it skips photos and video.",
      },
      {
        q: "Why do iPhone negative photos look blue after inversion?",
        a: "Color negatives have an orange base, and a plain inversion turns it blue or cyan. Negative Viewer's live preview removes that cast automatically from a clear film edge. For a photo you invert in an editor, neutralize white balance and tint after inverting, or open it in Negative Converter.",
      },
      {
        q: "Is the camera feed uploaded?",
        a: "No. Negative Viewer processes every frame locally in the browser, and captures are created on your iPhone.",
      },
    ],
    sources: [
      {
        title: "Library of Congress: Care, Handling and Storage of Photographs",
        url: "https://www.loc.gov/preservation/care/photo.html",
      },
      {
        title: "Kodak Alaris: Storage and Care of KODAK Photographic Materials",
        url: "https://imaging.kodakalaris.com/sites/default/files/wysiwyg/pro/CIS_E30.pdf",
      },
      {
        title: "Apple Support: Use display and text size preferences on your iPhone",
        url: "https://support.apple.com/111773",
      },
    ],
  },
  "/guides/view-negatives-android": {
    title: "How to View Film Negatives on Android",
    description:
      "View film negatives as positives on an Android phone: live preview in Chrome with automatic orange-mask removal, Android's built-in color inversion, and tips for sharper captures.",
    readTime: "PT6M",
    displayReadTime: "6-minute read",
    keywords: [
      "view negatives on Android",
      "Android negative viewer",
      "invert negatives Android",
      "Android color inversion negatives",
      "convert negative to positive Android",
    ],
    about: ["Android film scanning", "negative inversion", "film negatives"],
    lede:
      "The fastest way to view film negatives on Android is to open Negative Viewer in Chrome, hold the negative against a white backlight, and allow camera access: the page shows a live positive and removes the orange cast of color negatives automatically. Android's built-in color inversion also flips the camera view, but color negatives then look blue and you can't save the positive.",
    converterCta: {
      eyebrow: "Android negative files",
      title: "Convert negatives you already photographed",
      text: "Use Negative Converter when you have photos or scans of negatives on your phone and want orange-mask removal and a clean positive export.",
      linkText: "Open Negative Converter",
    },
    sections: [
      {
        title: "Use live preview in Chrome",
        paragraphs: [
          "Open Negative Viewer in Chrome, Samsung Internet, Edge or Firefox on the phone you will point at the film, and use another phone, tablet or laptop showing a blank white screen as the backlight. Press Start camera and allow access; the page asks for the rear camera.",
          "For color negatives, keep a little clear film edge in the frame: the viewer finds the orange base and removes the cast automatically. For black-and-white negatives or slides, open Adjust and set Film to B&W negative or Positive (slide).",
          "Press Capture to keep a frame, then save it as a PNG or share it. Where the browser supports it, as Chrome on Android does, Capture takes a full-resolution still from the camera instead of the video frame.",
        ],
      },
      {
        title: "Use Android's built-in color inversion",
        paragraphs: [
          "Android can invert the whole screen, including the Camera app's viewfinder. On Pixel and most phones with stock Android, go to Settings → Accessibility → Color and motion → Color inversion. On Samsung Galaxy phones it is Settings → Accessibility → Vision enhancements → Color inversion (Visibility enhancements on some versions). Menu names vary a little by brand and Android version; on other phones, such as Xiaomi, OPPO or vivo, search Settings for “color inversion”.",
          "To switch it on and off quickly, add the Color inversion tile to Quick Settings (open Quick Settings, tap Edit and add the tile), or turn on its accessibility shortcut.",
          "Like iPhone's Classic Invert, it only changes the display. Color negatives show a strong blue-cyan cast because the orange base is inverted too, photos you take are still negatives, and screenshots usually save without the inversion.",
        ],
      },
      {
        title: "Color inversion vs. Negative Viewer",
        table: {
          headers: ["Task", "Android color inversion", "Negative Viewer"],
          rows: [
            ["Remove the orange cast", "No, color negatives look blue", "Yes, automatically from a clear film edge"],
            ["Black-and-white negatives", "Yes", "Yes, in B&W negative mode"],
            ["Slides", "Inverts them too, so they look negative", "Positive (slide) mode shows them as they are"],
            ["Keep a positive", "No, photos stay negative", "Capture, then save as PNG or share"],
            ["Brightness and contrast", "No", "Yes, plus zoom and frame guides"],
            ["Setup", "Built into Android", "Opens in Chrome, nothing to install"],
          ],
        },
      },
      {
        title: "Sharper results on Android",
        list: [
          "Rest the phone on a stack of books or a small stand, parallel to the film.",
          "If the image stays soft up close, move the phone back until it sharpens and use the viewer's zoom to fill the frame.",
          "Turn the backlight screen to full brightness and keep room light off the film to avoid reflections.",
          "If the camera won't start, open the link in Chrome instead of an in-app browser and check that the site is allowed to use the camera (tap the icon left of the address, then Permissions).",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there a negative viewer app for Android?",
        a: "You don't need one. Negative Viewer runs in Chrome, removes the orange cast automatically and can be added to the home screen like an app. Play Store apps work too, but this needs no install or account.",
      },
      {
        q: "Can I use Android's color inversion to view negatives?",
        a: "Yes, for a quick look: turn on Color inversion (Settings → Accessibility → Color and motion on Pixel, or Vision enhancements on Samsung) and point the Camera app at the negative. Color negatives will look blue because the orange base is inverted too, and you can't save the positive.",
      },
      {
        q: "Why is the preview blurry when I hold the phone close?",
        a: "Every phone camera has a minimum focus distance. Move the phone back until the image sharpens, then use the viewer's zoom to fill the frame with one negative.",
      },
      {
        q: "Is the camera feed uploaded?",
        a: "No. Negative Viewer processes every frame locally in the browser, and captures are created on your phone.",
      },
    ],
    sources: [
      {
        title: "Android Accessibility Help: Turn on dark theme & color inversion",
        url: "https://support.google.com/accessibility/android/answer/6151800",
      },
      {
        title: "Samsung: What to do when your Galaxy phone screen shows inverted colours",
        url: "https://www.samsung.com/uk/support/mobile-devices/what-to-do-when-your-samsung-galaxy-phone-screen-appears-in-greyscale-or-shows-inverted-colours/",
      },
      {
        title: "Library of Congress: Care, Handling and Storage of Photographs",
        url: "https://www.loc.gov/preservation/care/photo.html",
      },
    ],
  },
  "/guides/orange-mask-removal": {
    title: "Orange Mask Removal for Color Film Negatives",
    description:
      "Why color negatives have an orange mask, why inverted scans look blue, and how to correct the cast after conversion.",
    readTime: "PT6M",
    displayReadTime: "6-minute read",
    keywords: [
      "orange mask removal",
      "color negative orange mask",
      "negative blue cast",
      "invert color negatives",
    ],
    about: ["orange mask", "color negative film", "film scanning"],
    lede:
      "Color negatives have an orange mask because the dye layers are not perfectly pure. When you invert the film digitally, the orange base becomes a blue or cyan cast. The practical fix is to sample the film base or correct white balance after inversion.",
    converterCta: {
      eyebrow: "Dedicated orange-mask removal",
      title: "Use Negative Converter for saved color negatives",
      text: "Negative Converter is built for photographed or scanned negative files, with orange-mask correction and positive export in the browser.",
      linkText: "Open Negative Converter",
    },
    sections: [
      {
        title: "What the orange mask does",
        paragraphs: [
          "The orange base is part of the color negative system, not damage. It helps the printing process compensate for unwanted dye absorption. Black-and-white negatives and slide film usually do not have the same orange base.",
          "A simple RGB inversion turns the scene positive, but it also turns the orange base into its opposite color. That is why a technically correct first preview can still look too blue.",
        ],
      },
      {
        title: "Correction options",
        table: {
          headers: ["Method", "Use when", "Result"],
          rows: [
            ["Sample film base", "A clear orange film edge is in frame", "Automatic in Negative Viewer's live preview"],
            ["White balance after saving", "You have a still image", "Better control"],
            ["Dedicated negative software", "You process many rolls", "Most repeatable"],
          ],
        },
      },
      {
        title: "Practical correction order",
        list: [
          "Invert the negative first.",
          "Neutralize the blue or cyan cast from the film base.",
          "Adjust exposure and contrast.",
          "Fine-tune skin tones or known neutral objects.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the orange mask a flaw in the film?",
        a: "No. It is a normal part of color negative film and helps print color more accurately. It only becomes a problem when you invert the negative digitally without correcting for it.",
      },
      {
        q: "Can a browser viewer remove the orange mask?",
        a: "Yes. When the camera starts, Negative Viewer finds a clear film edge, estimates the film base and divides it out in linear light before inverting, so the live preview comes out without the blue cast. Important images still benefit from final color work in an editor or Negative Converter.",
      },
      {
        q: "Do black-and-white negatives need orange mask correction?",
        a: "No. Traditional black-and-white negatives do not have the orange color mask, so a direct inversion usually produces a neutral result.",
      },
    ],
    sources: [
      {
        title: "Kodak Professional Portra 400 Technical Data",
        url: "https://imaging.kodakalaris.com/sites/default/files/files/resources/e4050_portra_400.pdf",
      },
      {
        title: "Kodak Professional Ektar 100 Film",
        url: "https://www.kodak.com/en/still-film/product/professional/ektar-100-film/",
      },
    ],
  },
  "/guides/best-free-negative-viewer": {
    title: "Best Free Negative Viewer: What to Look For",
    description:
      "How to choose a free online negative viewer for privacy, speed, browser support, supported formats, and saved previews.",
    readTime: "PT5M",
    displayReadTime: "5-minute read",
    keywords: [
      "best free negative viewer",
      "online negative viewer",
      "free film negative viewer",
      "negative to positive online",
    ],
    about: ["negative viewer", "online film tools", "film negatives"],
    lede:
      "The best free negative viewer should invert the camera feed locally, work without signup, support common film sizes, and explain its privacy model clearly. For quick film sorting, speed and local processing matter more than advanced color grading.",
    converterCta: {
      eyebrow: "Need more than preview?",
      title: "Use a converter when you are ready to finish the image",
      text: "Negative Viewer is for fast live preview. Negative Converter is the next step for saved files, orange-mask correction, and export-ready positives.",
      linkText: "Open Negative Converter",
    },
    sections: [
      {
        title: "Decision checklist",
        list: [
          "Runs in the browser without an account.",
          "Processes the camera feed locally instead of uploading it.",
          "Works on phone and desktop browsers.",
          "Supports 35mm, 120, sheet film, APS, and 110 as long as they are backlit.",
          "Captures frames you can save as PNG or share.",
        ],
      },
      {
        title: "Feature comparison",
        table: {
          headers: ["Feature", "Why it matters"],
          rows: [
            ["Local processing", "Private family or archive images stay on the device"],
            ["Live camera preview", "You can scan across a strip before saving"],
            ["No install", "Works on borrowed or shared devices"],
            ["Automatic film-base correction", "Removes the blue cast from color negatives without manual tweaking"],
          ],
        },
      },
      {
        title: "When free is enough",
        paragraphs: [
          "A free viewer is enough when the job is triage: finding subjects, checking exposure, picking frames to scan properly, or sharing a quick reference. For final prints, you still want a full scan or camera copy workflow.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a free negative viewer the same as a scanner?",
        a: "No. A viewer is optimized for fast preview and selection. A scanner or camera-copy workflow captures more detail for printing and archiving.",
      },
      {
        q: "What film formats should a viewer support?",
        a: "Any transparent negative can be previewed if it is evenly backlit. That includes 35mm, 120, 4x5 sheet film, APS, 110, and many older formats.",
      },
      {
        q: "What privacy signal matters most?",
        a: "Look for a clear statement that camera frames are processed locally and not uploaded. Browser-based Canvas processing is a practical way to do that.",
      },
    ],
    sources: [
      {
        title: "Library of Congress: Care, Handling and Storage of Photographs",
        url: "https://www.loc.gov/preservation/care/photo.html",
      },
      {
        title: "FADGI Technical Guidelines for Digitizing Cultural Heritage Materials",
        url: "https://www.digitizationguidelines.gov/guidelines/digitize-technical.html",
      },
    ],
  },
};

export function getClusterGuide(path) {
  return clusterGuides[path];
}
