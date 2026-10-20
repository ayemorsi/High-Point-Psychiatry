import Image from "next/image"

import ParallaxPhoto from "@/components/elements/parallax-photo"
import Reveal from "@/components/elements/reveal"
import ContactForm from "@/components/sections/contact/contact-form"
import { photos } from "@/lib/images"
import { site } from "@/lib/site"

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-padding container grid gap-10 md:gap-12 lg:grid-cols-2 lg:gap-20"
    >
      <Reveal className="media aspect-4/5 max-lg:hidden">
        <ParallaxPhoto className="absolute inset-0">
          <Image
            src={photos.livingRoom.src}
            alt={photos.livingRoom.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-[50%_20%]"
          />
        </ParallaxPhoto>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="text-4xl md:text-5xl">Write to us</h2>
        <p className="mt-3 max-w-md text-muted-foreground md:text-lg">
          Ask a question or request an appointment. We&apos;ll reply by email.
        </p>
        <p className="mt-6 max-w-md rounded-2xl bg-card p-4 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            This form is not for emergencies.
          </span>{" "}
          If you are in crisis, call or text{" "}
          <a
            href={site.crisis.href}
            className="font-medium text-foreground underline underline-offset-4"
          >
            {site.crisis.line}
          </a>{" "}
          or call 911.
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
