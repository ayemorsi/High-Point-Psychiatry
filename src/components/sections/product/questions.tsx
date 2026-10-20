import Reveal from "@/components/elements/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SKIN_TYPES } from "@/lib/shop-params"
import { site } from "@/lib/site"
import { getStep, routineSteps } from "@/lib/steps"
import type { Product } from "@/lib/types"

export default function ProductQuestions({ product }: { product: Product }) {
  const questions = getQuestions(product)

  return (
    <section className="section-padding container">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <h2 className="text-4xl md:text-5xl">Questions</h2>
          <p className="mt-3 max-w-md text-muted-foreground md:text-lg">
            Anything else, email{" "}
            <a
              href={site.email.href}
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              {site.email.display}
            </a>
            .
          </p>
        </Reveal>
        <Reveal delay={0.06} className="lg:col-span-8">
          <Accordion type="single" collapsible>
            {questions.map(({ question, answer }) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

function getQuestions(product: Product) {
  const skin = product.skinTypes.map((type) => type.toLowerCase())
  const skinList =
    skin.length === SKIN_TYPES.length
      ? `Every skin type: ${formatList(skin)}.`
      : `${formatList(skin)} skin.`.replace(/^./, (letter) =>
          letter.toUpperCase()
        )

  const common = [
    { question: "Which skin types is it for?", answer: skinList },
    {
      question: "Is it fragrance-free?",
      answer:
        "Yes. Nothing we make has added scent, and that includes essential oils.",
    },
  ]

  if (product.step === "sets") {
    return [
      ...common,
      {
        question: "Can I swap a product in the set?",
        answer: `Not in the set itself. Pick one product from each step in Find my routine and you get ${site.commerce.setDiscount}% off.`,
      },
      {
        question: "Can I return an opened set?",
        answer: `Yes, within ${site.commerce.returnsDays} days, even if every product is open.`,
      },
    ]
  }

  const step = getStep(product.step)!
  const routine = routineSteps
  const index = routine.findIndex((item) => item.id === step.id)
  const before = routine[index - 1]
  const after = routine[index + 1]
  const neighbours = [
    before && `after ${before.name.toLowerCase()}`,
    after && `before ${after.name.toLowerCase()}`,
  ].filter(Boolean)

  return [
    {
      question: "Where does it go in my routine?",
      answer: `Step ${step.number}, ${neighbours.join(" and ")}.`,
    },
    ...common,
    {
      question: "How does subscribing work?",
      answer: `We send it ${site.commerce.subscribeInterval} at ${site.commerce.subscribeDiscount}% off. You can skip a delivery, change the date or cancel from your account at any time.`,
    },
  ]
}

function formatList(items: string[]) {
  if (items.length < 2) return items.join("")
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`
}
