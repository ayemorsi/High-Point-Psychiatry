export type SiteImage = {
  src: string
  alt: string
}

export type LegalFrontmatter = {
  title: string
  description: string
  /** ISO date, e.g. 2026-09-29. */
  updated: string
}

export type LegalDoc = {
  slug: string
  source: string
  frontmatter: LegalFrontmatter
}
