import ProductCard from "@/components/elements/product-card"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import type { Product } from "@/lib/types"

export default function Bestsellers({ products }: { products: Product[] }) {
  const bestsellers = products
    .filter((product) => product.bestseller)
    .slice(0, 4)

  return (
    <section className="section-padding container">
      <Reveal>
        <SectionHeading
          title="Our bestsellers"
          action={{ label: "Shop all", href: "/shop" }}
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10 md:mt-14">
        <ul className="product-row">
          {bestsellers.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} badge={false} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
