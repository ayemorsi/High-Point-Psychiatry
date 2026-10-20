import type { MetadataRoute } from "next"

import { getArticles } from "@/lib/articles"
import { getLegalSlugs } from "@/lib/legal"
import { getProducts } from "@/lib/products"
import { site } from "@/lib/site"
import { steps } from "@/lib/steps"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, articles, legal] = await Promise.all([
    getProducts(),
    getArticles(),
    getLegalSlugs(),
  ])

  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/shop`, priority: 0.9 },
    ...steps.map((step) => ({
      url: `${site.url}/shop/${step.id}`,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${site.url}/products/${product.slug}`,
      priority: 0.7,
    })),
    { url: `${site.url}/routine`, priority: 0.7 },
    { url: `${site.url}/about`, priority: 0.6 },
    { url: `${site.url}/journal`, priority: 0.5 },
    ...articles.map((article) => ({
      url: `${site.url}/journal/${article.slug}`,
      priority: 0.4,
    })),
    { url: `${site.url}/help`, priority: 0.4 },
    ...legal.map((slug) => ({
      url: `${site.url}/legal/${slug}`,
      priority: 0.2,
    })),
  ]
}
