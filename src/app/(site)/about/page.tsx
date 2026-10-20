import type { Metadata } from "next"

import AboutHero from "@/components/sections/about/hero"
import AboutInsurance from "@/components/sections/about/insurance"
import AboutPrinciples from "@/components/sections/about/principles"
import AboutTeam from "@/components/sections/about/team"
import Cta from "@/components/sections/home/cta"
import { pageMetadata } from "@/lib/metadata"

// The team section is hidden for now; set this to true to bring it back.
const SHOW_TEAM = false

export const metadata: Metadata = pageMetadata({
  title: "About Our Flint Psychiatry Practice",
  description:
    "Meet High Point Psychiatry, a psychiatric practice in Flint, MI serving Genesee County. See the insurance we accept.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      {SHOW_TEAM && <AboutTeam />}
      <AboutPrinciples />
      <AboutInsurance />
      <Cta />
    </>
  )
}
