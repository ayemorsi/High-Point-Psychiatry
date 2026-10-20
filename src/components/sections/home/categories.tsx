import Image from "next/image"
import Link from "next/link"

import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import type { Product, StepCard } from "@/lib/types"
import { cn } from "@/lib/utils"

// Where each step sits in the desktop grid: the outer two run the full height, the middle two stack.
const placement = [
  "md:row-span-2",
  "md:col-start-2",
  "md:col-start-2 md:row-start-2",
  "md:col-start-3 md:row-span-2 md:row-start-1",
]

export default function Categories({
  cards,
  products,
}: {
  cards: StepCard[]
  products: Product[]
}) {
  return (
    <section className="section-padding container">
      <Reveal>
        <SectionHeading
          title="Shop by step"
          action={{ label: "Shop sets", href: "/shop/sets" }}
        />
      </Reveal>

      <Reveal delay={0.06} className="mt-10 md:mt-14">
        <ul className="grid grid-cols-2 gap-3 md:h-176 md:grid-cols-3 md:grid-rows-2 md:gap-4">
          {cards.map(({ step, href, scene }, index) => {
            const count = products.filter(
              (product) => product.step === step.id
            ).length

            return (
              <li
                key={step.id}
                className={cn("aspect-3/4 md:aspect-auto", placement[index])}
              >
                <Link
                  href={href}
                  className="group media block size-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <Image
                    src={scene.skin.src}
                    alt={scene.skin.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-soft group-hover:scale-103"
                  />
                  <span className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-3 rounded-xl bg-background py-2.5 ps-4 pe-2.5 md:inset-x-4 md:bottom-4 md:rounded-2xl md:py-4 md:ps-6 md:pe-4">
                    <span className="text-sm font-medium md:text-base">
                      {step.name}
                      <span className="sr-only">, {count} products</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="figures flex h-7 min-w-7 items-center justify-center rounded-full bg-foreground px-2 text-xs text-background md:h-8 md:min-w-10 md:text-sm"
                    >
                      {count}
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </section>
  )
}
