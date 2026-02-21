'use client'

import dynamic from 'next/dynamic'

const ThreeDScrollBackground = dynamic(
  () => import('@/components/ThreeDScrollBackground'),
  { ssr: false }
)

export default function ClientThreeDScrollBackground() {
  return <ThreeDScrollBackground />
}
