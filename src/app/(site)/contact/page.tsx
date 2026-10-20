import type { Metadata } from "next"

import Contact from "@/components/sections/contact/contact"
import Questions from "@/components/sections/contact/questions"
import { pageMetadata } from "@/lib/metadata"
import { site } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Request an appointment with ${site.name} or ask a question. Answers about first visits, insurance, telehealth and privacy.`,
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <Questions />
      <Contact />
    </>
  )
}
