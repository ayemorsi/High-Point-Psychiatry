import { cache } from "react"

import { listMdx, readFrontmatter, readMdx } from "@/lib/mdx"
import { site } from "@/lib/site"
import type { LegalDoc, LegalFrontmatter } from "@/lib/types"
import { formatPrice } from "@/lib/utils"

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

// Values the legal MDX reads as {store.name}, {store.returnsDays} and so on, so the policies follow site.ts.
export const legalScope = {
  store: {
    name: site.name,
    legalName: site.legalName,
    origin: site.origin,
    domain: new URL(site.url).host,
    email: site.email,
    returnsDays: site.commerce.returnsDays,
    freeShipping: formatPrice(site.commerce.freeShippingThreshold),
    setDiscount: site.commerce.setDiscount,
    welcomeDiscount: site.commerce.welcomeDiscount,
    subscribeDiscount: site.commerce.subscribeDiscount,
  },
}
