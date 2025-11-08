'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import TagFilter from '@/components/TagFilter'
import ResourceCard from '@/components/ResourceCard'
import SearchBar from '@/components/SearchBar'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'
import TransitionSection from '@/components/TransitionSection'
import { resourcesData, allTags } from '@/data/resources'
import { ResourceData } from '@/types'

export default function HomePage() {
  const [activeTag, setActiveTag] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const filteredResources = useMemo(() => {
    return resourcesData.filter(resource => {
      const matchesTag = activeTag === 'all' || resource.tags.includes(activeTag)
      const matchesSearch = searchTerm === '' || 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesTag && matchesSearch
    })
  }, [activeTag, searchTerm])

  return (
    <div className="min-h-screen bg-primary">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Tag Filter */}
        <TransitionSection
          className="mb-12 md:mb-16 flex flex-col items-center"
          delay={0.4}
        >
          <TagFilter
            tags={allTags}
            activeTag={activeTag}
            onTagChange={setActiveTag}
          />
        </TransitionSection>

        {/* Resources Grid */}
        <TransitionSection
          id="resources"
          className="mb-16 md:mb-20"
          delay={0.6}
        >
          <TransitionSection delay={0.8} direction="left" distance={50}>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-8 md:mb-10 text-center sm:text-left text-primary"
            >
              Featured Resources
            </h2>
          </TransitionSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource: ResourceData, index: number) => (
              <ResourceCard
                key={resource.href}
                resource={resource}
                index={index}
              />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <TransitionSection>
              <div
                className="text-center py-16"
              >
                <p className="text-secondary text-lg">
                  No resources found matching your criteria.
                </p>
              </div>
            </TransitionSection>
          )}
        </TransitionSection>

        {/* About Section */}
        <TransitionSection
          id="about"
          className="bg-secondary border border-secondary py-16 md:py-20 rounded-3xl mb-16 md:mb-20"
          delay={0.1}
          duration={0.8}
          direction="up"
          distance={50}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-primary">
                About ICT Revision Hub
              </h2>
              <p className="text-secondary text-lg leading-relaxed mb-6">
                Welcome to the HPCSS ICT Revision Hub - your comprehensive resource for mastering 
                Information and Communication Technology concepts. Our platform offers interactive 
                learning materials, visual algorithms, and practical exercises designed to help 
                students excel in their ICT studies.
              </p>
              <p className="text-secondary leading-relaxed">
                From programming fundamentals to database management, our curated collection 
                of resources provides step-by-step guidance and hands-on experience to build 
                your confidence in ICT.
              </p>
            </motion.div>
          </div>
        </TransitionSection>
        
        {/* Custom Transition Animation */}
        <TransitionSection
          id="transition"
          className="bg-secondary border border-secondary py-16 md:py-20 rounded-3xl mb-16 md:mb-20"
          delay={0.2}
          duration={1.0}
          direction="up"
          distance={75}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-6 text-primary">
              Welcome to Our Learning Platform
            </h1>
            <p className="text-secondary text-lg leading-relaxed">
              Experience smooth animations as you explore our educational content.
            </p>
          </div>
        </TransitionSection>
      </main>

      <Footer />

      {/* Floating Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}
