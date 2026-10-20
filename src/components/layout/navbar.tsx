import Link from "next/link"
import { MenuIcon, UserIcon } from "lucide-react"

import { Logo } from "@/components/icons/logo"
import BagDrawer from "@/components/layout/bag"
import SearchDialog from "@/components/layout/search"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getProducts } from "@/lib/products"
import { bestsellersHref } from "@/lib/shop-params"
import { site } from "@/lib/site"
import { routineSteps } from "@/lib/steps"

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Bestsellers", href: bestsellersHref },
  { label: "Find my routine", href: "/routine" },
  { label: "Our story", href: "/about" },
]

const menuLinks = [...links, { label: "Account", href: "/account" }]

export default async function Navbar() {
  const products = await getProducts()

  return (
    // Zero-height sticky: it rides under the banner, then pins to the top once the banner scrolls away.
    <header className="sticky top-0 z-50 flex h-0 items-start justify-center px-(--nav-inset-length)">
      <nav
        aria-label="Main"
        className="dark mt-(--nav-top-length) flex h-(--nav-height-length) w-full max-w-(--nav-max-width-length) items-center justify-between gap-4 rounded-full bg-background ps-6 pe-2 text-foreground shadow-lg ring-1 ring-border"
      >
        <div className="flex-1">
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="inline-flex"
          >
            <Logo size="sm" />
          </Link>
        </div>
        <ul className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
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
        </ul>
        <div className="flex flex-1 items-center justify-end gap-1">
          <SearchDialog products={products} />
          <Button
            asChild
            variant="ghost"
            size="icon-sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/account" aria-label="Account">
              <UserIcon />
            </Link>
          </Button>
          <BagDrawer
            bestsellers={products.filter((product) => product.bestseller)}
          />
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
                {menuLinks.map((link) => (
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
                ))}
              </ul>
              <ul className="mt-6 grid grid-cols-2 gap-2 px-4">
                {routineSteps.map((step) => (
                  <li key={step.id}>
                    <SheetClose asChild>
                      <Link
                        href={`/shop/${step.id}`}
                        className="flex items-baseline gap-2 rounded-xl bg-muted px-4 py-3 text-sm font-medium"
                      >
                        <span className="figures text-muted-foreground">
                          {step.number}
                        </span>
                        {step.name}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
