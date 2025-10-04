'use client'

import { MutableRefObject, RefCallback, useCallback, useMemo, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

interface TransitionLike {
  duration?: number
  delay?: number
  ease?: string | number[]
  repeat?: number | 'Infinity'
  repeatDelay?: number
  yoyo?: boolean
  type?: 'spring' | 'tween'
  stiffness?: number
  damping?: number
  mass?: number
}

interface MountAnimationConfig {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  transition?: TransitionLike
  immediate?: boolean
  dependencies?: unknown[]
  paused?: boolean
  skip?: boolean
}

interface HoverAnimationConfig {
  hover: gsap.TweenVars
  rest?: gsap.TweenVars
  transition?: TransitionLike
  leaveTransition?: TransitionLike
  pressIn?: gsap.TweenVars
  pressOut?: gsap.TweenVars
  pressTransition?: TransitionLike
  disabled?: boolean
  dependencies?: unknown[]
}

interface PresenceAnimationConfig {
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  exit?: gsap.TweenVars
  transition?: TransitionLike
  exitTransition?: TransitionLike
  isPresent: boolean
  onExited?: () => void
}

const resolveEase = (ease?: string | number[]): string | undefined => {
  if (!ease) return undefined
  if (typeof ease === 'string') return ease
  if (Array.isArray(ease) && ease.length === 4) {
    const [p0, p1, p2, p3] = ease
    return `cubic-bezier(${p0}, ${p1}, ${p2}, ${p3})`
  }
  return undefined
}

const mapTransition = (vars: gsap.TweenVars = {}, transition?: TransitionLike) => {
  if (!transition) return vars

  const mapped: gsap.TweenVars = { ...vars }
  if (transition.duration != null) mapped.duration = transition.duration
  if (transition.delay != null) mapped.delay = transition.delay
  if (transition.ease != null) mapped.ease = resolveEase(transition.ease)

  if (transition.repeat != null) {
    mapped.repeat = transition.repeat === 'Infinity' ? -1 : transition.repeat
  }

  if (transition.repeatDelay != null) mapped.repeatDelay = transition.repeatDelay
  if (transition.yoyo != null) mapped.yoyo = transition.yoyo

  if (transition.type === 'spring') {
    // Approximate spring using damping/stiffness if provided
    const stiffness = transition.stiffness ?? 200
    const damping = transition.damping ?? 20
    const mass = transition.mass ?? 1
    // Map to rough duration/ease heuristics
    const stiffnessRatio = Math.min(Math.max(stiffness / 200, 0.4), 2)
    const dampingRatio = Math.min(Math.max(damping / 20, 0.5), 2)
    mapped.duration = transition.duration ?? 0.4 * dampingRatio
    mapped.ease = `elastic.out(${(1 / dampingRatio).toFixed(2)}, ${(1 / stiffnessRatio).toFixed(2)})`
    mapped.overshoot = mass
  }

  return mapped
}

export const useGsapMountAnimation = <T extends HTMLElement>(config: MountAnimationConfig = {}) => {
  const elementRef = useRef<T | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (config.skip || !elementRef.current) return

    const element = elementRef.current

    const ctx = gsap.context(() => {
      if (config.from) {
        gsap.set(element, config.from)
      }

      if (!config.paused && config.to) {
        gsap.to(element, mapTransition(config.to, config.transition))
      }
    }, element)

    return () => {
      ctx.revert()
    }
  }, config.dependencies ?? [])

  return elementRef
}

