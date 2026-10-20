"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon, SearchIcon, XIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import ProductCard from "@/components/elements/product-card"
import { Logo } from "@/components/icons/logo"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Empty,
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
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { homeImages } from "@/lib/images"
import { CONCERNS, shopHref, SKIN_TYPES } from "@/lib/shop-params"
import { getStep, steps } from "@/lib/steps"
import type { Concern, Product } from "@/lib/types"
import { EASE_SOFT } from "@/lib/utils"

const POPULAR = [
  "Vitamin C",
  "Retinal",
  "SPF",
  "Ceramides",
  "Sensitive",
  "Sets",
]

const CONCERN_IMAGES: Record<Concern, { src: string }> = {
  Dryness: homeImages.concernDryness,
  Dullness: homeImages.concernDullness,
  "Fine lines": homeImages.concernFineLines,
  Redness: homeImages.concernRedness,
  Oiliness: homeImages.concernOiliness,
  "Dark spots": homeImages.concernDarkSpots,
}

const SIZES = "(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 50vw"
const SWAP = { duration: 0.25, ease: EASE_SOFT }
const SETTLE = { duration: 0.4, ease: EASE_SOFT }
// The panel grows out of the nav pill and shrinks back into it. Exit is quicker than entry.
const MORPH_EASE = "cubic-bezier(0.32, 0.72, 0, 1)"
const OPEN_MS = 560
const CLOSE_MS = 380
const PANEL_CLIP = "inset(0px 0px 0px 0px round 24px)"

