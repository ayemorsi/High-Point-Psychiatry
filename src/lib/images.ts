import type { ProductImage } from "@/lib/types"

// Free stock placeholders that show the art direction. Swap the files, keep the keys.
export const brandImages = {
  portraitSerum: {
    src: "/images/brand/portrait-serum.jpg",
    alt: "Woman with her eyes closed holding a serum dropper to her cheek",
  },
  portraitSilver: {
    src: "/images/brand/portrait-silver.jpg",
    alt: "Woman in her sixties with white hair resting her face in her hands",
  },
  portraitFreckles: {
    src: "/images/brand/portrait-freckles.jpg",
    alt: "Close portrait of a woman with auburn hair and freckles",
  },
  portraitOffer: {
    src: "/images/brand/portrait-offer.jpg",
    alt: "Young woman in a white cami seen in profile against a sand wall, bare skin in warm daylight",
  },
  lifeLinen: {
    src: "/images/brand/life-linen.jpg",
    alt: "Woman in a linen dress sitting against a white wall",
  },
  lifeSilver: {
    src: "/images/brand/life-silver.jpg",
    alt: "Woman in her sixties with silver hair seated in a pale dress",
  },
  productTube: {
    src: "/images/brand/product-tube.jpg",
    alt: "White tube standing on a peach background",
  },
  productFlatlay: {
    src: "/images/brand/product-flatlay.jpg",
    alt: "Bottles and jars with blank labels laid on linen",
  },
  textureCream: {
    src: "/images/brand/texture-cream.jpg",
    alt: "Smear of white cream on a beige surface",
  },
  textureSerum: {
    src: "/images/brand/texture-serum.jpg",
    alt: "Two discs of golden serum overlapping",
  },
  stepCleanse: {
    src: "/images/brand/step-cleanse.jpg",
    alt: "Woman massaging cleanser into her cheek at a mirror",
  },
  stepTreat: {
    src: "/images/brand/step-treat.jpg",
    alt: "Amber dropper bottle on a cork block",
  },
  stepMoisturize: {
    src: "/images/brand/step-moisturize.jpg",
    alt: "Woman pressing a dab of cream into her cheek",
  },
  stepProtect: {
    src: "/images/brand/step-protect.jpg",
    alt: "White pump bottle in strong sunlight with a long shadow",
  },
} satisfies Record<string, ProductImage>

export const homeImages = {
  textureCleanse: {
    src: "/images/home/texture-cleanse.jpg",
    alt: "Dollop of white cleansing milk on a peach surface",
  },
  textureProtect: {
    src: "/images/home/texture-protect.jpg",
    alt: "Pools of sunscreen, gel and oil side by side",
  },
  concernDryness: {
    src: "/images/home/concern-dryness.jpg",
    alt: "Close crop of a woman's cheek, bare and matte with dry, papery skin",
  },
  concernDrynessAfter: {
    src: "/images/home/concern-dryness-after.jpg",
    alt: "The same cheek eight weeks later, supple and no longer flaking",
  },
  concernDullness: {
    src: "/images/home/concern-dullness.jpg",
    alt: "Woman facing the camera, bare skin with no light in it",
  },
  concernDullnessAfter: {
    src: "/images/home/concern-dullness-after.jpg",
    alt: "The same face eight weeks later, tone even and rested",
  },
  concernFineLines: {
    src: "/images/home/concern-fine-lines.jpg",
    alt: "Woman in her sixties with silver hair and lines at the corner of her eye",
  },
  concernFineLinesAfter: {
    src: "/images/home/concern-fine-lines-after.jpg",
    alt: "The same eye eight weeks later, the same lines sitting softer",
  },
  concernRedness: {
    src: "/images/home/concern-redness.jpg",
    alt: "Fair skin with a pink flush high on both cheeks and across the nose",
  },
  concernRednessAfter: {
    src: "/images/home/concern-redness-after.jpg",
    alt: "The same cheeks eight weeks later, the flush settled",
  },
  concernOiliness: {
    src: "/images/home/concern-oiliness.jpg",
    alt: "Close crop of a T-zone with shine across the forehead and the nose",
  },
  concernOilinessAfter: {
    src: "/images/home/concern-oiliness-after.jpg",
    alt: "The same T-zone eight weeks later, matte and comfortable",
  },
  concernDarkSpots: {
    src: "/images/home/concern-dark-spots.jpg",
    alt: "Sun spots scattered across a woman's cheekbone in warm light",
  },
  concernDarkSpotsAfter: {
    src: "/images/home/concern-dark-spots-after.jpg",
    alt: "The same cheekbone eight weeks later, the spots lighter",
  },
  resultsPortrait: {
    src: "/images/home/results-portrait.jpg",
    alt: "Profile of a woman with natural curls and bare, even skin",
  },
  journalLayering: {
    src: "/images/home/journal-layering.jpg",
    alt: "Cream, gel and oil laid out in the order they go on",
  },
} satisfies Record<string, ProductImage>

export const aboutImages = {
  teamAnna: {
    src: "/images/about/team/anna.jpg",
    alt: "Anna Keller in a white lab coat at a workbench, holding a small beaker of milky serum",
  },
  teamMaya: {
    src: "/images/about/team/maya.jpg",
    alt: "Maya Lin in a linen apron, filling amber dropper bottles through a steel funnel",
  },
  teamNora: {
    src: "/images/about/team/nora.jpg",
    alt: "Nora Hayes in a knit sweater, smiling at a desk with a laptop and a notebook",
  },
  standardsRoom: {
    src: "/images/about/standards/room.jpg",
    alt: "An empty treatment room with a facial bed, folded linen towels and a trolley of glass bottles",
  },
  standardsTreatment: {
    src: "/images/about/standards/treatment.jpg",
    alt: "An esthetician pressing cream into a client's cheek on a facial bed",
  },
  standardsPatchTest: {
    src: "/images/about/standards/patch-test.jpg",
    alt: "Three dabs of cream in a row on an inner forearm during a patch test",
  },
  standardsMixing: {
    src: "/images/about/standards/mixing.jpg",
    alt: "Thick white cream turning in a steel mixing vessel on a workbench",
  },
  ordering: {
    src: "/images/about/ordering.jpg",
    alt: "An open mailer box lined with tissue paper holding a dropper bottle, a jar and a tube, as a hand tucks in a card",
  },
} satisfies Record<string, ProductImage>
