import Image from "next/image"
import Link from "next/link"

import ParallaxPhoto from "@/components/elements/parallax-photo"
import { appointmentHref } from "@/components/layout/navbar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { photos } from "@/lib/images"
import { site } from "@/lib/site"
import { externalLink } from "@/lib/utils"

const { address } = site

const facts: { label: string; value: React.ReactNode }[] = [
  {
    label: "Location",
    value: (
      <a
        href={address.mapHref}
        {...externalLink(`${site.name} on Google Maps`)}
        className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
      >
        {address.street}
        <br />
        {address.city}, {address.state} {address.zip}
      </a>
    ),
  },
  { label: "Care", value: "Evaluation, medication and follow-up" },
  { label: "Visits", value: "In person and telehealth" },
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
]

// Text on shell beside a full-height photo, with a slot cut round the fixed nav pill.
export default function AboutHero() {
  return (
    <section className="p-2 [--panel-inset:0.5] md:p-3 md:[--panel-inset:0.75]">
      <div className="relative grid overflow-hidden rounded-3xl bg-card lg:min-h-[max(calc(100svh-1.5rem),44rem)] lg:grid-cols-2">
        <ParallaxPhoto
          hero
          className="relative h-[56svh] min-h-80 lg:order-2 lg:h-auto"
        >
          <Image
            src={photos.window.src}
            alt={photos.window.alt}
            fill
            preload
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="animate-settle object-cover object-[50%_10%] lg:object-center"
          />
        </ParallaxPhoto>

        <div className="flex flex-col px-4 py-8 md:px-6 md:py-10 lg:px-10 lg:pt-28">
          <Breadcrumb className="enter">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-10 lg:mt-auto">
            <h1 className="enter max-w-xl text-5xl leading-none delay-75 md:text-6xl lg:text-7xl">
              Psychiatric care with room to breathe.
            </h1>
            <p className="enter mt-5 max-w-md text-muted-foreground delay-150 md:text-lg">
              High Point Psychiatry is a psychiatric practice in Flint,
              Michigan, serving patients across Genesee County, built on careful
              listening, clear explanations and treatment plans made together
              with patients.
            </p>
            <div className="enter mt-8 delay-200">
              <Button asChild>
                <Link href={appointmentHref}>Request an appointment</Link>
              </Button>
            </div>
          </div>

          <dl className="enter mt-12 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6 text-sm delay-300 lg:mt-16">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-muted-foreground">{fact.label}</dt>
                <dd className="mt-0.5 font-medium break-words">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div aria-hidden="true" className="nav-notch animate-notch-open" />
      </div>
    </section>
  )
}
