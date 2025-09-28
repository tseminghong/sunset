'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'
import ResourceCard from '@/components/ResourceCard'
import { resourcesData } from '@/data/resources'

export default function CoursesPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleResourceClick = (url: string) => {
    window.location.href = url
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">All Courses</h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Explore our comprehensive collection of interactive learning materials and courses
            designed to help you master ICT concepts.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourcesData.map((resource, index) => (
              <ResourceCard
                key={resource.href}
                resource={resource}
                index={index}
                onClick={handleResourceClick}
              />
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}