"use client"

import { useState } from "react"

import {
  recommendServices,
  type ServiceConcern,
  type ServiceFormat,
  type ServiceStart,
} from "@/lib/services"

export type FinderAnswers = {
  concern?: ServiceConcern
  start?: ServiceStart
  format?: ServiceFormat
}

export type FinderQuestion = keyof FinderAnswers

/** label is the chip; phrase is how the answer reads inside the sentence. */
type FinderOption<T> = { value: T; label: string; phrase: string }

const finderQuestions: FinderQuestion[] = ["concern", "start", "format"]

const concern: FinderOption<ServiceConcern>[] = [
  { value: "anxiety", label: "Anxiety", phrase: "anxiety" },
  { value: "depression", label: "Depression", phrase: "depression" },
  { value: "adhd", label: "ADHD", phrase: "ADHD" },
  { value: "mood", label: "Mood swings", phrase: "mood swings" },
  { value: "trauma", label: "Trauma", phrase: "trauma" },
  { value: "ocd", label: "OCD", phrase: "OCD" },
  { value: "sleep", label: "Sleep", phrase: "sleep" },
  { value: "stress", label: "Stress", phrase: "stress" },
  { value: "unsure", label: "I'm not sure", phrase: "how I feel" },
]

const start: FinderOption<ServiceStart>[] = [
  { value: "evaluation", label: "An evaluation", phrase: "an evaluation" },
  { value: "medication", label: "Medication", phrase: "medication" },
  {
    value: "second-opinion",
    label: "A second opinion",
    phrase: "a second opinion",
  },
]

const format: FinderOption<ServiceFormat>[] = [
  { value: "in-person", label: "In person", phrase: "in person" },
  { value: "video", label: "By video", phrase: "by video" },
  { value: "either", label: "Either way", phrase: "either way" },
]

export const finderOptions = { concern, start, format }

const firstOpen = (answers: FinderAnswers) =>
  finderQuestions.find((id) => answers[id] === undefined) ?? null

// Three answers in, the services that fit out.
export function useServiceFinder() {
  const [answers, setAnswers] = useState<FinderAnswers>({})
  const [current, setCurrent] = useState<FinderQuestion | null>(
    finderQuestions[0]
  )

  const result =
    answers.concern && answers.start && answers.format
      ? recommendServices(answers.concern, answers.start, answers.format)
      : undefined

  function answer<K extends FinderQuestion>(id: K, value: FinderAnswers[K]) {
    const next = { ...answers, [id]: value }
    setAnswers(next)
    setCurrent(firstOpen(next))
  }

  function restart() {
    setAnswers({})
    setCurrent(finderQuestions[0])
  }

  return {
    answers,
    current,
    done: current === null && result !== undefined,
    result,
    answer,
    edit: setCurrent,
    restart,
  }
}

export function optionFor(
  id: FinderQuestion,
  value: FinderAnswers[FinderQuestion]
) {
  const options: FinderOption<unknown>[] = finderOptions[id]
  return options.find((option) => option.value === value)
}
