import { readMdx } from "@/lib/mdx"
import type { ArticleHeading } from "@/lib/types"

export function getArticleSource(slug: string) {
  return readMdx("journal", slug)
}

export function getHeadings(source: string): ArticleHeading[] {
  return Array.from(source.matchAll(/^## (.+)$/gm), ([, markdown]) => {
    const text = plainText(markdown)
    return { id: headingId(text), text }
  })
}

// The rendered <h2> builds its id from its text content, so the table of contents strips inline markdown to match.
function plainText(markdown: string) {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim()
}

export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function formatMonth(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}
