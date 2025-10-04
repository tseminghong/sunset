'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useIntersectionAnimation } from '@/hooks/useScrollAnimations'
import { gsap } from '@/lib/gsap'

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    {
      title: 'Resources',
      links: [
        { label: 'JavaScript', href: '/javascript' },
        { label: 'Python', href: '/python' },
        { label: 'Algorithms', href: '/algorithms' },
      ]
    },
    {
      title: 'Tools',
      links: [
        { label: 'Visualizers', href: '/visualizers' },
        { label: 'Practice', href: '/practice' },
        { label: 'Downloads', href: '/downloads' },
      ]
    },
    {
      title: 'About',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Support', href: '/support' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'License', href: '/license' },
      ]
    },
  ]

  const gridRef = useIntersectionAnimation<HTMLDivElement>((element) => {
    gsap.fromTo(element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
  })

  const bottomRef = useIntersectionAnimation<HTMLDivElement>((element) => {
    gsap.fromTo(element,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.4 }
    )
  })

  return (
    <footer className="bg-secondary border-t border-secondary pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm"
        >
          {footerLinks.map((section, sectionIndex) => (
            <FooterSection
              key={section.title}
              section={section}
              sectionIndex={sectionIndex}
            />
          ))}
        </div>

        <div
          ref={bottomRef}
          className="border-t border-secondary pt-8 text-center"
        >
          <p className="text-secondary">
            © {currentYear} HPCSS ICT Revision Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

interface FooterSectionProps {
  section: {
    title: string
    links: { label: string; href: string }[]
  }
  sectionIndex: number
}

const FooterSection = ({ section, sectionIndex }: FooterSectionProps) => {
  const sectionRef = useIntersectionAnimation<HTMLDivElement>((element) => {
    gsap.fromTo(element,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: sectionIndex * 0.1, ease: 'power2.out' }
    )

    const items = element.querySelectorAll('li')
    gsap.fromTo(items,
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.05,
        delay: sectionIndex * 0.1 + 0.2
      }
    )
  })

  return (
    <div ref={sectionRef}>
      <h4 className="font-semibold text-primary mb-4">{section.title}</h4>
      <ul className="space-y-2">
        {section.links.map((link) => (
          <li key={link.href}>
            <a 
              href={link.href}
              className="text-secondary hover:text-blue-600 transition-colors duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}