import Image from "next/image"

import ParallaxPhoto from "@/components/elements/parallax-photo"
import Rating from "@/components/elements/rating"
import { site } from "@/lib/site"
import type { ShopCoverProps } from "@/lib/types"

export default function ShopCover({ title, lede, image }: ShopCoverProps) {
  return (
    <section className="p-2 [--panel-inset:0.5] md:p-3 md:[--panel-inset:0.75]">
      <div className="relative h-[clamp(26rem,62svh,40rem)] overflow-hidden rounded-3xl bg-card">
        <ParallaxPhoto hero className="absolute inset-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </ParallaxPhoto>

        <div aria-hidden="true" className="nav-notch animate-notch-open" />

        <div className="dark absolute inset-x-0 bottom-0 flex h-3/4 items-end bg-linear-to-t from-background/80 via-background/25 to-transparent text-foreground">
          <div className="container flex w-full flex-wrap items-end justify-between gap-x-8 gap-y-4 pb-8 md:pb-10">
            <div>
              <h1 className="enter max-w-2xl text-5xl leading-none md:text-6xl">
                {title}
              </h1>
              <p className="enter mt-4 max-w-md text-muted-foreground delay-75 md:text-lg">
                {lede}
              </p>
            </div>
            <Rating
              value={site.rating.score}
              count={site.rating.count}
              className="enter delay-150"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
