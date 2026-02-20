'use client'

import { useEffect, useState } from 'react'

export default function ThreeCanvasFallback() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    delay: number;
    duration: number;
  }>>([])

  useEffect(() => {
    // Gerar partículas aleatórias para simular o efeito 3D
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Simular o efeito de partículas flutuantes com CSS puro */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-orange-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ${particle.delay}s infinite ease-in-out`,
            filter: 'blur(1px)'
          }}
        />
      ))}
      
      {/* Adicionar algumas formas geométricas simples */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '200px',
          height: '200px',
          border: '2px solid rgba(245, 124, 0, 0.3)',
          borderRadius: '50%',
          animation: 'rotate 20s linear infinite'
        }}
      />
      
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '150px',
          height: '150px',
          border: '1px solid rgba(255, 149, 0, 0.2)',
          transform: 'rotate(45deg)',
          animation: 'rotate 15s linear infinite reverse'
        }}
      />
      
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '100px',
          height: '100px',
          border: '1px solid rgba(255, 183, 77, 0.1)',
          transform: 'rotate(30deg)',
          animation: 'rotate 10s linear infinite'
        }}
      />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(10px) translateX(-10px);
          }
          75% {
            transform: translateY(-10px) translateX(-5px);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}