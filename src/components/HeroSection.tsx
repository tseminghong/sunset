'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useHeroScrollEffects } from '@/hooks/useHeroScrollEffects'
import { gsap } from '@/lib/gsap'
import { useGsapHoverAnimation, useGsapMountAnimation } from '@/hooks/useGsapMotion'

export default function HeroSection() {
  const { t } = useLanguage()
  const { heroRef } = useHeroScrollEffects({
    enabled: true,
    startScale: 1.1,
    endScale: 1,
    startHeight: '100vh',
    endHeight: 'auto',
    duration: 1.2,
    ease: 'power2.out'
  })

  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const betaRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useGsapHoverAnimation<HTMLAnchorElement>({
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.05, y: -2 },
    pressIn: { scale: 0.95 },
    pressOut: { scale: 1.05, y: -2 },
    transition: { duration: 0.2, ease: 'power2.out' }
  })
  const contentRef = useGsapMountAnimation<HTMLDivElement>({
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'power2.out' }
  })

  const floatingARef = useRef<HTMLDivElement>(null)
  const floatingBRef = useRef<HTMLDivElement>(null)
  const floatingCRef = useRef<HTMLDivElement>(null)
  const floatingDRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let titleSplit: any
    let subtitleSplit: any
    let ctx: gsap.Context | null = null
    let isMounted = true

    const animateHeroText = async () => {
      if (!titleRef.current) return

      try {
        const splitModule = await import('gsap/SplitText')
        const SplitText = (splitModule as any).SplitText

        if (!SplitText) {
          console.warn('SplitText plugin not available, skipping hero animation.')
          return
        }

        gsap.registerPlugin(SplitText)

        if (!isMounted) return

        ctx = gsap.context(() => {
          titleSplit = new SplitText(titleRef.current, {
            type: 'chars,words',
            charsClass: 'hero-char'
          })

          if (subtitleRef.current) {
            subtitleSplit = new SplitText(subtitleRef.current, {
              type: 'lines',
              linesClass: 'hero-line'
            })
          }

          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

          tl.from(titleSplit.chars, {
            yPercent: 130,
            rotateX: -90,
            opacity: 0,
            stagger: 0.045,
            duration: 0.75
          })

          if (subtitleSplit?.lines?.length) {
            tl.from(subtitleSplit.lines, {
              yPercent: 120,
              opacity: 0,
              stagger: 0.12,
              duration: 0.6
            }, '-=0.4')
          }

          if (betaRef.current) {
            tl.from(betaRef.current, {
              opacity: 0,
              y: 20,
              duration: 0.5
            }, '-=0.2')
          }
        }, heroRef)
      } catch (error) {
        console.warn('SplitText animation failed:', error)
      }
    }

    animateHeroText()

    return () => {
      isMounted = false
      ctx?.revert()
      titleSplit?.revert()
      subtitleSplit?.revert()
    }
  }, [heroRef])

  useEffect(() => {
    const tweens: gsap.core.Tween[] = []

    if (floatingARef.current) {
      tweens.push(gsap.to(floatingARef.current, {
        keyframes: [
          { y: -10, rotate: 0 },
          { y: 10, rotate: 5 },
          { y: -10, rotate: 0 }
        ],
        duration: 4,
        repeat: -1,
        ease: 'sine.inOut'
      }))
    }

    if (floatingBRef.current) {
      tweens.push(gsap.to(floatingBRef.current, {
        keyframes: [
          { y: 10, rotate: 0 },
          { y: -10, rotate: -3 },
          { y: 10, rotate: 0 }
        ],
        duration: 3,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1
      }))
    }

    if (floatingCRef.current) {
      tweens.push(gsap.to(floatingCRef.current, {
        keyframes: [
          { x: -5, y: -15, rotate: 0 },
          { x: 15, y: 5, rotate: 10 },
          { x: -5, y: -15, rotate: 0 }
        ],
        duration: 5,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 2
      }))
    }

    if (floatingDRef.current) {
      tweens.push(gsap.to(floatingDRef.current, {
        keyframes: [
          { x: 5, y: 10, rotate: 0 },
          { x: -10, y: -5, rotate: -8 },
          { x: 5, y: 10, rotate: 0 }
        ],
        duration: 3.5,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 0.5
      }))
    }

    return () => {
      tweens.forEach(tween => tween.kill())
    }
  }, [])

  return (
    <section 
      ref={heroRef}
      className="hero-gradient hero-fullscreen text-center py-20 md:py-28 rounded-3xl mb-16 md:mb-20 relative overflow-hidden"
    >
      {/* Hero Background Layer */}
      <div className="hero-background absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
      </div>

      <div
        ref={contentRef}
        className="hero-content relative z-10"
      >
        <h1 
          ref={titleRef}
          className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-primary"
        >
          {t('hero.title')}
        </h1>

        <p 
          ref={subtitleRef}
          className="hero-subtitle text-lg sm:text-xl max-w-3xl mx-auto mb-8 text-secondary"
        >
          {t('hero.subtitle')}
        </p>

        <p 
          ref={betaRef}
          className="text-secondary mb-6"
        >
          {t('hero.beta')}
        </p>

        <a 
          ref={ctaRef}
          href="/ict-v1.0.0.apk"
          className="primary-btn px-8 py-3 text-lg inline-block btn-press-effect hero-download-btn"
        >
          {t('hero.download')}
        </a>
      </div>

      {/* Enhanced Floating background elements */}
      <div
        ref={floatingARef}
        className="floating-element absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full"
      />
      
      <div
        ref={floatingBRef}
        className="floating-element absolute bottom-10 right-10 w-16 h-16 bg-purple-500/10 rounded-full"
      />

      <div
        ref={floatingCRef}
        className="floating-element absolute top-1/2 left-20 w-12 h-12 bg-pink-500/10 rounded-full"
      />

      <div
        ref={floatingDRef}
        className="floating-element absolute top-1/3 right-20 w-8 h-8 bg-yellow-500/10 rounded-full"
      />
    </section>
  )
}