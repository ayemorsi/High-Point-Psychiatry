import type { Metadata } from "next"

import HelpContact from "@/components/sections/help/contact"
import HelpPolicies from "@/components/sections/help/policies"
import HelpQuestions from "@/components/sections/help/questions"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"
import { formatPrice } from "@/lib/utils"

export const metadata: Metadata = pageMetadata({
  title: "Help",
  description: `Answers about orders, shipping, returns and your skin. Free shipping over ${formatPrice(site.commerce.freeShippingThreshold)}, ${site.commerce.returnsDays}-day returns, and an esthetician on email.`,
  path: "/help",
})

export default function HelpPage() {
  return (
    <>
      <HelpQuestions />
      <HelpPolicies />
      <HelpContact />
    </>
  )
}
