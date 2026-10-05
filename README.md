# Creator Mitra

A responsive, light website and interactive frontend demonstration for an Indian creator collaboration platform. Built with Next.js 16, React 19, TypeScript, Manrope, and Lucide icons. Creator photography is AI-generated and served locally as optimized WebP assets.

## Run locally

Node.js 24 and npm 11 were used for validation. Install and start:

```sh
npm ci
npm run dev
```

Development uses port 3000. For the production server:

```sh
npm run build
npm start
```

For the cloud environment, use the existing `/workspace/creatormitra` checkout. Each cloud task is already isolated; creating another worktree is unnecessary.

## Features

- Homepage with all 15 briefed sections, sticky navigation, and responsive layouts.
- Creator directory with search, platform/category/city/language/audience/engagement filters, sorting, and persistent shortlists.
- Six detailed fictional creator profiles and a Mitra Score concept.
- Six-step campaign builder with validation, creator invitation context, local drafts, and downloadable briefs.
- Five-step creator onboarding with validation and downloadable demo profiles.
- Campaign workspace with overview, shortlists, content approvals, analytics, payments structure, and CSV export.
- Dedicated brand and creator pages, eight service pages, UGC storyboard concepts, campaign opportunity examples, case study listings/detail pages, and journal listings/articles.
- About, careers, contact draft form, login preview, privacy, terms, and a custom recovery page.
- Page metadata, social preview image, favicon, WebSite/BlogPosting/FAQ structured data, robots, and a configurable sitemap.
- Local fonts and images; no third-party browser asset requests or analytics.
- Keyboard focus indicators, semantic labels, reduced-motion support, and mobile navigation.

## Important demo boundaries

This is a frontend demonstration, not a connected campaign platform. There is no database, authentication, email delivery, social API integration, payment processing, or real campaign submission. The login route explains this and opens the demo workspace without asking for credentials. All creator identities, badges, scores, pricing, partnerships, quotes, opportunities, and campaign metrics are fictional or illustrative and labelled accordingly. UGC cards are storyboard concepts, not playable videos.

Campaign briefs, creator profile drafts, contact drafts, shortlists, and content approvals are saved only in browser local storage under the `mitra:` prefix. No form details are sent to a server. Download controls create local files. Clearing browser site data removes saved drafts. Do not use confidential information in this demo.

## Content and architecture

```text
app/             Server-rendered routes, metadata, global/home/workspace styles
components/      Shared UI, navigation, cards, product previews, forms, workspace
lib/data.ts      Editable fictional profiles, services, case studies, and journal
lib/storage.ts   Browser storage helpers
lib/use-local.ts Hydration-safe external-store subscription
public/images/   Four fictional creator portraits, optimized as WebP
tests/          Browser-based integration and accessibility checks
```

Replace the marked homepage partner wordmarks, vision figures, testimonials, campaign metrics, and sample profiles with verified content before public launch. Confirm legal business details, actual contact/social links, operational services, and final legal policies. The current social icons link to contact options rather than invented social accounts.

## Production SEO

Set `NEXT_PUBLIC_SITE_URL` to your confirmed HTTPS origin before building. Without it, development metadata uses localhost and the sitemap intentionally has no invented production URLs. Update production metadata and review indexability before deployment. Demo workspaces and onboarding routes are excluded in robots rules; that is not an access-control mechanism.

For remote development through a tunnel, add its specific verified hostname to `allowedDevOrigins` in `next.config.ts`. The default allows the local browser test origin `127.0.0.1` and Next.js's built-in localhost origins.

## Validation

```sh
npm run typecheck
npm run lint
npm run build
npm test
# Or test the built production server (stop any existing server first):
npm run test:production
```

Playwright runs desktop and mobile Chromium projects. It uses `/usr/bin/chromium` by default; set `CHROMIUM_PATH` if your browser binary is elsewhere. Tests exercise routing, layout overflow, creator discovery/shortlists, campaign briefs, creator signup, content approval persistence, downloads, contact drafts, navigation, recovery pages, and automated WCAG A/AA checks.

`npm run format` formats the source. Live processes must restart when a cloud task is restored; installed dependencies and files can be retained in the published environment snapshot.

## GitHub Pages preview

The static build supports this repository’s Pages path, including client navigation, local photographs, fonts, and interactive browser-only flows.

```sh
npm run build:pages
npm run preview:pages
# Run the full browser suite against the exported website:
npm run test:pages
```

The exported website is in `.next-export/`. A tested copy is also uploaded to the `gh-pages` branch. To activate that preview, open the repository's **Settings → Pages**, select **Deploy from a branch**, choose **gh-pages** and **/ (root)**, then save. GitHub builds and publishes the website after this setting is enabled. The `.nojekyll` file preserves Next.js's `_next` assets.

For future deployment through GitHub Actions, change the Pages source to **GitHub Actions**, then manually run **Publish Creator Mitra preview** from Actions. The workflow in `.github/workflows/pages.yml` builds and publishes the current source. A live URL is established only after a deployment succeeds; making a repository public alone does not publish a website.

The intended project URL is `https://aitoolsvila.github.io/creatormitra/`. This is a demo website with local browser storage; it remains unsuitable for real payments, authenticated accounts, or delivery of contact forms without connecting production services.
