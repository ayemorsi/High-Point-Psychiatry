import type { Metadata } from "next"
import { Host_Grotesk, Newsreader } from "next/font/google"
import { MotionConfig } from "motion/react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ogImage, ogLocale, siteTitle } from "@/lib/metadata"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: siteTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    site.name,
    "skincare",
    "four-step skincare routine",
    "fragrance-free skincare",
    "refillable skincare",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      {
        url: "/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    siteName: site.name,
    locale: ogLocale,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    site: site.social.handle,
    images: [{ url: ogImage.url, alt: ogImage.alt }],
  },
}

const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-newsreader",
})

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(newsreader.variable, hostGrotesk.variable)}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-background focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to content
        </a>
        <NuqsAdapter>
          <MotionConfig reducedMotion="user">
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </MotionConfig>
        </NuqsAdapter>
      </body>
    </html>
  )
}
