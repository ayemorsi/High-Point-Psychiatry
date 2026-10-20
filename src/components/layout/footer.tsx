import Link from "next/link"

import { Logo } from "@/components/icons/logo"
import { appointmentHref } from "@/components/layout/navbar"
import { site } from "@/lib/site"
import { externalLink } from "@/lib/utils"

const columns = [
  {
    title: "Care",
    links: [
      { label: "Services", href: "/services" },
      { label: "What we treat", href: "/#conditions" },
      { label: "How it works", href: "/#process" },
    ],
  },
  {
    title: "Patients",
    links: [
      { label: "Request an appointment", href: appointmentHref },
      { label: "Intake form", href: "/intake" },
      { label: "Questions", href: "/contact#faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Practice",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="dark bg-background text-foreground">
      <div className="container border-t py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <Link href="/" aria-label={`${site.name} home`}>
              <Logo size="lg" />
            </Link>
            <p className="display-type mt-5 max-w-sm text-2xl leading-snug text-muted-foreground">
              {site.tagline}.
            </p>
            <address className="mt-6 space-y-1.5 text-sm text-muted-foreground not-italic">
              <a
                href={site.address.mapHref}
                {...externalLink(`${site.name} on Google Maps`)}
                className="block transition-colors duration-200 hover:text-foreground"
              >
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </a>
              <p className="pt-2">
                Phone{" "}
                <a
                  href={site.phone.href}
                  className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground"
                >
                  {site.phone.display}
                </a>
              </p>
              <p>Fax {site.fax.display}</p>
              <p>
                <a
                  href={site.email.href}
                  className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground"
                >
                  {site.email.display}
                </a>
              </p>
            </address>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="sans-heading text-sm">{column.title}</h2>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition-colors duration-200 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t pt-6 text-xs text-muted-foreground md:mt-20 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p className="max-w-xl md:text-end">
            In a crisis, call or text{" "}
            <a
              href={site.crisis.href}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {site.crisis.line}
            </a>{" "}
            or call 911. This website is not monitored for emergencies.
          </p>
        </div>
      </div>
    </footer>
  )
}
