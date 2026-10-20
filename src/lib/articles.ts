import { cache } from "react"

import { listMdx, readFrontmatter, readMdx } from "@/lib/mdx"
import type { Article, ArticleFrontmatter } from "@/lib/types"

// Newest first. The home page takes the first three, the journal index takes the lot.
export const getArticles = cache(async (): Promise<Article[]> => {
  const slugs = await listMdx("journal")
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const source = await readMdx("journal", slug)
      if (!source) return []
      const frontmatter = await readFrontmatter<ArticleFrontmatter>(source)
      return [{ ...frontmatter, slug }]
    })
  )
  return articles.flat().sort((a, b) => b.date.localeCompare(a.date))
})

export async function getArticle(slug: string) {
  return (await getArticles()).find((article) => article.slug === slug)
}
