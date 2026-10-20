# High Point Psychiatry

Website for High Point Psychiatry (HPP), Michigan.

Built with Next.js 16 (App Router), Tailwind 4 and shadcn/ui.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customizing

- Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your domain. It feeds canonical links, the sitemap and share cards.
- `src/lib/site.ts` holds the practice name, email, region and crisis line.
- Page copy lives in `src/components/sections/` (home, about, contact). The FAQ is in `src/components/sections/contact/questions.tsx`.
- `src/lib/actions.ts` holds the contact form's server action. It is a stub that sends nothing: connect an email or helpdesk provider there.
- Legal pages are `content/legal/*.mdx`.
- `src/app/globals.css` holds the colors, fonts and radius tokens.
- `docs/IMAGE-CREDITS.md` lists where the placeholder photos come from.
- Blocks from shadcnblocks.com install with `npx shadcn add @shadcnblocks/<block>`.
