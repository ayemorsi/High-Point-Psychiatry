import type { Metadata } from "next"

import AboutGallery from "@/components/sections/about/gallery"
import AboutHero from "@/components/sections/about/hero"
import AboutPrinciples from "@/components/sections/about/principles"
import AboutServices from "@/components/sections/about/services"
import AboutStandards from "@/components/sections/about/standards"
import AboutTeam from "@/components/sections/about/team"
import Newsletter from "@/components/sections/shared/newsletter"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Our story",
  description: `How ${site.founder.name}, an esthetician, started ${site.name}: four steps, one job per product, made in ${site.origin}.`,
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStandards />
      <AboutPrinciples />
      <AboutTeam />
      <AboutGallery />
      <AboutServices />
      <Newsletter />
    </>
  )
}
