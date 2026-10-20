"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const SCRIPT_SRC =
  "https://hushforms.com/f/public/javascript/embed-hush-form.js"

const EMAIL_INPUT = 'input[type="email"], input[name*="email" i]'

type HushFormProps = {
  formId: string
  /** Typed into the form's email box once it renders, when HushForms builds it in the page rather than in a frame. */
  email?: string
  className?: string
}

// HushForms fills its placeholder when the embed script runs, so a fresh copy runs on every visit, including arrivals by client-side navigation.
export default function HushForm({ formId, email, className }: HushFormProps) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = container.current
    if (!host) return

    const placeholder = document.createElement("div")
    placeholder.setAttribute("data-secure-form", formId)
    placeholder.setAttribute("data-secure-form-transparent-background", "true")
    host.replaceChildren(placeholder)

    const script = document.createElement("script")
    script.src = SCRIPT_SRC
    script.async = true
    host.appendChild(script)

    let observer: MutationObserver | undefined
    let timer: number | undefined
    if (email) {
      const fill = () => {
        const input = host.querySelector<HTMLInputElement>(EMAIL_INPUT)
        if (!input) return false
        // Set through the native setter and announce it, so a framework-driven form registers the value.
        const setValue = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value"
        )?.set
        setValue?.call(input, email)
        input.dispatchEvent(new Event("input", { bubbles: true }))
        input.dispatchEvent(new Event("change", { bubbles: true }))
        return true
      }
      observer = new MutationObserver(() => {
        if (fill()) observer?.disconnect()
      })
      observer.observe(host, { childList: true, subtree: true })
      timer = window.setTimeout(() => observer?.disconnect(), 20000)
    }

    return () => {
      observer?.disconnect()
      window.clearTimeout(timer)
      host.replaceChildren()
    }
  }, [formId, email])

  return <div ref={container} className={cn("min-h-72 pt-10", className)} />
}
