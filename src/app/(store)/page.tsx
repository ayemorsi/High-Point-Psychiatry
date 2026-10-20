import type { Metadata } from "next"

import Bestsellers from "@/components/sections/home/bestsellers"
import Builder from "@/components/sections/home/builder"
import Categories from "@/components/sections/home/categories"
import Compare from "@/components/sections/home/compare"
import ConcernPicker from "@/components/sections/home/concern-picker"
import Featured from "@/components/sections/home/featured"
import Film from "@/components/sections/home/film"
import Hero from "@/components/sections/home/hero"
import Journal from "@/components/sections/home/journal"
import Reviews from "@/components/sections/home/reviews"
import Services from "@/components/sections/home/services"
import Story from "@/components/sections/home/story"
import Newsletter from "@/components/sections/shared/newsletter"
import { featured } from "@/lib/featured"
import { pageMetadata } from "@/lib/metadata"
import { getProducts } from "@/lib/products"
import { getStepCards } from "@/lib/step-cards"

export const metadata: Metadata = pageMetadata({ path: "/" })

export default async function Home() {
  const [products, cards] = await Promise.all([getProducts(), getStepCards()])
  const spotlight = products.find((product) => product.slug === featured.slug)

  return (
    <>
      <Hero cards={cards} />
      <Bestsellers products={products} />
      <Categories cards={cards} products={products} />
      <Compare products={products} />
      {spotlight && <Featured product={spotlight} />}
      <Film />
      <ConcernPicker products={products} />
      <Services />
      <Builder products={products} />
      <Reviews products={products} />
      <Story />
      <Journal />
      <Newsletter />
    </>
  )
}
