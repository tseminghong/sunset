'use client'

import { useState, useEffect, useRef } from 'react'
import { GraduationCap, Users, Target, Award, Mail, Github } from 'lucide-react'
import Header from '@/components/Header'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { gsap } from '@/lib/gsap'

export default function AboutPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { t } = useLanguage()
  
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const featuresContainerRef = useRef<HTMLDivElement>(null)
  const subjectsRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }

    // Title pulse
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        textShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

    // Subtitle fade in
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.3, ease: 'power2.out' }
      )
    }

    // Background animations
    if (shapesRef.current) {
      const shapes = shapesRef.current.querySelectorAll('.shape')
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          x: () => `+=${Math.random() * 100 - 50}`,
          y: () => `+=${Math.random() * 100 - 50}`,
          scale: () => Math.random() * 0.3 + 0.7,
          rotate: 360,
          duration: 8 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        })
      })

      const lines = shapesRef.current.querySelectorAll('.line')
      lines.forEach((line, i) => {
        gsap.fromTo(line,
          { x: '-100%', opacity: 0 },
          {
            x: '100%',
            opacity: 1,
            duration: 4 + i,
            repeat: -1,
            delay: i * 1.5,
            ease: 'none',
            keyframes: [
              { opacity: 0, duration: 0 },
              { opacity: 1, duration: 0.2 },
              { opacity: 1, duration: 0.6 },
              { opacity: 0, duration: 0.2 }
            ]
          }
        )
      })
    }

    // Section scroll animations
    const sections = [missionRef, featuresContainerRef, subjectsRef, teamRef, contactRef]
    sections.forEach((ref, index) => {
      if (ref.current) {
        gsap.fromTo(ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    })

    // Feature cards stagger
    if (featuresContainerRef.current) {
      const cards = featuresContainerRef.current.querySelectorAll('.feature-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: featuresContainerRef.current,
            start: 'top 70%'
          }
        }
      )
    }

    // Subject items stagger
    if (subjectsRef.current) {
      const items = subjectsRef.current.querySelectorAll('.subject-item')
      gsap.fromTo(items,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: subjectsRef.current,
            start: 'top 70%'
          }
        }
      )
    }
  }, [])

  const features = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: t('about.features.educational.title'),
      description: t('about.features.educational.description')
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: t('about.features.interactive.title'),
      description: t('about.features.interactive.description')
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: t('about.features.focused.title'),
      description: t('about.features.focused.description')
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: t('about.features.results.title'),
      description: t('about.features.results.description')
    }
  ]

  const teamMembers = [
    {
      name: t('about.team.developer.name'),
      role: t('about.team.developer.role'),
      description: t('about.team.developer.description'),
      image: '👨‍💻'
    }
  ]

  return (
    <div className="min-h-screen bg-primary">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="text-center mb-12 relative overflow-hidden"
        >
          {/* Dynamic Background Elements */}
          <div ref={shapesRef} className="absolute inset-0 -z-10">
            {/* Floating shapes */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="shape absolute w-4 h-4 bg-blue-500/10 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
            
            {/* Animated lines */}
            {[...Array(3)].map((_, i) => (
              <div
                key={`line-${i}`}
                className="line absolute h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                style={{
                  width: '100%',
                  top: `${20 + i * 30}%`,
                  left: '0%'
                }}
              />
            ))}
          </div>
          
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-primary mb-6 relative z-10"
          >
            {t('about.heroTitle')}
          </h1>
          <p 
            ref={subtitleRef}
            className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed relative z-10"
          >
            {t('about.heroSubtitle')}
          </p>
        </div>

        {/* Mission Section */}
        <div
          ref={missionRef}
          className="bg-secondary rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-primary mb-4 text-center">My Mission</h2>
          <p className="text-secondary text-center max-w-4xl mx-auto text-lg leading-relaxed">
            SYBAU nigga
          </p>
        </div>

        {/* Features Section */}
        <div
          ref={featuresContainerRef}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-primary text-center mb-8">{t('about.whatIOffer')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-secondary rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-primary mb-3">{feature.title}</h3>
                <p className="text-secondary text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subjects Covered */}
        <div
          ref={subjectsRef}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Subjects Covered</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Database Management (SQL)',
              'Computer Hardware',
              'Software Engineering',
              'Web Development (HTML/JavaScript)',
              'Data Processing Modes',
              'ICT in Business',
              'System Analysis & Design',
              'Computer Networks',
              'Programming Fundamentals'
            ].map((subject, index) => (
              <div
                key={index}
                className="subject-item bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-primary font-medium">{subject}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div
          ref={teamRef}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Our Team</h2>
          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-secondary rounded-xl p-6 text-center max-w-sm"
              >
                <div className="text-4xl mb-4">{member.image}</div>
                <h3 className="font-semibold text-primary mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-secondary text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div
          ref={contactRef}
          className="bg-secondary rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Find me</h2>
          <p className="text-secondary mb-6">
            Have questions or suggestions? I&apos;d love to hear from you!
          </p>
          <div className="flex justify-center space-x-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Mail className="h-4 w-4" />
              Contact Us
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
              <Github className="h-4 w-4" />
              GitHub
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}