import type { Metadata } from "next"
import Link from "next/link"
import { LockIcon } from "lucide-react"

import HushForm from "@/components/sections/intake/hush-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Intake form",
  description: `Complete your new patient intake form for ${site.name} securely online before your first visit.`,
  path: "/intake",
})

export default function IntakePage() {
  return (
    <>
      <section aria-labelledby="intake-title" className="p-2 md:p-3">
        <div className="arc-field hero-padding rounded-3xl bg-card">
          <div className="container flex flex-col items-center text-center">
            <Breadcrumb className="enter">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Intake form</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1
              id="intake-title"
              className="enter mt-8 text-5xl leading-none delay-75 md:mt-10 md:text-6xl lg:text-7xl"
            >
              Patient intake form
            </h1>
            <p className="enter mt-5 max-w-md text-muted-foreground delay-150 md:text-lg">
              Please complete this before your first visit. It helps us
              understand your needs so we can make the most of our time
              together.
            </p>
            <p className="enter mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground delay-200">
              <LockIcon aria-hidden="true" className="size-4" />
              Your answers are sent securely and kept confidential.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div className="mx-auto max-w-3xl">
          <HushForm formId="hppmi-intake-form" />
          <p className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
            Trouble with the form? Email{" "}
            <a
              href={site.email.href}
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              {site.email.display}
            </a>
            . If you are in crisis, call or text{" "}
            <a
              href={site.crisis.href}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {site.crisis.line}
            </a>{" "}
            or call 911.
          </p>
        </div>
      </section>
    </>
  )
}
