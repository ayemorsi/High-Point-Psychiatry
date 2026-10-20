import Image from "next/image"

// Match the real Image's `sizes` (or fixed `width`) exactly, or the browser fetches a different file.
type PreloadImagesProps = { srcs: string[] } & (
  { sizes: string; width?: never } | { width: number; sizes?: never }
)

// Photos a click will reveal, fetched lazily as their section nears the viewport so the swap never shows an empty frame.
export default function PreloadImages({
  srcs,
  sizes,
  width,
}: PreloadImagesProps) {
  const unique = [...new Set(srcs)]
  if (unique.length === 0) return null

  // Absolute with no offsets keeps its in-flow spot for lazy loading without taking any space.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute size-px overflow-hidden opacity-0"
    >
      {unique.map((src) =>
        width ? (
          <Image key={src} src={src} alt="" width={width} height={width} />
        ) : (
          <Image key={src} src={src} alt="" fill sizes={sizes} />
        )
      )}
    </div>
  )
}
