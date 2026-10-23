import type { Metadata } from "next"
import { MapPinIcon, PhoneIcon } from "lucide-react"

import Contact from "@/components/sections/contact/contact"
import Questions from "@/components/sections/contact/questions"
import Feature220b from "@/components/shadcnblocks/feature220b"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"
import { externalLink } from "@/lib/utils"

const { address } = site

export const metadata: Metadata = pageMetadata({
  title: "Contact & Directions · Psychiatrist in Flint, MI",
  absoluteTitle: true,
  description: `Request an appointment with ${site.name} or ask a question. Answers about first visits, insurance, telehealth and privacy.`,
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <Questions />
      <Contact />
      <Feature220b
        id="visit"
        eyebrow="Visit us"
        heading="Finding our office"
        description={
          <p>
            We&apos;re in a single-story brick office on S Graham Rd in Flint,
            with parking right outside. Look for the High Point Psychiatry sign
            out front.
          </p>
        }
        video={{
          src: "/videos/aerial",
          poster: "/videos/aerial.jpg",
          label:
            "Aerial view of our office building and its parking lot on S Graham Road in Flint",
        }}
        stats={[
          {
            label: "Address",
            value: (
              <>
                {address.street}
                <br />
                {address.city}, {address.state} {address.zip}
              </>
            ),
          },
          {
            label: "Hours",
            value: site.hours.map((slot) => (
              <span key={slot.days} className="block">
                {slot.days} {slot.time}
              </span>
            )),
          },
          {
            label: "Phone",
            value: (
              <a
                href={site.phone.href}
                className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
              >
                {site.phone.display}
              </a>
            ),
          },
        ]}
        actions={
          <>
            <Button asChild>
              <a
                href={address.mapHref}
                {...externalLink(`Directions to ${site.name} on Google Maps`)}
              >
                <MapPinIcon data-icon="inline-start" />
                Get directions
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={site.phone.href}>
                <PhoneIcon data-icon="inline-start" />
                Call {site.phone.display}
              </a>
            </Button>
          </>
        }
        className="pt-0 md:pt-0 lg:pt-0"
      />
    </>
  )
}
