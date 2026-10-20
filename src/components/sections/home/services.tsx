import Image from "next/image"
import { ArrowRightIcon } from "lucide-react"

import Fact from "@/components/elements/fact"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { Button } from "@/components/ui/button"
import { brandImages, homeImages } from "@/lib/images"
import { site } from "@/lib/site"
import { formatPrice } from "@/lib/utils"

// What happens after you press Add.
export default function Services() {
  return (
    <section className="section-padding container">
      <Reveal>
        <SectionHeading title="What happens after you order" />
      </Reveal>

      <Reveal delay={0.06} className="mt-10 md:mt-14">
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:h-160 lg:grid-cols-12 lg:grid-rows-2">
          <li className="group media col-span-2 aspect-4/5 md:aspect-3/2 lg:col-span-5 lg:row-span-2 lg:aspect-auto">
            <Image
              src={brandImages.portraitFreckles.src}
              alt={brandImages.portraitFreckles.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition duration-700 ease-soft group-hover:scale-103"
            />
            <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-background/85 p-5 backdrop-blur-md md:inset-x-4 md:bottom-4 md:p-6">
              <h3 className="text-2xl md:text-3xl">
                An esthetician answers every email.
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                About your skin, an order or a refill.
              </p>
              <Button variant="secondary" asChild className="mt-5">
                <a href={site.email.href}>
                  Write to us
                  <ArrowRightIcon data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </li>

          <li className="media col-span-2 grid grid-cols-2 lg:col-span-7">
            <Fact
              label="Free shipping on orders over"
              figure={formatPrice(site.commerce.freeShippingThreshold)}
              line={`Sent within a day from ${site.city}.`}
            />
            <div className="group relative overflow-hidden">
              <Image
                src={brandImages.productTube.src}
                alt={brandImages.productTube.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="object-cover transition duration-700 ease-soft group-hover:scale-103"
              />
            </div>
          </li>

          <li className="dark flex rounded-2xl bg-background text-foreground lg:col-span-3">
            <Fact
              label="Free returns for"
              figure={`${site.commerce.returnsDays}`}
              unit="days"
              line="Changed your mind? Opened bottles come back too."
            />
          </li>

          <li className="group media flex lg:col-span-4">
            <div className="absolute inset-y-0 end-0 w-3/4 mask-l-from-50%">
              <Image
                src={homeImages.textureCleanse.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 40vw"
                className="object-cover transition duration-700 ease-soft group-hover:scale-103"
              />
            </div>
            <Fact
              label="Subscribe and save"
              figure={`${site.commerce.subscribeDiscount}%`}
              line="On every delivery. Skip or cancel any time."
              className="relative"
            />
          </li>
        </ul>
      </Reveal>
    </section>
  )
}
