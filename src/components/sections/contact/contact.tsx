import Image from "next/image"

import ParallaxPhoto from "@/components/elements/parallax-photo"
import Reveal from "@/components/elements/reveal"
import ContactForm from "@/components/sections/contact/contact-form"
import { photos } from "@/lib/images"
import { site } from "@/lib/site"
import { externalLink } from "@/lib/utils"

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
          Ask a question or request an appointment, or call us during office
          hours.
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

        <dl className="mt-10 grid gap-x-6 gap-y-5 border-t pt-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Phone</dt>
            <dd className="mt-0.5 font-medium">
              <a
                href={site.phone.href}
                className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
              >
                {site.phone.display}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Fax</dt>
            <dd className="mt-0.5 font-medium">{site.fax.display}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="mt-0.5 font-medium">
              <a
                href={site.email.href}
                className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
              >
                {site.email.display}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Office</dt>
            <dd className="mt-0.5 font-medium">
              <a
                href={site.address.mapHref}
                {...externalLink(`${site.name} on Google Maps`)}
                className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
              >
                {site.address.street}, {site.address.city}, {site.address.state}{" "}
                {site.address.zip}
              </a>
            </dd>
          </div>
        </dl>
      </Reveal>
    </section>
  )
}
