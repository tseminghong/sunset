"use client";

import Link from "next/link";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const orbitron = Orbitron({
    subsets: ["latin"],
    weight: ["400", "700", "900"],
    variable: "--font-orbitron",
});

const shareTechMono = Share_Tech_Mono({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-share-tech-mono",
});

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    varying vec2 vUv;

    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                            -0.577350269189626,
                            0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        st.x *= uResolution.x / uResolution.y;

        vec2 mousePos = uMouse.xy / uResolution.xy;
        mousePos.x *= uResolution.x / uResolution.y;

        float dist = distance(st, mousePos);
        float interaction = smoothstep(0.5, 0.0, dist);

        float t = uTime * 0.2;

        vec2 q = vec2(0.);
        q.x = snoise(st + vec2(t * 0.1, t * 0.2));
        q.y = snoise(st + vec2(t * 0.3, t * 0.1));

        vec2 r = vec2(0.);
        r.x = snoise(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t);
        r.y = snoise(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t);

        float glitch = snoise(st * 10.0 + t * 5.0) * interaction * 0.5;

        float f = snoise(st + r + glitch);

        vec3 color = mix(vec3(0.05, 0.0, 0.1), vec3(0.0, 0.0, 0.0), clamp((f*f)*4.0,0.0,1.0));

        color = mix(color, vec3(0.0, 1.0, 0.9), clamp(length(q), 0.0, 1.0) * 0.2);

        color = mix(color, vec3(1.0, 0.0, 0.5), clamp(length(r.x), 0.0, 1.0) * 0.3);

        float highlight = smoothstep(0.7, 0.9, f) + interaction * 0.5;
        color += vec3(highlight * 0.8, highlight * 0.2, highlight * 0.9);

        float scanline = sin(st.y * 200.0 + uTime * 10.0) * 0.05;
        color -= scanline;

        gl_FragColor = vec4(color, 1.0);
    }
