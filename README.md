# Alyan Quddoos — Portfolio

Personal portfolio built with **Next.js**, **React Three Fiber** and **Framer Motion**, with dark and light themes.

## ✨ Features

- 🌐 **3D network globe hero** — React Three Fiber scene (point-cloud sphere, orbit rings, animated data arcs) that follows the cursor and pauses when off-screen
- 🌙/☀️ **Dark & light themes** — persisted via localStorage, applied before first paint (no flash)
- 🎞️ **Motion** — framer-motion scroll reveals, 3D tilt cards with cursor spotlight, tech marquee, scroll progress bar; respects `prefers-reduced-motion`
- 📱 **Fully responsive** — custom CSS grid layout with a full-screen mobile menu
- ⚡ **Statically generated** — all content in one data file, pre-rendered at build time

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

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
│   └── portfolioData.js      # All portfolio content
├── pages/
│   ├── index.js              # Main portfolio page
│   ├── _app.js               # Global styles + theme
│   └── _document.js          # Fonts + no-flash theme script
└── styles/
    └── globals.css           # All styling + CSS variables
```

## 🎨 Customization

All colors are CSS variables in `styles/globals.css` under `[data-theme="night"]` and `[data-theme="day"]`. Globe colors live in `PALETTES` in `components/HeroScene.js`.

To change any content (bio, experience, projects, skills, achievements), edit `lib/portfolioData.js`.

## 🛠️ Tech Stack

- **Next.js 14** — static generation
- **Three.js + React Three Fiber** — 3D hero scene
- **Framer Motion** — animations
- **CSS Variables** — Theming system
