import type { MetadataRoute } from "next";

// ponytail: standard Next.js metadata route — allows all crawlers incl. AI bots
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://muhammadnabeel.com/sitemap.xml",
  };
}
