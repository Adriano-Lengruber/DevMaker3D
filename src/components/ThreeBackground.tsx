'use client'

import { useEffect, useState } from 'react'

export default function ThreeBackground() {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    // Verificar se podemos renderizar o componente 3D
    setCanRender(true)
  }, [])

  // Se não puder renderizar, mostrar apenas um fundo transparente
  if (!canRender) {
    return <div className="absolute inset-0 z-0 bg-transparent" />
  }

  // Tentar renderizar o componente 3D
  try {
    // Importar dinamicamente e renderizar
    const ThreeCanvas = require('./ThreeCanvasFallback').default
    return (
      <div className="absolute inset-0 z-0">
        <ThreeCanvas />
      </div>
    )
  } catch (error) {
    // Se houver erro, mostrar fundo transparente
    console.warn('Erro ao carregar Three.js, usando fundo vazio:', error)
    return <div className="absolute inset-0 z-0 bg-transparent" />
  }
}