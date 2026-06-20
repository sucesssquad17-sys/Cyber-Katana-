# Cyber Katana

A cinematic cyberpunk ecommerce concept for fictional plasma katanas, built with React, Vite, Framer Motion, and modern responsive UI.

---

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62B)](https://vite.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-blueviolet?style=for-the-badge)](#)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)](#)

---

## 🔗 Live Demo
Experience the interface live here:  
👉 **[Live Demo](https://sucesssquad17-sys.github.io/Cyber-Katana-/)**

---

## 🖼️ Preview Screenshots
> [!NOTE]
> Screenshot files are stored in the `/public/screenshots/` directory.

| Desktop Preview | Mobile Preview |
| :---: | :---: |
| ![Desktop View](./public/screenshots/desktop-preview.png) | ![Mobile View](./public/screenshots/mobile-preview.png) |

*(If images are missing, check `/public/screenshots/README.md` for instruction placeholder setup).*

---

## ℹ️ About the Project
**Cyber Katana** is a fictional product acquisition and checkout concept. It is designed to showcase:
* **Cinematic Storytelling**: Immersive entrance experiences that pull users into a high-tech sci-fi atmosphere.
* **Premium Product Presentation**: An advanced catalog panel detailing fictional lore, materials, pricing, and system properties.
* **Responsive Layout**: Designed mobile-first to ensure text scaling, cards, and spec panels behave perfectly on everything from small smartphones to wide desktop monitors.
* **Product Detail Modals**: Highly functional details/checkout slide-in panel complete with backdrop dismiss, ESC key triggers, and browser back integration.
* **Animated Catalog Sections**: Interactive grid selector allowing users to dynamically examine standbys and active blade models.
* **Cyberpunk Visual Design**: Atmospheric glowing neon aesthetics, digital grid patterns, and HUD interface elements.

---

## ✨ Features
* 📱 **Responsive Mobile-First Layout**: Grid-based layouts that adjust automatically.
* ⚔️ **Cyberpunk Katana Catalog**: Interactive showcase displaying active models, standbys, prices, and high-resolution art.
* 📜 **Fictional Product Specs & Lore**: Complete details including Core Material, Edge Finish, Neuro-Grip, and Power Source.
* 💳 **Checkout/Reservation Modal**: Fluid detail panel supporting browser history state (back button dismiss), background scroll locking, and backdrop tap close.
* 🎬 **Smooth Scroll & Entrance Animations**: Immersive lerped scroll frames and fade-ins.
* ⚡ **Mobile Performance Optimization**: Dynamic viewport checking to reduce animation load on low-power devices.
* 🔍 **SEO & Social Meta Tags**: Preconfigured Open Graph and Twitter cards with correct metadata.
* 🚀 **GitHub Pages Deployment**: Ready-made deploy script to host the static build in one command.

---

## 🛠️ Tech Stack
* **Framework**: React 19
* **Build Tool**: Vite 8
* **Animations**: Framer Motion
* **Icons**: Lucide React
* **Styling**: Vanilla CSS (for fine-grained design control) + Tailwind CSS utility structures
* **Deployment**: GitHub Pages (via `gh-pages` branch)

---

## ⚠️ Project Purpose
This is a **portfolio/demo concept project**. It is designed purely to showcase front-end UI/UX craft, animations, and design aesthetics. There is **no real store backend**, and **no real payment systems or transaction processing** are implemented. All acquisitions are fictional simulation exercises.

---

## 💻 Local Development

Follow these steps to run the project locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sucesssquad17-sys/Cyber-Katana-.git
   cd Cyber-Katana-
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the local development server**:
   ```bash
   npm run dev
   ```
4. **Build the production bundle**:
   ```bash
   npm run build
   ```
5. **Preview the production build locally**:
   ```bash
   npm run preview
   ```
6. **Run ESLint checks**:
   ```bash
   npm run lint
   ```

---

## 🚀 Deployment

The project is configured to deploy directly to GitHub Pages:

* **Command**: `npm run deploy`
* **Details**: This triggers `predeploy` (which builds the production files into the `dist/` directory) and then uses `gh-pages` to publish the build directly to the `gh-pages` branch.

---

## 📁 Folder Structure
```text
cyber-katana/
├── public/
│   ├── katanas/
│   ├── frames/
│   └── screenshots/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ArchiveSections.jsx
│   │   ├── CheckoutPanel.jsx
│   │   └── ScrollStages.jsx
│   ├── hooks/
│   ├── utils/
│   │   ├── AudioEngine.js
│   │   └── katanasData.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

---

## 🔧 What I Improved
* 📐 **Responsive Layout**: Re-engineered key visual elements (including catalog grids and spec details) to wrap cleanly and stack on mobile viewports.
* 📊 **Product Details & Specs**: Added a dedicated data model layer (`katanasData.js`) displaying complete materials, lore, and performance attributes.
* 🔐 **Checkout Modal UX**: Built a premium, split-pane product panel with backdrop close, ESC key dismiss, body scroll locking, and browser back integration.
* 🌀 **Scroll Animations**: Smooth scroll stages with reduced animation footprint on mobile screens.
* 📱 **Mobile Optimization**: Resolved UI clipping and overlapping issues in the final sections of the experience.

---

## 🔮 Future Improvements
* 🛒 **Real Cart Flow**: Integration of a client-side shopping cart with state persistence.
* ♿ **Accessibility Audit**: Enhanced ARIA attributes, semantic landmarks, and full keyboard navigation tests.
* ⚖️ **Product Comparison Tool**: Side-by-side spec comparison table for custom blades.
* 🖼️ **Image Optimization**: Automated multi-format image compression (e.g., AVIF/WebP responsive sources).
* 🗄️ **CMS Integration**: Fetching real dynamic database products using an API layer.

---

## 📄 License
This project is for **portfolio/demo use only**. All assets, fictional details, and branding are for educational and conceptual display.

---

## ⚙️ Recommended GitHub Repository Settings
Configure these settings in your GitHub Repository's settings tab to make the project look fully polished:

* **Description**: Cinematic cyberpunk ecommerce concept built with React, Vite, and Framer Motion.
* **Website**: `https://sucesssquad17-sys.github.io/Cyber-Katana-/`
* **Topics**:
  `react`, `vite`, `framer-motion`, `cyberpunk`, `ecommerce`, `landing-page`, `portfolio`, `responsive-design`, `github-pages`
