import { cache } from "react"
import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs/promises"
import path from "path"

const contentDirectory = path.join(process.cwd(), "content")

export async function listMdx(folder: string) {
  try {
    const files = await fs.readdir(path.join(contentDirectory, folder))
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""))
  } catch {
    return []
  }
}

export const readMdx = cache(async (folder: string, slug: string) => {
  try {
    return await fs.readFile(
      path.join(contentDirectory, folder, `${slug}.mdx`),
      "utf8"
    )
  } catch {
    return null
  }
})

// Compiles only the frontmatter block, so listings and metadata never compile a body.
export async function readFrontmatter<T extends Record<string, unknown>>(
  source: string
) {
  const block = source.match(/^---\r?\n[\s\S]*?\r?\n---/)?.[0] ?? ""
  const { frontmatter } = await compileMDX<T>({
    source: block,
    options: { parseFrontmatter: true },
  })
  return frontmatter
}
