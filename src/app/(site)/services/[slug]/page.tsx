import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  CalendarCheckIcon,
  ClipboardListIcon,
  MessagesSquareIcon,
  PhoneIcon,
} from "lucide-react"

import ParallaxPhoto from "@/components/elements/parallax-photo"
import { appointmentHref } from "@/components/layout/navbar"
import Cta from "@/components/sections/home/cta"
import Process from "@/components/sections/home/process"
import Faq7 from "@/components/shadcnblocks/faq7"
import Feature7 from "@/components/shadcnblocks/feature7"
import Feature76 from "@/components/shadcnblocks/feature76"
import Feature103 from "@/components/shadcnblocks/feature103"
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
import { pageMetadata } from "@/lib/metadata"
import { servicePages } from "@/lib/service-pages"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

export const dynamicParams = false

const helpIcons = [
  <MessagesSquareIcon key="talk" className="size-6 md:size-8" />,
  <ClipboardListIcon key="plan" className="size-6 md:size-8" />,
  <CalendarCheckIcon key="follow" className="size-6 md:size-8" />,
]

// A second photo for the checklist, so it never repeats the hero's.
const photoList = Object.values(photos)

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

async function load(params: Promise<{ slug: string }>) {
  const { slug } = await params
  const service = services.find((item) => item.slug === slug)
  const page = servicePages[slug]
  return service && page ? { service, page } : null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const found = await load(params)
  if (!found) return {}
  return pageMetadata({
    title: found.page.title,
    description: found.page.description,
    path: `/services/${found.service.slug}`,
  })
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const found = await load(params)
  if (!found) notFound()
  const { service, page } = found
  const secondaryPhoto =
    photoList.find(
      (photo, index) =>
        photo.src !== service.image.src &&
        index % photoList.length ===
          (services.indexOf(service) * 5 + 3) % photoList.length
    ) ?? photoList.find((photo) => photo.src !== service.image.src)!
  const related = page.related.flatMap((slug) =>
    services.filter((item) => item.slug === slug)
  )

  // FAQ and breadcrumb markup, built from this page's own copy.
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Home", path: "" },
        { name: "Services", path: "/services" },
        { name: service.name, path: `/services/${service.slug}` },
      ].map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${site.url}${crumb.path}`,
      })),
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        // Built from the site's own content, never user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="p-2 [--panel-inset:0.5] md:p-3 md:[--panel-inset:0.75]">
        <div className="relative grid overflow-hidden rounded-3xl bg-card lg:min-h-[max(calc(100svh-1.5rem),40rem)] lg:grid-cols-2">
          <ParallaxPhoto
            hero
            className="relative h-[48svh] min-h-72 lg:order-2 lg:h-auto"
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="animate-settle object-cover object-[50%_25%]"
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
                  <BreadcrumbLink asChild>
                    <Link href="/services">Services</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{service.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-10 lg:mt-auto">
              <p className="enter eyebrow">{service.kind}</p>
              <h1 className="enter mt-4 max-w-xl text-5xl leading-none delay-75 md:text-6xl">
                {page.headline}
              </h1>
              <p className="enter mt-5 max-w-md text-muted-foreground delay-150 md:text-lg">
                {page.intro}
              </p>
              <div className="enter mt-8 flex flex-wrap gap-3 delay-200">
                <Button asChild>
                  <Link href={appointmentHref}>Request an appointment</Link>
                </Button>
                <Button asChild variant="secondary">
                  <a href={site.phone.href}>
                    <PhoneIcon data-icon="inline-start" />
                    {site.phone.display}
                  </a>
                </Button>
              </div>
              <p className="enter mt-8 text-sm text-muted-foreground delay-300">
                {site.address.street}, {site.address.city}, {site.address.state}{" "}
                · In person and telehealth
              </p>
            </div>
          </div>

          <div aria-hidden="true" className="nav-notch animate-notch-open" />
        </div>
      </section>

      <Feature7
        heading={page.signsTitle}
        description="If any of this sounds familiar, you don't have to figure it out alone."
        image={secondaryPhoto}
        features={page.signs}
      />

      <div className="p-2 md:p-3">
        <div className="rounded-3xl bg-card [--background:var(--card)]">
          <Feature76
            heading="How we help"
            features={page.help.map((item, index) => ({
              ...item,
              description: item.body,
              icon: helpIcons[index % helpIcons.length],
            }))}
          />
        </div>
      </div>

      <Process />

      <Faq7
        heading="Common questions"
        subheading="We're here to help."
        body={
          <p>
            We accept Medicare, Medicaid, Tricare, VA CCN and many Michigan
            plans.{" "}
            <Link
              href="/about#insurance"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              See every plan
            </Link>{" "}
            or call{" "}
            <a
              href={site.phone.href}
              className="whitespace-nowrap text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              {site.phone.display}
            </a>
            .
          </p>
        }
        action={
          <Button asChild size="lg" variant="outline" className="w-fit">
            <Link href="/contact#faq">View all FAQs</Link>
          </Button>
        }
        faqs={page.faqs}
      />

      {related.length > 0 && (
        <Feature103
          badge="Related services"
          heading="You might also look at"
          items={related.map((item) => ({
            title: item.name,
            description: item.description,
            href: `/services/${item.slug}`,
          }))}
          className="pt-0 md:pt-0 lg:pt-0"
        />
      )}

      <Cta />
    </>
  )
}
