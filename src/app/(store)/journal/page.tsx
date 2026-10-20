import type { Metadata } from "next"

import ArticleList from "@/components/sections/journal/article-list"
import Newsletter from "@/components/sections/shared/newsletter"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "The journal",
  description:
    "Ingredients, order of use, and what a claim on a bottle is allowed to mean.",
  path: "/journal",
})

export default function JournalPage() {
  return (
    <>
      <ArticleList />
      <Newsletter />
    </>
  )
}
