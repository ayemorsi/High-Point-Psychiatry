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
import { site } from "@/lib/site"

type Question = {
  question: string
  answer: string
  link?: { label: string; href: string }
  terms: string
}

const topics: { title: string; questions: Question[] }[] = [
  {
    title: "Getting started",
    questions: [
      {
        question: "How do I request an appointment?",
        answer:
          "Send us a message using the contact form below, or email us. We'll reply to answer your questions and find a time for your first visit.",
        link: { label: "Write to us", href: "#contact" },
        terms: "book schedule new patient first visit appointment",
      },
      {
        question: "Do I need a referral?",
        answer:
          "Some insurance plans ask for one and some don't. Tell us about your plan when you reach out and we'll let you know what's needed.",
        terms: "referral doctor primary care insurance",
      },
      {
        question: "What happens at the first visit?",
        answer:
          "Your first visit is a psychiatric evaluation. It's longer than later visits, and we use it to understand your symptoms, history and goals before talking about treatment options.",
        terms: "evaluation first visit intake assessment",
      },
      {
        question: "What should I bring?",
        answer:
          "A list of your current medications and doses, any past mental health records you have, your insurance card and photo ID.",
        terms: "bring documents medications records insurance id",
      },
    ],
  },
  {
    title: "Treatment",
    questions: [
      {
        question: "Will I have to take medication?",
        answer:
          "Not necessarily. Medication is one option among several. We explain what we recommend and why, and the decision is always yours.",
        terms: "medication pills prescription choice",
      },
      {
        question: "Do you offer telehealth visits?",
        answer:
          "Yes, when a video visit is appropriate for you. Ask about it when you reach out.",
        terms: "telehealth video virtual online remote",
      },
      {
        question: "How often are follow-up visits?",
        answer:
          "It depends on your plan. Visits are usually closer together while we're starting or adjusting treatment and further apart once things are stable.",
        terms: "follow-up visits frequency how often",
      },
    ],
  },
  {
    title: "Insurance and payment",
    questions: [
      {
        question: "Do you take my insurance?",
        answer:
          "We accept Medicare, Railroad Medicare, Medicaid, Tricare and VA CCN, plus many Medicare and Medicaid plans, including Blue Cross, HAP, Humana, McLaren, Meridian, Molina, Priority Health, Aetna and UHC. Coverage can vary, so we'll confirm your plan before your first visit.",
        link: { label: "See every plan we accept", href: "/about#insurance" },
        terms:
          "insurance coverage in network cost payment medicare medicaid tricare va ccn blue cross hap humana mclaren meridian molina priority aetna uhc united",
      },
      {
        question: "What if I need to cancel?",
        answer:
          "Let us know as early as you can so we can offer the time to someone else. We'll go over our cancellation policy when you schedule.",
        terms: "cancel reschedule missed appointment",
      },
    ],
  },
  {
    title: "Privacy and urgent help",
    questions: [
      {
        question: "Is my information kept private?",
        answer:
          "Yes. Your health information is confidential and protected by law. Please don't send detailed medical information through the website form; we'll discuss it securely once you're a patient.",
        link: { label: "Privacy policy", href: "/legal/privacy" },
        terms: "privacy confidential hipaa records",
      },
      {
        question: "What if I need help right now?",
        answer: `We can't respond to emergencies through this website. If you are in crisis, call or text ${site.crisis.line} (Suicide & Crisis Lifeline), call 911 or go to the nearest emergency room.`,
        terms: "crisis emergency urgent suicide 988 help now",
      },
    ],
  },
]

const total = topics.reduce((sum, topic) => sum + topic.questions.length, 0)

const popular = ["Insurance", "First visit", "Telehealth", "Medication"]

export default function Questions() {
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
    <section id="faq" aria-labelledby="help-title" className="scroll-mt-24">
      <div className="p-2 [--panel-inset:0.5] md:p-3 md:[--panel-inset:0.75]">
        <div className="arc-field hero-padding relative overflow-hidden rounded-3xl bg-card">
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
                  <BreadcrumbPage>Contact</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1
              id="help-title"
              className="enter mt-8 text-5xl leading-none delay-75 md:mt-10 md:text-6xl lg:text-7xl"
            >
              Questions and contact
            </h1>
            <p className="enter mt-5 max-w-md text-muted-foreground delay-150 md:text-lg">
              Find answers to common questions, or send us a message.
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
                  placeholder="Search, like “insurance” or “first visit”"
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
          <div aria-hidden="true" className="nav-notch animate-notch-open" />
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
                    Try one word, like insurance or telehealth. Or ask us
                    directly.
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
