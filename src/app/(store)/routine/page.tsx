import type { Metadata } from "next"

import RoutineFinder from "@/components/sections/routine/finder"
import { pageMetadata } from "@/lib/metadata"
import { getProducts } from "@/lib/products"

export const metadata: Metadata = pageMetadata({
  title: "Find my routine",
  description:
    "Answer three questions and get the routine an esthetician would pick for your skin.",
  path: "/routine",
})

export default async function RoutinePage() {
  return <RoutineFinder products={await getProducts()} />
}
