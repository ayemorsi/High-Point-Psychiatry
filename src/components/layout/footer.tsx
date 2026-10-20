import Image from "next/image"
import Link from "next/link"

import { Logo } from "@/components/icons/logo"
import {
  InstagramIcon,
  PinterestIcon,
  TiktokIcon,
} from "@/components/icons/social"
import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"
import { steps } from "@/lib/steps"
import { cn, externalLink } from "@/lib/utils"

const columns = [
  {
    title: "Shop",
    links: steps.map((step) => ({
      label: step.name,
      href: `/shop/${step.id}`,
    })),
  },
  {
    title: "Help",
    links: [
      { label: "Shipping", href: "/help#shipping" },
      { label: "Returns", href: "/help#returns" },
      { label: "Questions", href: "/help" },
      { label: "Contact", href: "/help#contact" },
    ],
  },
  {
    title: site.name,
    links: [
      { label: "Our story", href: "/about" },
      { label: "Find my routine", href: "/routine" },
      { label: "Journal", href: "/journal" },
    ],
  },
]

const socials = [
  { label: "Instagram", href: site.social.instagram, icon: InstagramIcon },
  { label: "TikTok", href: site.social.tiktok, icon: TiktokIcon },
  { label: "Pinterest", href: site.social.pinterest, icon: PinterestIcon },
]

// Hovering the row fans the stack out from its middle face, so nothing beside it moves.
const faces = [
  { name: "aaliyah", fan: "group-hover/community:-translate-x-2" },
  { name: "chen", fan: "group-hover/community:-translate-x-1" },
  { name: "marisol", fan: "" },
  { name: "helen", fan: "group-hover/community:translate-x-1" },
  { name: "priya", fan: "group-hover/community:translate-x-2" },
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
              Made in small batches in {site.city} since {site.founded}.
            </p>
            <Community />
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

        <div className="mt-14 flex flex-col gap-6 border-t pt-6 text-xs text-muted-foreground md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <span>
              © {new Date().getFullYear()} {site.legalName}
            </span>
            <Link
              href="/legal/privacy"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Terms
            </Link>
          </p>
          <ul aria-label="Ways to pay" className="flex flex-wrap gap-1.5">
            {site.commerce.payments.map((payment) => (
              <li key={payment} className="rounded-full border px-2.5 py-1">
                {payment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

function Community() {
  return (
    <div className="mt-10">
      <div className="group/community flex flex-wrap items-center gap-x-4 gap-y-3">
        <AvatarGroup>
          {faces.map((face) => (
            <Avatar
              key={face.name}
              size="lg"
              className={cn(
                "transition-transform duration-200 ease-out hover:z-10 hover:-translate-y-1 motion-reduce:transition-none",
                face.fan
              )}
            >
              {/* not AvatarImage: Radix hides the photo until it has loaded */}
              <Image
                src={`/images/reviewers/${face.name}.jpg`}
                alt=""
                width={40}
                height={40}
                className="size-full rounded-full object-cover"
              />
            </Avatar>
          ))}
        </AvatarGroup>
        <p className="text-sm text-muted-foreground">
          Join {site.social.followers} people on{" "}
          <a
            href={site.social.instagram}
            {...externalLink(`${site.name} on Instagram`)}
            className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 group-hover/community:decoration-foreground"
          >
            {site.social.handle}
          </a>
        </p>
      </div>
      <ul className="mt-3 flex gap-1.5">
        {socials.map((social) => (
          <li key={social.label}>
            <Button variant="outline" size="icon-sm" asChild>
              <a
                href={social.href}
                {...externalLink(`${site.name} on ${social.label}`)}
              >
                <social.icon />
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
