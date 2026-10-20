import type { Metadata } from "next"

import { site } from "@/lib/site"
import type { SiteImage } from "@/lib/types"

export const siteTitle = `${site.name} | ${site.tagline}`

// The brand logo on ivory, for link previews in messages and social posts.
export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${site.name}. ${site.tagline}`,
}

export const ogLocale = site.locale.replace("-", "_")

type PageMetadataOptions = {
  /** Leave out on the home page to use the site title. */
  title?: string
  description?: string
  path: string
  image?: SiteImage
  type?: "website" | "article"
}

// Every page sets its own share title, URL and image; the root layout only holds what they have in common.
export function pageMetadata({
  title,
  description = site.description,
  path,
  image,
  type = "website",
}: PageMetadataOptions): Metadata {
  const shareTitle = title ? `${title} · ${site.name}` : siteTitle
  const images = image ? [{ url: image.src, alt: image.alt }] : [ogImage]

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: ogLocale,
      title: shareTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images,
    },
  }
}
