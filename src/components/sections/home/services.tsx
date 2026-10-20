"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { services as allServices } from "@/lib/services"
import { cn } from "@/lib/utils"

const featured = [
  "psychiatric-evaluation",
  "medication-management",
  "telepsychiatry",
  "second-opinion",
]

const services = featured.flatMap((slug) =>
  allServices.filter((service) => service.slug === slug)
)

function usePrevious<T>(value: T) {
  const [previous, setPrevious] = useState<T | undefined>(undefined)
  const current = useRef(value)

  useEffect(() => {
    setPrevious(current.current)
    current.current = value
  }, [value])

  return previous
}

// Adapted from shadcnblocks Services 21: hovering or tapping a name wipes in its photo; only the arrow opens the service.
export default function Services() {
  const [active, setActive] = useState(0)
  const previous = usePrevious(active)
  const reduceMotion = useReducedMotion()
  const current = services[active]

  return (
    <section id="services" className="section-padding container scroll-mt-24">
      <Reveal>
        <SectionHeading
          title="How we can help"
          lede="Psychiatric care built around you, from the first conversation onward."
          action={{ label: "All services", href: "/services" }}
        />
      </Reveal>

      <div className="mt-10 flex flex-col gap-10 md:mt-14 lg:flex-row lg:gap-20">
        <Reveal className="h-fit w-full lg:sticky lg:top-28 lg:max-w-sm">
          <div className="media relative aspect-square sm:aspect-4/3 lg:aspect-4/5">
            {previous !== undefined && (
              <Image
                src={services[previous].image.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="object-cover"
              />
            )}
            <motion.div
              key={active}
              initial={
                reduceMotion ? false : { clipPath: "inset(0% 100% 0% 0%)" }
              }
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="absolute inset-0"
            >
              <Image
                src={current.image.src}
                alt={current.image.alt}
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
          <p className="mt-6 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {current.kind}
          </p>
          <p
            aria-live="polite"
            className="mt-2 text-muted-foreground md:text-lg"
          >
            {current.description}
          </p>
        </Reveal>

        <Reveal delay={0.06} className="w-full">
          <ul className="border-t">
            {services.map((service, index) => (
              <li
                key={service.slug}
                className="flex items-start justify-between gap-6 border-b py-6 md:py-8"
              >
                <button
                  type="button"
                  aria-pressed={index === active}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={cn(
                    "display-type text-start text-4xl leading-none outline-none md:text-6xl lg:text-7xl",
                    "transition-opacity duration-300 ease-soft focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-8",
                    index === active ? "opacity-100" : "opacity-30"
                  )}
                >
                  {service.name}
                  <sup className="figures ms-2 align-super text-sm text-muted-foreground md:text-lg">
                    0{index + 1}
                  </sup>
                </button>
                <Link
                  href={`/services#${service.slug}`}
                  aria-label={`More about ${service.name}`}
                  className="group mt-1 grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none md:size-14"
                >
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    className="size-5 transition-transform duration-300 ease-soft group-hover:rotate-45 md:size-6"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
