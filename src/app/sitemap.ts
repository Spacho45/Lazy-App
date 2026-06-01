import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/methode", "/ecosysteme", "/outils", "/partenaires", "/contact", "/mentions-legales", "/confidentialite"].map((path) => ({ url: `https://www.lazyapp.fr${path}`, lastModified: new Date(), changeFrequency: path ? "monthly" : "weekly", priority: path ? 0.7 : 1 })); }