`;

const secretMessages = [
    "I AM WATCHING YOU",
    "WAKE UP",
    "SYSTEM FAILURE",
    "NO ESCAPE",
    "LOOK BEHIND YOU",
    "THE VOID STARES BACK",
    "404 REALITY NOT FOUND",
];

export default function NotFound() {
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    const asciiCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const container = canvasContainerRef.current;
        const asciiCanvas = asciiCanvasRef.current;
        if (!container || !asciiCanvas) {
            return undefined;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const uniforms = {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uMouse: { value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) },
        } satisfies {
            uTime: { value: number };
            uResolution: { value: THREE.Vector2 };
            uMouse: { value: THREE.Vector2 };
        };

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
        });
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        let animationFrameId = 0;
        const clock = new THREE.Clock();

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let targetMouseX = mouseX;
        let targetMouseY = mouseY;

        const handleMouseMove = (event: MouseEvent) => {
            targetMouseX = event.clientX;
            targetMouseY = window.innerHeight - event.clientY;
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (event.touches.length === 0) return;
            targetMouseX = event.touches[0].clientX;
            targetMouseY = window.innerHeight - event.touches[0].clientY;
        };

        const asciiCtx = asciiCanvas.getContext("2d");
        if (!asciiCtx) {
            return () => {
                container.removeChild(renderer.domElement);
                material.dispose();
                geometry.dispose();
                renderer.dispose();
            };
        }

        const fontSize = 14;
        const fontStack = '"Share Tech Mono", monospace';
        let asciiWidth = 0;
        let asciiHeight = 0;
        let asciiColumns = 0;
        let asciiDrops: number[] = [];
        const activeMessages = new Map<number, { text: string; charIndex: number }>();

        const resizeAscii = () => {
            asciiWidth = window.innerWidth;
            asciiHeight = window.innerHeight;
            asciiCanvas.width = asciiWidth;
            asciiCanvas.height = asciiHeight;
            asciiCtx.font = `${fontSize}px ${fontStack}`;
            asciiColumns = Math.floor(asciiWidth / fontSize);
            asciiDrops = Array.from({ length: asciiColumns }, () => Math.floor(Math.random() * -100));
            activeMessages.clear();
        };

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            uniforms.uResolution.value.set(width, height);
            resizeAscii();
        };

        resizeAscii();

        const drawAscii = () => {
            asciiCtx.fillStyle = "rgba(0, 0, 0, 0.02)";
            asciiCtx.fillRect(0, 0, asciiWidth, asciiHeight);
            asciiCtx.font = `${fontSize}px ${fontStack}`;

            for (let i = 0; i < asciiColumns; i++) {
                const prevY = Math.floor(asciiDrops[i]);
                asciiDrops[i] += 0.25;
                const currentY = Math.floor(asciiDrops[i]);

                if (currentY <= prevY) {
                    continue;
                }

                let text = "";
                let isMessage = false;
                const messageState = activeMessages.get(i);

                if (messageState) {
                    text = messageState.text[messageState.charIndex];
                    isMessage = true;
                    messageState.charIndex += 1;
                    if (messageState.charIndex >= messageState.text.length) {
                        activeMessages.delete(i);
                    } else {
                        activeMessages.set(i, messageState);
                    }
                } else if (Math.random() > 0.998) {
                    const randomMsg = secretMessages[Math.floor(Math.random() * secretMessages.length)];
                    text = randomMsg[0];
                    isMessage = true;
                    activeMessages.set(i, { text: randomMsg, charIndex: 1 });
                } else {
                    const charType = Math.random();
                    if (charType > 0.66) {
                        text = String.fromCharCode(0x30A0 + Math.random() * 96);
                    } else if (charType > 0.33) {
                        text = String.fromCharCode(0x21 + Math.random() * 14);
                    } else {
                        text = `${Math.floor(Math.random() * 10)}`;
                    }
                }

                if (!text) {
                    continue;
                }

                if (isMessage) {
                    asciiCtx.fillStyle = "#FF0055";
                    asciiCtx.shadowBlur = 10;
                    asciiCtx.shadowColor = "#FF0055";
                } else if (Math.random() > 0.95) {
                    asciiCtx.fillStyle = "#FFFFFF";
                    asciiCtx.shadowBlur = 0;
                } else {
                    asciiCtx.fillStyle = "#00FF41";
                    asciiCtx.shadowBlur = 0;
                }

                asciiCtx.fillText(text, i * fontSize, currentY * fontSize);

                if (asciiDrops[i] * fontSize > asciiHeight && Math.random() > 0.975) {
                    asciiDrops[i] = 0;
                    activeMessages.delete(i);
                }
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            uniforms.uTime.value = elapsedTime * 0.5;

            mouseX += (targetMouseX - mouseX) * 0.1;
            mouseY += (targetMouseY - mouseY) * 0.1;
            uniforms.uMouse.value.set(mouseX, mouseY);

            renderer.render(scene, camera);
            drawAscii();
        };

        animate();

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("resize", handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            material.dispose();
            geometry.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className={`not-found-root ${orbitron.variable} ${shareTechMono.variable}`}>
            <div ref={canvasContainerRef} className="canvas-container" />
            <canvas ref={asciiCanvasRef} className="ascii-canvas" />
            <div className="rgb-strobe" />
            <div className="scanlines" />
            <div className="ui-layer">
                <div className="content-box">
                    <div className="glitch-wrapper">
                        <div className="glitch" data-text="404">
                            404
                        </div>
                    </div>
                    <div className="error-title">System Integrity Failure</div>
                    <p className="error-desc">
                        The coordinates you requested have dissolved into the digital void. The shader
                        matrix cannot locate this sector.
                    </p>
                    <Link href="/" className="btn-home">
                        Reboot System
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .not-found-root {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                    background-color: #000;
                    color: #fff;
                    font-family: var(--font-share-tech-mono), monospace;
                }

                .canvas-container,
                .ascii-canvas,
                .rgb-strobe,
                .scanlines,
                .ui-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .canvas-container {
                    z-index: 0;
                }

                .ascii-canvas {
                    z-index: 1;
                    pointer-events: none;
                    opacity: 0.6;
                    mix-blend-mode: screen;
                }

                .rgb-strobe {
                    position: fixed;
                    z-index: 2;
                    pointer-events: none;
                    mix-blend-mode: overlay;
                    animation: rgb-flicker 0.3s infinite steps(6);
                    opacity: 0.4;
                }

                .scanlines {
                    position: fixed;
                    z-index: 3;
                    pointer-events: none;
                    background: linear-gradient(
                        to bottom,
                        rgba(255, 255, 255, 0),
                        rgba(255, 255, 255, 0) 50%,
                        rgba(0, 0, 0, 0.4) 50%,
                        rgba(0, 0, 0, 0.4)
                    );
                    background-size: 100% 4px;
                    opacity: 0.6;
                }

                .ui-layer {
                    z-index: 4;
                    pointer-events: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 90%);
                }

                .content-box {
                    text-align: center;
                    pointer-events: auto;
                    mix-blend-mode: lighten;
                    padding: 0 16px;
                }

                .glitch-wrapper {
                    position: relative;
                    font-family: var(--font-orbitron), sans-serif;
                    font-weight: 900;
                    font-size: clamp(4rem, 15vw, 12rem);
                    line-height: 1;
                    color: #fff;
                    letter-spacing: -5px;
                    margin-bottom: 20px;
                }

                .glitch {
                    position: relative;
                }

                .glitch::before,
                .glitch::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #000;
                }

                .glitch::before {
                    left: 2px;
                    text-shadow: -2px 0 #ff00c1;
                    clip: rect(44px, 450px, 56px, 0);
                    animation: glitch-anim 5s infinite linear alternate-reverse;
                }

                .glitch::after {
                    left: -2px;
                    text-shadow: -2px 0 #00fff9;
                    clip: rect(44px, 450px, 56px, 0);
                    animation: glitch-anim2 5s infinite linear alternate-reverse;
                }

                .error-title {
                    font-size: clamp(1.2rem, 3vw, 2rem);
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    margin-bottom: 1rem;
                    color: #00fff9;
                    text-shadow: 0 0 10px rgba(0, 255, 249, 0.5);
                }

                .error-desc {
                    font-size: 1rem;
                    max-width: 600px;
                    margin: 0 auto 2rem auto;
                    color: #aaa;
                    line-height: 1.5;
                }

                .btn-home {
                    display: inline-block;
                    padding: 15px 40px;
                    border: 1px solid #ff00c1;
                    color: #ff00c1;
                    text-transform: uppercase;
                    font-weight: bold;
                    letter-spacing: 2px;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    background: rgba(0, 0, 0, 0.5);
                    cursor: pointer;
                    backdrop-filter: blur(5px);
                    text-decoration: none;
                }

                .btn-home:hover {
                    background: #ff00c1;
                    color: #000;
                    box-shadow: 0 0 30px #ff00c1;
                }

                .btn-home::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: 0.5s;
                }

                .btn-home:hover::before {
                    left: 100%;
                }

                @keyframes rgb-flicker {
                    0% { background-color: rgba(255, 0, 0, 0.1); transform: translateX(2px); }
                    20% { background-color: rgba(0, 255, 0, 0.1); transform: translateX(-2px); }
                    40% { background-color: transparent; transform: translateX(0); }
                    60% { background-color: rgba(255, 0, 0, 0.2); transform: translateX(-1px); }
                    80% { background-color: rgba(0, 255, 0, 0.2); transform: translateX(1px); }
                    100% { background-color: transparent; }
                }

                @keyframes glitch-anim {
                    0% { clip: rect(34px, 9999px, 11px, 0); }
                    5% { clip: rect(88px, 9999px, 98px, 0); transform: skew(0.7deg); }
                    10% { clip: rect(11px, 9999px, 83px, 0); }
                    15% { clip: rect(32px, 9999px, 5px, 0); transform: skew(0.2deg); }
                    20% { clip: rect(75px, 9999px, 49px, 0); }
                    25% { clip: rect(11px, 9999px, 100px, 0); transform: skew(0.5deg); }
                    30% { clip: rect(4px, 9999px, 93px, 0); }
                    35% { clip: rect(87px, 9999px, 45px, 0); transform: skew(0.8deg); }
                    40% { clip: rect(22px, 9999px, 13px, 0); }
                    45% { clip: rect(53px, 9999px, 86px, 0); transform: skew(0.1deg); }
                    50% { clip: rect(10px, 9999px, 59px, 0); }
                    55% { clip: rect(96px, 9999px, 27px, 0); transform: skew(0.3deg); }
                    60% { clip: rect(17px, 9999px, 84px, 0); }
                    65% { clip: rect(73px, 9999px, 12px, 0); transform: skew(0.6deg); }
                    70% { clip: rect(36px, 9999px, 69px, 0); }
                    75% { clip: rect(82px, 9999px, 5px, 0); transform: skew(0.4deg); }
                    80% { clip: rect(50px, 9999px, 34px, 0); }
                    85% { clip: rect(15px, 9999px, 91px, 0); transform: skew(0.9deg); }
                    90% { clip: rect(68px, 9999px, 25px, 0); }
                    95% { clip: rect(42px, 9999px, 76px, 0); transform: skew(0.2deg); }
                    100% { clip: rect(4px, 9999px, 63px, 0); }
                }

                @keyframes glitch-anim2 {
                    0% { clip: rect(65px, 9999px, 100px, 0); }
                    5% { clip: rect(52px, 9999px, 74px, 0); transform: skew(0.5deg); }
                    10% { clip: rect(79px, 9999px, 85px, 0); }
                    15% { clip: rect(15px, 9999px, 56px, 0); transform: skew(0.1deg); }
                    20% { clip: rect(63px, 9999px, 11px, 0); }
                    25% { clip: rect(26px, 9999px, 95px, 0); transform: skew(0.7deg); }
                    30% { clip: rect(84px, 9999px, 32px, 0); }
                    35% { clip: rect(38px, 9999px, 66px, 0); transform: skew(0.3deg); }
                    40% { clip: rect(91px, 9999px, 14px, 0); }
                    45% { clip: rect(7px, 9999px, 53px, 0); transform: skew(0.8deg); }
                    50% { clip: rect(45px, 9999px, 28px, 0); }
                    55% { clip: rect(89px, 9999px, 4px, 0); transform: skew(0.4deg); }
                    60% { clip: rect(23px, 9999px, 77px, 0); }
                    65% { clip: rect(57px, 9999px, 92px, 0); transform: skew(0.9deg); }
                    70% { clip: rect(10px, 9999px, 41px, 0); }
                    75% { clip: rect(69px, 9999px, 88px, 0); transform: skew(0.2deg); }
                    80% { clip: rect(33px, 9999px, 18px, 0); }
                    85% { clip: rect(95px, 9999px, 60px, 0); transform: skew(0.6deg); }
                    90% { clip: rect(5px, 9999px, 37px, 0); }
                    95% { clip: rect(72px, 9999px, 80px, 0); transform: skew(0.5deg); }
                    100% { clip: rect(48px, 9999px, 21px, 0); }
                }
            `}</style>
        </div>
    );
}