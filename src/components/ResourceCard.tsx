'use client'

import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { ResourceData } from '@/types'
import TransitionLink from './TransitionLink'
import { gsap } from '@/lib/gsap'
import { combineRefs, useGsapHoverAnimation, useGsapMountAnimation } from '@/hooks/useGsapMotion'

interface ResourceCardProps {
  resource: ResourceData
  index: number
  onClick?: (url: string) => void
}

export default function ResourceCard({ resource, index, onClick }: ResourceCardProps) {
  const tags = resource.tags.split(',').map(tag => tag.trim())
  
  // Map tags to dopamine color themes
  const getCardColorClass = () => {
    const tagLower = resource.tags.toLowerCase()
    if (tagLower.includes('database') || tagLower.includes('sql')) return 'card-geography'
    if (tagLower.includes('software') || tagLower.includes('hardware')) return 'card-chinese'
    if (tagLower.includes('web') || tagLower.includes('html')) return 'card-english'
    if (tagLower.includes('exam') || tagLower.includes('practice')) return 'card-economics'
    if (tagLower.includes('algorithms') || tagLower.includes('visualization')) return 'card-science'
    return 'card-default'
  }
  
  const cardColorClass = getCardColorClass()
  
  // Calculate progress percentage if available
  const getProgress = () => {
    if (!resource.progressKey || !resource.totalLessons) return 0
    
    try {
      const currentLesson = localStorage.getItem(resource.progressKey)
      if (!currentLesson) return 0
      
      const lessonNum = parseInt(currentLesson, 10)
      return Math.round((lessonNum / resource.totalLessons) * 100)
    } catch {
      return 0
    }
  }

  const progress = getProgress()

  // Determine if this is an external link or Next.js route
  const isExternalLink = resource.href.startsWith('http') || resource.href.endsWith('.html') || resource.href.endsWith('.apk')

  const cardMountRef = useGsapMountAnimation<HTMLDivElement>({
    from: { opacity: 0, y: 60, scale: 0.9 },
    to: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: 0.8,
      delay: index * 0.1,
      ease: 'elastic.out(1, 0.75)'
    }
  })

  const cardHoverRef = useGsapHoverAnimation<HTMLDivElement>({
    rest: { y: 0, scale: 1, rotateX: 0, rotateY: 0 },
    hover: { y: -12, scale: 1.03, rotateX: 2, rotateY: 2 },
    transition: { duration: 0.3, ease: 'power2.out' },
    pressIn: { scale: 0.97 },
    pressOut: { scale: 1.03 }
  })

  const mediaContainerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const progressWrapperRef = useRef<HTMLDivElement>(null)
  const progressValueRef = useRef<HTMLSpanElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const tagsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mediaContainerRef.current) {
      gsap.set(mediaContainerRef.current, { transformOrigin: 'center center' })
      const hoverAnimation = gsap.to(mediaContainerRef.current, {
        scale: 1.05,
        duration: 0.3,
        paused: true,
        ease: 'power2.out'
      })

      const node = mediaContainerRef.current
      const onEnter = () => hoverAnimation.play()
      const onLeave = () => hoverAnimation.reverse()

      node.addEventListener('mouseenter', onEnter)
      node.addEventListener('mouseleave', onLeave)

      return () => {
        hoverAnimation.kill()
        node.removeEventListener('mouseenter', onEnter)
        node.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [])

  useEffect(() => {
    if (iconRef.current) {
      gsap.set(iconRef.current, { transformOrigin: 'center center' })
      const hoverAnimation = gsap.to(iconRef.current, {
        scale: 1.2,
        rotate: 5,
        opacity: 0.9,
        paused: true,
        ease: 'elastic.out(1, 0.6)',
        duration: 0.5
      })

      const node = iconRef.current
      const onEnter = () => hoverAnimation.play()
      const onLeave = () => hoverAnimation.reverse()

      node.addEventListener('mouseenter', onEnter)
      node.addEventListener('mouseleave', onLeave)

      return () => {
        hoverAnimation.kill()
        node.removeEventListener('mouseenter', onEnter)
        node.removeEventListener('mouseleave', onLeave)
      }
    }
  }, [])

  useEffect(() => {
    if (progressWrapperRef.current) {
      gsap.fromTo(progressWrapperRef.current, { opacity: 0, scale: 0.95 }, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: index * 0.1 + 0.4,
        ease: 'power2.out'
      })
    }

    if (progressValueRef.current) {
      gsap.fromTo(progressValueRef.current, { opacity: 0 }, {
        opacity: 1,
        duration: 0.4,
        delay: index * 0.1 + 0.6,
        ease: 'power2.out'
      })
    }

    if (progressFillRef.current) {
      gsap.fromTo(progressFillRef.current, { width: 0, scale: 0.9 }, {
        width: `${progress}%`,
        scale: 1,
        duration: 1.2,
        delay: index * 0.1 + 0.5,
        ease: 'power2.out'
      })
    }
  }, [index, progress])

  useEffect(() => {
    if (tagsContainerRef.current) {
      const elements = Array.from(tagsContainerRef.current.children)
      gsap.fromTo(elements,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.05,
          delay: index * 0.1 + 0.3
        }
      )
    }
  }, [index, tags])

  const cardRef = useMemo(() => combineRefs(cardMountRef, cardHoverRef), [cardMountRef, cardHoverRef])

  const CardContent = () => (
    <div
      ref={cardRef}
      className={`resource-card ${cardColorClass} overflow-hidden cursor-pointer btn-press-effect jelly-effect group h-full transition-all duration-300`}
    >
      {/* Card image placeholder */}
      <div
        ref={mediaContainerRef}
        className="h-[180px] bg-tertiary flex items-center justify-center overflow-hidden"
      >
        <div
          ref={iconRef}
          className="w-12 h-12 text-tertiary opacity-70"
          dangerouslySetInnerHTML={{ __html: resource.icon }}
        />
      </div>

      {/* Card content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 
          className="text-xl font-semibold mb-3 text-primary transition-colors duration-200 group-hover:opacity-90"
        >
          {resource.title}
        </h3>
        
        <p 
          className="text-secondary text-sm mb-4 flex-grow transition-colors duration-200 group-hover:opacity-90"
        >
          {resource.description}
        </p>

        {/* Progress bar for courses */}
        {resource.progressKey && resource.totalLessons && (
          <div 
            ref={progressWrapperRef}
            className="mb-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-tertiary">Progress</span>
              <span 
                ref={progressValueRef}
                className="text-xs font-medium text-tertiary"
              >
                {progress}%
              </span>
            </div>
            <div className="w-full bg-tertiary rounded-full h-2 overflow-hidden">
              <div
                ref={progressFillRef}
                className="h-full rounded-full shadow-sm"
                style={{ background: 'linear-gradient(to right, var(--color-hot-pink), var(--color-hot-pink-light))' }}
              />
            </div>
          </div>
        )}

        {/* Tags */}
        <div ref={tagsContainerRef} className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, tagIndex) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-tertiary text-secondary text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <div 
          className="flex items-center justify-between transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <span 
            className="font-medium text-sm transition-colors duration-200"
            style={{ color: 'var(--color-hot-pink)' }}
          >
            {resource.linkText}
          </span>
          <div
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:scale-105"
            style={{ color: 'var(--color-hot-pink)' }}
          >
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )

  // For external links (HTML files, APKs, URLs), use regular links
  if (isExternalLink) {
    return (
      <a 
        href={resource.href} 
        target={resource.href.startsWith('http') ? '_blank' : '_self'}
        rel={resource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="block h-full"
      >
        <CardContent />
      </a>
    )
  }

  // For Next.js routes, use TransitionLink component
  return (
    <TransitionLink href={resource.href} className="block h-full">
      <CardContent />
    </TransitionLink>
  )
}