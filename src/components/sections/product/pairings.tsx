import ProductCard from "@/components/elements/product-card"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { getProducts } from "@/lib/products"
import { steps } from "@/lib/steps"
import type { Product, StepId } from "@/lib/types"

const LIMIT = 4

export default async function ProductPairings({
  product,
}: {
  product: Product
}) {
  const pairings = getPairings(product, await getProducts())

  return (
    <section className="section-padding container">
      <Reveal>
        <SectionHeading
          title="Pairs well with"
          action={{ label: "Shop all", href: "/shop" }}
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10 md:mt-14">
        <ul className="product-row">
          {pairings.map((item) => (
            <li key={item.slug}>
              <ProductCard product={item} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

// One product from each other step, then its set; a set pairs with the other sets, then bestsellers.
function getPairings(product: Product, products: Product[]) {
  const available = products.filter(
    (item) => item.slug !== product.slug && !item.soldOut
  )

  if (product.step === "sets") {
    return [
      ...available.filter((item) => item.step === "sets"),
      ...available.filter((item) => item.bestseller),
    ].slice(0, LIMIT)
  }

  const others = steps
    .filter((step) => step.number && step.id !== product.step)
    .map((step) => bestMatch(products, step.id, product))
    .filter((item) => item !== undefined)
  const set =
    available.find(
      (item) => item.step === "sets" && item.contains?.includes(product.slug)
    ) ?? available.find((item) => item.step === "sets")

  return [...others, ...(set ? [set] : [])].slice(0, LIMIT)
}

// The bestseller bonus keeps the core product ahead of add-ons, so SPF 40 beats the lip balm.
function bestMatch(products: Product[], step: StepId, product: Product) {
  const score = (item: Product) =>
    item.concerns.filter((concern) => product.concerns.includes(concern))
      .length + Number(Boolean(item.bestseller))

  return products
    .filter((item) => item.step === step && !item.soldOut)
    .sort((a, b) => score(b) - score(a) || b.reviews - a.reviews)[0]
}
