import type { Metadata } from "next"
import { connection } from "next/server"

import Catalog from "@/components/sections/shop/catalog"
import { pageMetadata } from "@/lib/metadata"
import { getProducts } from "@/lib/products"
import { site } from "@/lib/site"
import { stepCover } from "@/lib/step-cards"
import type { Product } from "@/lib/types"
import { spell } from "@/lib/utils"

export async function generateMetadata(): Promise<Metadata> {
  const products = await getProducts()

  return pageMetadata({
    title: "Shop all",
    description: `All ${site.name} products: ${count(products)}. Filter by step, concern or skin type.`,
    path: "/shop",
  })
}

// Rendered on demand so a filtered link like the navbar's Bestsellers arrives already filtered.
export default async function ShopPage() {
  await connection()
  const products = await getProducts()

  return (
    <Catalog
      title="Everything we make."
      lede={`${count(products)}. Filter by step, concern or skin type.`}
      image={stepCover("all")}
      products={products}
    />
  )
}

function count(products: Product[]) {
  const sets = products.filter((product) => product.step === "sets").length
  return `${products.length - sets} products in four steps, plus ${spell(sets)} sets`
}