export const useGsapHoverAnimation = <T extends HTMLElement>(config: HoverAnimationConfig) => {
  const elementRef = useRef<T | null>(null)

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current
    if (!element || config.disabled) return

    if (config.rest) {
      gsap.set(element, config.rest)
    }

    let hoverTween: gsap.core.Tween | null = null
    let leaveTween: gsap.core.Tween | null = null
    let pressTween: gsap.core.Tween | null = null

    const applyHover = () => {
      leaveTween?.kill()
      hoverTween?.kill()
      hoverTween = gsap.to(element, mapTransition(config.hover, config.transition))
    }

    const applyRest = () => {
      hoverTween?.kill()
      leaveTween?.kill()
      if (!config.rest) return
      leaveTween = gsap.to(element, mapTransition({ ...config.rest }, config.leaveTransition ?? config.transition))
    }

    const applyPressIn = () => {
      pressTween?.kill()
      if (!config.pressIn) return
      pressTween = gsap.to(element, mapTransition(config.pressIn, config.pressTransition ?? config.transition))
    }

    const applyPressOut = () => {
      pressTween?.kill()
      if (config.pressOut) {
        pressTween = gsap.to(element, mapTransition(config.pressOut, config.pressTransition ?? config.transition))
      } else if (config.hover) {
        applyHover()
      }
    }

    element.addEventListener('mouseenter', applyHover)
    element.addEventListener('mouseleave', applyRest)
    element.addEventListener('focus', applyHover)
    element.addEventListener('blur', applyRest)
    element.addEventListener('mousedown', applyPressIn)
    element.addEventListener('touchstart', applyPressIn, { passive: true })
    element.addEventListener('mouseup', applyPressOut)
    element.addEventListener('mouseleave', applyPressOut)
    element.addEventListener('touchend', applyPressOut)

    return () => {
      hoverTween?.kill()
      leaveTween?.kill()
      pressTween?.kill()
      element.removeEventListener('mouseenter', applyHover)
      element.removeEventListener('mouseleave', applyRest)
      element.removeEventListener('focus', applyHover)
      element.removeEventListener('blur', applyRest)
      element.removeEventListener('mousedown', applyPressIn)
      element.removeEventListener('touchstart', applyPressIn)
      element.removeEventListener('mouseup', applyPressOut)
      element.removeEventListener('mouseleave', applyPressOut)
      element.removeEventListener('touchend', applyPressOut)
    }
  }, [config.hover, config.rest, config.transition, config.leaveTransition, config.pressIn, config.pressOut, config.pressTransition, config.disabled, ...(config.dependencies ?? [])])

  return elementRef
}

export const useGsapPresence = <T extends HTMLElement>(config: PresenceAnimationConfig) => {
  const elementRef = useRef<T | null>(null)
  const visibleRef = useRef(config.isPresent)
  const exitCallbackRef = useRef(config.onExited)

  exitCallbackRef.current = config.onExited

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      if (config.from) {
        gsap.set(element, config.from)
      }
      if (config.isPresent && config.to) {
        gsap.to(element, mapTransition(config.to, config.transition))
      }
    }, element)

    return () => {
      ctx.revert()
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (config.isPresent && !visibleRef.current) {
      // re-enter
      if (config.from) {
        gsap.set(element, config.from)
      }
      if (config.to) {
        gsap.to(element, mapTransition(config.to, config.transition))
      }
    }

    if (!config.isPresent && visibleRef.current) {
      if (config.exit) {
        gsap.to(element, mapTransition(config.exit, config.exitTransition)).eventCallback('onComplete', () => {
          exitCallbackRef.current?.()
        })
      } else {
        exitCallbackRef.current?.()
      }
    }

    visibleRef.current = config.isPresent
  }, [config.isPresent, config.exit, config.exitTransition, config.from, config.to, config.transition])

  const refCallback: RefCallback<T> = useCallback((node: T | null) => {
    elementRef.current = node
  }, [])

  return refCallback
}

export const useGsapTimeline = <T extends HTMLElement>() => {
  const elementRef = useRef<T | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return
    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline()
    }, elementRef.current)

    return () => {
      timelineRef.current?.kill()
      timelineRef.current = null
      ctx.revert()
    }
  }, [])

  return [elementRef as MutableRefObject<T | null>, timelineRef] as const
}

export const combineRefs = <T>(...refs: Array<MutableRefObject<T | null> | RefCallback<T> | null | undefined>) => {
  return (node: T | null) => {
    refs.forEach(ref => {
      if (!ref) return
      if (typeof ref === 'function') {
        ref(node)
      } else {
        (ref as MutableRefObject<T | null>).current = node
      }
    })
  }
}

export const useGsapSequence = (sequence: (() => void) | null, dependencies: unknown[] = []) => {
  useIsomorphicLayoutEffect(() => {
    if (!sequence) return
    const ctx = gsap.context(sequence)
    return () => ctx.revert()
  }, dependencies)
}

export type { TransitionLike }
