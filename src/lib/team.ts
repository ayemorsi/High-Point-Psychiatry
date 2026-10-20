import type { SiteImage } from "@/lib/types"

export type TeamMember = {
  name: string
  credentials?: string
  role: string
  bio: string
  /** Leave out to show initials until a headshot is ready. */
  image?: SiteImage
}

export const team: TeamMember[] = [
  {
    name: "Ahmed Morsi",
    credentials: "MSN, PMHNP-BC",
    role: "Psychiatric mental health nurse practitioner",
    bio: "Ahmed is a board-certified psychiatric mental health nurse practitioner. He leads patient care at High Point Psychiatry, from first evaluations through diagnosis, treatment planning and medication management.",
  },
  {
    name: "Fatima Rasheed",
    role: "Head of marketing and office manager",
    bio: "Fatima runs the office day to day and leads how the practice reaches the community. She's often the first person you'll hear from when you get in touch.",
  },
  {
    name: "Anas Morsi",
    role: "CTO and head of innovation",
    bio: "Anas leads technology at High Point Psychiatry, from this website to the tools behind scheduling and telehealth visits, so care is easy to reach.",
  },
]
