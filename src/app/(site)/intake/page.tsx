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
  description: `Start your new patient intake with ${site.name}: enter your email and we'll send a secure link to your intake form.`,
  path: "/intake",
})

const steps = [
  {
    title: "Enter your email",
    body: "Type your email address in the box below and submit it.",
  },
  {
    title: "Open the secure link",
    body: "We'll email you a private link to your intake form.",
  },
  {
    title: "Complete your intake",
    body: "Fill it out before your first visit. It goes straight to our team.",
  },
]

export default function IntakePage() {
  return (
    <>
      <section
        aria-labelledby="intake-title"
        className="p-2 [--panel-inset:0.5] md:p-3 md:[--panel-inset:0.75]"
      >
        <div className="arc-field hero-padding relative overflow-hidden rounded-3xl bg-card">
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
              Enter your email below and we&apos;ll send you a secure link to
              your intake form. Please complete it before your first visit.
            </p>
            <p className="enter mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground delay-200">
              <LockIcon aria-hidden="true" className="size-4" />
              The form opens in a secure, encrypted page. Your answers are kept
              confidential.
            </p>
          </div>
          <div aria-hidden="true" className="nav-notch animate-notch-open" />
        </div>
      </section>

      <section className="section-padding container">
        <div className="mx-auto max-w-3xl">
          <ol className="grid gap-6 border-b pb-10 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="figures text-sm text-muted-foreground">
                  0{index + 1}
                </span>
                <h2 className="mt-2 text-2xl">{step.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <HushForm formId="hppmi-intake-form" />
          <p className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
            No email after a few minutes? Check your spam folder, or email{" "}
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
