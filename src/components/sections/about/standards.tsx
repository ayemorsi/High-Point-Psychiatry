import Image from "next/image"

import Fact from "@/components/elements/fact"
import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { aboutImages } from "@/lib/images"
import { site } from "@/lib/site"

const founder = site.founder.firstName

const images = {
  room: aboutImages.standardsRoom,
  treatment: aboutImages.standardsTreatment,
  patchTest: aboutImages.standardsPatchTest,
}

// Same grid as the home page's "What happens after you order", so the two read as one system.
export default function AboutStandards() {
  return (
    <section className="section-padding container">
      <Reveal>
        <SectionHeading title="What we leave out" />
      </Reveal>

      <Reveal delay={0.06} className="mt-10 md:mt-14">
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:h-160 lg:grid-cols-12 lg:grid-rows-2">
          <li className="group media col-span-2 aspect-4/5 md:aspect-3/2 lg:col-span-5 lg:row-span-2 lg:aspect-auto">
            <Image
              src={images.room.src}
              alt={images.room.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition duration-700 ease-soft group-hover:scale-103"
            />
            <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-background/85 p-5 backdrop-blur-md md:inset-x-4 md:bottom-4 md:p-6">
              <h3 className="text-2xl md:text-3xl">
                It started in {founder}&apos;s treatment room.
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                What her clients&apos; skin reacted to, we leave out.
              </p>
            </div>
          </li>

          <li className="media col-span-2 grid grid-cols-2 lg:col-span-7">
            <Fact
              label="Added fragrance in any formula"
              figure="0%"
              line="Not even essential oils. Scent was the first thing sensitive skin reacted to."
            />
            <div className="group relative overflow-hidden">
              <Image
                src={images.treatment.src}
                alt={images.treatment.alt}
                fill
                sizes="(min-width: 1024px) 30vw, 50vw"
                className="object-cover transition duration-700 ease-soft group-hover:scale-103"
              />
            </div>
          </li>

          <li className="dark flex rounded-2xl bg-background text-foreground lg:col-span-3">
            <Fact
              label="Drying alcohols"
              figure="None"
              line="Light textures come from water-based gels instead."
            />
          </li>

          <li className="group media flex lg:col-span-4">
            <div className="absolute inset-y-0 end-0 w-3/4 mask-l-from-50%">
              <Image
                src={images.patchTest.src}
                alt={images.patchTest.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 40vw"
                className="object-cover transition duration-700 ease-soft group-hover:scale-103"
              />
            </div>
            <Fact
              label="Animal ingredients"
              figure="None"
              line="Patch-tested on people with sensitive skin, never on animals."
              className="relative"
            />
          </li>
        </ul>
      </Reveal>
    </section>
  )
}
