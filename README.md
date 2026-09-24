# Alyan Quddoos — Portfolio

A full-stack developer portfolio built with **Next.js**, **Bootstrap 5**, **Three.js** (animated background), and a **day/night theme toggle**.

## ✨ Features

- 🌐 **3D network globe hero** — React Three Fiber scene (point-cloud sphere, orbit rings, animated data arcs) that follows the cursor and pauses when off-screen
- 🌙/☀️ **Dark & light themes** — persisted via localStorage, applied before first paint (no flash)
- 🎞️ **Motion** — framer-motion scroll reveals, 3D tilt cards with cursor spotlight, tech marquee, scroll progress bar; respects `prefers-reduced-motion`
- 📱 **Fully responsive** — custom CSS grid layout with a full-screen mobile menu
- 🔐 **Hidden admin panel** — accessible only at `/admin`
- 🎛️ **Admin CMS** — edit all portfolio content without touching code

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## 🔐 Admin Panel

Access the admin panel at:

```
http://localhost:3000/admin
```

There is **no link** to this page from the portfolio. Bookmark it or remember the URL.

From the admin panel you can edit:
- Hero section (name, title, subtitle, email, phone)
- About section (bio, university, degree)
- Skills (languages, frameworks, tools)
- All 3 projects (name, description, tech, accent color)
- Achievements

> **Note:** Data is stored in-memory on the server. For production persistence, connect `lib/portfolioData.js` to a database (PostgreSQL recommended given your stack!).

## 📁 Project Structure

```
portfolio/
├── components/
│   ├── HeroScene.js          # React Three Fiber globe
│   ├── ui.js                 # Reveal, SectionHeading, TiltCard, Icon
│   ├── Navbar.js             # Floating nav, active section, theme toggle
│   ├── HeroSection.js        # Landing hero
│   ├── AboutSection.js       # Bio + stats
│   ├── SkillsSection.js      # Tech stack chips
│   ├── ExperienceSection.js  # Timeline
│   ├── ProjectsSection.js    # Project cards
│   └── ContactSection.js     # Achievements + contact
├── context/
│   └── ThemeContext.js       # Day/night theme provider
├── lib/
│   └── portfolioData.js      # Data store (swap for DB)
├── pages/
│   ├── index.js              # Main portfolio page
│   ├── _app.js               # Bootstrap + theme
│   ├── admin/index.js        # 🔐 Admin panel
│   └── api/portfolio.js      # REST API for data
└── styles/
    └── globals.css           # All styling + CSS variables
```

## 🎨 Customization

All colors are CSS variables in `styles/globals.css` under `[data-theme="night"]` and `[data-theme="day"]`. Globe colors live in `PALETTES` in `components/HeroScene.js`.

To add a new project, edit `lib/portfolioData.js` or use the admin panel.

## 🛠️ Tech Stack

- **Next.js 14** — SSR + API routes
- **Three.js + React Three Fiber** — 3D hero scene
- **Framer Motion** — animations
- **Bootstrap 5** — admin panel styling only
- **CSS Variables** — Theming system
- **Scroll Intersection Observer** — Reveal animations
