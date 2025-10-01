'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useHeroScrollEffects } from '@/hooks/useHeroScrollEffects'

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

  return (
    <section 
      ref={heroRef}
      className="hero-gradient hero-fullscreen text-center py-20 md:py-28 rounded-3xl mb-16 md:mb-20 relative overflow-hidden"
    >
      {/* Hero Background Layer */}
      <div className="hero-background absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
      </div>

      <motion.div
        className="hero-content relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-primary"
          initial={{ opacity: 0, y: -100, rotate: -5, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ 
            duration: 2, 
            ease: [0.175, 0.885, 0.32, 1.275], // easeOutBack
            delay: 0.2 
          }}
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p 
          className="hero-subtitle text-lg sm:text-xl max-w-3xl mx-auto mb-8 text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.p 
          className="text-secondary mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {t('hero.beta')}
        </motion.p>

        <motion.a 
          href="/ict-v1.0.0.apk"
          className="primary-btn px-8 py-3 text-lg inline-block btn-press-effect"
          initial={{ opacity: 0, y: 50, scale: 0.9, rotate: 3 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.8,
            ease: [0.68, -0.55, 0.265, 1.55], // bounce
            delay: 0.8 
          }}
          whileHover={{ 
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {t('hero.download')}
        </motion.a>
      </motion.div>

      {/* Enhanced Floating background elements */}
      <motion.div
        className="floating-element absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full"
        animate={{ 
          y: [-10, 10, -10],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="floating-element absolute bottom-10 right-10 w-16 h-16 bg-purple-500/10 rounded-full"
        animate={{ 
          y: [10, -10, 10],
          rotate: [0, -3, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="floating-element absolute top-1/2 left-20 w-12 h-12 bg-pink-500/10 rounded-full"
        animate={{ 
          x: [-5, 15, -5],
          y: [-15, 5, -15],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        className="floating-element absolute top-1/3 right-20 w-8 h-8 bg-yellow-500/10 rounded-full"
        animate={{ 
          x: [5, -10, 5],
          y: [10, -5, 10],
          rotate: [0, -8, 0]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </section>
  )
}