import { siteConfig } from "@/lib/site-config";

export default function sitemap() {
  const lastModified = new Date(siteConfig.lastUpdatedISO);
  const routes = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/how-to-use", changeFrequency: "monthly", priority: 0.9 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides/film-negatives", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides/digitize-35mm", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides/film-vs-digital", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
