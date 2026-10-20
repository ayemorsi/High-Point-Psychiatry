import Image from "next/image"

import Reveal from "@/components/elements/reveal"
import { team } from "@/lib/team"

// Adapted from shadcnblocks Team 40: one row per person with a portrait, role and short bio.
export default function AboutTeam() {
  return (
    <section id="team" className="section-padding container scroll-mt-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 md:gap-14">
        <Reveal>
          <p className="eyebrow">Our team</p>
          <h2 className="mt-4 max-w-xl text-4xl md:text-5xl">
            The people behind your care
          </h2>
        </Reveal>

        <ul className="border-t">
          {team.map((member, index) => (
            <li key={member.name} className="border-b">
              <Reveal
                delay={index * 0.06}
                className="flex flex-col gap-6 py-8 sm:flex-row sm:items-start sm:gap-10 md:py-10"
              >
                <Portrait name={member.name} image={member.image} />
                <div className="flex flex-col">
                  <h3 className="text-3xl md:text-4xl">
                    {member.name}
                    {member.credentials && (
                      <span className="ms-2 font-text text-base font-medium tracking-normal text-muted-foreground md:text-lg">
                        {member.credentials}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm font-medium">{member.role}</p>
                  <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Portrait({
  name,
  image,
}: {
  name: string
  image?: { src: string; alt: string }
}) {
  if (image) {
    return (
      <div className="media relative size-28 shrink-0 md:size-36">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="9rem"
          className="object-cover"
        />
      </div>
    )
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")

  return (
    <div
      aria-hidden="true"
      className="arc-field grid size-28 shrink-0 place-items-center rounded-2xl bg-card [--arc-inner:2.5rem] [--arc-outer:3.25rem] [--arc-strength:6%] md:size-36"
    >
      <span className="display-type text-3xl md:text-4xl">{initials}</span>
    </div>
  )
}
