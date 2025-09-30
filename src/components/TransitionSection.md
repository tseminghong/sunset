# TransitionSection Component

A reusable animation component that provides smooth transition effects using Framer Motion.

## Usage

```tsx
import TransitionSection from '@/components/TransitionSection'

// Basic usage
<TransitionSection>
  <h1>Your content here</h1>
</TransitionSection>

// With custom properties
<TransitionSection
  className="bg-secondary py-16 rounded-3xl"
  delay={0.2}
  duration={1.0}
  direction="up"
  distance={50}
  id="my-section"
>
  <div className="text-center">
    <h1>Animated Content</h1>
    <p>This will animate into view smoothly</p>
  </div>
</TransitionSection>
```

## Props

- `children` (ReactNode) - The content to animate
- `className` (string, optional) - CSS classes for styling
- `delay` (number, optional) - Animation delay in seconds (default: 0)
- `duration` (number, optional) - Animation duration in seconds (default: 0.8)
- `direction` ('up' | 'down' | 'left' | 'right', optional) - Animation direction (default: 'up')
- `distance` (number, optional) - Distance to animate in pixels (default: 50)
- `id` (string, optional) - HTML id attribute

## Animation Directions

- `up`: Slides in from bottom to top
- `down`: Slides in from top to bottom
- `left`: Slides in from right to left
- `right`: Slides in from left to right

## Examples

### Slide from left
```tsx
<TransitionSection direction="left" distance={100}>
  <h2>Slides in from the right</h2>
</TransitionSection>
```

### Delayed animation
```tsx
<TransitionSection delay={0.5} duration={1.2}>
  <p>Appears after 0.5 seconds with slower animation</p>
</TransitionSection>
```

### Multiple sections with staggered timing
```tsx
<TransitionSection delay={0}>
  <h1>First section</h1>
</TransitionSection>

<TransitionSection delay={0.2}>
  <h2>Second section (slightly delayed)</h2>
</TransitionSection>

<TransitionSection delay={0.4}>
  <h3>Third section (more delayed)</h3>
</TransitionSection>
```
