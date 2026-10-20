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
    image: {
      src: "/images/team/ahmed-morsi.jpg",
      alt: "Ahmed Morsi smiling in glasses and a light blue shirt",
    },
    credentials: "MSN, PMHNP-BC",
    role: "Psychiatric care provider",
    bio: "Ahmed is a board-certified psychiatric mental health specialist who leads patient care at High Point Psychiatry, from initial evaluations and diagnosis to personalized treatment planning and medication management.",
  },
  {
    name: "Fatima Rasheed",
    image: {
      src: "/images/team/fatima-rasheed.jpg",
      alt: "Fatima Rasheed smiling in a rust-colored blouse",
    },
    role: "Head of marketing and office manager",
    bio: "Fatima runs the office day to day and leads how the practice reaches the community. She's often the first person you'll hear from when you get in touch.",
  },
  {
    name: "Anas Ragab",
    image: {
      src: "/images/team/anas-ragab.jpg",
      alt: "Anas Ragab smiling in a purple collared shirt",
    },
    role: "CTO and head of innovation",
    bio: "Anas leads technology at High Point Psychiatry, from this website to the tools behind scheduling and telehealth visits, so care is easy to reach.",
  },
]
