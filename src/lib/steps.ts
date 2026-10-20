import type { Step, StepId } from "@/lib/types"

export const steps: Step[] = [
  {
    id: "cleanse",
    number: "01",
    name: "Cleanse",
    job: "Remove makeup, SPF and oil.",
  },
  {
    id: "treat",
    number: "02",
    name: "Treat",
    job: "Work on one concern at a time.",
  },
  {
    id: "moisturize",
    number: "03",
    name: "Moisturize",
    job: "Keep water in your skin.",
  },
  {
    id: "protect",
    number: "04",
    name: "Protect",
    job: "SPF, every morning.",
  },
  {
    id: "sets",
    name: "Sets",
    job: "Full routines in one box.",
  },
]

export const routineSteps = steps.filter((step) => step.number)

export const routineStepIds = routineSteps.map((step) => step.id)

export function getStep(id: StepId) {
  return steps.find((step) => step.id === id)
}
