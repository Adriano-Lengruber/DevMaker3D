'use client'

import { useEffect, useRef } from 'react'

export default function MouseParallax() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calcular posição relativa do mouse (0 a 1)
      const mouseX = (clientX / innerWidth - 0.5) * 2
      const mouseY = (clientY / innerHeight - 0.5) * 2

      // Aplicar parallax aos elementos
      const parallaxElements = container.querySelectorAll('[data-parallax]')
      
      parallaxElements.forEach((element) => {
        const el = element as HTMLElement
        const speed = parseFloat(el.dataset.speed || '0.5')
        const direction = el.dataset.direction || 'both'
        
        let transformX = 0
        let transformY = 0

        if (direction === 'x' || direction === 'both') {
          transformX = mouseX * speed * 20
        }
        
        if (direction === 'y' || direction === 'both') {
          transformY = mouseY * speed * 20
        }

        el.style.transform = `translate(${transformX}px, ${transformY}px)`
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {/* Elementos de parallax */}
      <div 
        data-parallax 
        data-speed="0.3" 
        data-direction="both"
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#F57C00] rounded-full opacity-20"
      />
      <div 
        data-parallax 
        data-speed="0.5" 
        data-direction="x"
        className="absolute top-3/4 right-1/3 w-3 h-3 bg-[#FF9500] rounded-full opacity-15"
      />
      <div 
        data-parallax 
        data-speed="0.2" 
        data-direction="y"
        className="absolute top-1/2 left-3/4 w-1 h-1 bg-[#F57C00] rounded-full opacity-25"
      />
      <div 
        data-parallax 
        data-speed="0.4" 
        data-direction="both"
        className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-[#FF9500] rounded-full opacity-10"
      />
      <div 
        data-parallax 
        data-speed="0.6" 
        data-direction="x"
        className="absolute top-2/3 left-2/3 w-1 h-1 bg-[#F57C00] rounded-full opacity-20"
      />
    </div>
  )
}