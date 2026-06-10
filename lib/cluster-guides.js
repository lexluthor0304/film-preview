export const clusterGuidePaths = [
  "/guides/scan-negatives-without-scanner",
  "/guides/invert-negatives-iphone",
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
            ["Batch medium format", "Flatbed scanner", "Convenient, not free"],
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
    readTime: "PT5M",
    displayReadTime: "5-minute read",
    keywords: [
      "invert negatives on iPhone",
      "iPhone negative viewer",
      "convert negative to positive iPhone",
      "film negative app",
    ],
    about: ["iPhone film scanning", "negative inversion", "film negatives"],
    lede:
      "The easiest way to invert film negatives on iPhone is to open a browser viewer, hold the negative against a white backlight, and allow camera access. For a better saved image, take a still photo first, then invert and correct the orange mask in an editor.",
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
          "Open Negative Viewer in Safari or Chrome on the iPhone you will point at the film. Use another phone, tablet, or laptop as the white backlight. Once the camera starts, the page shows a live positive preview.",
          "Live preview is useful because it lets you sort frames before deciding which ones deserve a higher-resolution capture.",
        ],
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
            ["Browser live preview", "Sorting and instant viewing", "Lower than still-photo resolution"],
            ["iPhone photo + inversion", "Sharing and light editing", "Needs manual color correction"],
            ["Camera scan", "Archival frames", "Requires extra gear"],
          ],
        },
      },
    ],
    faqs: [
      {
        q: "Does iPhone need an app to invert negatives?",
        a: "No. A browser viewer can invert the live camera feed for preview. A dedicated editor is only needed if you want higher-quality still files and finer color control.",
      },
      {
        q: "Why do iPhone negative photos look blue after inversion?",
        a: "Most color negatives have an orange base. After inversion, that orange becomes blue or cyan. Adjust white balance and tint after the inversion.",
      },
      {
        q: "Is the camera feed uploaded?",
        a: "Negative Viewer processes the live frame locally in the browser. The site does not need an upload endpoint for camera preview or PNG capture.",
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
            ["Sample film base", "You have blank orange border in frame", "Fastest preview correction"],
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
        a: "No. It is a normal part of color negative film and helps print color more accurately. It only becomes visually obvious when doing a direct digital inversion.",
      },
      {
        q: "Can a browser viewer remove the orange mask?",
        a: "A browser viewer can reduce the cast by sampling the film base and changing channel gains. Final color still benefits from a dedicated editor if the image matters.",
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
          "Lets you save a quick reference image.",
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
            ["Color base sampling", "Reduces the blue cast from color negatives"],
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
