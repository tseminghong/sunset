'use client'

import { useEffect } from 'react'
import { useReportWebVitals } from 'next/web-vitals'

interface PerformanceMetric {
  id: string
  name: string
  value: number
  label: 'web-vital' | 'custom'
  delta?: number
}

// Custom performance monitoring
export const usePerformanceMonitoring = () => {
  useReportWebVitals((metric: PerformanceMetric) => {
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Performance: ${metric.name}`, {
        value: metric.value,
        id: metric.id,
        label: metric.label,
        delta: metric.delta
      })
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        })
      }
    }
  })
}

// Performance observer for custom metrics
export const observePerformance = () => {
  if (typeof window === 'undefined') return

  // Observe long tasks
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('🐌 Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
              name: entry.name
            })
          }
        }
      })
      longTaskObserver.observe({ entryTypes: ['longtask'] })
    } catch (e) {
      console.warn('Performance observer not supported')
    }
  }

  // Monitor resource loading
  window.addEventListener('load', () => {
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigationTiming) {
      const metrics = {
        'DNS Lookup': navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
        'TCP Connection': navigationTiming.connectEnd - navigationTiming.connectStart,
        'Server Response': navigationTiming.responseEnd - navigationTiming.requestStart,
        'DOM Content Loaded': navigationTiming.domContentLoadedEventEnd - navigationTiming.fetchStart,
        'Page Load Complete': navigationTiming.loadEventEnd - navigationTiming.fetchStart,
      }

      console.log('⚡ Page Load Metrics:', metrics)
    }
  })
}

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if (typeof window === 'undefined') return

  const checkMemory = () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      const memoryInfo = {
        used: Math.round(memory.usedJSHeapSize / 1048576), 
        total: Math.round(memory.totalJSHeapSize / 1048576), 
        limit: Math.round(memory.jsHeapSizeLimit / 1048576), 
      }
      
      // Warn if memory usage is high
      const usagePercent = (memoryInfo.used / memoryInfo.limit) * 100
      if (usagePercent > 80) {
        console.warn('🚨 High memory usage detected:', memoryInfo)
      }

      return memoryInfo
    }
  }

  // Check memory every 30 seconds in development
  if (process.env.NODE_ENV === 'development') {
    setInterval(checkMemory, 30000)
  }
}

// Component for initializing performance monitoring
const PerformanceMonitor: React.FC = () => {
  usePerformanceMonitoring()

  useEffect(() => {
    observePerformance()
    monitorMemoryUsage()
  }, [])

  return null
}

export default PerformanceMonitor