import Image from "next/image"

import ParallaxPhoto from "@/components/elements/parallax-photo"
import Reveal from "@/components/elements/reveal"
import ContactForm from "@/components/sections/help/contact-form"
import { brandImages } from "@/lib/images"
import { site } from "@/lib/site"

export default function HelpContact() {
  return (
    <section
      id="contact"
      className="section-padding container grid gap-10 md:gap-12 lg:grid-cols-2 lg:gap-20"
    >
      <Reveal className="media aspect-4/5 max-lg:hidden">
        <ParallaxPhoto className="absolute inset-0">
          <Image
            src={brandImages.portraitSilver.src}
            alt={brandImages.portraitSilver.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </ParallaxPhoto>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="text-4xl md:text-5xl">Write to us</h2>
        <p className="mt-3 max-w-md text-muted-foreground md:text-lg">
          An esthetician reads every message and replies within a day.
        </p>

        <ContactForm className="mt-8 md:mt-10" />

        <p className="mt-8 text-sm text-muted-foreground">
          Or email{" "}
          <a
            href={site.email.href}
            className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
          >
            {site.email.display}
          </a>
          .
        </p>
      </Reveal>
    </section>
  )
}
