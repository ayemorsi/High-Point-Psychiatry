import type { SiteImage } from "@/lib/types"

// Free stock placeholders that show the art direction. Swap the files, keep the keys.
export const brandImages = {
  lifeLinen: {
    src: "/images/brand/life-linen.jpg",
    alt: "Woman in a linen dress sitting calmly against a white wall",
  },
  lifeSilver: {
    src: "/images/brand/life-silver.jpg",
    alt: "Woman in her sixties with silver hair seated in a bright room, listening",
  },
} satisfies Record<string, SiteImage>
