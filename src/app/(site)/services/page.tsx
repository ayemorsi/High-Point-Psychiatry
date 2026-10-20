import type { Metadata } from "next"

import Cta from "@/components/sections/home/cta"
import ServiceFinder from "@/components/sections/services/finder"
import ServiceList from "@/components/sections/services/list"
import { pageMetadata } from "@/lib/metadata"
import { services } from "@/lib/services"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description: `Psychiatric services at ${site.name}: ${services
    .slice(0, 6)
    .map((service) => service.name.toLowerCase())
    .join(", ")} and more, in ${site.region}.`,
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
