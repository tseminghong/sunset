'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

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

  return (
    <footer className="bg-secondary border-t border-secondary pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm"
        >
          {footerLinks.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: sectionIndex * 0.1 
              }}
            >
              <h4 className="font-semibold text-primary mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: sectionIndex * 0.1 + linkIndex * 0.05 
                    }}
                  >
                    <a 
                      href={link.href}
                      className="text-secondary hover:text-blue-600 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-secondary pt-8 text-center"
        >
          <p className="text-secondary">
            © {currentYear} HPCSS ICT Revision Hub. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}