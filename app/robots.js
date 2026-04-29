import { siteConfig } from "@/lib/site-config";

export default function robots() {
  const aiAndSearchBots = [
    "Googlebot",
    "Googlebot-Image",
    "Bingbot",
    "DuckDuckBot",
    "Applebot",
    "Google-Extended",
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "Amazonbot",
    "MistralAI-User",
    "YouBot",
    "DiffBot",
    "Bytespider",
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    "FacebookBot",
    "cohere-ai",
  ];

  return {
    rules: [
      // Default: allow all (covers any well-behaved bot we didn't list).
      { userAgent: "*", allow: "/" },
      // Explicit allow lines for major search and AI assistants.
      ...aiAndSearchBots.map((userAgent) => ({ userAgent, allow: "/" })),
      // Block training-only crawlers that don't drive citations.
      { userAgent: "CCBot", disallow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
