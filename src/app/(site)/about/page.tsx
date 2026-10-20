import type { Metadata } from "next"

import AboutHero from "@/components/sections/about/hero"
import AboutInsurance from "@/components/sections/about/insurance"
import AboutPrinciples from "@/components/sections/about/principles"
import AboutTeam from "@/components/sections/about/team"
import Cta from "@/components/sections/home/cta"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "About Our Flint Psychiatry Practice",
  description:
    "Meet High Point Psychiatry, a psychiatric practice in Flint, MI serving Genesee County, led by Ahmed Morsi, MSN, PMHNP-BC. See the insurance we accept.",
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
