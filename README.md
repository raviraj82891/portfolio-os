[README.md](https://github.com/user-attachments/files/28009822/README.md)
<div align="center">

```
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗       ██████╗ ███████╗
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗     ██╔═══██╗██╔════╝
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║     ██║   ██║███████╗
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║     ██║   ██║╚════██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝     ╚██████╔╝███████║
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝      ╚═════╝ ╚══════╝
```

### *Your developer identity, reimagined as an operating system.*

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r184-white?style=for-the-badge&logo=three.js&logoColor=black)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://portfolio-os-iota-eosin.vercel.app)

<br/>

**[🌐 Live Demo](https://portfolio-os-iota-eosin.vercel.app)** · **[📂 Source Code](https://github.com/raviraj82891/portfolio-os)** · **[🐛 Report a Bug](https://github.com/raviraj82891/portfolio-os/issues)**

</div>

---

## 🖥️ What Is Portfolio OS?

Most portfolios are websites. This one is a **world**.

**Portfolio OS** is a fully interactive, desktop operating system simulation built entirely in the browser. Instead of scrolling through a static page, visitors boot into a living desktop environment — complete with draggable windows, an AI-powered terminal, ambient 3D visuals, and a full suite of "applications" that each tell a different piece of the developer's story.

Think of it as: *What if macOS and a personal portfolio had a baby, and that baby ran at 60fps?*

It's not just a portfolio. It's an experience — the kind that makes recruiters stop mid-scroll and actually *play* with it for ten minutes before realising they've forgotten to check LinkedIn.

---

## ✨ Feature Showcase

### 🪟 The Desktop Environment
A fully functional OS-like interface greets every visitor. Windows can be **opened, closed, minimized, maximized, dragged, and resized** — just like the real thing. A taskbar tracks running apps. A system clock ticks in real time. Even the idle animations breathe personality into the experience.

### 🌌 3D Background with Three.js
Powered by `@react-three/fiber` and `@react-three/drei`, the desktop background is a live 3D scene — not a video, not a GIF, but a real-time rendered environment that reacts to the mood of the page. It shifts subtly as you move through different sections, turning the portfolio into a spatial experience.

### 🤖 AI-Powered Terminal (Gemini)
Crack open the terminal and you're not typing into a void. An **AI assistant powered by Google Gemini** lives inside it — trained to answer questions about the developer, their projects, their tech stack, and their experience. It's like having the developer present for the interview, 24/7. `@google/generative-ai` drives it under the hood.

The terminal is built with **xterm.js** (`@xterm/xterm`), the same library that powers VS Code's integrated terminal. It feels authentic because it is.

### 🎬 Silky Animations with GSAP & Framer Motion
Every window open, every dock bounce, every page transition is choreographed with either **GSAP 3** or **Framer Motion 12**. The result is a UI that feels like it was designed by someone who genuinely cared whether the easing curve on a minimize animation was `easeOut` or `easeInOut`. (It matters. Trust the process.)

### 🎵 Ambient Audio with Howler.js
**Howler.js** handles spatial and ambient audio. Click sounds, ambient hum, notification pings — subtle audio cues that make the OS feel tactile without overwhelming the experience. Audio is always optional, respecting the visitor's environment.

### 🗂️ The App Suite
The portfolio is divided into a set of "applications" the visitor can launch:

| App | Description |
|---|---|
| 📄 **Resume Viewer** | An in-OS document viewer for the full CV |
| 🧑‍💻 **Projects Explorer** | A file-manager-style browser for showcasing projects |
| 📬 **Contact App** | A minimal mail-client aesthetic for getting in touch |
| 🎨 **About Me** | A rich profile window with the developer's story |
| ⚙️ **Settings** | Customization options for the OS theme and behavior |
| 💻 **Terminal** | The AI-powered command-line interface |

### 📦 State Management with Zustand
The entire OS state — which windows are open, what's minimized, what's focused, app data — is managed through **Zustand 5**. Lightweight, fast, and devtools-compatible. No Redux boilerplate in sight.

---

## 🛠️ Tech Stack Deep Dive

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PORTFOLIO OS STACK                           │
├────────────────────────┬────────────────────────────────────────────┤
│  Framework             │  Next.js 16.2.6 (App Router)               │
│  Language              │  TypeScript 5.x                            │
│  Styling               │  Tailwind CSS 4.x                          │
│  3D Engine             │  Three.js r184 + React Three Fiber         │
│  Animation             │  Framer Motion 12 + GSAP 3                 │
│  State Management      │  Zustand 5                                 │
│  Terminal              │  xterm.js 6 (+ fit + web-links addons)     │
│  AI                    │  Google Gemini (@google/generative-ai)     │
│  Audio                 │  Howler.js 2.2                             │
│  Deployment            │  Vercel                                    │
└────────────────────────┴────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** ≥ 18.x
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/raviraj82891/portfolio-os.git

# 2. Navigate into the project
cd portfolio-os

# 3. Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root of the project:

```env
# Google Gemini API Key (for the AI Terminal)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

You can get a free Gemini API key at [https://ai.google.dev](https://ai.google.dev).

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the OS boot sequence begin. 🎉

### Building for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
portfolio-os/
├── public/                  # Static assets (icons, wallpapers, sounds)
├── src/
│   ├── app/                 # Next.js App Router pages & layouts
│   ├── components/
│   │   ├── desktop/         # Desktop, wallpaper, taskbar components
│   │   ├── windows/         # Window manager & draggable window shells
│   │   ├── apps/            # Individual application components
│   │   │   ├── Terminal/    # xterm.js + Gemini AI integration
│   │   │   ├── Projects/    # Portfolio project explorer
│   │   │   ├── Resume/      # CV viewer
│   │   │   ├── About/       # About Me window
│   │   │   └── Contact/     # Contact form app
│   │   ├── three/           # Three.js 3D background scenes
│   │   └── ui/              # Shared UI primitives (buttons, icons)
│   ├── store/               # Zustand state stores (OS state, theme, etc.)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities, Gemini client, helpers
│   └── styles/              # Global CSS, Tailwind base
├── AGENTS.md                # AI agent configuration
├── CLAUDE.md                # Claude Code instructions
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 🎨 Customization Guide

Want to fork this and make it your own? Here's the quick-start customization checklist:

### 1. Swap out the content
Edit the data files inside `src/lib/` or `src/data/` to update your:
- Name, tagline, and bio
- Project list and descriptions
- Skills and tech stack
- Contact links (GitHub, LinkedIn, email)

### 2. Change the Gemini AI persona
In the Terminal component, find the system prompt passed to the Gemini API and update it to describe *you*. Give the AI your background, your projects, and your personality quirks. Make it genuinely useful for recruiters.

### 3. Update the 3D scene
The Three.js scene files live in `src/components/three/`. You can swap shaders, particle systems, or geometry to match your personal brand.

### 4. Retheme the OS
Tailwind CSS 4 makes this easy. Update the color tokens in your `globals.css` or Tailwind config to switch from a dark cyberpunk look to anything you want — minimal white, retro amber, or vaporwave pink.

### 5. Add or remove apps
Each "app" in the OS is a standalone React component registered in the Zustand store. Adding a new window-based app involves creating the component and registering it with the window manager.

---

## 🧠 How the AI Terminal Works

The terminal is one of the most unique parts of this project. Here's a peek behind the curtain:

```
Visitor types a question
        ↓
xterm.js captures the input
        ↓
Input is sent to Google Gemini via @google/generative-ai SDK
        ↓
Gemini is given a custom system prompt describing the developer
        ↓
The streamed response is rendered back into xterm.js, character by character
        ↓
The visitor reads the answer in real-time, like a chat with the developer
```

The effect is surprisingly personal. Visitors can ask things like:
- `> tell me about your most challenging project`
- `> what technologies are you currently learning?`
- `> are you open to remote work?`

And get thoughtful, accurate answers without the developer having to be online.

---

## 🌐 Deployment

This project is optimized for **Vercel** deployment.

### One-click deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/raviraj82891/portfolio-os)

### Manual deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Don't forget to add your `NEXT_PUBLIC_GEMINI_API_KEY` environment variable in the Vercel dashboard under **Project Settings → Environment Variables**.

---

## 🔧 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the codebase |

---

## 🙌 Contributing

Contributions, ideas, and bug reports are always welcome.

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/portfolio-os.git

# Create a feature branch
git checkout -b feature/amazing-new-app

# Make your changes and commit
git commit -m "feat: add amazing new app to the OS"

# Push and open a Pull Request
git push origin feature/amazing-new-app
```

Please keep pull requests focused — one feature or fix per PR makes review much easier.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

Feel free to use it as a template for your own portfolio OS — just give a star ⭐ if it helped!

---

## 🌟 Acknowledgements

This project was built standing on the shoulders of some genuinely incredible open-source work:

- [Next.js](https://nextjs.org/) — The React framework that makes this all possible
- [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — For making the web 3D
- [Framer Motion](https://www.framer.com/motion/) — For motion that feels human
- [GSAP](https://gsap.com/) — The gold standard of web animation
- [xterm.js](https://xtermjs.org/) — For the most authentic terminal experience in the browser
- [Zustand](https://zustand-demo.pmnd.rs/) — State management that doesn't make you cry
- [Howler.js](https://howlerjs.com/) — For making browsers sound good
- [Google Gemini](https://ai.google.dev/) — For the AI brain in the terminal

---

<div align="center">

**Made with ❤️, TypeScript, and an unhealthy obsession with smooth animations.**

*If this inspired you, drop a ⭐ on the repo — it means the world.*

[![GitHub stars](https://img.shields.io/github/stars/raviraj82891/portfolio-os?style=social)](https://github.com/raviraj82891/portfolio-os/stargazers)

</div>
