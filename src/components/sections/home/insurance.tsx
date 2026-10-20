"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { useReducedMotion } from "motion/react"

import Reveal from "@/components/elements/reveal"
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee"
import { Button } from "@/components/ui/button"
import { featuredInsurers } from "@/lib/insurance"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// Built on shadcnblocks marquee-fade-1: a looping strip of plans that fades out at both edges and pauses on hover.
export default function InsuranceStrip() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      aria-labelledby="insurance-strip-title"
      className="section-padding"
    >
      <Reveal className="container text-center">
        <p className="eyebrow">Insurance</p>
        <h2 id="insurance-strip-title" className="mt-4 text-3xl md:text-4xl">
          Insurance accepted
        </h2>
      </Reveal>

      <Reveal delay={0.06} className="mt-8 md:mt-10">
        <Marquee>
          <MarqueeContent speed={40} play={!reduceMotion}>
            {featuredInsurers.map((insurer) => (
              <MarqueeItem key={insurer.name} className="mx-6 md:mx-10">
                {insurer.logo ? (
                  <Image
                    src={insurer.logo}
                    alt={insurer.name}
                    width={200}
                    height={40}
                    unoptimized
                    className={cn(
                      "w-auto object-contain",
                      insurer.compact ? "h-6 md:h-7" : "h-9 md:h-11"
                    )}
                  />
                ) : (
                  <span className="text-xl font-semibold tracking-tight whitespace-nowrap text-foreground/80 md:text-2xl">
                    {insurer.name}
                  </span>
                )}
              </MarqueeItem>
            ))}
          </MarqueeContent>
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
        </Marquee>
      </Reveal>

      <Reveal className="container mt-8 flex flex-col items-center gap-3 text-center md:mt-10">
        <p className="text-sm text-muted-foreground">
          Don&apos;t see your plan? Call{" "}
          <a
            href={site.phone.href}
            className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
          >
            {site.phone.display}
          </a>{" "}
          and we&apos;ll confirm your coverage.
        </p>
        <Button asChild variant="link">
          <Link href="/about#insurance">
            See all plans we accept
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </Reveal>
    </section>
  )
}