export default function SearchDialog({ products }: { products: Product[] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const input = useRef<HTMLInputElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const closing = useRef(false)
  const reduceMotion = useReducedMotion()
  // Keyboard opens and closes stay instant: ⌘K and Esc are used too often to wait on.
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false)
  const instant = reduceMotion || openedByKeyboard
  const term = query.trim()
  const results = search(products, term)
  const suggestions = suggest(term)
  const shown =
    results.length > 0
      ? results
      : products.filter((product) => product.bestseller).slice(0, 4)
  const heading =
    results.length === 0
      ? "Bestsellers"
      : `${results.length} ${results.length === 1 ? "product" : "products"}`

  const finishClose = useCallback(() => {
    closing.current = false
    setOpen(false)
    setQuery("")
  }, [])

  const close = useCallback(
    (now = false) => {
      if (closing.current) return
      const node = panel.current
      const nav = trigger.current?.closest("nav")
      if (!node || !nav || reduceMotion || now) {
        finishClose()
        return
      }
      closing.current = true
      // Gone by the time it reaches the pill, so no ivory shape ever sits on the nav.
      node.animate(
        { opacity: [1, 1, 0] },
        { duration: CLOSE_MS, easing: "ease-out", fill: "forwards" }
      )
      node
        .querySelector("[data-search-body]")
        ?.animate({ opacity: [1, 0] }, { duration: 120, fill: "forwards" })
      node.previousElementSibling?.animate(
        { opacity: [1, 0] },
        { duration: CLOSE_MS, fill: "forwards" }
      )
      node.animate(
        { clipPath: [PANEL_CLIP, pillOf(nav, node)] },
        { duration: CLOSE_MS, easing: MORPH_EASE, fill: "forwards" }
      ).onfinish = finishClose
    },
    [finishClose, reduceMotion]
  )

  // Runs as the panel mounts, before its first paint, so it never flashes at full size.
  const morphIn = useCallback(
    (node: HTMLDivElement | null) => {
      // Strict Mode and a changed callback both re-attach the same panel; it only morphs once.
      if (!node || node === panel.current) return
      panel.current = node
      const nav = trigger.current?.closest("nav")
      if (!nav || reduceMotion || openedByKeyboard) return
      node.animate(
        { clipPath: [pillOf(nav, node), PANEL_CLIP] },
        { duration: OPEN_MS, easing: MORPH_EASE }
      )
      node.animate(
        { opacity: [0, 1] },
        { duration: OPEN_MS * 0.3, easing: "ease-out" }
      )
    },
    [reduceMotion, openedByKeyboard]
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "k" || !(event.metaKey || event.ctrlKey)) return
      event.preventDefault()
      if (open) close(true)
      else {
        setOpenedByKeyboard(true)
        setOpen(true)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, close])

  const onOpenChange = (next: boolean) => {
    if (next) setOpen(true)
    else close()
  }

  const choose = (term: string) => {
    setQuery(term)
    input.current?.focus()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          ref={trigger}
          variant="ghost"
          size="icon-sm"
          aria-label="Search"
          onClick={() => setOpenedByKeyboard(false)}
        >
          <SearchIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={morphIn}
        size="top"
        showCloseButton={false}
        onEscapeKeyDown={(event) => {
          event.preventDefault()
          close(true)
        }}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          input.current?.focus()
        }}
        // Any link inside (a product, a concern, the shop) leaves the page, so the panel goes with it.
        onClickCapture={(event) => {
          if (!(event.target as HTMLElement).closest("a")) return
          close()
        }}
        className="content-start"
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">
          Search products by name, ingredient or skin concern.
        </DialogDescription>

        <motion.div
          data-search-body
          initial={
            instant
              ? false
              : {
                  opacity: 0,
                  transform: "translateY(-8px)",
                  filter: "blur(4px)",
                }
          }
          animate={{
            opacity: 1,
            transform: "translateY(0px)",
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.35, ease: EASE_SOFT, delay: 0.14 }}
        >
          <div className="sticky top-0 z-10 bg-popover">
            <div className="flex items-center gap-3 px-3 py-3 md:gap-6 md:px-8 md:py-5">
              <div className="hidden shrink-0 md:block md:w-36">
                <Logo size="sm" />
              </div>
              <InputGroup className="flex-1 md:mx-auto md:max-w-xl">
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput
                  ref={input}
                  inputMode="search"
                  enterKeyHint="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the shop"
                  aria-label="Search"
                />
                <AnimatePresence initial={false}>
                  {query && (
                    <InputGroupAddon key="clear" align="inline-end">
                      <motion.span
                        initial={{
                          opacity: 0,
                          scale: 0.6,
                          filter: "blur(2px)",
                        }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
                        transition={SWAP}
                        className="flex"
                      >
                        <InputGroupButton
                          size="icon-xs"
                          aria-label="Clear search"
                          onClick={() => choose("")}
                        >
                          <XIcon />
                        </InputGroupButton>
                      </motion.span>
                    </InputGroupAddon>
                  )}
                </AnimatePresence>
              </InputGroup>
              <div className="flex shrink-0 justify-end md:w-36">
                <DialogClose asChild>
                  <Button variant="ghost" size="sm">
                    Close
                    <Kbd className="hidden md:inline-flex">Esc</Kbd>
                  </Button>
                </DialogClose>
              </div>
            </div>

            <Separator />
          </div>

          <AutoHeight>
            <div className="grid gap-8 px-4 py-6 md:grid-cols-12 md:gap-10 md:px-8 md:py-8">
              <aside className="relative flex flex-col gap-8 md:col-span-4 lg:col-span-3">
                <AnimatePresence initial={false} mode="popLayout">
                  {suggestions.length > 0 && (
                    <Group key="suggestions" title="Suggestions">
                      <ul className="-my-2">
                        {suggestions.map((suggestion) => (
                          <li key={suggestion.href}>
                            <Link
                              href={suggestion.href}
                              className="group flex items-center justify-between gap-4 py-2 text-sm"
                            >
                              <span>
                                {suggestion.label}
                                <span className="ms-2 text-muted-foreground">
                                  {suggestion.kind}
                                </span>
                              </span>
                              <ArrowRightIcon className="size-4 text-muted-foreground transition-transform duration-200 ease-soft group-hover:translate-x-0.5" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Group>
                  )}

                  <Group key="popular" title="Popular searches">
                    <ul className="flex flex-wrap gap-2">
                      {POPULAR.map((popular) => (
                        <li key={popular}>
                          <Button
                            variant="secondary"
                            size="xs"
                            aria-pressed={
                              popular.toLowerCase() === term.toLowerCase()
                            }
                            onClick={() => choose(popular)}
                          >
                            {popular}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </Group>

                  {!term && (
                    <Group key="concerns" title="Shop by concern">
                      <ul className="grid grid-cols-3 gap-x-2 gap-y-4">
                        {CONCERNS.map((concern) => (
                          <li key={concern}>
                            <Link
                              href={shopHref("/shop", { concern: [concern] })}
                              className="group flex flex-col items-center gap-2 text-center transition-transform duration-200 ease-out active:scale-95"
                            >
                              <span className="relative size-14 overflow-hidden rounded-full bg-card ring-2 ring-transparent ring-offset-2 ring-offset-background transition duration-300 ease-soft group-hover:ring-border group-focus-visible:ring-ring">
                                <Image
                                  src={CONCERN_IMAGES[concern].src}
                                  alt=""
                                  fill
                                  sizes="56px"
                                  className="object-cover transition duration-500 ease-soft group-hover:scale-105"
                                />
                              </span>
                              <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                                {concern}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Group>
                  )}
                </AnimatePresence>
              </aside>

              <div className="relative flex flex-col gap-8 md:col-span-8 lg:col-span-9">
                <AnimatePresence initial={false} mode="popLayout">
                  {term && results.length === 0 && (
                    <motion.div
                      key="empty"
                      layout="position"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={SETTLE}
                    >
                      <Empty className="bg-card">
                        <EmptyHeader>
                          <EmptyTitle>
                            Nothing matches &ldquo;{term}&rdquo;
                          </EmptyTitle>
                          <EmptyDescription>
                            Try a product name, an ingredient or a concern.
                          </EmptyDescription>
                        </EmptyHeader>
                      </Empty>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.section layout="position" transition={SETTLE}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="sans-heading figures text-sm">
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.span
                          key={heading}
                          initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
                          transition={SWAP}
                          className="inline-block"
                        >
                          {heading}
                        </motion.span>
                      </AnimatePresence>
                    </h3>
                    <Button asChild variant="link" size="xs">
                      <Link href="/shop">
                        Shop all
                        <ArrowRightIcon data-icon="inline-end" />
                      </Link>
                    </Button>
                  </div>
                  <ul className="product-row relative mt-4">
                    <AnimatePresence initial={false} mode="popLayout">
                      {shown.map((product) => (
                        <motion.li
                          key={product.slug}
                          layout="position"
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={SETTLE}
                        >
                          <ProductCard product={product} sizes={SIZES} />
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </motion.section>
              </div>
            </div>
          </AutoHeight>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

function Group({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      layout="position"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={SETTLE}
    >
      <h3 className="sans-heading mb-3 text-sm">{title}</h3>
      {children}
    </motion.section>
  )
}

// Grows and shrinks with its content, so the panel's edge glides instead of jumping.
function AutoHeight({ children }: { children: React.ReactNode }) {
  const inner = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | "auto">("auto")

  useEffect(() => {
    const element = inner.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      setHeight(entry.borderBoxSize[0].blockSize)
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      initial={false}
      animate={{ height }}
      transition={SETTLE}
      className="overflow-hidden"
    >
      <div ref={inner}>{children}</div>
    </motion.div>
  )
}

// The nav pill's outline as a clip on the panel, for the morph's first and last frame.
function pillOf(nav: Element, panel: Element) {
  const pill = nav.getBoundingClientRect()
  const box = panel.getBoundingClientRect()
  const edge = (value: number) => `${Math.max(0, value)}px`
  return `inset(${edge(pill.top - box.top)} ${edge(box.right - pill.right)} ${edge(box.bottom - pill.bottom)} ${edge(pill.left - box.left)} round ${pill.height / 2}px)`
}

// Every word has to appear somewhere on the product; name matches rank first.
function search(products: Product[], query: string): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  return products
    .map((product) => {
      const name = product.name.toLowerCase()
      const text = [
        product.name,
        product.descriptor,
        product.benefit,
        getStep(product.step)?.name,
        ...product.concerns,
        ...product.skinTypes,
        ...product.keyIngredients.map((ingredient) => ingredient.name),
        ...(product.contains ?? []).map(
          (slug) => products.find((item) => item.slug === slug)?.name
        ),
      ]
        .join(" ")
        .toLowerCase()
      if (!terms.every((term) => text.includes(term))) return null
      const rank = name.startsWith(terms[0])
        ? 0
        : terms.every((term) => name.includes(term))
          ? 1
          : 2
      return { product, rank }
    })
    .filter((match) => match !== null)
    .sort((a, b) => a.rank - b.rank)
    .map((match) => match.product)
}

function suggest(query: string) {
  const typed = query.toLowerCase()
  if (typed.length < 2) return []
  const matches = (label: string) => label.toLowerCase().startsWith(typed)

  return [
    ...steps
      .filter((step) => matches(step.name))
      .map((step) => ({
        label: step.name,
        kind: "Step",
        href: `/shop/${step.id}`,
      })),
    ...CONCERNS.filter(matches).map((concern) => ({
      label: concern,
      kind: "Concern",
      href: shopHref("/shop", { concern: [concern] }),
    })),
    ...SKIN_TYPES.filter(matches).map((skin) => ({
      label: `${skin} skin`,
      kind: "Skin type",
      href: shopHref("/shop", { skin: [skin] }),
    })),
  ]
}
