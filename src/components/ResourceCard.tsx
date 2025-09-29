'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { ResourceData } from '@/types'

interface ResourceCardProps {
  resource: ResourceData
  index: number
  onClick?: (url: string) => void
}

export default function ResourceCard({ resource, index, onClick }: ResourceCardProps) {
  const tags = resource.tags.split(',').map(tag => tag.trim())
  
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

  const CardContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 2, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { 
          type: "spring",
          stiffness: 400,
          damping: 25,
          mass: 0.8
        }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      className="resource-card glass-effect rounded-[1.75rem] overflow-hidden cursor-pointer btn-press-effect group h-full"
    >
      {/* Card image placeholder */}
      <motion.div 
        className="h-[180px] bg-tertiary flex items-center justify-center overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div 
          className="w-12 h-12 text-tertiary opacity-70"
          dangerouslySetInnerHTML={{ __html: resource.icon }}
          whileHover={{ 
            scale: 1.2, 
            opacity: 0.9,
            rotate: 5,
            transition: { 
              type: "spring",
              stiffness: 400,
              damping: 15
            }
          }}
        />
      </motion.div>

      {/* Card content */}
      <div className="p-6 flex flex-col flex-grow">
        <motion.h3 
          className="text-xl font-semibold mb-3 text-primary"
          whileHover={{ 
            color: "#2563eb",
            transition: { duration: 0.2 }
          }}
        >
          {resource.title}
        </motion.h3>
        
        <motion.p 
          className="text-secondary text-sm mb-4 flex-grow"
          whileHover={{ 
            color: "#4b5563",
            transition: { duration: 0.2 }
          }}
        >
          {resource.description}
        </motion.p>

        {/* Progress bar for courses */}
        {resource.progressKey && resource.totalLessons && (
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-tertiary">Progress</span>
              <motion.span 
                className="text-xs font-medium text-tertiary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6 }}
              >
                {progress}%
              </motion.span>
            </div>
            <div className="w-full bg-tertiary rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"
                initial={{ width: 0, scale: 0.9 }}
                animate={{ width: `${progress}%`, scale: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.1 + 0.5,
                  ease: "easeOut"
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1 + tagIndex * 0.05 + 0.3 
              }}
              className="px-3 py-1 rounded-full bg-tertiary text-secondary text-xs font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Link */}
        <motion.div 
          className="flex items-center justify-between"
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <motion.span 
            className="text-blue-600 font-medium text-sm"
            whileHover={{ 
              color: "#1d4ed8",
              transition: { duration: 0.2 }
            }}
          >
            {resource.linkText}
          </motion.span>
          <motion.div
            whileHover={{ 
              x: 4,
              scale: 1.1,
              transition: { 
                type: "spring",
                stiffness: 400,
                damping: 15
              }
            }}
          >
            <ExternalLink className="w-4 h-4 text-blue-600" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
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

  // For Next.js routes, use Link component
  return (
    <Link href={resource.href} className="block h-full">
      <CardContent />
    </Link>
  )
}