# Together, with love

A gentle, mobile-friendly family support website. It shares a story, updates, photographs, and approved external ways to help. The initial version contains only clearly labeled placeholders. No personal details, real medical updates, payment accounts, or contact information have been published.

## Hosting

This site uses free GitHub Pages hosting from the **main** branch and **repository root (`/`)**. It is plain HTML, CSS, and JavaScript with no package installation, build step, backend, database, analytics, or visitor forms. `.nojekyll` tells Pages to serve the files directly.

Website: https://hurstpreston-creator.github.io/family-support-site/

Repository: https://github.com/hurstpreston-creator/family-support-site

## Files

| File | Purpose |
| --- | --- |
| `site-config.js` | All editable family text, donation URLs, updates, and photo paths |
| `index.html` | Accessible page structure, initial fallback copy, and sharing metadata |
| `styles.css` | Layout, colors, mobile styles, and reduced-motion support |
| `script.js` | Renders configuration safely as text and handles the mobile menu |
| `assets/` | Local images and neutral illustrations |
| `.nojekyll` | Publishes static files without Jekyll |

## Family name, introduction, and story

Edit `site-config.js`:

- `familyName`: footer copyright name.
- `familySignature`: signoff below the story.
- `introduction`: welcome paragraph.
- `storyLead` and `storyParagraphs`: the story.
- `storyIsPlaceholder`: keep `true` until the story is approved. Set `false` to remove its placeholder label.
- `pageTitle` and `description`: browser title and search description.
- `contactText`: optional, approved public contact text; blank by default.

The top launch notice in `index.html` is intentionally explicit about placeholders. Revise it only once the relevant placeholders are replaced and approved. Also update the title, description, and Open Graph tags directly in `index.html` when personalizing: many social crawlers do not run JavaScript. Keep the meaningful no-JavaScript story fallback there in sync.

## Add photographs

1. Obtain consent from everyone identifiable in each photo, including appropriate permission for children.
2. Remove location/EXIF metadata before uploading. Resize to about 1600px wide and compress to JPG, WebP, AVIF, or PNG.
3. Put approved photos in `assets/`. Use simple lowercase names without spaces, such as `family-gathering.jpg`.
4. Set `heroPhoto.src` to `assets/family-gathering.jpg`, add a descriptive `alt`, and edit its `caption`.
5. Replace `src`, `alt`, and `caption` in `photos`, or add more objects to the array.

Empty photo paths produce labeled neutral placeholders. Only local `assets/` raster image paths with meaningful alt text are rendered; remote images are deliberately unsupported. No stock photograph is presented as this family.

## Add a family update

Add a new object at the **beginning** of `updates` in `site-config.js`:

```js
{
  date: "YYYY-MM-DD", // Replace with the actual publication date.
  category: "Family announcement",
  title: "Your family-approved title",
  body: "Your family-approved update text.",
  example: false
},
```

Use a real ISO date, for example year-month-day. Categories can include Treatment update, Family announcement, Milestone, or Personal message. Remove the example entries when real updates are published, or leave `example: true` so examples remain explicitly marked. Example cards have “Date to be added” instead of fabricated dates. New entries appear in array order. Keep commas between objects and strings inside quotes. Never paste private documents or unapproved medical details.

## Configure donation links

The **`donations` array in `site-config.js` is the single location for all payment links**. All URLs start empty. Until real links are supplied, the site shows “Donation information coming soon” and a plain-text note about planned providers. The hero also explains that donation links are being prepared.

Paste a real, family-approved HTTPS campaign/profile URL into the corresponding `url`. GoFundMe, Venmo, and PayPal entries require the matching provider's official domain. An additional service may be added by appending `{ name: "Provider name", url: "" }` and then supplying its real HTTPS URL. URLs with embedded credentials, common placeholder markers, or HTTP are rejected. These checks are basic safeguards; they do **not** verify account ownership. Verify every destination and recipient manually before publishing.

The **first valid configured provider** appears as the main “Donate with [provider]” button; other active services appear as alternatives below. Reorder the array to choose the primary provider. A campaign with its story and goal is a useful first choice, but there is no universal best provider order. Empty/invalid services do not clutter the active list. Approved links also appear in the footer, open in a new tab, and use `noopener noreferrer`. Header, hero, and footer support links all lead to Ways to Help. The site never handles payments or asks for payment details. Do not add API keys, account credentials, payment secrets, or invented accounts.

