# PrepPilot — Landing Page

A production-quality landing page for **PrepPilot**, an engineering placement preparation platform for ECE and Software engineering students.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Font | Inter (via `next/font`) |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page, composes all sections
│   └── globals.css         # Tailwind theme tokens + global utilities
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky navbar, mobile menu
│   │   └── Footer.tsx      # Footer with link columns
│   ├── sections/
│   │   ├── HeroSection.tsx         # Hero + dashboard card preview
│   │   ├── PreparationPaths.tsx    # Two path cards
│   │   ├── ProblemSolution.tsx     # Comparison panels
│   │   ├── HowItWorks.tsx          # Four-step process
│   │   ├── FeaturesSection.tsx     # Feature cards with mini UI
│   │   ├── RoadmapShowcase.tsx     # Roadmap stages showcase
│   │   ├── InterviewPreparation.tsx # Four interview prep cards
│   │   ├── DashboardShowcase.tsx   # Full dashboard preview
│   │   ├── FAQSection.tsx          # Accessible accordion FAQ
│   │   └── FinalCTA.tsx            # CTA with violet glow
│   ├── dashboard-preview/
│   │   ├── RoadmapPreview.tsx      # Horizontal stage cards
│   │   ├── ProgressCard.tsx        # Progress bar card
│   │   └── TaskList.tsx            # Checkbox task list
│   └── ui/
│       ├── Button.tsx              # Primary/outline/ghost button
│       ├── SectionHeading.tsx      # Reusable section headline
│       └── TopicBadge.tsx          # Topic chip/badge
├── data/
│   └── landing-page.ts     # All typed content data
└── lib/
    └── utils.ts            # `cn()` utility
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check
npm run type-check

# Lint
npm run lint

# Production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the page.

## Design System

Colors defined as CSS variables in `globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--color-bg-primary` | `#0B0D12` | Page background |
| `--color-bg-secondary` | `#10131B` | Section alternates |
| `--color-bg-card` | `#151923` | Card surfaces |
| `--color-violet` | `#8B7CFF` | Primary accent |
| `--color-blue` | `#5B9DFF` | Secondary accent |
| `--color-green` | `#35C98A` | Success / completed |
| `--color-text-primary` | `#F4F5F8` | Headings & body |
| `--color-text-secondary` | `#969DAF` | Muted text |
| `--color-border` | `#272D3A` | Card borders |

## Deployment

This project is Vercel-ready. Push to GitHub and connect to Vercel for automatic deployments. No additional configuration is required.

```bash
# Build for production
npm run build
npm run start
```
