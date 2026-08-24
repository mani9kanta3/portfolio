# manikanta.tech

Personal portfolio for Manikanta Pudi. Next.js App Router, TypeScript, Tailwind v4,
deployed on Vercel.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script              | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Dev server on port 3000         |
| `npm run build`     | Production build                |
| `npm run start`     | Serve the production build      |
| `npm run lint`      | ESLint                          |
| `npm run typecheck` | TypeScript, no emit             |

The scripts call `node ./node_modules/...` directly rather than using the
package binaries. This was originally a workaround: the parent folder used to be
named `Full Stack & AI`, and the ampersand broke npm's generated `.cmd` shims on
Windows, which split the path at the `&`. The folder has since been renamed, so
plain `next dev` works again, but the `node` form is harmless and portable.

## Layout

```
app/
  layout.tsx          Fonts, metadata, no-flash theme script
  page.tsx            Home page, all sections
  globals.css         Design tokens and base styles
  work/[slug]/        Case study pages, one per project
  sitemap.ts          Generated from the project list
components/           Header, footer, section heading, theme toggle
lib/projects.ts       Every project, as data
Portfolio Design/     The original Claude Design canvas export (reference only)
```

## Adding a project

Append an entry to `PROJECTS` in `lib/projects.ts`. It appears in the work grid,
gets a `/work/<slug>` case study, and lands in the sitemap. No layout changes.

Set `draft: true` to keep something out of the site while you write it.

`track` is `"ai"`, `"front-end"`, or `"full-stack"`, and drives the badge on the
card. Keep it honest: `medicare-hms` is `front-end` until its backend exists.

## Design

The visual source of truth is the artboard export in `Portfolio Design/`,
specifically the inline `:root` block at the top of `Portfolio.dc.html` and
`Portfolio Dark.dc.html`.

Do not take tokens from `Portfolio Design/_ds/modernist-*/styles.css`. That
stylesheet documents a red palette which the artboards deliberately override
with the warm cream and burnt orange the site actually uses.

Both artboards are structurally identical and differ only in colour, so light
and dark are one component tree over two sets of CSS variables, defined in
`app/globals.css`.

House rules from the design system:

- No border radius anywhere. Squares are deliberate.
- 2px rules between major sections, lighter rules inside a section's grid.
- Everything flush left, including button labels.
- Prose has no em dashes. The ones in labels like `01 — Selected work` are
  typography from the artboards and stay.

## Deploying

Pushes to `main` deploy to production on Vercel. Every other push gets a
preview URL.
