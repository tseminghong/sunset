# Loading Transition System Documentation

## Overview

This professional loading transition system provides smooth page transitions with a configurable animated loading overlay. It's designed specifically for Next.js applications and integrates seamlessly with your existing theme system.

## Features

### 🎨 Visual Design
- Full-screen loading overlay with light/dark theme support
- Animated SVG circle with rotating stroke-dash animation
- Professional "LOADING" text with custom typography
- Smooth slide-down exit animation (translateY(100%))
- Glass-morphism effect that matches your existing design

### ⚡ Performance Optimized
- Uses Framer Motion for smooth animations
- Respects `prefers-reduced-motion` settings
- Mobile-optimized with `vmin` units for responsive scaling
- Hardware acceleration with `will-change` properties
- Automatic slow device detection and optimization

### ♿ Accessibility Features
- ARIA labels and live regions for screen readers
- High contrast mode support
- Reduced motion alternatives
- Proper focus management
- Screen reader announcements

### 🎛️ Customization Options
- Configurable colors via CSS custom properties
- Adjustable timing (animation duration, delays)
- Custom loading text and language support
- Option to disable on slow devices
- Cross-browser compatibility with fallbacks

## File Structure

```
src/
├── components/
│   ├── LoadingOverlay.tsx      # Main loading animation component
│   ├── LoadingManager.tsx      # Integrates loading with context
│   └── TransitionLink.tsx      # Link component with loading transitions
├── contexts/
│   └── LoadingContext.tsx      # Global loading state management
├── hooks/
│   └── usePageTransition.ts    # Navigation hook with loading
└── app/
    ├── layout.tsx              # Updated with LoadingProvider
    └── globals.css             # Updated with loading animations
```

## Usage

### Basic Navigation

Replace regular Next.js `Link` components with `TransitionLink`:

```tsx
import TransitionLink from '@/components/TransitionLink'

// Before
<Link href="/about">About</Link>

// After
<TransitionLink href="/about">About</TransitionLink>
```

### Programmatic Navigation

Use the `usePageTransition` hook for programmatic navigation:

```tsx
import { usePageTransition } from '@/hooks/usePageTransition'

function MyComponent() {
  const { navigate, replace, back } = usePageTransition()

  const handleNavigation = async () => {
    await navigate('/dashboard', {
      delay: 1500, // Custom delay
      onStart: () => console.log('Navigation started'),
      onComplete: () => console.log('Navigation completed')
    })
  }

  return <button onClick={handleNavigation}>Go to Dashboard</button>
}
```

### Manual Loading Control

Control loading state manually:

```tsx
import { useLoading } from '@/contexts/LoadingContext'

function MyComponent() {
  const { setIsLoading, loadingConfig } = useLoading()

  const handleCustomLoading = async () => {
    setIsLoading(true)
    
    // Perform async operation
    await performAsyncTask()
    
    // Hide loading after exit animation
    setTimeout(() => {
      setIsLoading(false)
    }, loadingConfig.exitDuration)
  }
}
```

## Customization

### CSS Custom Properties

Customize the loading animation by modifying CSS variables:

```css
:root {
  --loading-bg: #f7f7f7;                    /* Background color */
  --loading-stroke: #171717;                /* Circle stroke color */
  --loading-text: #171717;                  /* Text color */
  --loading-stroke-width: 12;               /* Circle stroke width */
  --loading-circle-size: 5rem;              /* Circle size */
  --loading-text-size: 2rem;                /* Text size */
  --loading-animation-duration: 3s;         /* Animation cycle duration */
  --loading-exit-duration: 1s;              /* Exit animation duration */
}

.dark {
  --loading-bg: #000000;
  --loading-stroke: #F5F5F7;
  --loading-text: #F5F5F7;
}
```

### LoadingProvider Configuration

Configure the loading system in your layout:

