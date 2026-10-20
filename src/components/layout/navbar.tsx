import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Logo } from "@/components/icons/logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { site } from "@/lib/site"

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "What we treat", href: "/#conditions" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/contact#faq" },
]

export const appointmentHref = "/contact#contact"

export const intakeHref = "/intake"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex h-0 items-start justify-center px-(--nav-inset-length)">
      <nav
        aria-label="Main"
        className="dark mt-(--nav-top-length) flex h-(--nav-height-length) w-full max-w-(--nav-max-width-length) items-center justify-between gap-4 rounded-full bg-background ps-6 pe-2 text-foreground shadow-lg ring-1 ring-border"
      >
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="flex items-center"
          >
            <Logo size="sm" />
          </Link>
        </div>
        <ul className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-1 items-center justify-end gap-1">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="max-sm:hidden"
          >
            <Link href={intakeHref}>Become a patient</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Open menu"
                className="lg:hidden"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <ul className="flex flex-col px-4">
                {[...navLinks, { label: "Contact", href: "/contact" }].map(
                  (link) => (
                    <li key={link.href} className="border-b">
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          className="display-type block py-4 text-2xl"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    </li>
                  )
                )}
              </ul>
              <div className="mt-6 px-4">
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href={intakeHref}>Become a patient</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
