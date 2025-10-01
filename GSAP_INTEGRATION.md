# GSAP Integration Documentation

## Overview

GSAP (GreenSock Animation Platform) has been integrated into your Next.js application to provide high-performance, professional animations that enhance user experience while maintaining excellent performance across all devices.

## 🚀 What's New

### Enhanced Animation System
- **Professional Loading Animations**: GSAP-powered loading overlay with smooth SVG animations
- **Page Transitions**: Fluid page-to-page navigation with customizable transition effects
- **Scroll Animations**: Scroll-triggered animations using GSAP ScrollTrigger
- **Interactive Elements**: Enhanced button and UI component animations
- **Performance Optimized**: Hardware-accelerated animations with fallbacks

## 📁 File Structure

```
src/
├── lib/
│   └── gsap.ts                    # GSAP configuration and utilities
├── hooks/
│   ├── useGSAPPageTransition.ts   # GSAP-powered page transitions
│   └── useScrollAnimations.ts     # Scroll-triggered animations
├── components/
│   ├── GSAPButton.tsx             # Enhanced button with GSAP animations
│   ├── GSAPScrollSection.tsx      # Scroll animation wrapper component
│   ├── GSAPInitializer.tsx        # GSAP initialization component
│   ├── LoadingOverlay.tsx         # Enhanced with GSAP (updated)
│   └── TransitionLink.tsx         # Enhanced with GSAP (updated)
└── app/
    ├── layout.tsx                 # Updated with GSAP initializer
    └── globals.css                # Enhanced with GSAP optimizations
```

## 🎨 Animation Features

### 1. Loading Animations
Enhanced loading overlay with GSAP:
- Smooth SVG circle rotation and stroke-dash animation
- Text pulsing effect
- Coordinated exit animations
- Performance-optimized for mobile devices

### 2. Page Transitions
Choose from multiple transition types:
- **Fade**: Smooth opacity transitions
- **Slide**: Left/right sliding effects
- **Scale**: Zoom in/out transitions
- **Custom**: Vertical movement with opacity

### 3. Scroll Animations
Scroll-triggered effects using ScrollTrigger:
- `fadeInUp` - Fade in from bottom
- `fadeInLeft` / `fadeInRight` - Horizontal fade
- `scaleIn` - Scale and fade
- `staggerChildren` - Animate children with delay
- `rotateIn` - Rotate and scale
- `slideInFromBottom` - Slide up effect
- `typewriter` - Character-by-character text reveal

### 4. Interactive Elements
Enhanced button animations:
- `press` - Scale down/up effect
- `scale` - Hover scale effect
- `bounce` - Bouncy interactions
- `glow` - Glowing hover effect

## 🔧 Usage Examples

### Basic Page Navigation with GSAP
```tsx
import TransitionLink from '@/components/TransitionLink'

// Automatic GSAP transition
<TransitionLink href="/about">About Us</TransitionLink>
```

### Programmatic Navigation
```tsx
import { useGSAPPageTransition } from '@/hooks/useGSAPPageTransition'

function MyComponent() {
  const { navigate } = useGSAPPageTransition()

  const handleNavigation = async () => {
    await navigate('/dashboard', {
      animationType: 'slide',
      delay: 1500,
      onStart: () => console.log('Starting navigation'),
      onComplete: () => console.log('Navigation complete')
    })
  }

  return <button onClick={handleNavigation}>Go to Dashboard</button>
}
```

### Scroll Animations
```tsx
import GSAPScrollSection from '@/components/GSAPScrollSection'

// Fade in from bottom when scrolled into view
<GSAPScrollSection animationType="fadeInUp" delay={0.3}>
  <h2>This will animate when scrolled into view</h2>
</GSAPScrollSection>

// Stagger animation for multiple children
<GSAPScrollSection animationType="staggerChildren">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</GSAPScrollSection>
```

### Advanced Scroll Animations with Hook
```tsx
import { useScrollAnimation, scrollAnimations } from '@/hooks/useScrollAnimations'

function MyComponent() {
  const ref = useScrollAnimation(
    (element) => scrollAnimations.fadeInUp(element),
    [], // dependencies
    {
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false
    }
  )

  return <div ref={ref}>Content to animate</div>
}
```

### Enhanced Buttons
```tsx
import GSAPButton from '@/components/GSAPButton'

// Different animation types
<GSAPButton 
  variant="primary" 
  animationType="bounce"
  onClick={handleClick}
>
  Bouncy Button
</GSAPButton>

<GSAPButton 
  variant="glass" 
  animationType="glow"
  size="lg"
>
  Glowing Button
</GSAPButton>
```

### Custom Timeline Animations
```tsx
import { useScrollTimeline } from '@/hooks/useScrollAnimations'
import { gsap } from '@/lib/gsap'

function ComplexAnimation() {
  const [ref, timeline] = useScrollTimeline()

  useEffect(() => {
    if (timeline && ref.current) {
      timeline
        .fromTo('.title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo('.subtitle', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8 }, '-=0.5')
        .fromTo('.content', { scale: 0.8 }, { scale: 1, duration: 0.6 }, '-=0.3')
    }
  }, [timeline])

  return (
    <div ref={ref}>
      <h1 className="title">Main Title</h1>
      <h2 className="subtitle">Subtitle</h2>
      <div className="content">Content</div>
    </div>
  )
}
```

