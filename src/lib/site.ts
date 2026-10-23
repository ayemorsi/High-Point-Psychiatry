export const site = {
  name: "High Point Psychiatry",
  legalName: "High Point Psychiatry",
  tagline: "Psychiatric care in Flint, Michigan",
  description:
    "Psychiatrist in Flint, MI serving Genesee County. Evaluations, medication management, and care for ADHD, anxiety and depression. In person or telehealth. Medicaid accepted.",
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
  /** Communities the practice serves, for search engines. */
  areaServed: [
    "Flint, MI",
    "Genesee County, MI",
    "Grand Blanc, MI",
    "Burton, MI",
    "Fenton, MI",
    "Davison, MI",
    "Flushing, MI",
    "Swartz Creek, MI",
    "Michigan (telehealth)",
  ],
  /** Office hours: days and time are shown on the site; dayCodes, opens and closes feed the search engine listing. */
  hours: [
    {
      days: "Mon–Thu",
      time: "9:00 AM – 5:00 PM",
      dayCodes: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "17:00",
    },
    {
      days: "Fri",
      time: "9:00 AM – 1:00 PM",
      dayCodes: ["Friday"],
      opens: "09:00",
      closes: "13:00",
    },
  ],
  region: "Michigan",
  locale: "en-US",
  // Shown wherever someone might be reaching out in an emergency.
  crisis: {
    line: "988",
    href: "tel:988",
  },
  // Hushmail secure form IDs (Hushmail > Embed secure form). Keep them free of e-signature fields so they fill in on the page.
  secureForms: {
    intake: "user-request-an-appointment-behavioral-health",
  },
} as const

// Canonical links, the sitemap and share cards build on this. Vercel fills in the production domain; set NEXT_PUBLIC_SITE_URL anywhere else.
function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return `https://${vercel}`
  return "http://localhost:3000"
}
