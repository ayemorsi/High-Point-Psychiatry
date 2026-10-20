# Nacre NextJS Template

Nacre NextJS Template is a premium ecommerce template built by https://www.shadcnblocks.com

A four-step skincare storefront: warm ivory, ink buttons, an editorial serif and large rounded photography.

- [Demo](https://nacre-nextjs-template.vercel.app/)
- [Documentation](https://www.shadcnblocks.com/docs/templates/getting-started)

## Screenshot

![Nacre NextJS Template screenshot](./public/og-image.jpg)

## Getting Started

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customizing

- Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your domain. It feeds canonical links, the sitemap and share cards. On Vercel the production domain is used when it is unset.
- `src/lib/site.ts` holds the store name, contact details, currency, shipping, discounts and store rating.
- `src/lib/products.ts` holds the 18-product catalog. Pages read it only through `getProducts()`, `getProduct()` and `getProductsByStep()`, so connecting your commerce API means replacing those functions.
- `src/lib/pricing.ts` holds every discount and shipping rule. A real checkout should price the order on the server.
- `src/lib/actions.ts` holds the newsletter, contact and restock-alert server actions. They are stubs that send nothing: connect your email or helpdesk provider there.
- Checkout, account sign-in and payment are front-end demos. The card fields are for show; use your payment provider's hosted fields.
- Journal articles are `content/journal/*.mdx`, with title, date and image in the frontmatter. Legal pages are `content/legal/*.mdx` and read store details from `site.ts`.
- `src/app/globals.css` holds the colors, fonts and radius tokens.
- `docs/IMAGE-CREDITS.md` lists where every placeholder photo comes from.

## Tech Stack

- Nextjs 16 / App Router
- Tailwind 4
- shadcn/ui

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.
