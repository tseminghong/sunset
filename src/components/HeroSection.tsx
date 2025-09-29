'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="hero-gradient text-center py-20 md:py-28 rounded-3xl mb-16 md:mb-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-primary"
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
          className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 text-secondary"
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

      {/* Floating background elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full"
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
        className="absolute bottom-10 right-10 w-16 h-16 bg-purple-500/10 rounded-full"
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
    </section>
  )
}