## ⚡ Performance Optimizations

### Hardware Acceleration
GSAP automatically uses hardware acceleration for:
- `transform` properties (translate, scale, rotate)
- `opacity` changes
- GPU-accelerated rendering

### CSS Classes for Optimization
```css
/* Add to elements that will be animated */
.gsap-animate {
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* For scroll animations */
.gsap-scroll-animate {
  opacity: 0;
  transform: translateY(50px);
}
```

### Device-Specific Optimizations
```tsx
import { optimizeForDevice, getResponsiveDuration } from '@/lib/gsap'

// Automatically optimizes for device capabilities
optimizeForDevice()

// Responsive animation durations
const duration = getResponsiveDuration(1.0) // Adjusts based on device
```

## 🎛️ Configuration

### GSAP Global Settings
Configure in `src/lib/gsap.ts`:
```tsx
gsap.defaults({
  ease: "power2.out",
  duration: 0.6
})

// Performance config for low-end devices
gsap.config({
  force3D: false,
  autoSleep: 60
})
```

### Animation Utilities
Pre-built animation functions:
```tsx
import { animations } from '@/lib/gsap'

// Use predefined animations
animations.fadeIn(element, { duration: 1, delay: 0.5 })
animations.slideInFromLeft(element)
animations.buttonPress(buttonElement)
animations.glassHover(glassElement)
```

## 🔄 Migration from Framer Motion

### Before (Framer Motion)
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

### After (GSAP)
```tsx
<GSAPScrollSection animationType="fadeInUp" duration={0.8}>
  Content
</GSAPScrollSection>
```

## 📱 Mobile Optimizations

### Responsive Animations
- Automatic duration adjustment for mobile devices
- Reduced motion support for accessibility
- Battery-saving optimizations for low-end devices

### Touch Interactions
```tsx
// Enhanced touch feedback
<GSAPButton animationType="press">
  Touch-optimized button
</GSAPButton>
```

## 🛠️ Debugging and Development

### Enable GSAP DevTools (Development Only)
```tsx
// In development, enable markers for ScrollTrigger
<GSAPScrollSection 
  animationType="fadeInUp"
  options={{ markers: true }}
>
  Content with visible scroll markers
</GSAPScrollSection>
```

### Performance Monitoring
```tsx
// Monitor animation performance
gsap.ticker.fps(30) // Limit to 30fps on low-end devices
```

## 🎯 Best Practices

### 1. Use Hardware Acceleration
- Prefer `transform` over changing `left/top`
- Use `opacity` instead of `visibility`
- Add `gsap-animate` class to animated elements

### 2. Optimize for Performance
- Use `will-change` property sparingly
- Clean up animations on component unmount
- Batch DOM reads and writes

### 3. Accessibility
- Respect `prefers-reduced-motion`
- Provide alternative experiences for motion-sensitive users
- Ensure animations don't interfere with screen readers

### 4. Timing and Easing
- Use consistent easing curves across your application
- Match animation durations to user expectations
- Provide immediate feedback for user interactions

## 🔍 Troubleshooting

### Common Issues

1. **Animations not working on mobile**
   - Check hardware acceleration settings
   - Verify `will-change` properties
   - Test on actual devices, not just browser dev tools

2. **Performance issues**
   - Enable `optimizeForDevice()` in gsap config
   - Use `getResponsiveDuration()` for adaptive timing
   - Limit concurrent animations

3. **ScrollTrigger not triggering**
   - Ensure ScrollTrigger is properly imported
   - Check trigger element is in viewport
   - Verify start/end positions

4. **TypeScript errors**
   - Install `@types/gsap` if needed
   - Use type assertions for complex animations
   - Check ref types match expected elements

### Performance Tips

1. **Limit simultaneous animations** - Don't animate too many elements at once
2. **Use transform and opacity** - These properties are GPU-accelerated
3. **Avoid animating layout properties** - Don't animate width, height, padding
4. **Enable hardware acceleration** - Add `transform: translateZ(0)` to animated elements

## 📈 Benefits Over Previous System

### Performance Improvements
- **60fps animations** on most devices
- **Hardware acceleration** by default
- **Smaller bundle size** than multiple animation libraries
- **Better mobile performance** with device detection

### Developer Experience
- **Unified animation system** across the entire application
- **TypeScript support** with full type safety
- **Extensive documentation** and examples
- **Professional animation library** used by major companies

### User Experience
- **Smoother animations** with professional easing curves
- **Consistent timing** across all interactions
- **Accessibility support** with reduced motion preferences
- **Progressive enhancement** with graceful degradation

The GSAP integration provides a professional, performant, and accessible animation system that enhances your application's user experience while maintaining excellent performance across all devices and browsers.