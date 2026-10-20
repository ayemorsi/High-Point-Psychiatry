import type { Ingredient } from "@/lib/types"

const image = (file: string, alt: string) => ({
  src: `/images/ingredients/${file}.jpg`,
  alt,
})

export const ingredients = {
  squalane: {
    name: "Squalane",
    job: "Softens skin without a greasy feel",
    image: image("squalane", "Ripe olives beside a thin pool of clear oil"),
  },
  oatOil: {
    name: "Oat oil",
    job: "Calms dry, itchy skin",
    image: image("oat-oil", "Rolled oats beside a pool of pale golden oil"),
  },
  vitaminE: {
    name: "Vitamin E",
    job: "Protects skin from sun and pollution damage",
    image: image("vitamin-e", "Amber vitamin E capsules, one leaking oil"),
  },
  oatMilk: {
    name: "Oat milk",
    job: "Cleans without drying skin out",
    image: image("oat-milk", "A dish of oat milk with whole oat grains"),
  },
  glycerin: {
    name: "Glycerin",
    job: "Draws water into your skin",
    image: image("glycerin", "A thick clear drop falling from a glass rod"),
  },
  ceramides: {
    name: "Ceramides",
    job: "Strengthens your skin's outer layer",
    image: image("ceramides", "A swirl of thick white cream"),
  },
  papayaEnzyme: {
    name: "Papaya enzyme",
    job: "Dissolves dead skin cells",
    image: image("papaya-enzyme", "Half a papaya with its seeds showing"),
  },
  ricePowder: {
    name: "Rice powder",
    job: "Lifts oil and smooths texture",
    image: image("rice-powder", "Fine rice powder beside raw rice grains"),
  },
  allantoin: {
    name: "Allantoin",
    job: "Soothes skin after exfoliating",
    image: image("allantoin", "Comfrey leaves beside a heap of white powder"),
  },
  vitaminC: {
    name: "Vitamin C",
    job: "Brightens tone and fades spots",
    image: image("vitamin-c", "Half an orange beside a drop of amber serum"),
  },
  ferulicAcid: {
    name: "Ferulic acid",
    job: "Keeps vitamin C stable",
    image: image("ferulic-acid", "Rice bran beside dry wheat stalks"),
  },
  hyaluronicAcid: {
    name: "Hyaluronic acid",
    job: "Pulls water into your skin",
    image: image("hyaluronic-acid", "A single domed drop of clear gel"),
  },
  panthenol: {
    name: "Panthenol",
    job: "Soothes and softens",
    image: image("panthenol", "An arc of clear gel spread across paper"),
  },
  retinal: {
    name: "Retinal",
    job: "Softens fine lines over time",
    image: image("retinal", "A dropper releasing one drop of gold serum"),
  },
  bisabolol: {
    name: "Bisabolol",
    job: "Calms redness from retinal",
    image: image("bisabolol", "Fresh chamomile flowers"),
  },
  niacinamide: {
    name: "Niacinamide",
    job: "Evens tone and controls oil",
    image: image("niacinamide", "A pool of milky white serum"),
  },
  zincPca: {
    name: "Zinc PCA",
    job: "Keeps shine down through the day",
    image: image("zinc-pca", "Pale grey stones beside a heap of white powder"),
  },
  greenTea: {
    name: "Green tea",
    job: "Calms redness and irritation",
    image: image("green-tea", "Loose green tea beside two fresh tea leaves"),
  },
  peptides: {
    name: "Peptides",
    job: "Help skin look firmer",
    image: image("peptides", "A pearly swirl of silky cream"),
  },
  caffeine: {
    name: "Caffeine",
    job: "Reduces morning puffiness",
    image: image("caffeine", "A heap of raw green coffee beans"),
  },
  sheaButter: {
    name: "Shea butter",
    job: "Slows water loss",
    image: image("shea-butter", "A block of raw shea butter with shea nuts"),
  },
  oatExtract: {
    name: "Oat extract",
    job: "Calms redness and itch",
    image: image("oat-extract", "Fresh oat stalks with their grain heads"),
  },
  aloe: {
    name: "Aloe",
    job: "Cools and soothes",
    image: image("aloe", "A cut aloe leaf showing the clear gel inside"),
  },
  rosehipOil: {
    name: "Rosehip oil",
    job: "Softens rough, dry patches",
    image: image("rosehip-oil", "Red rosehips beside a pool of orange oil"),
  },
  jojobaOil: {
    name: "Jojoba oil",
    job: "Seals water in without clogging pores",
    image: image("jojoba-oil", "Jojoba seeds beside a pool of golden oil"),
  },
  centella: {
    name: "Centella",
    job: "Calms and repairs overnight",
    image: image("centella", "A cluster of round gotu kola leaves"),
  },
  zincOxide: {
    name: "Zinc oxide",
    job: "Blocks UVA and UVB",
    image: image("zinc-oxide", "A mound of pure white mineral powder"),
  },
  ironOxides: {
    name: "Iron oxides",
    job: "Give the tint its color",
    image: image("iron-oxides", "Three mounds of pigment from beige to brown"),
  },
} satisfies Record<string, Ingredient>
