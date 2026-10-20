import type { MetadataRoute } from "next"

import { getLegalSlugs } from "@/lib/legal"
import { site } from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const legal = await getLegalSlugs()

  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/services`, priority: 0.9 },
    { url: `${site.url}/about`, priority: 0.8 },
    { url: `${site.url}/contact`, priority: 0.8 },
    { url: `${site.url}/intake`, priority: 0.7 },
    ...legal.map((slug) => ({
      url: `${site.url}/legal/${slug}`,
      priority: 0.2,
    })),
  ]
}
