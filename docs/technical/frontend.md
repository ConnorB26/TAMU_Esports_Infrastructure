# Frontend Website

## Overview

The frontend is a **React 18** single-page application (SPA) built with TypeScript. It serves as the public-facing website for TAMU Esports at `tamuesports.com`, providing organizational information, membership details, and a merchandise shop. The website is purely informational -- it does not make any calls to the backend API.

**Framework**: React 18 + TypeScript 4.9
**Build Tool**: Create React App (react-scripts)
**Port**: 3000 (development)
**Hosting**: Cloudflare Pages (static, free tier)

> **Note**: The frontend is a purely static/informational site. It does not communicate with the backend API at all. All dynamic functionality (membership, user management, etc.) is handled through the Discord bot.

## Routing

Defined in `src/App.tsx` using React Router v6:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Landing page with social feeds and partners |
| `/about` | `AboutPage` | Organization info, mission, leadership, FAQ |
| `/contact` | `ContactPage` | Officer contact emails |
| `/members` | `MembersPage` | Membership info, benefits, how-to guide |
| `/shop` | `ConstructionPage` | Merchandise (Shopify integration, currently under construction) |
| `*` | `NotFoundPage` | 404 catch-all |

The layout wraps all routes with a persistent `Header` and `Footer`.

## Pages

### HomePage
- Hero banner image with responsive sizing
- "Follow Us" section with 8 social media links (Discord, Instagram, Twitter, Twitch, Facebook, TikTok, LinkedIn, YouTube)
- Embedded Twitter timeline feed via `react-twitter-embed`
- Responsive two-column layout (social links + Twitter feed)

### AboutPage
- Introduction section (2000+ members, 16 gaming titles, 30+ teams)
- Mission & Vision cards with hover effects
- Leadership section with 4 officer cards (photos + bios)
- Events & Activities section (watch parties, LANs, Kyle Field Picture Day, mini-facility)
- FAQ Accordion (how to join, fees, code redemption, non-competitive entry)
- Custom maroon-themed accordion styling

### ContactPage
- 5 contact cards for different officer roles
- Each card has a mailto link
- Staggered entrance animations

### MembersPage
- 4 info cards: Who, What, Benefits, How to Become a Member
- 7-step membership process guide
- Link to Flywire for dues purchase
- Link to contact page for questions

### ShopPage (Shopify Integration)
- Dynamically loads the Shopify Buy Button SDK
- Renders a product collection from the TAMU Esports Shopify store
- Custom styling for product cards (25% width desktop, responsive)
- Modal product display with carousel images
- Currently behind a "construction" page

## Components

### Header (`components/Header.tsx`)
- Fixed navigation bar with maroon gradient background
- Desktop: Top brand bar + split navigation (About/Contact left, Members/Shop right)
- Mobile (< 1024px): Hamburger menu toggle
- Logo scales dynamically based on scroll position
- Uses `ScrollLink` for navigation with auto scroll-to-top

### Footer (`components/Footer.tsx`)
- Dark gray background (#333333)
- Social media icon row
- Legal links (Terms of Use, Privacy Policy -- routes not yet implemented)
- Copyright notice

### InViewMotionDiv (`components/InViewMotionDiv.tsx`)
- Animation wrapper using Framer Motion + `react-intersection-observer`
- Triggers animations when element enters viewport (10% threshold)
- `triggerOnce: true` -- animations only play on first scroll
- Common patterns: fade-in, slide-up (y: 50 -> 0), slide-in (x: -50 -> 0), scale

### ScrollLink (`components/ScrollLink.tsx`)
- Wraps React Router `Link` component
- Automatically scrolls to top of page on navigation

### SocialLinks (`components/SocialLinks.tsx`)
- Exports `getSocialLinks(label: boolean)` function
- Returns 8 social platform links with branded hover colors
- Uses `react-icons` for SVG icons
- Configurable label visibility

## Styling

The project uses a mixed CSS strategy:

### CSS Modules (Component-Scoped)
- `Header.module.css`, `Footer.module.css`, `SocialLinks.module.css`
- `HomePage.module.css`, `AboutPage.module.css`, `ContactPage.module.css`, `MembersPage.module.css`

### Global Styles
- `index.css` -- Font and system-wide resets
- `App.css` -- Flex layout for app container
- `MaroonAccordion.css` -- Custom accordion theming
- `MaroonNavbarToggle.css` -- Mobile menu toggle styling
- `bootstrap.min.css` -- Bootstrap 5.3.1 (bundled in src)

### Design System
- **Primary**: Maroon (#500000, #590000, #3C0000)
- **Secondary**: Light grays (#eaeaea, #f3f3f3, #F6F6F6)
- **Dark**: #333333 (footer), #000000 (banners)
- **Typography**: Georgia serif for brand text, system fonts for body
- **Responsive breakpoint**: 1024px (header mobile transition)

### Animation
- **Framer Motion** (v10.16.2) for scroll-triggered animations
- Intersection observer at 10% visibility threshold
- Common transitions: 0.3-0.5s duration, staggered delays

## External Integrations

| Service | Integration Method | Purpose |
|---------|-------------------|---------|
| Shopify | Buy Button SDK (dynamic script load) | Merchandise store |
| Twitter | `react-twitter-embed` component | Timeline feed on homepage |
| Flywire | External links | Dues payment (referenced in MembersPage) |
| Discord | External link | Server invite (discord.gg/tamuesports) |

## Build & Deployment

### Development
```bash
npm start  # Runs react-scripts start on port 3000
```

### Production Build
```bash
npm run build  # Sets REACT_APP_API_BASE_URL=https://cms.tamuesports.com
```

### Cloudflare Pages Deployment
- Connected to GitHub repository
- Automatically builds and deploys on push to `master`
- Preview deployments available at `tamu-esports.pages.dev`
- Free SSL, CDN, and DDoS protection included

### Docker (`Dockerfile`)
- Node 19 base image
- Conditional: runs `npm run build` for production, `npm start` for development
- Exposes port 3000
- Note: In practice, the frontend is deployed via Cloudflare Pages, not Docker

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` / `react-dom` | ^18.2.0 | UI framework |
| `react-router-dom` | ^6.15.0 | Client-side routing |
| `react-bootstrap` | ^2.8.0 | Bootstrap React components |
| `bootstrap` | ^5.3.1 | CSS framework |
| `framer-motion` | ^10.16.2 | Animations |
| `react-intersection-observer` | ^9.5.2 | Viewport detection |
| `react-icons` | ^4.10.1 | SVG icon library |
| `react-twitter-embed` | ^4.0.4 | Twitter timeline widget |
| `typescript` | ^4.9.5 | Type safety |

## Assets

Located in `src/assets/`:
- `brand/` -- Logo files (PNG + WebP), banner images (multiple sizes for responsive loading)
- `officers/` -- Leadership headshot photos
- `carousel/` -- Event and activity photos (WebP format)
- `partners/` -- Sponsor logos (Gen.G, HyperX, TSMU, UConnect)
