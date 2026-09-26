import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://muhammadnabeel.com";
  return [
    { url: base, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/services`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/tax-filing`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/tax-calculator`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/tax-rates`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/gumroad`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/dark`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
