import type { Metadata } from "next"

import Approach from "@/components/sections/home/approach"
import Conditions from "@/components/sections/home/conditions"
import Cta from "@/components/sections/home/cta"
import Hero from "@/components/sections/home/hero"
import Process from "@/components/sections/home/process"
import Services from "@/components/sections/home/services"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({ path: "/" })

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Conditions />
      <Approach />
      <Process />
      <Cta />
    </>
  )
}
