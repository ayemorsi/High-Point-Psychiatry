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
- `src/lib/site.ts` holds the practice name, contact details and location.
- `src/lib/actions.ts` holds the newsletter and contact server actions. They are stubs that send nothing: connect an email or helpdesk provider there.
- `src/app/globals.css` holds the colors, fonts and radius tokens.
- `docs/IMAGE-CREDITS.md` lists where every placeholder photo comes from.
