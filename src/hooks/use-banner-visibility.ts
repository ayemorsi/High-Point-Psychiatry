"use client"

import { useSyncExternalStore } from "react"

const COOKIE_NAME = "banner-dismissed"
const BANNER_EVENT = "banner-dismissed"

const subscribe = (callback: () => void) => {
  window.addEventListener(BANNER_EVENT, callback)
  return () => window.removeEventListener(BANNER_EVENT, callback)
}

const getSnapshot = () =>
  !document.cookie.split("; ").some((row) => row.startsWith(`${COOKIE_NAME}=`))

// The server snapshot is false so no page has to be rendered per-request just to
// read the cookie — the banner slides in on hydration unless it was dismissed.
const getServerSnapshot = () => false

export const useBannerVisibility = () => {
  const isBannerVisible = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const dismissBanner = () => {
    document.cookie = `${COOKIE_NAME}=true; path=/; max-age=31536000; SameSite=Lax`
    window.dispatchEvent(new Event(BANNER_EVENT))
  }

  return { isBannerVisible, dismissBanner }
}
