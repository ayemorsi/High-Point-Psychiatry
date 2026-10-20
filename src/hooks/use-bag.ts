"use client"

import { useSyncExternalStore } from "react"

import {
  freeShipping,
  getVariants,
  round,
  routineSaving,
  subscribePrice,
} from "@/lib/pricing"
import { site } from "@/lib/site"
import { routineStepIds } from "@/lib/steps"
import type {
  BagFlight,
  BagItem,
  BagLine,
  Product,
  StoredBagLine,
} from "@/lib/types"
import { storageKey } from "@/lib/utils"

type BagState = {
  open: boolean
  lines: StoredBagLine[]
  flights: BagFlight[]
  notice: string
}

const STORAGE_KEY = storageKey("bag")
const MAX_QUANTITY = 10

const serverState: BagState = {
  open: false,
  lines: [],
  flights: [],
  notice: "",
}
let state = serverState
let flightId = 0
let noticeId = 0
let hydrated = false
const listeners = new Set<() => void>()

function read(): StoredBagLine[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]")
    return Array.isArray(parsed) ? parsed.filter(isStoredLine) : []
  } catch {
    return []
  }
}

function isStoredLine(line: unknown): line is StoredBagLine {
  if (typeof line !== "object" || line === null) return false
  const value = line as Record<string, unknown>
  return (
    typeof value.key === "string" &&
    typeof value.slug === "string" &&
    typeof value.variantId === "string" &&
    typeof value.name === "string" &&
    typeof value.size === "string" &&
    typeof value.step === "string" &&
    typeof value.unit === "number" &&
    Array.isArray(value.covers) &&
    Number.isInteger(value.quantity) &&
    (value.quantity as number) > 0
  )
}

function write(lines: StoredBagLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {}
}

function emit() {
  listeners.forEach((listener) => listener())
}

function commit(next: Partial<BagState>) {
  state = { ...state, ...next }
  if (next.lines) write(state.lines)
  emit()
}

function getSnapshot() {
  if (!hydrated) {
    hydrated = true
    state = { ...state, lines: read() }
  }
  return state
}

// Keeps two open tabs showing the same bag.
function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return
  state = { ...state, lines: read() }
  emit()
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", onStorage)
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener("storage", onStorage)
  }
}

const clamp = (quantity: number) => Math.min(quantity, MAX_QUANTITY)

// Copies what the bag shows off the product, so a line never needs the catalog again.
function toLine({
  product,
  variant = getVariants(product)[0],
  subscribe = false,
  quantity = 1,
}: BagItem): StoredBagLine {
  const isDefault = variant.id === getVariants(product)[0].id
  return {
    key: [product.slug, variant.id, subscribe && "subscribe"]
      .filter(Boolean)
      .join(":"),
    slug: product.slug,
    variantId: variant.id,
    subscribed: subscribe,
    quantity: clamp(quantity),
    name: product.name,
    descriptor: product.descriptor,
    image: product.image,
    size: subscribe
      ? `${variant.label}, ${site.commerce.subscribeInterval}`
      : variant.label,
    unit: subscribe ? subscribePrice(variant.price) : variant.price,
    compareAt:
      isDefault && !subscribe && product.compareAtPrice
        ? product.compareAtPrice
        : undefined,
    step: product.step,
    covers: product.covers,
  }
}

export const bag = {
  setOpen: (open: boolean) => commit({ open }),
  add(items: BagItem | BagItem[], from?: HTMLElement) {
    const added = [items].flat().filter(({ product }) => !product.soldOut)
    if (added.length === 0) return
    let lines = getSnapshot().lines
    for (const next of added.map(toLine)) {
      const existing = lines.find((line) => line.key === next.key)
      lines = existing
        ? lines.map((line) =>
            line.key === next.key
              ? { ...line, quantity: clamp(line.quantity + next.quantity) }
              : line
          )
        : [...lines, next]
    }
    const products = added.map((item) => item.product)
    // An alternating zero-width space changes the text on every add, so a repeat add is announced too.
    noticeId += 1
    commit({
      lines,
      flights: [...state.flights, ...launch(products, from)],
      notice: `Added ${products.map((product) => product.name).join(", ")} to your bag.${"\u200b".repeat(noticeId % 2)}`,
    })
  },
  land(id: number) {
    commit({ flights: state.flights.filter((flight) => flight.id !== id) })
  },
  setQuantity(key: string, quantity: number) {
    if (quantity < 1) return bag.remove(key)
    commit({
      lines: getSnapshot().lines.map((line) =>
        line.key === key ? { ...line, quantity: clamp(quantity) } : line
      ),
    })
  },
  remove(key: string) {
    commit({ lines: getSnapshot().lines.filter((line) => line.key !== key) })
  },
  clear() {
    commit({ lines: [] })
  },
}

export function useBag() {
  const {
    open,
    lines: stored,
    flights,
    notice,
  } = useSyncExternalStore(subscribe, getSnapshot, () => serverState)

  const lines: BagLine[] = stored.map((line) => ({
    ...line,
    total: round(line.unit * line.quantity),
  }))

  const covered = routineStepIds.filter((step) =>
    lines.some((line) => line.covers.includes(step))
  )
  const subtotal = round(lines.reduce((sum, line) => sum + line.total, 0))
  const saving = routineSaving(lines)
  const total = round(subtotal - saving)

  return {
    open,
    flights,
    notice,
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal,
    saving,
    total,
    covered,
    shipping: freeShipping(total),
    has: (slug: string) => lines.some((line) => line.slug === slug),
  }
}

// A photo lifts off the card it sits on; anywhere else each product flies out of the button.
function launch(products: Product[], from?: HTMLElement): BagFlight[] {
  if (!from || from.closest("[role=dialog]")) return []
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return []

  const media = products.length === 1 && from.closest<HTMLElement>(".media")
  if (media) {
    const { x, y, width, height } = media.getBoundingClientRect()
    // On hover the card shows its second photo, so take whichever is visible.
    const shown = [...media.querySelectorAll("img")]
      .reverse()
      .find((img) => Number(getComputedStyle(img).opacity) > 0.5)
    return [
      {
        id: ++flightId,
        source: "photo",
        rect: {
          x,
          y,
          width,
          height,
          radius: parseFloat(getComputedStyle(media).borderTopLeftRadius),
        },
        image: shown?.currentSrc,
        delay: 0,
      },
    ]
  }

  const button = from.getBoundingClientRect()
  return products.map((product, index) => ({
    id: ++flightId,
    source: "button",
    rect: {
      x: button.x + button.width / 2 - 28,
      y: button.y + button.height / 2 - 35,
      width: 56,
      height: 70,
      radius: 12,
    },
    image: product.image?.src,
    delay: index * 0.08,
  }))
}
