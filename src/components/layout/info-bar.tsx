"use client"

import { useSyncExternalStore } from "react"
import { ClockIcon, MapPinIcon, PhoneIcon, XIcon } from "lucide-react"

import { site } from "@/lib/site"
import { cn, externalLink } from "@/lib/utils"

const STORAGE_KEY = "hpp:info-bar-dismissed"

const listeners = new Set<() => void>()

function readDismissed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    // Storage can be blocked; the bar just stays open.
    return false
  }
}

let dismissedThisVisit = false

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// A slim strip above the menu with the phone, address and hours. Closing it is remembered on this device only.
export default function InfoBar() {
  const dismissed = useSyncExternalStore(
    subscribe,
    () => dismissedThisVisit || readDismissed(),
    () => false
  )
  const open = !dismissed

  function close() {
    dismissedThisVisit = true
    try {
      window.localStorage.setItem(STORAGE_KEY, "1")
    } catch {
      // Nothing to remember it in; it closes for this visit only.
    }
    listeners.forEach((listener) => listener())
  }

  const { address, phone, hours } = site

  return (
    <div
      className={cn(
        "relative grid transition-[grid-template-rows,opacity] duration-300 ease-soft",
        open
          ? "grid-rows-[1fr] opacity-100"
          : "pointer-events-none grid-rows-[0fr] opacity-0"
      )}
      aria-hidden={!open}
    >
      <div className="overflow-hidden">
        <div className="container flex items-center gap-x-6 gap-y-1 py-2.5 pe-12 text-xs text-muted-foreground md:pe-14">
          <a
            href={phone.href}
            tabIndex={open ? undefined : -1}
            className="inline-flex shrink-0 items-center gap-1.5 transition-colors duration-200 hover:text-foreground"
          >
            <PhoneIcon aria-hidden="true" className="size-3.5" />
            <span>
              <span className="max-sm:hidden">Call for an appointment </span>
              <span className="font-medium text-foreground">
                {phone.display}
              </span>
            </span>
          </a>
          <a
            href={address.mapHref}
            tabIndex={open ? undefined : -1}
            {...externalLink(`${site.name} on Google Maps`)}
            className="inline-flex min-w-0 items-center gap-1.5 transition-colors duration-200 hover:text-foreground max-sm:hidden"
          >
            <MapPinIcon aria-hidden="true" className="size-3.5 shrink-0" />
            <span className="truncate underline decoration-foreground/20 underline-offset-4">
              {address.street}, {address.city}, {address.state} {address.zip}
            </span>
          </a>
          {hours.length > 0 && (
            <p className="ms-auto inline-flex shrink-0 items-center gap-1.5 max-lg:hidden">
              <ClockIcon aria-hidden="true" className="size-3.5" />
              {hours.map((slot, index) => (
                <span key={slot.days}>
                  {index > 0 && (
                    <span aria-hidden className="mx-2">
                      ·
                    </span>
                  )}
                  <span className="font-medium text-foreground">
                    {slot.days}
                  </span>{" "}
                  {slot.time}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={close}
        tabIndex={open ? undefined : -1}
        aria-label="Close info bar"
        className="absolute end-3 top-1.5 grid size-7 place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground md:end-5"
      >
        <XIcon className="size-3.5" />
      </button>
    </div>
  )
}
