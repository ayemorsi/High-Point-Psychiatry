"use client"

import { useState } from "react"
import Image from "next/image"

import Reveal from "@/components/elements/reveal"
import SectionHeading from "@/components/elements/section-heading"
import { aboutImages, brandImages } from "@/lib/images"
import { site } from "@/lib/site"
import type { TeamMember } from "@/lib/types"
import { cn, spell } from "@/lib/utils"

const team: TeamMember[] = [
  {
    name: site.founder.name,
    role: "Founder, esthetician",
    line: `${site.founder.years} years of facials before the first bottle`,
    image: brandImages.lifeSilver,
  },
  {
    name: "Anna Keller",
    role: "Formulator",
    line: "Writes every formula and tests each batch",
    image: aboutImages.teamAnna,
  },
  {
    name: "Maya Lin",
    role: "Batch lead",
    line: "Mixes and fills each 400-bottle batch by hand",
    image: aboutImages.teamMaya,
  },
  {
    name: "Nora Hayes",
    role: "Esthetician, care team",
    line: "Answers every email within a day",
    image: aboutImages.teamNora,
  },
]

const people = spell(team.length)

const teamHeading = {
  title: "Who makes it",
  lede: `${people[0].toUpperCase()}${people.slice(1)} people, one studio in ${site.city}.`,
}

// From lg the four portraits share one row and the one you point at opens wide.
export default function AboutTeam() {
  const [active, setActive] = useState(0)

  return (
    <section className="px-2 pb-2 md:px-3 md:pb-3">
      <div className="dark rounded-3xl bg-background text-foreground">
        <div className="section-padding container">
          <Reveal>
            <SectionHeading
              title={teamHeading.title}
              lede={teamHeading.lede}
              align="center"
            />
          </Reveal>

          <Reveal delay={0.06} className="mt-10 md:mt-14">
            <ul className="grid gap-3 sm:grid-cols-2 lg:flex lg:h-144">
              {team.map((member, index) => (
                <li
                  key={member.name}
                  className={cn(
                    "transition-[flex-grow] duration-700 ease-soft lg:flex-1",
                    active === index && "lg:grow-[2.6]"
                  )}
                >
                  <button
                    type="button"
                    aria-pressed={active === index}
                    onPointerEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className="media group block aspect-3/4 w-full text-start outline-none focus-visible:ring-3 focus-visible:ring-ring lg:aspect-auto lg:h-full"
                  >
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background/80 to-transparent" />
                    <span className="absolute inset-x-5 bottom-5 block">
                      <span className="block font-medium whitespace-nowrap">
                        {member.name}
                      </span>
                      <span className="block text-sm whitespace-nowrap text-muted-foreground">
                        {member.role}
                      </span>
                      <span
                        className={cn(
                          "display-type mt-3 block max-w-xs text-xl leading-snug transition-opacity duration-500 lg:opacity-0",
                          active === index && "lg:opacity-100 lg:delay-200"
                        )}
                      >
                        {member.line}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
