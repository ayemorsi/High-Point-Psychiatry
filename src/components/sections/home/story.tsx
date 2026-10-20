"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, type MotionStyle, useScroll, useTransform } from "motion/react"

import Reveal from "@/components/elements/reveal"
import { Button } from "@/components/ui/button"
import { brandImages } from "@/lib/images"
import { site } from "@/lib/site"
import { spell } from "@/lib/utils"

// Text holds still while the frames drift at different depths; each photo counter-moves inside its frame.
export default function Story() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const parallax = useTransform(scrollYProgress, [0, 1], [1, -1])

  return (
    <motion.section
      ref={ref}
      style={{ "--parallax": parallax } as MotionStyle}
      className="section-padding container grid gap-10 md:grid-cols-[7fr_5fr] lg:gap-16"
    >
      <div>
        <Reveal className="text-end">
          <p className="eyebrow">Our founder</p>
          <h2 className="mt-4 text-4xl lg:ms-auto lg:max-w-xl lg:text-5xl">
            {site.founder.firstName} made this for her own clients.
          </h2>
        </Reveal>

        <div className="relative mt-10 w-5/6 md:mt-12 md:w-4/5 lg:mt-16">
          <Reveal className="media parallax aspect-square [--depth:1.5rem] md:aspect-4/5 lg:aspect-square lg:[--depth:2.5rem]">
            <Image
              src={brandImages.lifeSilver.src}
              alt={brandImages.lifeSilver.alt}
              fill
              sizes="(min-width: 768px) 45vw, 85vw"
              className="parallax scale-115 object-cover object-[50%_30%] [--depth:-1.5rem] lg:[--depth:-3rem]"
            />
            <p className="photo-tag start-3 bottom-3">
              {site.founder.name}, founder
            </p>
          </Reveal>

          <div className="parallax absolute -end-12 top-1/3 [--depth:3rem] md:-end-14 lg:-end-16 lg:[--depth:7rem]">
            <p className="relative flex size-24 flex-col items-center justify-center rounded-full bg-primary text-center text-primary-foreground ring-8 ring-background md:size-28 lg:size-32">
              <span
                aria-hidden="true"
                className="absolute inset-2 rounded-full border border-primary-foreground/15"
              />
              <span className="display-type text-4xl leading-none md:text-5xl">
                12
              </span>
              <span className="mt-1 max-w-16 text-[0.6875rem] leading-tight md:max-w-20 md:text-xs">
                years as an esthetician
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <Reveal
          delay={0.06}
          className="media parallax aspect-5/4 w-5/6 self-end [--depth:2.5rem] md:w-full md:[--depth:4rem] lg:[--depth:6rem]"
        >
          <Image
            src={brandImages.textureSerum.src}
            alt={brandImages.textureSerum.alt}
            fill
            sizes="(min-width: 768px) 40vw, 85vw"
            className="parallax scale-115 object-cover [--depth:-1.5rem] lg:[--depth:-2.5rem]"
          />
        </Reveal>

        <Reveal
          delay={0.12}
          className="pt-10 md:-ms-8 md:pt-12 lg:-ms-16 lg:pt-24"
        >
          <p className="max-w-xl text-lg text-muted-foreground lg:text-xl">
            {site.founder.name} spent {spell(site.founder.years)} years as an
            esthetician watching clients buy a shelf of products and use three.
            In {site.founded} she started making the routine she kept writing on
            the back of appointment cards.
          </p>
          <div className="mt-8">
            <Button asChild variant="secondary">
              <Link href="/about">Read our story</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </motion.section>
  )
}
