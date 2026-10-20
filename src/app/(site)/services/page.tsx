import type { Metadata } from "next"

import Cta from "@/components/sections/home/cta"
import ServiceFinder from "@/components/sections/services/finder"
import ServiceList from "@/components/sections/services/list"
import { pageMetadata } from "@/lib/metadata"

export const metadata: Metadata = pageMetadata({
  title: "Psychiatric Services in Flint, MI",
  description:
    "Psychiatric evaluations, medication management, telepsychiatry and care for anxiety, depression, ADHD, bipolar disorder, PTSD and more in Flint, MI and Genesee County.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <>
      <ServiceFinder />
      <ServiceList />
      <Cta />
    </>
  )
}
