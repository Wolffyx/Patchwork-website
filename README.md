# Patchwork Website

Patchwork presentation website built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript (strict mode enabled)
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/Patchwork-website.git
   cd Patchwork-website
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Development

Start the development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:5173`.

## Build

Build for production:
```bash
pnpm build
```

The output will be in the `dist/` directory, configured for GitHub Pages deployment.

## Preview Production Build

Preview the production build locally:
```bash
pnpm preview
```

## Linting

Run ESLint:
```bash
pnpm lint
```

## Adding shadcn/ui Components

Add components as needed:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

## Project Structure

```
├── src/
│   ├── components/     # React components
│   │   └── ui/         # shadcn/ui components
│   ├── lib/            # Utility functions
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles & Tailwind
├── public/             # Static assets
├── components.json     # shadcn/ui configuration
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

## Deployment

This project is configured for GitHub Pages deployment. The build output uses the base path `/Patchwork-website/` to match the repository name.
