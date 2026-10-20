import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { Logo } from "@/components/icons/logo"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site"

export default function CheckoutHeader() {
  return (
    <header className="border-b">
      <div className="container">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 md:h-20">
          <Link href="/" aria-label={`${site.name} home`}>
            <Logo size="fluid" />
          </Link>
          <Button asChild variant="ghost">
            <Link href="/shop">
              <ArrowLeftIcon data-icon="inline-start" />
              Back to shop
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
