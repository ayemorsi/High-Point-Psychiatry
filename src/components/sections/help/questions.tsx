"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { ArrowRightIcon, SearchIcon, XIcon } from "lucide-react"

import Reveal from "@/components/elements/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Toggle } from "@/components/ui/toggle"
import { deliveryTime } from "@/lib/pricing"
import { site } from "@/lib/site"
import { formatPrice } from "@/lib/utils"

const { freeShippingThreshold, returnsDays, subscribeDiscount } = site.commerce

type Question = {
  question: string
  answer: string
  link?: { label: string; href: string }
  terms: string
}

const topics: { title: string; questions: Question[] }[] = [
  {
    title: "Orders and shipping",
    questions: [
      {
        question: "When will my order arrive?",
        answer: `We send it within one business day, and it usually arrives ${deliveryTime()} later. The tracking link comes by email.`,
        terms: "shipping delivery tracking how long",
      },
      {
        question: "How much is shipping?",
        answer: `Free on orders over ${formatPrice(freeShippingThreshold)}. Under that, you see the rate at checkout before you pay.`,
        terms: "shipping cost price free",
      },
      {
        question: "Do you ship outside the US?",
        answer: "We ship to the US and Canada.",
        terms: "shipping international canada europe country",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "Yes, until it ships. Write to us with your order number and we'll change it or cancel it.",
        link: { label: "Write to us", href: "#contact" },
        terms: "edit address mistake",
      },
    ],
  },
  {
    title: "Returns",
    questions: [
      {
        question: "Can I return a product I've opened?",
        answer: `Yes. Anything can come back within ${returnsDays} days of delivery, even opened and used.`,
        link: { label: "How returns work", href: "#returns" },
        terms: "returns refund used exchange",
      },
      {
        question: "When do I get my refund?",
        answer:
          "Within 10 days of your parcel reaching us, back to the card you paid with.",
        terms: "returns refund money back",
      },
    ],
  },
  {
    title: "Your skin",
    questions: [
      {
        question: "Which products should I start with?",
        answer:
          "One from each step: a cleanser, a serum, a moisturizer and an SPF. The routine finder picks yours in three questions.",
        link: { label: "Find my routine", href: "/routine" },
        terms: "routine beginner first start",
      },
      {
        question: "Can I use it on sensitive skin?",
        answer:
          "Yes. Nothing we make has added scent. Try each new product on a small patch of skin first, and start retinal at two nights a week.",
        terms: "sensitive skin redness irritation reaction fragrance scent",
      },
      {
        question: "Do I need SPF every day?",
        answer:
          "Yes, even when it's cloudy. It goes on last every morning, after your moisturizer.",
        terms: "spf sunscreen sun protect",
      },
      {
        question: "Can I use it while pregnant?",
        answer:
          "Ask your doctor before you use retinal or acids while pregnant or nursing.",
        terms: "pregnancy nursing breastfeeding retinol",
      },
    ],
  },
  {
    title: "Subscriptions",
    questions: [
      {
        question: "How does subscribe and save work?",
        answer: `We send it ${site.commerce.subscribeInterval} at ${subscribeDiscount}% off, and email you three days before each one ships.`,
        terms: "subscriptions discount refill",
      },
      {
        question: "How do I skip or cancel?",
        answer:
          "From your account, any time, with no fee. Make changes before the reminder email to change the next delivery.",
        terms: "subscriptions cancel skip pause",
      },
    ],
  },
]

const total = topics.reduce((sum, topic) => sum + topic.questions.length, 0)

const popular = ["Shipping", "Returns", "Sensitive skin", "Subscriptions"]

