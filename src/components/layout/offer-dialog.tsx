"use client"

import { useEffect, useId, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import ScratchCard from "@/components/elements/scratch-card"
import { LogoMark } from "@/components/icons/logo"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useScrollOffer } from "@/hooks/use-scroll-offer"
import { subscribe } from "@/lib/actions"
import { brandImages } from "@/lib/images"
import { bestsellersHref } from "@/lib/shop-params"
import { site } from "@/lib/site"
import { cn, EASE_SOFT } from "@/lib/utils"

const stage = {
  initial: { opacity: 0, filter: "blur(6px)", transform: "translateY(12px)" },
  animate: { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" },
  exit: { opacity: 0, filter: "blur(6px)", transform: "translateY(-12px)" },
  transition: { duration: 0.24, ease: EASE_SOFT },
}

export default function OfferDialog() {
  const { open, dismiss, claim } = useScrollOffer()
  const [sentTo, setSentTo] = useState("")

  function onClaim(address: string) {
    setSentTo(address)
    claim()
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && dismiss()}>
      <DialogContent size="full">
        <div className="grid grid-rows-[auto_minmax(0,1fr)] md:grid-cols-2 md:grid-rows-1">
          <div className="relative order-first h-56 bg-card sm:h-64 md:order-last md:h-auto">
            <Image
              src={brandImages.portraitOffer.src}
              alt={brandImages.portraitOffer.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>

          <div className="flex flex-col justify-center-safe overflow-y-auto p-6 sm:p-10 lg:p-16">
            <AnimatePresence mode="wait" initial={false}>
              {sentTo ? (
                <Sent key="sent" address={sentTo} />
              ) : (
                <Offer key="offer" onClaim={onClaim} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

type OfferProps = {
  onClaim: (address: string) => void
}

function Offer({ onClaim }: OfferProps) {
  return (
    <motion.div {...stage}>
      <LogoMark className="size-11" />
      <DialogTitle size="display" className="mt-8">
        {site.commerce.welcomeDiscount}% off your first order.
      </DialogTitle>
      <DialogDescription size="display" className="mt-3">
        One email a month. Unsubscribe any time.
      </DialogDescription>
      <Claim className="mt-10 max-w-md" onClaim={onClaim} />
    </motion.div>
  )
}

type SentProps = {
  address: string
}

function Sent({ address }: SentProps) {
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    heading.current?.focus()
  }, [])

  return (
    <motion.div {...stage}>
      <motion.span
        initial={{ opacity: 0, transform: "scale(0.5)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        transition={{
          type: "spring",
          duration: 0.55,
          bounce: 0.4,
          delay: 0.06,
        }}
        className="flex size-12 items-center justify-center rounded-full bg-success text-success-foreground"
      >
        <CheckIcon className="size-6" strokeWidth={2.25} />
      </motion.span>
      <DialogTitle
        ref={heading}
        tabIndex={-1}
        size="display"
        className="mt-8 outline-none"
      >
        You&apos;re in.
      </DialogTitle>
      <DialogDescription size="display" className="mt-4">
        We sent the code to {address}.
      </DialogDescription>
      <motion.p
        initial={{ opacity: 0, transform: "scale(0.96)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        transition={{ duration: 0.3, ease: EASE_SOFT, delay: 0.16 }}
        className="figures mt-10 max-w-md rounded-2xl bg-card py-6 text-center text-3xl font-medium"
      >
        {site.commerce.welcomeCode}
      </motion.p>
      <Button asChild size="lg" className="mt-4 w-full max-w-md">
        <Link href={bestsellersHref}>Shop bestsellers</Link>
      </Button>
    </motion.div>
  )
}

type ClaimProps = {
  className?: string
  onClaim: (address: string) => void
}

function Claim({ className, onClaim }: ClaimProps) {
  const [revealed, setRevealed] = useState(false)
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)
  const field = useRef<HTMLInputElement>(null)
  const codeId = useId()
  const emailId = useId()
  const errorId = useId()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const address = field.current?.value.trim() ?? ""
    setPending(true)
    setFailed(false)
    try {
      const { ok } = await subscribe(address)
      if (ok) onClaim(address)
      else setFailed(true)
    } catch {
      setFailed(true)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className={cn("relative", className)}>
      {/* A big panel makes the scratch worth doing; threshold and brush scale so it still takes two or three passes. */}
      <ScratchCard
        onReveal={() => setRevealed(true)}
        revealThreshold={0.6}
        brushSize={56}
      >
        <div className="flex min-h-48 flex-col items-center justify-center gap-2 bg-card px-6 text-center">
          <p className="text-xs text-muted-foreground">Your code</p>
          <p id={codeId} className="figures text-4xl font-medium md:text-5xl">
            {site.commerce.welcomeCode}
          </p>
        </div>
      </ScratchCard>

      {/* The field arrives with the code, so nothing asks to be filled in before there is a reason to. */}
      <AnimatePresence>
        {revealed && (
          <motion.form
            key="claim-form"
            onSubmit={onSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.32, ease: EASE_SOFT }}
            className="overflow-hidden"
          >
            <div className="pt-6">
              <label htmlFor={emailId} className="sr-only">
                Email address
              </label>
              <Input
                id={emailId}
                ref={field}
                type="email"
                placeholder="Email address"
                required
                autoComplete="email"
                aria-invalid={failed || undefined}
                aria-describedby={failed ? `${codeId} ${errorId}` : codeId}
              />
              {failed && (
                <p
                  id={errorId}
                  role="alert"
                  className="mt-2 text-sm text-destructive"
                >
                  We couldn&apos;t send the code. Try again.
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                disabled={pending}
                className="mt-3 w-full"
              >
                {pending && (
                  <Spinner data-icon="inline-start" aria-hidden="true" />
                )}
                {pending ? "Sending" : "Email me the code"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
