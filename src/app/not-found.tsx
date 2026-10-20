import type { Metadata } from "next"
import Link from "next/link"

import { LogoMark } from "@/components/icons/logo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="container flex min-h-svh flex-col items-center justify-center text-center"
    >
      <LogoMark className="size-10" />
      <h1 className="mt-8 text-4xl md:text-5xl">
        We can&apos;t find that page.
      </h1>
      <p className="mt-4 max-w-sm text-muted-foreground">
        The link is broken, or the page has moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  )
}
