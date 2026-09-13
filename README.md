# OFMA Website — v2 (Premium Redesign)

Official website for OFMA (Okeho Female Muslims' Ambassadors), a faith-based
nonprofit in Okeho, Oyo State, Nigeria.

## Tech Stack

- Plain HTML5, CSS3, vanilla JavaScript — no build step, no framework, no npm install required.
- [GSAP](https://gsap.com/) + ScrollTrigger (via CDN) — scroll reveals, hero text animation, magnetic buttons, count-up stats, page-transition curtain.
- [Swiper.js](https://swiperjs.com/) (via CDN) — testimonial and speaker carousels.
- Google Fonts: Space Grotesk, Instrument Serif, Inter, JetBrains Mono.

All libraries load from CDN in the `<head>`/before `</body>` of each page, so there is
nothing to install locally.

## How to run it

**Option A — VS Code Live Server (recommended)**
1. Open this folder in VS Code.
2. Install the "Live Server" extension (by Ritwick Dey) if you don't have it.
3. Right-click `index.html` → "Open with Live Server".
4. The site opens in your browser at `http://127.0.0.1:5500` (or similar) and hot-reloads on save.

**Option B — just open the file**
Double-click `index.html` to open it directly in a browser. Everything will work
except the page-transition curtain animation may feel slightly less smooth on
`file://` URLs in some browsers — Live Server (Option A) is recommended for the
truest experience, and is required if you later add a real form backend.

## Folder structure

```
ofma-website/
├── index.html          Home
├── about.html           About (mission, story, journey timeline, values)
├── programs.html        Programs (Summit 7.0, summit archive, other programmes)
├── people.html           People (leadership, speakers)
├── media.html            Media (photo gallery, videos, blog/news)
├── sponsor.html          Sponsor Us (giving levels, budget, scholar sponsorship)
├── donate.html            Donate (bank transfer details + form)
├── contact.html            Contact (details + message form)
├── css/
│   └── style.css        Full design system — colors, type, components, motion
├── js/
│   └── main.js           Nav, cursor, magnetic buttons, GSAP reveals, Swiper init
├── assets/
│   ├── photos/            Real event photos
│   └── flyers/             Official summit/programme flyer graphics
└── README.md
```

## Design system

- **Colors**: deep forest green (`--forest`, `--forest-deep`) + gold (`--gold`,
  `--gold-soft`) + warm cream/paper backgrounds + a terracotta accent — evokes
  Islamic art and the organisation's existing green/maroon branding, elevated.
- **Type**: Space Grotesk (headings, UI), Instrument Serif italic (accent words),
  Inter (body copy), JetBrains Mono (labels/kickers/numbers).
- **Motif**: an 8-point geometric star (khatam-inspired) used as a faint rotating
  hero background and as bullet marks in the marquee.
- **Motion**: page-load/exit curtain transition between pages, staggered
  scroll-triggered reveals (`data-reveal` / `data-reveal-group` +
  `data-reveal-item` attributes drive this — see `main.js`), animated count-up
  stats, magnetic buttons (`.magnetic` class), custom cursor on desktop,
  auto-scrolling marquee, image zoom on hover.

## Known placeholders — wire these up before real launch

1. **Contact / Sponsor / Donate forms** currently show a JS `alert()` on submit.
   Connect them to a real backend (e.g. [Formspree](https://formspree.io/),
   [Basin](https://usebasin.com/), or your own endpoint) by adding an `action`
   and `method` to each `<form>` and removing the `onsubmit` preview handler in
   the HTML.
2. **Online payments** — the Donate page currently shows bank transfer details
   only (Account: 3129540169, First Bank, Bello Faidat). If/when a Paystack (or
   similar) account is available, replace the donate form's submit handler with
   a real payment redirect.
3. **Speaker photos** — several speaker cards use text-only cards rather than
   photos. Add real headshots to `assets/photos/` and swap in an `<img>`
   wherever you see a placeholder.

## Editing content

All page content lives directly in each `.html` file — search for the text you
want to change and edit it in place. Shared elements (nav links, footer) are
duplicated across all 8 pages, so if you change a nav label or footer link,
update it in every page (or ask your developer to reintroduce the Python
template generator used to build this project, which keeps them in sync).
