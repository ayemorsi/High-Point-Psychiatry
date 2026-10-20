import {
  DropletsIcon,
  FeatherIcon,
  Flower2Icon,
  RecycleIcon,
} from "lucide-react"

import type { Featured } from "@/lib/types"

// The home page spotlight. To feature another product, change the slug and rewrite the features for it.
export const featured: Featured = {
  slug: "barrier-cream",
  features: [
    { icon: DropletsIcon, label: "For dry skin" },
    { icon: FeatherIcon, label: "Gentle on sensitive skin" },
    { icon: Flower2Icon, label: "Fragrance-free", struck: true },
    { icon: RecycleIcon, label: "Refillable glass jar" },
  ],
}
