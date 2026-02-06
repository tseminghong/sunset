'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeDScrollBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const meshesRef = useRef<THREE.Mesh[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const initScene = () => {
      try {
        // 1. Basic Three.js Setup
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x0a0e27)

        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        cameraRef.current = camera
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        
        if (containerRef.current) {
          containerRef.current.appendChild(renderer.domElement)
        }
        rendererRef.current = renderer

        // 2. Create Cool Objects (Floating Data Nodes)
        const createDataNode = (position: [number, number, number], color: number) => {
          const geometry = new THREE.IcosahedronGeometry(0.5, 2)
          const material = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true,
            transparent: true,
            opacity: 0.8
          })
          const mesh = new THREE.Mesh(geometry, material)
          mesh.position.set(...position)
          scene.add(mesh)
          return mesh
        }

        // Create multiple nodes in a pattern
        const node1 = createDataNode([-3, 2, 0], 0x00ffcc)
        const node2 = createDataNode([0, -2, -2], 0xff00ff)
        const node3 = createDataNode([3, 1, -1], 0xffaa00)
        const node4 = createDataNode([-2, -1, -3], 0x00aaff)

        meshesRef.current = [node1, node2, node3, node4]

        // 3. Create Scroll-Controlled Animations (Simplified without anime.timeline)
        // We'll animate based on scroll directly to avoid anime.timeline issues

        // 4. Bind Scroll to Mesh Rotation
        const handleScroll = () => {
          const scrollPercent =
            window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
          const clampedPercent = Math.min(scrollPercent, 1)
          
          // Apply rotation based on scroll percentage
          const maxRotation = Math.PI * 2
          
          node1.rotation.x = maxRotation * clampedPercent
          node1.rotation.y = maxRotation * clampedPercent
          
          node2.rotation.x = maxRotation * clampedPercent
          node2.rotation.z = maxRotation * clampedPercent
          
          node3.rotation.y = maxRotation * clampedPercent
          node3.rotation.z = maxRotation * clampedPercent
          
          node4.rotation.x = Math.PI * clampedPercent
          node4.rotation.y = Math.PI * clampedPercent
          
          // Camera zoom animation
          camera.position.z = 5 - (2.5 * clampedPercent)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        // 5. Render Loop
        let animationFrameId: number
        const animate = () => {
          // Add small constant rotation for visual interest
          meshesRef.current.forEach((mesh) => {
            mesh.rotation.x += 0.0005
            mesh.rotation.y += 0.0008
          })

          renderer.render(scene, camera)
          animationFrameId = requestAnimationFrame(animate)
        }
        animate()

        // 6. Handle Window Resize
        const handleResize = () => {
          const width = window.innerWidth
          const height = window.innerHeight
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }

        window.addEventListener('resize', handleResize, { passive: true })

        // Cleanup function
        return () => {
          window.removeEventListener('scroll', handleScroll)
          window.removeEventListener('resize', handleResize)
          cancelAnimationFrame(animationFrameId)

          if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
            containerRef.current.removeChild(renderer.domElement)
          }

          // Dispose of all geometries and materials
          meshesRef.current.forEach((mesh) => {
            if (mesh.geometry) mesh.geometry.dispose()
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => m.dispose())
              } else {
                mesh.material.dispose()
              }
            }
          })

          renderer.dispose()
        }
      } catch (error) {
        console.error('Error initializing 3D background:', error)
      }
    }

    // Initialize the scene and get cleanup function
    const cleanup = initScene()

    // Return cleanup function for useEffect
    return cleanup
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: -1
      }}
    />
  )
}
