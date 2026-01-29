# Project Architecture

This document provides an overview of the HPCSS ICT Revision Hub architecture and project organization.

## Overview

The HPCSS ICT Revision Hub is a modern, interactive learning platform built with Next.js 15, TypeScript, and Tailwind CSS. The application provides an immersive experience for students preparing for HKDSE ICT examinations.

## Technology Stack

### Core Framework
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework

### Key Libraries
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Headless UI** - Accessible component primitives
- **GSAP & Anime.js** - Advanced animations
- **Three.js** - 3D graphics
- **Google Gemini API** - AI-powered chat features

### Mobile Development
- **Capacitor** - Native mobile app wrapper for Android/iOS

### Development Tools
- **ESLint** - Code linting
- **Size Limit** - Bundle size monitoring
- **Lighthouse** - Performance auditing

## Project Structure

```
sunset/
├── src/                    # Main application source
│   ├── app/               # Next.js App Router pages & routes
│   ├── components/        # Reusable React components
│   ├── contexts/          # React Context providers (theme, auth)
│   ├── data/              # Static data and configuration
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── services/          # API services and integrations
│   └── types/             # TypeScript type definitions
│
├── docs/                   # Project documentation
│   ├── design/            # Design specifications
│   ├── implementation/    # Technical guides
│   ├── planning/          # Project planning
│   └── supabase-schema.sql # Database schema
│
├── scripts/               # Utility scripts
│   ├── DELIVERY_CHECKLIST.js # Project status tracker
│   └── update-apk.ps1     # Android APK automation
│
├── public/                # Static assets (images, icons, PWA)
├── types/                 # Global TypeScript declarations
├── new-design/            # Experimental Vite prototype
└── archive/               # Archived legacy files
```

## Application Architecture

### Routing Structure
The application uses Next.js App Router with the following main routes:
- `/` - Homepage with hero section and course cards
- `/courses` - All courses listing
- `/javascript` - JavaScript course content
- `/python` - Python algorithms course
- `/about` - About page
- `/new-design` - Experimental immersive UI prototype

### Component Hierarchy
```
App (layout.tsx)
├── ThemeProvider (contexts/ThemeContext)
├── AuthProvider (contexts/AuthContext)
└── Page Content
    ├── Header (navigation)
    ├── HeroSection (landing)
    ├── ResourceCards (course listings)
    └── Footer
```

### State Management
- **Theme Context**: Manages dark/light theme preferences
- **Auth Context**: Handles user authentication state
- React's built-in state management (useState, useReducer)
- No external state management library required

### Data Flow
1. Static data stored in `src/data/` (courses, resources)
2. API calls handled through `src/services/`
3. Context providers manage global state
4. Components consume data via props and hooks

## Key Features

### 1. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Adaptive layouts using Tailwind's responsive utilities

### 2. Theme System
- System preference detection
- Manual theme toggle
- CSS variables for consistent theming
- Smooth theme transitions

### 3. Authentication
- JWT-based authentication
- Supabase integration
- Protected routes
- Session management

### 4. 3D Animations
- Three.js scenes for immersive backgrounds
- Scroll-triggered animations with Anime.js
- GSAP for complex timeline animations
- Performance-optimized rendering

### 5. AI Integration (Experimental)
- Google Gemini API for intelligent tutoring
- Available in `/new-design` route
- Requires `GEMINI_API_KEY` environment variable

## Build & Deployment

### Development
```bash
npm run dev              # Start dev server with Turbopack
npm run type-check       # TypeScript validation
npm run lint             # Code linting
```

### Production Build
```bash
npm run build            # Production build
npm run start            # Start production server
npm run build:production # Build with NODE_ENV=production
```

### Performance Monitoring
```bash
npm run size             # Check bundle sizes
npm run lighthouse       # Run Lighthouse audit
npm run perf:analyze     # Bundle analysis
```

### Mobile Development
```bash
npm run android:sync     # Sync to Android project
npm run android:open     # Open in Android Studio
npm run android:apk      # Build APK
npm run android:update   # Automated APK update
```

## Database Schema

The application uses Supabase for backend services. Database schema is documented in `docs/supabase-schema.sql`.

Key tables:
- Users and authentication
- Course progress tracking
- User preferences
- Content management

## Environment Variables

Create `.env.local` in the project root:

```env
# Required for AI features
GEMINI_API_KEY=your-api-key

# Supabase (if using backend)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Development Guidelines

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Tailwind CSS for styling (avoid inline styles)
- Follow existing component patterns

### File Naming
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Constants: UPPERCASE (e.g., `RESOURCES.ts`)

### Component Structure
```typescript
// 1. Imports
import { useState } from 'react';
import { ComponentProps } from './types';

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Component
export function Component({ title }: Props) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Effects
  useEffect(() => {}, []);
  
  // 6. Handlers
  const handleClick = () => {};
  
  // 7. Render
  return <div>{title}</div>;
}
```

### Best Practices
1. Keep components small and focused
2. Extract reusable logic into custom hooks
3. Use TypeScript for all new code
4. Write descriptive commit messages
5. Test responsive behavior
6. Optimize images and assets
7. Monitor bundle size

## Performance Considerations

### Optimization Strategies
- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Use Next.js `<Image>` component
- **Lazy Loading**: Dynamic imports for heavy components
- **CSS Purging**: Tailwind removes unused styles
- **Bundle Analysis**: Regular size monitoring

### Target Metrics
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Total Blocking Time (TBT): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

## Testing

Currently, the project focuses on manual testing and type checking. Future additions may include:
- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright
- Visual regression tests

## Deployment

The application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Docker containers**
- **Static hosting** (with `next export`)

Mobile apps can be distributed via:
- Google Play Store (Android)
- Apple App Store (iOS)
- Direct APK download

## Contributing

1. Follow the established code style
2. Keep changes minimal and focused
3. Update documentation for significant changes
4. Test responsive behavior on multiple devices
5. Check performance impact of changes

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)

## License

See the main repository for license information.
