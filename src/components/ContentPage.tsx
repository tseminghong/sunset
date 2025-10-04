'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'
import { useGsapMountAnimation } from '@/hooks/useGsapMotion'

interface ContentPageProps {
  title: string
  htmlFile: string
}

export default function ContentPage({ title, htmlFile }: ContentPageProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const contentRef = useGsapMountAnimation<HTMLDivElement>({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'power2.out' }
  })

  useEffect(() => {
    // For now, redirect to the original HTML file
    // In a full implementation, you'd parse and render the HTML content here
    window.location.href = `/${htmlFile}`
  }, [htmlFile])

  return (
    <div className="min-h-screen bg-primary">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div
          ref={contentRef}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-primary mb-6">{title}</h1>
          <p className="text-secondary">Redirecting to content...</p>
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