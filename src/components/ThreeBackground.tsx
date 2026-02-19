'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Animação suave de rotação
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#F57C00"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.4}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  )
}

function FloatingParticles() {
  const count = 50
  const mesh = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 10
      temp[i * 3 + 1] = (Math.random() - 0.5) * 10
      temp[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.05
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#F57C00"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#F57C00" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF9500" />
        
        <FloatingGeometry />
        <FloatingParticles />
        
        {/* Múltiplas geometrias para efeito mais rico */}
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
          <mesh position={[2, 1, -2]}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial
              color="#FF9500"
              transparent
              opacity={0.15}
              wireframe
            />
          </mesh>
        </Float>
        
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
          <mesh position={[-2, -1, -1]}>
            <torusGeometry args={[0.3, 0.1, 8, 16]} />
            <meshStandardMaterial
              color="#F57C00"
              transparent
              opacity={0.18}
              wireframe
            />
          </mesh>
        </Float>
        
        <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.4}>
          <mesh position={[1, -2, -3]}>
            <dodecahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial
              color="#FF9500"
              transparent
              opacity={0.16}
              wireframe
            />
          </mesh>
        </Float>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}