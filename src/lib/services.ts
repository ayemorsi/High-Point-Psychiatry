import { brandImages } from "@/lib/images"
import type { SiteImage } from "@/lib/types"

export type ServiceConcern =
  | "anxiety"
  | "depression"
  | "adhd"
  | "mood"
  | "trauma"
  | "ocd"
  | "sleep"
  | "stress"
  | "unsure"

export type ServiceStart = "evaluation" | "medication" | "second-opinion"

export type ServiceFormat = "in-person" | "video" | "either"

export type Service = {
  slug: string
  name: string
  /** The short line under the card, where the template showed a price. */
  kind: string
  description: string
  image: SiteImage
  /** Concerns this service is built for; empty means it suits any concern. */
  concerns: ServiceConcern[]
}

const person = (name: string, alt: string): SiteImage => ({
  src: `/images/people/${name}.jpg`,
  alt,
})

export const services: Service[] = [
  {
    slug: "psychiatric-evaluation",
    name: "Psychiatric evaluation",
    kind: "First step",
    description:
      "A thorough first visit covering your symptoms, history and goals, ending with a clear diagnosis and recommendations.",
    image: brandImages.lifeSilver,
    concerns: [],
  },
  {
    slug: "medication-management",
    name: "Medication management",
    kind: "Ongoing",
    description:
      "Careful prescribing and regular check-ins to find what works, manage side effects and adjust over time.",
    image: person("ingrid", "Older woman with silver hair in a cream sweater"),
    concerns: [],
  },
  {
    slug: "telepsychiatry",
    name: "Telepsychiatry",
    kind: "By video",
    description:
      "Secure video visits from home for evaluations and follow-ups, when a virtual visit is right for you.",
    image: {
      src: "/images/hero/telehealth.jpg",
      alt: "Woman with curly hair smiling at her desk beside a laptop",
    },
    concerns: [],
  },
  {
    slug: "anxiety",
    name: "Anxiety and panic",
    kind: "Condition care",
    description:
      "Treatment for constant worry, panic attacks, social anxiety and the physical symptoms that come with them.",
    image: {
      src: "/images/hero/calm.jpg",
      alt: "Woman sitting calmly on the floor of a bright room",
    },
    concerns: ["anxiety", "stress"],
  },
  {
    slug: "depression",
    name: "Depression",
    kind: "Condition care",
    description:
      "Care for low mood, loss of interest, low energy and hopelessness, including depression that hasn't improved with past treatment.",
    image: brandImages.lifeLinen,
    concerns: ["depression"],
  },
  {
    slug: "adhd",
    name: "ADHD",
    kind: "Evaluation and treatment",
    description:
      "Assessment for attention, focus and impulsivity, and treatment that fits your work, school and home life.",
    image: person("beatriz", "Young woman smiling with her hand in her hair"),
    concerns: ["adhd"],
  },
  {
    slug: "bipolar",
    name: "Bipolar and mood disorders",
    kind: "Condition care",
    description:
      "Diagnosis and long-term care for mood swings, highs and lows, with a focus on steady, sustainable stability.",
    image: person("marisol", "Woman with long curly hair smiling"),
    concerns: ["mood"],
  },
  {
    slug: "trauma",
    name: "PTSD and trauma",
    kind: "Condition care",
    description:
      "Trauma-informed care for flashbacks, nightmares, hypervigilance and the lasting effects of difficult experiences.",
    image: person("dana", "Woman with long dark hair smiling warmly"),
    concerns: ["trauma"],
  },
  {
    slug: "ocd",
    name: "OCD",
    kind: "Condition care",
    description:
      "Treatment for intrusive thoughts and compulsions, with medication options and guidance on proven therapies.",
    image: person("chen", "Woman with shoulder-length dark hair smiling"),
    concerns: ["ocd", "anxiety"],
  },
  {
    slug: "sleep",
    name: "Insomnia and sleep",
    kind: "Condition care",
    description:
      "Help with trouble falling or staying asleep, and with the sleep problems that often come with mood and anxiety.",
    image: person("helen", "Older woman with short white hair smiling"),
    concerns: ["sleep", "stress"],
  },
  {
    slug: "stress",
    name: "Stress and life changes",
    kind: "Support",
    description:
      "Support through burnout, grief, major transitions and the stress that starts to affect your mood, sleep or focus.",
    image: person("aaliyah", "Woman with natural hair laughing"),
    concerns: ["stress", "depression"],
  },
  {
    slug: "second-opinion",
    name: "Second opinions",
    kind: "Consultation",
    description:
      "A fresh review of a diagnosis or treatment plan when something doesn't feel right or progress has stalled.",
    image: person("priya", "Woman with dark hair smiling softly at home"),
    concerns: [],
  },
]

const concernService: Record<ServiceConcern, string> = {
  anxiety: "anxiety",
  depression: "depression",
  adhd: "adhd",
  mood: "bipolar",
  trauma: "trauma",
  ocd: "ocd",
  sleep: "sleep",
  stress: "stress",
  unsure: "psychiatric-evaluation",
}

const startService: Record<ServiceStart, string> = {
  evaluation: "psychiatric-evaluation",
  medication: "medication-management",
  "second-opinion": "second-opinion",
}

export type ServicePick = { label: string; service: Service }

// The services that answer the three questions, in the order they'd happen.
export function recommendServices(
  concern: ServiceConcern,
  start: ServiceStart,
  format: ServiceFormat
): ServicePick[] {
  const slugs = [
    { label: "Start here", slug: startService[start] },
    { label: "Your focus", slug: concernService[concern] },
    ...(format === "video"
      ? [{ label: "How we meet", slug: "telepsychiatry" }]
      : []),
  ]
  const seen = new Set<string>()
  return slugs.flatMap(({ label, slug }) => {
    const service = services.find((item) => item.slug === slug)
    if (!service || seen.has(slug)) return []
    seen.add(slug)
    return [{ label, service }]
  })
}
