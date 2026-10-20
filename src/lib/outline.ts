// Marching squares over a rendered glyph, so a letter morphs as path data without a font parser.

import type { Point, Ring } from "@/lib/types"

// Each contour point sits on one grid edge, so edges key the stitching with no float rounding.
const SEGMENTS: [number, number][][] = [
  [],
  [[3, 0]],
  [[0, 1]],
  [[3, 1]],
  [[1, 2]],
  [
    [3, 0],
    [1, 2],
  ],
  [[0, 2]],
  [[3, 2]],
  [[2, 3]],
  [[2, 0]],
  [
    [0, 1],
    [2, 3],
  ],
  [[2, 1]],
  [[1, 3]],
  [[1, 0]],
  [[0, 3]],
  [],
]

export function traceRings(
  alpha: Uint8ClampedArray,
  width: number,
  height: number,
  threshold = 128
): Ring[] {
  const at = (x: number, y: number) => alpha[(y * width + x) * 4 + 3]
  const edges = new Map<string, string>()
  const points = new Map<string, Point>()

  const key = (edge: number, x: number, y: number) => {
    // 0 top, 1 right, 2 bottom, 3 left — folded onto shared grid edges.
    if (edge === 0) return `h${x},${y}`
    if (edge === 2) return `h${x},${y + 1}`
    if (edge === 3) return `v${x},${y}`
    return `v${x + 1},${y}`
  }

  const place = (edge: number, x: number, y: number) => {
    const id = key(edge, x, y)
    if (points.has(id)) return id
    const cut = (a: number, b: number) => {
      const span = b - a
      return span === 0 ? 0.5 : (threshold - a) / span
    }
    if (edge === 0) points.set(id, { x: x + cut(at(x, y), at(x + 1, y)), y })
    else if (edge === 2)
      points.set(id, { x: x + cut(at(x, y + 1), at(x + 1, y + 1)), y: y + 1 })
    else if (edge === 3)
      points.set(id, { x, y: y + cut(at(x, y), at(x, y + 1)) })
    else
      points.set(id, { x: x + 1, y: y + cut(at(x + 1, y), at(x + 1, y + 1)) })
    return id
  }

  for (let y = 0; y < height - 1; y++) {
    for (let x = 0; x < width - 1; x++) {
      const code =
        (at(x, y) >= threshold ? 1 : 0) |
        (at(x + 1, y) >= threshold ? 2 : 0) |
        (at(x + 1, y + 1) >= threshold ? 4 : 0) |
        (at(x, y + 1) >= threshold ? 8 : 0)
      for (const [from, to] of SEGMENTS[code]) {
        edges.set(place(from, x, y), place(to, x, y))
      }
    }
  }

  const rings: Ring[] = []
  const used = new Set<string>()
  for (const start of edges.keys()) {
    if (used.has(start)) continue
    const ring: Ring = []
    let cursor: string | undefined = start
    while (cursor && !used.has(cursor)) {
      used.add(cursor)
      const point = points.get(cursor)
      if (point) ring.push(point)
      cursor = edges.get(cursor)
    }
    if (ring.length > 8) rings.push(ring)
  }
  return rings
}

export function area(ring: Ring) {
  let total = 0
  for (let i = 0; i < ring.length; i++) {
    const a = ring[i]
    const b = ring[(i + 1) % ring.length]
    total += a.x * b.y - b.x * a.y
  }
  return total / 2
}

export function centroid(ring: Ring): Point {
  let x = 0
  let y = 0
  for (const point of ring) {
    x += point.x
    y += point.y
  }
  return { x: x / ring.length, y: y / ring.length }
}

// Even spacing by arc length, so two rings of the same count interpolate evenly.
export function resample(ring: Ring, count: number): Ring {
  const lengths: number[] = [0]
  for (let i = 1; i <= ring.length; i++) {
    const a = ring[i - 1]
    const b = ring[i % ring.length]
    lengths.push(lengths[i - 1] + Math.hypot(b.x - a.x, b.y - a.y))
  }
  const total = lengths[ring.length]
  if (!total) return Array.from({ length: count }, () => ring[0])

  const out: Ring = []
  let cursor = 1
  for (let i = 0; i < count; i++) {
    const target = (total * i) / count
    while (cursor < ring.length && lengths[cursor] < target) cursor++
    const before = lengths[cursor - 1]
    const segment = lengths[cursor] - before || 1
    const t = (target - before) / segment
    const a = ring[cursor - 1]
    const b = ring[cursor % ring.length]
    out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })
  }
  return out
}

// Spin the target so its first point sits nearest the source's, or the letter twists as it morphs.
export function align(source: Ring, target: Ring): Ring {
  let best = 0
  let bestCost = Infinity
  for (let shift = 0; shift < target.length; shift++) {
    let cost = 0
    for (let i = 0; i < source.length; i++) {
      const a = source[i]
      const b = target[(i + shift) % target.length]
      cost += (a.x - b.x) ** 2 + (a.y - b.y) ** 2
      if (cost > bestCost) break
    }
    if (cost < bestCost) {
      bestCost = cost
      best = shift
    }
  }
  return target.map((_, i) => target[(i + best) % target.length])
}

export function rectRing(
  x: number,
  y: number,
  width: number,
  height: number,
  count: number
): Ring {
  const corners: Ring = [
    { x, y },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height },
  ]
  return resample(corners, count)
}
