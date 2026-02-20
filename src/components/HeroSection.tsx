'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useHeroScrollEffects } from '@/hooks/useHeroScrollEffects'
import { useAuth } from '@/contexts/AuthContext'
import { gsap } from '@/lib/gsap'
import { useGsapHoverAnimation, useGsapMountAnimation } from '@/hooks/useGsapMotion'

export default function HeroSection() {
  const { t } = useLanguage()
  const { user } = useAuth()
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

  const contentRef = useGsapMountAnimation<HTMLDivElement>({
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'power2.out' }
  })

  const progressCardsRef = useGsapMountAnimation<HTMLDivElement>({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'power2.out', delay: 0.2 }
  })

  const floatingARef = useRef<HTMLDivElement>(null)
  const floatingBRef = useRef<HTMLDivElement>(null)
  const floatingCRef = useRef<HTMLDivElement>(null)
  const floatingDRef = useRef<HTMLDivElement>(null)

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

  // Sample progress data - in real implementation, this would come from Supabase
  const sampleProgress = [
    { name: 'JavaScript Interactive Course', progress: 45, category: 'Programming' },
    { name: 'Database Design Fundamentals', progress: 72, category: 'Database' },
    { name: 'HTML/CSS Mastery', progress: 28, category: 'Web Development' }
  ]
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
        className="hero-content relative z-10 max-w-6xl mx-auto px-4"
      >
        {/* Welcome Message */}
        {user ? (
          <div className="mb-8">
            <h1 
              ref={titleRef}
              className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-primary"
            >
              Welcome back, {user.username}! 👋
            </h1>
            <p className="text-lg text-secondary">
              Continue your learning journey
            </p>
          </div>
        ) : (
          <div className="mb-8">
            <h1 
              ref={titleRef}
              className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-primary"
            >
              {t('hero.title')}
            </h1>
            <p className="hero-subtitle text-lg sm:text-xl max-w-3xl mx-auto mb-8 text-secondary">
              {t('hero.subtitle')}
            </p>
          </div>
        )}

        {/* Progress Cards Section */}
        {user && (
          <div
            ref={progressCardsRef}
            className="mb-12"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-primary">
              Continue Where You Left Off
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {sampleProgress.map((item, idx) => (
                <div
                  key={idx}
                  className="glassmorphism-card p-6 rounded-xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-secondary line-clamp-2">{item.name}</h3>
                    <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-secondary">{item.progress}% Complete</p>
                  <a href="#" className="text-blue-400 hover:text-blue-300 text-sm mt-3 inline-block">
                    Resume Course →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <a 
          href="/ict-v1.1.0.apk"
          download="ICT-Revision-Hub-v1.1.0.apk"
          className="primary-btn px-8 py-3 text-lg inline-block btn-press-effect hero-download-btn"
        >
          {user ? 'Download App' : 'Get Started'}
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