import { cache } from "react"

import { listMdx, readFrontmatter, readMdx } from "@/lib/mdx"
import { site } from "@/lib/site"
import type { LegalDoc, LegalFrontmatter } from "@/lib/types"

export function getLegalSlugs() {
  return listMdx("legal")
}

export const getLegalDoc = cache(
  async (slug: string): Promise<LegalDoc | null> => {
    const source = await readMdx("legal", slug)
    if (!source) return null
    const frontmatter = await readFrontmatter<LegalFrontmatter>(source)
    return { slug, source, frontmatter }
  }
)

// Values the legal MDX reads as {store.name}, {store.crisis.line} and so on, so the policies follow site.ts.
export const legalScope = {
  store: {
    name: site.name,
    legalName: site.legalName,
    region: site.region,
    domain: new URL(site.url).host,
    email: site.email,
    crisis: site.crisis,
  },
}
