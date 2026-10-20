import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRightIcon, CheckIcon, PhoneIcon } from "lucide-react"

import ParallaxPhoto from "@/components/elements/parallax-photo"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { appointmentHref } from "@/components/layout/navbar"
import Cta from "@/components/sections/home/cta"
import Process from "@/components/sections/home/process"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { pageMetadata } from "@/lib/metadata"
import { servicePages } from "@/lib/service-pages"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

export const dynamicParams = false

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

      <section className="section-padding container grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 className="text-4xl md:text-5xl">{page.signsTitle}</h2>
          <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
            If any of this sounds familiar, you don&apos;t have to figure it out
            alone.
          </p>
        </Reveal>
        <Reveal delay={0.06} className="lg:col-span-7">
          <ul className="divide-y border-y">
            {page.signs.map((sign) => (
              <li key={sign} className="flex gap-3 py-4 md:text-lg">
                <CheckIcon
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-accent md:mt-1.5"
                />
                {sign}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="scroll-mt-24 p-2 md:p-3">
        <div className="section-padding rounded-3xl bg-card">
          <div className="container">
            <Reveal>
              <SectionHeading title="How we help" />
            </Reveal>
            <ul className="mt-10 grid gap-3 md:mt-14 md:grid-cols-3 md:gap-4">
              {page.help.map((item, index) => (
                <li key={item.title}>
                  <Reveal
                    delay={index * 0.06}
                    className="h-full rounded-2xl bg-background p-6 md:p-8"
                  >
                    <span className="figures text-sm text-muted-foreground">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 text-2xl md:text-3xl">{item.title}</h3>
                    <p className="mt-3 text-muted-foreground">{item.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Process />

      <section className="section-padding container grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl md:text-5xl">Common questions</h2>
            <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
              We accept Medicare, Medicaid, Tricare, VA CCN and many Michigan
              plans.{" "}
              <Link
                href="/about#insurance"
                className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
              >
                See every plan
              </Link>
              .
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06} className="lg:col-span-8">
          <Accordion type="multiple">
            {page.faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="max-w-xl">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="section-padding container pt-0 md:pt-0 lg:pt-0">
          <Reveal>
            <SectionHeading
              title="Related services"
              action={{ label: "All services", href: "/services" }}
            />
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3 md:mt-14 md:gap-4">
            {related.map((item, index) => (
              <li key={item.slug}>
                <Reveal delay={index * 0.06}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full items-center gap-4 rounded-2xl bg-card p-4 transition-colors duration-200 hover:bg-secondary md:p-5"
                  >
                    <span className="media relative size-16 shrink-0">
                      <Image
                        src={item.image.src}
                        alt=""
                        fill
                        sizes="4rem"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium text-muted-foreground">
                        {item.kind}
                      </span>
                      <span className="display-type mt-1 block text-xl">
                        {item.name}
                      </span>
                    </span>
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Cta />
    </>
  )
}
