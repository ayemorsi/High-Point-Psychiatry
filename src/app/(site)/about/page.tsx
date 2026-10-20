import type { Metadata } from "next"

import AboutHero from "@/components/sections/about/hero"
import AboutInsurance from "@/components/sections/about/insurance"
import AboutPrinciples from "@/components/sections/about/principles"
import AboutTeam from "@/components/sections/about/team"
import Cta from "@/components/sections/home/cta"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${site.name} is a psychiatric practice in ${site.region} built on careful listening, clear explanations and shared decisions.`,
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutTeam />
      <AboutPrinciples />
      <AboutInsurance />
      <Cta />
    </>
  )
}
