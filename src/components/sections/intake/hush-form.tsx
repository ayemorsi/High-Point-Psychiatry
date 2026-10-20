"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const SCRIPT_SRC =
  "https://hushforms.com/f/public/javascript/embed-hush-form.js"

type HushFormProps = {
  formId: string
  className?: string
}

// HushForms fills its placeholder when the embed script runs, so a fresh copy runs on every visit, including arrivals by client-side navigation.
export default function HushForm({ formId, className }: HushFormProps) {
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

    return () => host.replaceChildren()
  }, [formId])

  return <div ref={container} className={cn("min-h-72 pt-10", className)} />
}
