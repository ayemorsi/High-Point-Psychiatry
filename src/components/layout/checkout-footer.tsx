import Link from "next/link"

import { site } from "@/lib/site"

const links = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
]

export default function CheckoutFooter() {
  return (
    <footer className="border-t">
      <div className="container">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.email.href}
                className="transition-colors duration-200 hover:text-foreground"
              >
                {site.email.display}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
