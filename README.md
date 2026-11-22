# Premium Cinematic Personal Portfolio — Shanmukh Veerepalli

An award-winning, Awwwards/FWA-inspired personal portfolio website built for **Shanmukh Veerepalli** — AI Creator, Creative Developer, Digital Filmmaker, and Technology Enthusiast.

Engineered with **Next.js (App Router)**, **React 18**, **TypeScript**, **Tailwind CSS**, **Three.js / React Three Fiber**, **Framer Motion**, and **Lenis Smooth Scrolling**.

---

## 🌟 Key Features

- **Cinematic 3D Hero Experience**: Interactive React Three Fiber scene featuring an orbiting metallic sculpture, custom reflections, mouse-reactive point lights in Royal Blue (`#3B82F6`) and Hyacinth Blue (`#8B5CF6`), and a 750+ particle field. Includes an elegant fallback for low-power or non-WebGL devices.
- **Automatic Asset Discovery System**: Drop any image or video into `assets/` and the system automatically discovers, categorizes, formats titles, and generates a media manifest.
- **Cinematic HTML5 Video Player**: Custom timeline scrubbing, play/pause, volume control, full-screen mode, and video metadata overlay.
- **Photo & Visual Artwork Lightbox**: Responsive masonry grid with category filtering, image zoom, fullscreen view, and keyboard navigation (`←`, `→`, `ESC`).
- **Awwwards-Level Motion Design**: Smooth Lenis scrolling, custom trailing cursor with magnetic reaction, subtle 3D card tilt on hover, glassmorphic floating navigation, and film grain texture.
- **Verbatim About Me Architecture**: Cleanly structured and customizable via `src/config/about.ts`.
- **Pure Frontend Architecture**: Zero database, zero backend, zero authentication, zero third-party CMS requirements.

---

## 🎨 Brand Color Palette

| Color | Hex Code | Purpose |
|---|---|---|
| **Pure White** | `#FFFFFF` | Main background foundation |
| **Royal Blue** | `#3B82F6` | Primary accent, interactive elements, highlights |
| **Hyacinth Blue** | `#8B5CF6` | Secondary accent, 3D lighting, gradient highlights |
| **Blackberry Purple** | `#171B3A` | Deep contrast, 3D metallic base, luxury sections |
| **Jet Black** | `#08090D` | Dark sections, typography, footer foundation |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.18+ or v20+ / v22+
- **npm** (or `pnpm` / `yarn`)

### Installation & Running

1. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Run Asset Scanner** (Generates initial manifest from `assets/`):
   ```bash
   npm run scan
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Automatic Assets Management

The portfolio automatically indexes media placed inside the `assets/` folder:

```
assets/
│
├── photos/             # Drop photos, AI art, concepts, and stills
│   ├── cyber-samurai.webp
│   ├── aura-car.jpg
│   └── cyber-samurai.json (optional metadata)
│
├── videos/             # Drop MP4, WEBM, or MOV video files
│   ├── commercial-01.mp4
│   ├── cinematic-teaser.mp4
│   └── commercial-01.json (optional metadata)
│
├── thumbnails/         # (Optional) Video posters matching the video's basename
│   ├── commercial-01.webp
│   └── cinematic-teaser.webp
│
├── projects/           # Deep-dive project folders
│   ├── project-01/
│   │   ├── thumbnail.webp
│   │   └── preview.mp4
│   └── README.md
│
└── profile/            # Your profile photo
    └── profile.webp
```

### 1. How to Add Photos
- Simply drop any image (`.webp`, `.jpg`, `.jpeg`, `.png`, `.avif`, `.svg`) into `assets/photos/`.
- Run `npm run scan` (or restart `npm run dev` / `npm run build` which automatically runs it via `predev` and `prebuild`).
- The image will immediately appear on the `/photos` gallery page and in the photo lightbox.
- Filename titles are automatically cleaned (e.g. `futuristic_cyber_city.webp` becomes **"Futuristic Cyber City"**).

### 2. How to Add Videos
- Drop any video (`.mp4`, `.webm`, `.mov`) into `assets/videos/`.
- (Optional) Drop a poster image with the same name into `assets/thumbnails/` (e.g. `nike-commercial.mp4` matches `nike-commercial.webp`).
- Run `npm run scan` or rebuild.
- The video will automatically appear on `/videos` with custom cinematic playback controls!

### 3. Optional Metadata JSON
To specify custom titles, tags, tools, or categories, simply drop an adjacent `.json` file with the exact same base name:
```json
{
  "title": "Ronin 2099: Cyber Samurai",
  "category": "AI Character",
  "description": "Photorealistic character design created using custom LoRA and dynamic cinematic lighting.",
  "tools": ["Midjourney v6", "Runway Gen-3", "ComfyUI"],
  "featured": true
}
```

---

## ⚙️ Updating Personal Information & Configurations

All content is cleanly separated from UI logic inside `src/config/`:

| File | Purpose |
|---|---|
| `src/config/about.ts` | **Complete About Me sections**: Introduction, Creative Journey, What I Do, My Projects & Initiatives (Shanmukh AI Film Makers, KidLearners, etc.), Tools & Technologies, Philosophy, Vision & Motto |
| `src/config/site.ts` | Creator name, role title, headline, subheadline, short bio, contact email, location, status badge, navigation links, and SEO |
| `src/config/social.ts` | Social media URLs & handles: LinkedIn, GitHub, Instagram, YouTube, X (Twitter) |
| `src/config/projects.ts` | Featured projects catalog, 8 creative expertise disciplines, and full technology stack |

---

## 🚢 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Next.js App Router will be automatically detected.
5. Build Command: `npm run build` (this automatically triggers `prebuild` to scan all assets).
6. Click **Deploy**.

### Deploying to Netlify / Cloudflare Pages
- **Build command**: `npm run build`
- **Publish directory**: `.next` (or standalone output)

---

## 🛠️ Tech Stack Overview

- **Framework**: Next.js 14 (App Router)
- **UI & State**: React 18, TypeScript, Tailwind CSS
- **3D & Shaders**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Motion & Physics**: Framer Motion, GSAP, Lenis Smooth Scroll
- **Icons**: Lucide React
- **Asset Pipeline**: Automatic Node.js FS recursive media manifest generator

---

## 📄 License

Created for **Shanmukh Veerepalli**. All rights reserved.
