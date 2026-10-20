import { brandImages } from "@/lib/images"
import type { SiteImage } from "@/lib/types"

export type HeroStep = {
  id: string
  number: string
  name: string
  /** The line under the headline while this step is active. */
  line: string
  title: string
  body: string
  /** The caption pinned to the left photo card. */
  tag: string
  scene: {
    /** The round photo on the arc. */
    pearl: SiteImage
    /** The tall arched photo in the middle. */
    main: SiteImage
    /** The photo card to the left of the arch. */
    side: SiteImage
  }
}

const person = (name: string, alt: string): SiteImage => ({
  src: `/images/people/${name}.jpg`,
  alt,
})

// The four steps the home hero cycles through, from first message to ongoing care.
export const heroSteps: HeroStep[] = [
  {
    id: "reach-out",
    number: "01",
    name: "Reach out",
    line: "Tell us what's going on, in your own words.",
    title: "Send a message",
    body: "We reply to answer your questions and find a time.",
    tag: "We reply by email",
    scene: {
      pearl: person("priya", "Woman with dark hair smiling softly at home"),
      main: {
        src: "/images/hero/telehealth.jpg",
        alt: "Woman with curly hair smiling at her desk beside a laptop",
      },
      side: {
        src: "/images/hero/calm.jpg",
        alt: "Woman sitting calmly on the floor of a bright room",
      },
    },
  },
  {
    id: "evaluate",
    number: "02",
    name: "Evaluate",
    line: "A first visit with time to really talk.",
    title: "Psychiatric evaluation",
    body: "Your history and goals, in one unhurried visit.",
    tag: "In person or telehealth",
    scene: {
      pearl: person("helen", "Older woman with short white hair smiling"),
      main: brandImages.lifeSilver,
      side: person("dana", "Woman with long dark hair smiling warmly"),
    },
  },
  {
    id: "plan",
    number: "03",
    name: "Plan",
    line: "Decide on next steps together.",
    title: "Your treatment plan",
    body: "Every option explained clearly, and chosen with you.",
    tag: "Shared decisions",
    scene: {
      pearl: person("chen", "Woman with shoulder-length dark hair smiling"),
      main: person("beatriz", "Young woman smiling with her hand in her hair"),
      side: brandImages.lifeLinen,
    },
  },
  {
    id: "follow-up",
    number: "04",
    name: "Follow up",
    line: "Adjust the plan until it works for you.",
    title: "Ongoing care",
    body: "Regular check-ins and medication management.",
    tag: "Steady support",
    scene: {
      pearl: person("marisol", "Woman with long curly hair smiling"),
      main: person("aaliyah", "Woman with natural hair laughing"),
      side: person("ingrid", "Older woman with silver hair in a cream sweater"),
    },
  },
]
