# Arpit Yadav | ECE & Full-Stack Engineer Portfolio

A premium, interactive developer portfolio showcasing engineering at the intersection of hardware constraints and software design patterns. The application uses a constraint-driven, simulation-first aesthetic to bridge silicon, firmware, and web development.

---

## 🚀 Key Features

*   **Interactive 3D Scenes**: Custom-built WebGL/Three.js environments using React Three Fiber (R3F) and Drei:
    *   *Hero Hologram*: Rotating radar grids, circuit traces, and signal sweep particles.
    *   *Skills Constellation*: Interactive nodes representing technical layers (Silicon to Cloud).
    *   *Project Pipeline*: Energy-beam data streams connecting hardware/software stages.
    *   *Circuit Board & DNA Helix*: Microchip and molecular structures for deep-tech visualization.
    *   *Digital Logic Gates*: 3D representations of active logic gates with truth tables.
    *   *Oscilloscope Simulator*: Real-time signal rendering using WebGL shaders.
    *   *WebGL Globe*: Rotating geographical node connecting global contacts.
*   **Active Section Tracking**: Navigation highlights dynamically using a custom `IntersectionObserver` scroll hook.
*   **Tilt Perspective Cards**: Custom mouse-move 3D interactive tilting effect on card elements.
*   **Animated Transitions**: Smooth viewport enter animations driven by `framer-motion`.
*   **Interactive Retro Terminal**: A functional command-line prompt box simulating a shell command environment.
*   **High Performance**: Full SSR-safe rendering using dynamic lazy-loaded 3D imports with CPU loading fallbacks.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router, TypeScript)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS custom modules
*   **3D / WebGL**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/getting-started/introduction), [@react-three/drei](https://github.com/pmndrs/drei)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide-react.dev/)
*   **Package Manager & Runtime**: [Bun](https://bun.sh/)
*   **Database ORM**: [Prisma](https://www.prisma.io/) (PostgreSQL setup ready)

---

## 📁 Codebase Structure

```
portfolio/
├── prisma/               # Database schema definitions
├── public/               # Static assets (images, model files, resume)
├── db/                   # Local databases
├── mini-services/        # Companion backend utilities / microservices
└── src/
    ├── app/              # Next.js pages, routing & global styles
    │   ├── api/          # Backend API routes
    │   ├── globals.css   # Main stylesheet (includes custom animations & filters)
    │   ├── layout.tsx    # Root HTML layout and metadata
    │   └── page.tsx      # Landing Home component (modular section hub)
    ├── hooks/            # Custom hooks
    │   ├── useActiveSection.ts # Scroll & viewport observer
    │   ├── useTilt.ts          # 3D hover tilt logic
    │   └── use-mobile.ts       # Breakpoint detection
    └── components/
        ├── ui/           # Shared UI components (Accordion, Tabs, Dialogs)
        ├── 3d/           # Three.js 3D canvas components
        └── portfolio/    # Main website components
            ├── common/   # Reusable UI parts (TiltCard, TypingText, Waveform)
            ├── layout/   # Page structure (Navigation header, Footer)
            └── sections/ # Core portfolio content divisions (Hero, About, Lab)
```

---

## ⚡ Getting Started

### Prerequisites

You will need [Bun](https://bun.sh/) installed locally. Alternatively, you can use Node.js and `npm`.

### Installation

1.  Clone the repository and navigate to the project directory:
    ```bash
    git clone https://github.com/arpit-yadav/portfolio.git
    cd portfolio
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

3.  Configure database:
    ```bash
    bun run db:generate
    bun run db:push
    ```

### Development Server

Run the development server locally:
```bash
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 📦 Build & Deployment

### Production Build

Create the production-ready standalone bundle:
```bash
bun run build
```

### Run Server

Start the Next.js production server locally:
```bash
bun start
```

### Web Server (Caddy)

A sample `Caddyfile` is provided at the root to proxy and serve port `3000` with automated SSL:
```caddyfile
portfolio.arpityadav.com {
    reverse_proxy localhost:3000
}
```
