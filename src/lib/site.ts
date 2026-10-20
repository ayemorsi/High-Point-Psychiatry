export const site = {
  name: "High Point Psychiatry",
  legalName: "High Point Psychiatry",
  tagline: "Good skin is built in layers.",
  description:
    "Four-step skincare made in small batches in California. Each product has one job. Fragrance-free, refillable, and photographed without retouching.",
  url: siteUrl(),
  email: {
    display: "care@example.com",
    href: "mailto:care@example.com",
  },
  founded: 2019,
  founder: { name: "Camille Ortega", firstName: "Camille", years: 12 },
  city: "Michigan",
  origin: "Michigan",
  rating: { score: 4.8, count: 12400 },
  storageKey: "hpp",
  commerce: {
    currency: "USD",
    locale: "en-US",
    freeShippingThreshold: 60,
    returnsDays: 30,
    welcomeDiscount: 10,
    welcomeCode: "LAYERS10",
    subscribeDiscount: 15,
    subscribeInterval: "every 2 months",
    setDiscount: 15,
    shipping: [
      { id: "standard", label: "Standard", days: [3, 5], price: 6 },
      { id: "express", label: "Express", days: [1, 2], price: 15 },
    ],
    payments: ["Visa", "Mastercard", "Amex", "Apple Pay", "Shop Pay"],
  },
  social: {
    handle: "@highpointpsychiatry",
    followers: "86k",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    pinterest: "https://pinterest.com",
  },
} as const

// Canonical links, the sitemap and share cards build on this. Vercel fills in the production domain; set NEXT_PUBLIC_SITE_URL anywhere else.
function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  return "http://localhost:3000"
}
