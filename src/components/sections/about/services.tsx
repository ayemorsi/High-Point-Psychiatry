import Image from "next/image"
import { MailIcon, RepeatIcon, TruckIcon, Undo2Icon } from "lucide-react"

import ParallaxPhoto from "@/components/elements/parallax-photo"
import Reveal from "@/components/elements/reveal"
import { Button } from "@/components/ui/button"
import { aboutImages } from "@/lib/images"
import { site } from "@/lib/site"
import { formatPrice } from "@/lib/utils"

const services = [
  {
    icon: TruckIcon,
    title: `Free shipping over ${formatPrice(site.commerce.freeShippingThreshold)}`,
    body: `Sent within one business day from ${site.city}.`,
  },
  {
    icon: Undo2Icon,
    title: `${site.commerce.returnsDays}-day returns`,
    body: "Opened bottles come back too.",
  },
  {
    icon: RepeatIcon,
    title: `Subscribe and save ${site.commerce.subscribeDiscount}%`,
    body: "Skip or cancel from your account.",
  },
  {
    icon: MailIcon,
    title: "An esthetician on email",
    body: "About your skin, an order or a refill.",
  },
]

export default function AboutServices() {
  return (
    <section className="section-padding container grid gap-10 md:gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
      <Reveal className="media aspect-4/5">
        <ParallaxPhoto className="absolute inset-0">
          <Image
            src={aboutImages.ordering.src}
            alt={aboutImages.ordering.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </ParallaxPhoto>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="text-4xl md:text-5xl">Ordering from us</h2>

        <ul className="mt-8 divide-y border-y md:mt-10">
          {services.map((service) => (
            <li key={service.title} className="flex items-center gap-5 py-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-card">
                <service.icon
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              </span>
              <div>
                <h3 className="text-xl md:text-2xl">{service.title}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {service.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <Button variant="secondary" asChild className="mt-8">
          <a href={site.email.href}>Write to {site.email.display}</a>
        </Button>
      </Reveal>
    </section>
  )
}
