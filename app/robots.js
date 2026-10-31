import { siteConfig } from "@/lib/site-config";

export default function robots() {
  const aiAndSearchBots = [
    "Googlebot",
    "Googlebot-Image",
    "Bingbot",
    "DuckDuckBot",
    "Applebot",
    "Applebot-Extended",
    "Google-Extended",
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "Amazonbot",
    "MistralAI-User",
    "YouBot",
    "DiffBot",
    "Bytespider",
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    "meta-webindexer",
    "FacebookBot",
    "cohere-ai",
    "CCBot",
  ];

  return {
    rules: [
      // Default: allow all (covers any well-behaved bot we didn't list).
      { userAgent: "*", allow: "/" },
      // Explicit allow lines for major search engines, AI assistants, and the
      // training crawlers (incl. Common Crawl) that shape what models know.
      ...aiAndSearchBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
