// Plans the practice accepts, grouped as patients look for them.
export const insuranceGroups = [
  {
    title: "Government programs",
    plans: ["Medicare", "Railroad Medicare", "Medicaid", "Tricare", "VA CCN"],
  },
  {
    title: "Medicare plans",
    plans: [
      "Medicare Plus Blue",
      "BCN Advantage",
      "Aetna Medicare",
      "HAP Senior/Medicare",
      "Humana Medicare",
      "McLaren Medicare Advantage",
      "Meridian Medicare",
      "Molina Medicare",
      "Priority Health Medicare",
      "UHC Medicare",
    ],
  },
  {
    title: "Medicaid plans",
    plans: [
      "Aetna Better Health",
      "Blue Cross Complete",
      "HAP CareSource",
      "Humana Medicaid",
      "McLaren Health Plan",
      "Meridian Health Plan",
      "Molina Healthcare",
      "Priority Medicaid",
      "UHC Community Plan",
      "Upper Peninsula Health Plan",
    ],
  },
]

/** The best-known names, for the scrolling strip on the home page. Add a logo path under /public to show the logo instead of the name. */
export const featuredInsurers: { name: string; logo?: string }[] = [
  { name: "Medicare" },
  { name: "Medicaid" },
  { name: "Blue Cross Blue Shield" },
  { name: "Humana" },
  { name: "Aetna" },
  { name: "UnitedHealthcare" },
  { name: "Molina Healthcare" },
  { name: "Priority Health" },
  { name: "HAP" },
  { name: "McLaren" },
  { name: "Meridian" },
  { name: "Tricare" },
  { name: "VA Community Care" },
]
