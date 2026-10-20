import { brandImages, homeImages } from "@/lib/images"
import { getProducts } from "@/lib/products"
import { getStep } from "@/lib/steps"
import type { ProductImage, StepCard, StepFilter } from "@/lib/types"

// Each step's lead photo, lead product, link and the Orbit hero's scene (formula, skin, pack).
const cards = [
  {
    id: "cleanse",
    slug: "milk-cleanser",
    image: brandImages.stepCleanse,
    skin: brandImages.stepCleanse,
    texture: homeImages.textureCleanse,
  },
  {
    id: "treat",
    slug: "vitamin-c-serum",
    image: brandImages.stepTreat,
    skin: brandImages.portraitSerum,
    texture: brandImages.textureSerum,
  },
  {
    id: "moisturize",
    slug: "barrier-cream",
    image: brandImages.stepMoisturize,
    skin: brandImages.stepMoisturize,
    texture: brandImages.textureCream,
  },
  {
    id: "protect",
    slug: "daily-spf-40",
    image: brandImages.stepProtect,
    skin: homeImages.resultsPortrait,
    texture: homeImages.textureProtect,
  },
] as const

// A step page's cover is that step's skin photo; all products open on the layers laid out in order.
export function stepCover(step: StepFilter): ProductImage {
  return (
    cards.find((card) => card.id === step)?.skin ?? homeImages.journalLayering
  )
}

export async function getStepCards(): Promise<StepCard[]> {
  const products = await getProducts()
  return cards.flatMap((item) => {
    const step = getStep(item.id)
    const product = products.find((product) => product.slug === item.slug)
    return step && product?.image
      ? [
          {
            step,
            product,
            image: item.image,
            href: `/shop/${item.id}`,
            scene: {
              skin: item.skin,
              texture: item.texture,
              pack: product.image,
            },
          },
        ]
      : []
  })
}
