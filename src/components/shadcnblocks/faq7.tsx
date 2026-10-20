import type { ReactNode } from "react"

import Reveal from "@/components/elements/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

// shadcnblocks FAQ 7: a heading and support note beside an accordion of questions.

type Faq7Props = {
  heading: string
  subheading: string
  body: ReactNode
  action?: ReactNode
  faqs: { question: string; answer: string }[]
  className?: string
}

export default function Faq7({
  heading,
  subheading,
  body,
  action,
  faqs,
  className,
}: Faq7Props) {
  return (
    <section className={cn("section-padding", className)}>
      <div className="container">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <Reveal className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl">
              {heading}
              <br />
              <span className="text-muted-foreground/70">{subheading}</span>
            </h2>
            <div className="text-lg text-muted-foreground md:text-xl">
              {body}
            </div>
            {action}
          </Reveal>
          <Reveal delay={0.06}>
            <Accordion type="multiple">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="max-w-xl">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