export default function HelpQuestions() {
  const searchId = useId()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState<string[]>([])

  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const results = topics
    .map((topic) => ({
      ...topic,
      questions: topic.questions.filter((item) => matches(item, words)),
    }))
    .filter((topic) => topic.questions.length > 0)
  const count = results.reduce((sum, t) => sum + t.questions.length, 0)

  function search(next: string) {
    setQuery(next)
    const nextWords = next.toLowerCase().split(/\s+/).filter(Boolean)
    const found = topics
      .flatMap((topic) => topic.questions)
      .filter((item) => matches(item, nextWords))
    setOpen(nextWords.length && found.length === 1 ? [found[0].question] : [])
  }

  return (
    <section aria-labelledby="help-title">
      <div className="p-2 md:p-3">
        <div className="arc-field hero-padding rounded-3xl bg-card">
          <div className="container flex flex-col items-center text-center">
            <Breadcrumb className="enter">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Help</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1
              id="help-title"
              className="enter mt-8 text-5xl leading-none delay-75 md:mt-10 md:text-6xl lg:text-7xl"
            >
              How can we help?
            </h1>
            <p className="enter mt-5 max-w-md text-muted-foreground delay-150 md:text-lg">
              Search the questions we get most, or write to an esthetician.
            </p>

            <form
              role="search"
              onSubmit={(event) => event.preventDefault()}
              className="enter mt-8 w-full max-w-lg delay-200 md:mt-10"
            >
              <label htmlFor={searchId} className="sr-only">
                Search questions
              </label>
              <InputGroup>
                <InputGroupAddon>
                  <SearchIcon aria-hidden="true" />
                </InputGroupAddon>
                <InputGroupInput
                  id={searchId}
                  type="text"
                  inputMode="search"
                  enterKeyHint="search"
                  autoComplete="off"
                  placeholder="Search, like “returns” or “SPF”"
                  value={query}
                  onChange={(event) => search(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") search("")
                  }}
                />
                {query && (
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-sm"
                      aria-label="Clear search"
                      onClick={() => search("")}
                    >
                      <XIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                )}
              </InputGroup>
            </form>

            <div className="enter mt-5 flex flex-wrap items-center justify-center gap-2 delay-300">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {popular.map((term) => (
                <Toggle
                  key={term}
                  variant="outline"
                  size="sm"
                  pressed={query.toLowerCase() === term.toLowerCase()}
                  onPressedChange={(pressed) => search(pressed ? term : "")}
                >
                  {term}
                </Toggle>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-padding container grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl md:text-5xl">Top questions</h2>
            <p className="mt-3 max-w-md text-muted-foreground md:text-lg">
              Can&apos;t find yours?{" "}
              <Link
                href="#contact"
                className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
              >
                Write to us
              </Link>
              .
            </p>
            <p
              aria-live="polite"
              className="figures mt-6 text-sm text-muted-foreground"
            >
              {words.length
                ? `${count} of ${total} match “${query.trim()}”`
                : `${total} questions`}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-8">
          {results.length ? (
            <div className="space-y-10 md:space-y-12">
              {results.map((topic) => (
                <div key={topic.title}>
                  <h3 className="sans-heading text-sm text-muted-foreground">
                    {topic.title}
                  </h3>
                  <Accordion
                    type="multiple"
                    value={open}
                    onValueChange={setOpen}
                    className="mt-3"
                  >
                    {topic.questions.map((item) => (
                      <AccordionItem key={item.question} value={item.question}>
                        <AccordionTrigger>
                          <span>
                            <Highlight text={item.question} words={words} />
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="max-w-xl">
                            <Highlight text={item.answer} words={words} />
                          </p>
                          {item.link && (
                            <Button asChild variant="link" className="mt-3">
                              <Link href={item.link.href}>
                                {item.link.label}
                                <ArrowRightIcon data-icon="inline-end" />
                              </Link>
                            </Button>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <div className="swap rounded-2xl bg-card">
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>Nothing matches “{query.trim()}”.</EmptyTitle>
                  <EmptyDescription>
                    Try one word, like shipping or SPF. Or ask us directly.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button asChild variant="secondary">
                      <Link href="#contact">Write to us</Link>
                    </Button>
                    <Button variant="ghost" onClick={() => search("")}>
                      Clear search
                    </Button>
                  </div>
                </EmptyContent>
              </Empty>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function Highlight({ text, words }: { text: string; words: string[] }) {
  if (!words.length) return text

  const pattern = new RegExp(`(${words.map(escapeRegExp).join("|")})`, "gi")
  return text.split(pattern).map((part, index) =>
    index % 2 ? (
      <mark key={index} className="rounded-sm bg-secondary text-foreground">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

function matches(item: Question, words: string[]) {
  const haystack = `${item.question} ${item.answer} ${item.terms}`.toLowerCase()
  return words.every((word) => haystack.includes(word))
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