Set `supportPurpose` to an approved, factual explanation of what donations will help cover. Blank values keep a clearly labeled placeholder. Do not invent budgets, medical claims, or fundraising uses.

## Optional fundraising goal and gauge

The gauge is **off by default**. Prefer the campaign provider’s own current figures unless the family can maintain a separate accurate snapshot. To enable it, populate `fundraising` in `site-config.js` with `enabled: true`, a positive numeric `goal`, a nonnegative numeric `raised`, a three-letter `currency`, a valid nonfuture `asOf` date in `YYYY-MM-DD` format, and a nonempty `scope` explaining what is counted. At least one donation provider URL must also be configured. Invalid or incomplete settings leave the whole gauge hidden.

The display explicitly says it is family-updated, dated, and not live. It never connects to an account or updates automatically. Verify every number with the family, avoid counting the same funds twice, and turn it off if it cannot be maintained. Do not add sample amounts to the public configuration. Read [USABILITY.md](USABILITY.md) for the research, limitations, and design rationale.

## Baseline and sharing

The initial site is preserved on the [`baseline-2026-11-02`](https://github.com/hurstpreston-creator/family-support-site/tree/baseline-2026-11-02) branch at commit `b46e07eb19693fcf148276026d76b7aeaaa5a843`. Publish new changes on `main`; keep the baseline branch unchanged.

“Copy page link” copies only the configured canonical `siteUrl`, never a visitor’s query parameters. It collects no visitor data. If clipboard access is unavailable, a read-only field provides the link for manual copying. Real family-approved photos and words will provide the strongest personal connection; generic placeholders intentionally remain until consent.

## Publish changes

In GitHub, edit the file and commit to `main`; or use Codex to change the files and commit/push to `main`. GitHub Pages publishes the repository root automatically. Check **Actions → pages build and deployment** and **Settings → Pages** for status. Publication may take several minutes. Refresh the public website after deployment, check the content, and open it on a phone.

If hosting needs to be configured again: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**. Do not select a paid hosting option.

## Work with Codex

Open this repository in Codex and describe the exact change. Useful requests:

- “Replace the story with this family-approved text and update search/social metadata.”
- “Add this approved update at the beginning of site-config.js with its publication date.”
- “Add these consented photos, strip their metadata, and write descriptive alt text.”
- “Configure these verified donation URLs and check that the destinations match.”

Ask Codex to preview desktop and phone layouts, check navigation and payment links, and commit/push the changes. There are no dependencies to install. For an optional local preview, use any static server (for example `python -m http.server 8080` if Python is installed) from the repository directory, then open `http://localhost:8080`. Stop the server afterward. Opening `index.html` directly also works for basic review because configuration uses local deferred scripts rather than fetch.

## Optional custom domain later

No domain is needed and none has been purchased. If you already own a domain and later choose to use it, follow GitHub's current official guide: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site . Set the domain in **Settings → Pages**, add the DNS records specified by GitHub at your registrar, verify ownership as recommended, and enable HTTPS once available. A domain may incur registrar fees; GitHub Pages remains the host. Do not add a `CNAME` file until a domain is actually selected and configured. Update `siteUrl` and social metadata after changing the address.

## Privacy and review checklist

This repository and everything deployed from it are public. Deleted information may remain in Git history, caches, and copies. Obtain consent **before committing** identifying text, medical information, contact details, or photographs. Never upload private medical documents. The family-specific diagnosis is deliberately absent from this initial website and README.

There are no analytics scripts, external fonts, trackers, message forms, browser storage, or external image requests. GitHub may log requests as part of operating Pages; external donation providers apply their own privacy policies. The encouragement section is informational only and does not collect submissions.

Before every release, check:

- Story and dates are accurate and approved; examples remain clearly labeled.
- No secrets, private documents, or unapproved details are in files or images.
- Donation destinations are genuine, approved, and point to the intended recipient.
- Menu, section links, keyboard focus, and mobile layout work.
- Social previews use approved content. `assets/social-card.png` is a generic 1200 × 630 preview illustration; its editable source is `assets/social-card.svg`. To use a different preview, replace the `og:image` with an approved absolute JPG/PNG URL (about 1200 × 630).
- GitHub Pages has finished deploying and the live page displays the latest change.
