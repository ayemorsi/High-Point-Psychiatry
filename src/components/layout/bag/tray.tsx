import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import type { BagLine } from "@/lib/types"
import { cn } from "@/lib/utils"

// Where each photo lands on the tray, by how many are in the bag.
const layouts = [
  [{ left: 28, top: 13, width: 44, tilt: "-rotate-2" }],
  [
    { left: 8, top: 17, width: 42, tilt: "-rotate-3" },
    { left: 50, top: 11, width: 42, tilt: "rotate-2" },
  ],
  [
    { left: 4, top: 25, width: 34, tilt: "-rotate-3" },
    { left: 33, top: 14, width: 34, tilt: "rotate-1" },
    { left: 62, top: 23, width: 34, tilt: "rotate-3" },
  ],
  [
    { left: 3, top: 17, width: 29, tilt: "-rotate-2" },
    { left: 25, top: 31, width: 29, tilt: "rotate-2" },
    { left: 46, top: 14, width: 29, tilt: "-rotate-1" },
    { left: 68, top: 29, width: 29, tilt: "rotate-3" },
  ],
  [
    { left: 2, top: 27, width: 26, tilt: "-rotate-3" },
    { left: 20, top: 13, width: 26, tilt: "rotate-2" },
    { left: 38, top: 33, width: 26, tilt: "-rotate-1" },
    { left: 55, top: 14, width: 26, tilt: "rotate-3" },
    { left: 72, top: 31, width: 26, tilt: "-rotate-2" },
  ],
]

// The bag as a flat lay: the newest five products, photographed on a tray.
export default function Tray({
  lines,
  active,
}: {
  lines: BagLine[]
  active: string | null
}) {
  const shown = lines.slice(-5)
  // A hovered line that isn't on the tray takes the oldest photo's place, so it can still be lifted.
  const hovered = lines.find((line) => line.key === active)
  if (hovered && !shown.includes(hovered)) shown[0] = hovered
  const layout = layouts[shown.length - 1]
  const hidden = lines.length - shown.length

  return (
    <div
      aria-hidden="true"
      className="relative hidden aspect-4/3 overflow-hidden rounded-3xl bg-card sm:block"
    >
      {shown.map((line, index) => {
        const slot = layout[index]
        return (
          <div
            key={line.key}
            style={{
              left: `${slot.left}%`,
              top: `${slot.top}%`,
              width: `${slot.width}%`,
            }}
            className={cn(
              // Not .media: it sets position relative, which would undo absolute.
              "absolute aspect-4/5 animate-in overflow-hidden rounded-2xl bg-card ring-4 ring-card transition duration-500 ease-soft zoom-in-95 fade-in",
              slot.tilt,
              active === line.key && "z-10 scale-105 rotate-0",
              active && active !== line.key && "opacity-40"
            )}
          >
            {line.image && (
              <Image
                src={line.image.src}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
            )}
          </div>
        )
      })}
      {hidden > 0 && (
        <Badge className="absolute right-3 bottom-3">+{hidden} more</Badge>
      )}
    </div>
  )
}
