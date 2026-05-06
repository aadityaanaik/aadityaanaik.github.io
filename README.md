# Aditya Naik — Portfolio

Personal portfolio site for **Aditya Naik**, Senior Data Engineer based in Seattle, WA. Live at [aadityaanaik.github.io](https://aadityaanaik.github.io).

---

## Overview

An Apple-inspired, fully static portfolio with interactive physics animations. No frameworks, no build tools — pure HTML, CSS, and vanilla JavaScript.

### Design Influences
- **Apple.com** — minimalist layout, large typography, glassmorphism cards, smooth scroll-reveal
- **Google Gravity** — interactive antigravity canvas where tech skills behave as physics objects with real collision, gravity, and bounce

---

## Features

### Visual & Animation
- **Particle canvas** — 90 floating particles in the hero with mouse-repel physics and networked connections
- **Antigravity skill canvas** — 39 tech pills rendered as physics objects; gravity pulls them down, periodic kicks launch them upward, mouse pushes them around, and they collide with each other and the walls
- **Parallax orbs** — three radial-gradient blobs in the hero that shift on scroll
- **Scroll-reveal** — elements fade and slide up as they enter the viewport via `IntersectionObserver`
- **Animated counters** — stats (5+, $6M+, 1.5B, 100TB+) count up with an ease-out curve when scrolled into view
- **Spring hover animations** — cards lift and scale with `cubic-bezier(0.34,1.56,0.64,1)` spring easing

### Layout Sections
| Section | Description |
|---|---|
| **Hero** | Full-screen dark section with animated gradient name, particle canvas, and parallax orbs |
| **Stats Band** | Four animated counters summarizing career impact |
| **About** | Bio, education cards, certification chips, and contact links |
| **Experience** | Timeline with glassmorphism cards for TikTok and HSBC |
| **Projects** | Six-card grid with real GitHub links |
| **Antigravity** | Interactive physics canvas — hover/drag to push tech pills |
| **Skills** | Six grouped panels by category (Languages, Big Data, Cloud, Databases, BI, DevOps) |
| **Footer** | Full-width CTA with contact info |

### UX
- Sticky blur nav that activates on scroll
- Mobile hamburger menu with fullscreen overlay
- Touch support on the antigravity canvas
- Active section highlighting in the nav
- Responsive down to 375px

---

## Project Structure

```
portfolio/
├── index.html          # Single-page markup
├── styles/
│   └── main.css        # All styles — reset, layout, components, animations
└── scripts/
    └── main.js         # All interactivity — particles, physics, counters, observers
```

No dependencies. No `node_modules`. No build step.

---

## Running Locally

Just open the file:

```bash
open index.html
```

Or serve with any static server:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

---

## Deployment

Hosted on **GitHub Pages** via the `master` branch of [`aadityaanaik/aadityaanaik.github.io`](https://github.com/aadityaanaik/aadityaanaik.github.io). Pushes to `master` deploy automatically — no CI/CD configuration needed.

---

## Content

All content sourced from:
- Resume (experience, education, skills, certifications)
- [GitHub profile](https://github.com/aadityaanaik) (pinned repos, real project links)
- [LinkedIn](https://linkedin.com/in/aadityaanaik)

### Experience
- **TikTok** — Data Engineer II (Oct 2024 – Present)
- **HSBC** — Data Engineer II (Jul 2019 – Jul 2022)

### Education
- MS, Management Information Systems — Texas A&M University (2022–2024)
- BTech, Computer Science — Vishwakarma Institute of Technology (2015–2019)

### Certifications
- AWS Certified Developer
- Professional Scrum Master

---

## Customization

| What | Where |
|---|---|
| Colors / accent palette | CSS custom properties at the top of `styles/main.css` (`:root`) |
| Particle count / behavior | `initParticles()` in `scripts/main.js` |
| Physics tuning (gravity, bounce, damping) | Constants at the top of `initAntigravity()` in `scripts/main.js` |
| Tech pills in antigravity | `TECHS` array in `initAntigravity()` |
| Content (bio, bullets, projects) | Sections in `index.html` |

---

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). Canvas animations degrade gracefully — content remains fully accessible if JS is disabled.

---

## License

MIT — free to fork, adapt, and use as a template.
