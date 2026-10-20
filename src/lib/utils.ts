import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { site } from "@/lib/site"

export const EASE_SOFT = [0.22, 1, 0.36, 1] as const

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Spread onto any anchor leaving the site so the new tab is always announced.
export function externalLink(label: string) {
  return {
    target: "_blank",
    rel: "noreferrer",
    "aria-label": `${label} (opens in a new tab)`,
  } as const
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat(site.commerce.locale, {
    style: "currency",
    currency: site.commerce.currency,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount)
}

export function formatCount(count: number) {
  return new Intl.NumberFormat(site.commerce.locale).format(count)
}

const words = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
]

// Counts under eleven read as words in copy, the way the brand writes them.
export function spell(count: number) {
  return words[count] ?? String(count)
}

export function storageKey(name: string) {
  return `${site.storageKey}:${name}`
}
