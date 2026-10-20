"use client"

import { useState } from "react"

import { buildRoutine } from "@/lib/routines"
import { CONCERNS, SKIN_TYPES } from "@/lib/shop-params"
import type {
  Concern,
  FinderQuestion,
  Product,
  RoutineAnswers,
  RoutineLength,
  SkinType,
} from "@/lib/types"

type FinderOption<T> = { value: T; label: string }

const finderQuestions: FinderQuestion[] = ["skin", "concern", "length"]

const skin: FinderOption<SkinType>[] = SKIN_TYPES.map((value) => ({
  value,
  label: value,
}))

const concern: FinderOption<Concern>[] = CONCERNS.map((value) => ({
  value,
  label: value,
}))

const length: FinderOption<RoutineLength>[] = [
  { value: 2, label: "Two" },
  { value: 3, label: "Three" },
  { value: 4, label: "All four" },
]

export const finderOptions = { skin, concern, length }

const firstOpen = (answers: RoutineAnswers) =>
  finderQuestions.find((id) => answers[id] === undefined) ?? null

// Three answers in, one routine out.
export function useRoutineFinder(products: Product[]) {
  const [answers, setAnswers] = useState<RoutineAnswers>({})
  const [current, setCurrent] = useState<FinderQuestion | null>(
    finderQuestions[0]
  )

  const result =
    answers.skin && answers.concern && answers.length
      ? buildRoutine(products, answers.skin, answers.concern, answers.length)
      : undefined

  function answer<K extends FinderQuestion>(id: K, value: RoutineAnswers[K]) {
    const next = { ...answers, [id]: value }
    setAnswers(next)
    setCurrent(firstOpen(next))
  }

  function restart() {
    setAnswers({})
    setCurrent(finderQuestions[0])
  }

  return {
    products,
    answers,
    current,
    done: current === null && result !== undefined,
    result,
    answer,
    edit: setCurrent,
    restart,
  }
}

export function labelFor(
  id: FinderQuestion,
  value: RoutineAnswers[FinderQuestion]
) {
  const options: FinderOption<unknown>[] = finderOptions[id]
  return options.find((option) => option.value === value)?.label
}
