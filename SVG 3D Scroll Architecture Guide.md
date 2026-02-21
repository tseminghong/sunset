Architecture Guide: 3D SVG Scroll-Triggered Animation

Target Audience: AI Developer Agents / Frontend Engineers
Goal: Build a high-performance, smooth-scrolling 3D website using mathematical SVG paths instead of video or image sequences.

This document outlines the core concepts, library stack, and step-by-step techniques required to build an interactive, isometric 3D tunnel that responds to a user's scroll direction.

1. The Core Stack

To achieve buttery-smooth 3D vector animations tied to the scrollbar, you need this specific combination of libraries:

Tailwind CSS: For rapid UI styling and typography positioning.

GSAP (GreenSock Animation Platform): The engine for animating CSS properties and SVG attributes.

GSAP ScrollTrigger: A GSAP plugin that binds timeline progress to the browser's scroll position.

Lenis: A lightweight smooth-scrolling library. This is critical for preventing clunky mouse-wheel ticks from ruining the fluid 3D motion.

2. Structural Architecture (HTML/CSS)

The layout relies on a "sticky" technique to keep the visual canvas in the viewport while the user scrolls down a tall, invisible container.

The HTML Skeleton

<div id="scroll-container"> <!-- Very tall container -->
    <div class="sticky-wrapper"> <!-- Sticks to the viewport -->
        <div class="svg-container">
            <svg id="main-svg" viewBox="0 0 1000 1000">...</svg>
        </div>
        <div class="content-layer">
            <!-- HTML Text overlay steps -->
        </div>
    </div>
</div>


The CSS Magic (Crucial Rules)

#scroll-container: Needs a massive height (e.g., height: 500vh;) to give the user enough physical scrolling distance to play the animation.

.sticky-wrapper: Must have position: sticky; top: 0; height: 100vh; overflow: hidden;.

3D Secret: It must also have perspective: 1000px;. Applying perspective to the parent wrapper rather than the SVG itself prevents rendering bugs in Safari/Chrome.

#main-svg: Needs overflow: visible; so that when you zoom into the SVG, the edges don't get cut off by its original bounding box. Add will-change: transform; for hardware acceleration.

3. The Smooth Scroll Integration (Lenis + GSAP)

A standard mouse scroll wheel fires in abrupt steps. For a premium 3D feel, you must intercept the scroll and apply momentum.

Implementation:

Initialize Lenis.

Tell Lenis to update ScrollTrigger on every scroll event.

Sync Lenis's requestAnimationFrame with GSAP's internal ticker.

const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);


Note for AI: When using Lenis, GSAP ScrollTriggers must use scrub: true rather than a numeric scrub value (like scrub: 1), because Lenis handles the smoothing natively.

4. Generating the SVG Environment

Instead of writing massive amounts of raw SVG in the HTML document, use JavaScript (document.createElementNS) to mathematically generate the paths. This keeps the DOM clean and allows for infinite customization.

Example: Generating a Hexagon Tunnel

Use trigonometric math (Math.cos, Math.sin) to calculate 6 points around a center coordinate.

Build an SVG path string (M x y L x y Z).

Append paths in a loop, increasing the radius each time.

Add SVG filters (like <filter id="glow">) to specific elements for neon bloom effects.

5. The "Drawing" Illusion Technique

To make the SVG lines appear as if they are being drawn in real-time as the user scrolls, use the Dash Array / Dash Offset technique.

The Logic:

Find the total length of the path using .getTotalLength().

Set the CSS stroke-dasharray to that exact length (creating one massive dash that covers the whole line).

Set the CSS stroke-dashoffset to that length (pushing the dash entirely out of view, making the line invisible).

Animate the stroke-dashoffset down to 0 using GSAP.

const paths = document.querySelectorAll('.draw-path');
paths.forEach(path => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
});
// Later in timeline: tl.to(path, { strokeDashoffset: 0 });


6. The 3D Camera Illusion

To simulate a camera "flying" through a 3D space using 2D vectors:

Initial State: Tilt the entire SVG backward on the X-axis to make it look like a floor grid (rotationX: 55, rotationZ: -20).

Animation: Bind a GSAP tween to the scrollbar that flattens the SVG (rotationX: 80) while aggressively scaling it up (scale: 3.5). This mimics zooming into the horizon.

7. The Master Timeline Construction

Do not create multiple scattered ScrollTriggers. Instead, create one Master Timeline attached to the #scroll-container, and place all animations along this timeline using relative position parameters (e.g., 0, 2, "+=1").

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true 
    }
});

// A) Fly the camera (duration 10 is relative to the timeline)
tl.to("#main-svg", { rotationX: 80, scale: 3.5, duration: 10 }, 0);

// B) Draw the elements (starts at 0, finishes at 4)
tl.to(".grid-line", { strokeDashoffset: 0, duration: 4 }, 0);

// C) Sync the HTML Text fading
tl.to(".step-1", { opacity: 0, y: -50, duration: 1 }, 1);
tl.to(".step-2", { opacity: 1, y: 0, duration: 1 }, 3);


Summary for AI Generation

When prompted to build a site like this:

Setup the 500vh + sticky skeleton.

Inject GSAP, ScrollTrigger, and Lenis via CDN.

Use JS to build a massive SVG canvas.

Apply CSS perspective to the wrapper.

Build a master gsap.timeline({ scrollTrigger: { scrub: true } }).

Animate SVG scale/rotation for the camera, and strokeDashoffset for the drawing effect.