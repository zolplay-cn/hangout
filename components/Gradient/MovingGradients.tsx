'use client'

import { useEffect } from 'react'
import { gradient } from './Gradient'

export function MovingGradients() {
  useEffect(() => {
    gradient.initGradient('#gradient-canvas')
  }, [])

  return (
    <canvas
      id="gradient-canvas"
      className="fixed inset-0 w-full h-full [--gradient-color-1:#a405da] [--gradient-color-2:#05338f] [--gradient-color-3:#b28ef5] [--gradient-color-4:#6126b5] pointer-events-none select-none z-10"
      data-transition-in
    />
  )
}
