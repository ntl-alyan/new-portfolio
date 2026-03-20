# Alyan Quddoos — Portfolio

A full-stack developer portfolio built with **Next.js**, **Bootstrap 5**, **Three.js** (animated background), and a **day/night theme toggle**.

## ✨ Features

- 🌌 **Three.js animated background** — floating wireframe shapes, particle stars, interactive mouse parallax
- 🌙/☀️ **Day & Night theme** — persisted via localStorage
- 📱 **Fully responsive** — Bootstrap 5 grid
- 🎯 **Scroll-reveal animations** — sections animate in as you scroll
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
│   ├── ThreeBackground.js   # Three.js canvas (stars + shapes)
│   ├── Navbar.js             # Fixed nav + theme toggle
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

All colors are CSS variables in `styles/globals.css` under `[data-theme="night"]` and `[data-theme="day"]`.

To add a new project, edit `lib/portfolioData.js` or use the admin panel.

## 🛠️ Tech Stack

- **Next.js 14** — SSR + API routes
- **Bootstrap 5** — Layout & responsive grid
- **Three.js** — 3D animated background
- **CSS Variables** — Theming system
- **Scroll Intersection Observer** — Reveal animations
