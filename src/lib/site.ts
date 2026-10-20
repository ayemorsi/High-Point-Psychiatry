export const site = {
  name: "High Point Psychiatry",
  legalName: "High Point Psychiatry",
  tagline: "Psychiatric care in Michigan",
  description:
    "High Point Psychiatry offers psychiatric evaluations, medication management and ongoing care in Michigan. Unhurried visits and a plan you build with your provider.",
  url: siteUrl(),
  email: {
    display: "user@hppmi.com",
    href: "mailto:user@hppmi.com",
  },
  phone: {
    display: "(810) 321-5374",
    href: "tel:+18103215374",
  },
  fax: {
    display: "(810) 267-9347",
    href: "tel:+18102679347",
  },
  address: {
    street: "1425 S Graham Rd",
    city: "Flint",
    state: "MI",
    zip: "48532",
    country: "US",
    mapHref:
      "https://maps.google.com/?q=1425+S+Graham+Rd+Flint+MI+48532+United+States",
  },
  website: "https://highpointpsychiatrymi.com",
  /** Office hours for the info bar above the menu, e.g. { days: "Mon–Thu", time: "9:00 AM – 5:00 PM" }. Empty hides them. */
  hours: [] as { days: string; time: string }[],
  region: "Michigan",
  locale: "en-US",
  // Shown wherever someone might be reaching out in an emergency.
  crisis: {
    line: "988",
    href: "tel:988",
  },
} as const

// Canonical links, the sitemap and share cards build on this. Vercel fills in the production domain; set NEXT_PUBLIC_SITE_URL anywhere else.
function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  return "http://localhost:3000"
}
