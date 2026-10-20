import Image from "next/image"
import Link from "next/link"

import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { getProducts } from "@/lib/products"
import { reviews } from "@/lib/reviews"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const shots = reviews.slice(0, 6)

export default async function AboutGallery() {
  const products = await getProducts()

  return (
    <section className="section-padding container">
      <Reveal>
        <SectionHeading
          title="Customers, unretouched"
          lede={`Photos tagged ${site.social.handle}. We ask before we post one.`}
          action={{ label: "Follow on Instagram", href: site.social.instagram }}
        />
      </Reveal>

      <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 md:mt-14 md:grid-cols-3 xl:grid-cols-6">
        {shots.map((shot, index) => {
          const product = products.find(
            (item) => item.slug === shot.productSlug
          )
          return (
            <li key={shot.id} className={cn(index % 2 === 1 && "xl:mt-12")}>
              <Reveal delay={(index % 6) * 0.05}>
                <div className="group media aspect-4/5">
                  <Image
                    src={shot.image.src}
                    alt={shot.image.alt}
                    fill
                    sizes="(min-width: 1280px) 16vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-soft group-hover:scale-103"
                  />
                </div>
                <blockquote className="display-type mt-4 text-xl leading-snug text-balance">
                  &ldquo;{shot.title}&rdquo;
                </blockquote>
                <p className="mt-2 text-xs text-muted-foreground">
                  {shot.name.split(" ")[0]}, {shot.age}
                  {product && (
                    <>
                      {" · "}
                      <Link
                        href={`/products/${product.slug}`}
                        className="underline-offset-4 hover:text-foreground hover:underline"
                      >
                        {product.name}
                      </Link>
                    </>
                  )}
                </p>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