```tsx
import { LoadingProvider } from '@/contexts/LoadingContext'

export default function RootLayout({ children }) {
  return (
    <LoadingProvider
      config={{
        animationDuration: 3000,           // 3 seconds
        exitDuration: 1000,                // 1 second
        navigationDelay: 1000,             // 1 second
        backgroundColor: '#f7f7f7',        // Light gray
        strokeColor: '#171717',            // Dark gray
        textColor: '#171717',              // Dark gray
        strokeWidth: 12,                   // 12px stroke
        disableOnSlowDevices: true,        // Auto-optimize for slow devices
        respectReducedMotion: true,        // Respect accessibility preferences
        showOnInitialLoad: true,           // Show on page load
        loadingText: 'LOADING',            // Loading text
        language: 'en'                     // Language code
      }}
    >
      {children}
    </LoadingProvider>
  )
}
```

### Update Existing Components

Update your existing navigation components:

1. **Header/Navigation**: Replace `Link` with `TransitionLink`
2. **Resource Cards**: Use `TransitionLink` for internal routes
3. **Buttons**: Use `usePageTransition` hook for programmatic navigation
4. **Forms**: Implement loading states during form submission

### Theme Integration

The loading system automatically adapts to your existing theme:

```css
/* Automatically uses your theme variables */
.loading-overlay {
  background-color: var(--loading-bg);
}

.loading-circle-path {
  stroke: var(--loading-stroke);
}

.loading-text {
  color: var(--loading-text);
}
```

## Advanced Features

### Error Handling

The system includes automatic error handling with fallbacks:

```tsx
const { navigate } = usePageTransition()

// Automatic fallback to window.location on errors
await navigate('/page', {
  onError: (error) => {
    console.error('Navigation failed:', error)
    // Custom error handling
  }
})
```

### Performance Optimization

- **Preloading**: Links are automatically prefetched on hover
- **Slow Device Detection**: Automatically reduces animation complexity
- **Reduced Motion**: Respects user accessibility preferences
- **Hardware Acceleration**: Uses GPU-accelerated properties

### Mobile Responsiveness

- Uses `clamp()` and `vmin` units for consistent sizing across devices
- Optimized touch interactions
- Mobile-specific performance optimizations
- Responsive text and animation scaling

## Browser Support

- **Modern Browsers**: Full feature support
- **Older Browsers**: Graceful degradation with fallbacks
- **iOS Safari**: Optimized for mobile Safari quirks
- **Android Chrome**: Touch and performance optimized

## Accessibility Compliance

- **WCAG 2.1 AA** compliant
- **Screen Reader** support with ARIA labels
- **Keyboard Navigation** preserved
- **High Contrast** mode support
- **Reduced Motion** preferences respected

## Troubleshooting

### Common Issues

1. **Loading doesn't show**: Check LoadingProvider is correctly wrapped around your app
2. **Animations stuttering**: Ensure hardware acceleration is enabled
3. **Theme not applying**: Verify CSS custom properties are defined
4. **Navigation not working**: Check TransitionLink usage and href paths

### Performance Tips

1. Use `prefetch={false}` for less important links
2. Adjust `navigationDelay` based on your content loading time
3. Enable `disableOnSlowDevices` for better performance on low-end devices
4. Use `respectReducedMotion` for accessibility compliance

## Examples

### Basic Page Navigation
```tsx
<TransitionLink href="/about" className="nav-link">
  About Us
</TransitionLink>
```

### Custom Loading with Callback
```tsx
const { navigate } = usePageTransition()

const handleSubmit = async () => {
  await navigate('/results', {
    delay: 2000,
    onStart: () => showToast('Processing...'),
    onComplete: () => showToast('Complete!')
  })
}
```

### Conditional Loading
```tsx
const { setIsLoading } = useLoading()

const handleDataFetch = async () => {
  if (isSlowConnection) {
    setIsLoading(true)
  }
  
  const data = await fetchData()
  
  setIsLoading(false)
}
```

This loading transition system provides a professional, accessible, and highly customizable solution for smooth page transitions in your Next.js application.