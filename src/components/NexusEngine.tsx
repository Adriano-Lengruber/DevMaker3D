'use client';

import { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Box, Cpu, Activity, Info, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Center, Environment, Stage } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three-stdlib';

const DENSITIES = {
  'PLA': 1.24,
  'PETG': 1.27,
  'ABS': 1.04,
  'TPU': 1.21,
  'Resina': 1.15
};

const PRICE_PER_HOUR = 8.0; // Simulated
const PRICE_PER_GRAM = 0.25; // Simulated

function ModelPreview({ geometry }: { geometry: THREE.BufferGeometry }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial 
        color="#F57C00" 
        roughness={0.1} 
        metalness={0.8}
        emissive="#F57C00"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function NexusEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [stats, setStats] = useState<{
    volume: number;
    dimensions: { x: number; y: number; z: number };
    material: keyof typeof DENSITIES;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'success' | 'error'>('idle');

  const containerRef = useRef<HTMLDivElement>(null);

  const calculateVolume = (geom: THREE.BufferGeometry) => {
    let volume = 0;
    const position = geom.attributes.position;
    const faces = position.count / 3;
    
    for (let i = 0; i < faces; i++) {
      const v1 = new THREE.Vector3().fromBufferAttribute(position, i * 3 + 0);
      const v2 = new THREE.Vector3().fromBufferAttribute(position, i * 3 + 1);
      const v3 = new THREE.Vector3().fromBufferAttribute(position, i * 3 + 2);
      volume += (v1.x * v2.y * v3.z + v1.y * v2.z * v3.x + v1.z * v2.x * v3.y - 
                 v1.z * v2.y * v3.x - v1.y * v2.x * v3.z - v1.x * v2.z * v3.y);
    }
    return Math.abs(volume) / 6000; // Result in cm3 (assuming mm units in STL)
  };

  const calculateDimensions = (geom: THREE.BufferGeometry) => {
    geom.computeBoundingBox();
    const box = geom.boundingBox!;
    return {
      x: box.max.x - box.min.x,
      y: box.max.y - box.min.y,
      z: box.max.z - box.min.z
    };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    let uploadedFile: File | undefined;
    if ('files' in e.target && e.target.files) {
      uploadedFile = e.target.files[0];
    } else if ('dataTransfer' in e && e.dataTransfer.files) {
      uploadedFile = e.dataTransfer.files[0];
    }

    if (uploadedFile && uploadedFile.name.toLowerCase().endsWith('.stl')) {
      setFile(uploadedFile);
      analyzeFile(uploadedFile);
    } else {
      setStatus('error');
    }
  };

  const analyzeFile = (file: File) => {
    setStatus('analyzing');
    const reader = new FileReader();
    reader.onload = (e) => {
      const loader = new STLLoader();
      const result = loader.parse(e.target?.result as ArrayBuffer);
      
      const vol = calculateVolume(result);
      const dims = calculateDimensions(result);
      
      setGeometry(result);
      setStats({
        volume: vol,
        dimensions: dims,
        material: 'PLA'
      });
      setStatus('success');
    };
    reader.readAsArrayBuffer(file);
  };

  const weight = stats ? stats.volume * DENSITIES[stats.material] : 0;
  const estimatedPrice = stats ? (weight * PRICE_PER_GRAM) + 15 : 0; // Base fee + material

  return (
    <section id="nexus-engine" className="py-24 bg-[#0F0F0F] relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#333333] bg-[#1A1A1A] mb-4"
          >
            <Cpu className="w-4 h-4 text-[#F57C00]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#A0A0A0]">Nexus Engine v1.0.4</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-tight">
            Análise <span className="text-[#F57C00]">Neural</span> do Projeto
          </h2>
          <p className="text-[#A0A0A0] max-w-2xl mx-auto">
            Faça o upload do seu arquivo STL para uma síntese imediata de volume, massa e viabilidade técnica. 
            Nossa IA processa as malhas para fornecer dados precisos de engenharia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Upload Area */}
          <div className="space-y-8">
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileUpload}
              className={`relative h-[400px] glass rounded-3xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-8 group ${
                isDragging ? 'border-[#F57C00] bg-[#F57C00]/5 scale-[0.98]' : 'border-[#333333] hover:border-[#F57C00]/50'
              }`}
            >
              <AnimatePresence mode="wait">
                {status === 'idle' || status === 'error' ? (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-[#1A1A1A] flex items-center justify-center mb-6 mx-auto group-hover:blog-glow-orange transition-all duration-500">
                      <Upload className={`w-8 h-8 ${status === 'error' ? 'text-red-500' : 'text-[#F57C00]'}`} />
                    </div>
                    {status === 'error' ? (
                      <div>
                        <p className="text-red-500 font-bold mb-2">Protocolo Inválido</p>
                        <p className="text-gray-500 text-sm">Por favor, utilize apenas arquivos .STL</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-white font-bold text-lg mb-2 uppercase tracking-widest">Transmitir Blueprint</p>
                        <p className="text-gray-500 text-sm mb-6">Arraste seu STL ou clique para selecionar</p>
                        <input 
                          type="file" 
                          accept=".stl" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={handleFileUpload}
                        />
                      </div>
                    )}
                  </motion.div>
                ) : status === 'analyzing' ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <Activity className="w-12 h-12 text-[#F57C00] animate-pulse mb-6 mx-auto" />
                    <p className="text-[#F57C00] font-mono text-sm uppercase tracking-[0.3em]">Analisando Malhas...</p>
                    <div className="w-48 h-1 bg-[#1A1A1A] rounded-full mt-4 overflow-hidden mx-auto">
                      <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="w-full h-full bg-[#F57C00]"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[10px] font-mono text-gray-500 flex items-center gap-2">
                         <FileText className="w-3 h-3" /> {file?.name}
                       </span>
                       <button 
                         onClick={() => setStatus('idle')}
                         className="text-[10px] font-mono text-[#F57C00] hover:underline"
                       >
                         NOVO SCAN
                       </button>
                    </div>
                    <div className="flex-grow rounded-2xl overflow-hidden bg-black/40 border border-[#333333]">
                       <Canvas shadows dpr={[1, 2]}>
                         <PerspectiveCamera makeDefault position={[50, 50, 50]} />
                         <OrbitControls autoRotate autoRotateSpeed={2} enablePan={false} maxDistance={200} minDistance={10} />
                         <Environment preset="city" />
                         <ambientLight intensity={0.5} />
                         <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-intensity={2} />
                         <Suspense fallback={null}>
                            <Center top>
                              <ModelPreview geometry={geometry!} />
                            </Center>
                         </Suspense>
                       </Canvas>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price Alert */}
            <div className="bg-[#F57C00]/5 border border-[#F57C00]/20 rounded-2xl p-6 flex gap-4">
               <Info className="w-6 h-6 text-[#F57C00] flex-shrink-0" />
               <p className="text-xs text-gray-400 leading-relaxed">
                 <strong className="text-white block mb-1">Nota de Estimativa:</strong>
                 Os valores apresentados são baseados em parâmetros padrão (20% preenchimento, 0.2mm camada). 
                 Fatores como suportes e complexidade geométrica podem influenciar o resultado final.
               </p>
            </div>
          </div>

          {/* Stats Display */}
          <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-6 border border-[#333333]">
                   <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Volume Sintentizado</p>
                   <p className="text-2xl font-bold text-white">
                      {status === 'success' ? `${stats?.volume.toFixed(2)}` : '---'} <span className="text-sm text-[#F57C00]">cm³</span>
                   </p>
                </div>
                <div className="glass rounded-2xl p-6 border border-[#333333]">
                   <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Massa Estimada</p>
                   <p className="text-2xl font-bold text-white">
                      {status === 'success' ? `${weight.toFixed(1)}` : '---'} <span className="text-sm text-[#F57C00]">g</span>
                   </p>
                </div>
             </div>

             <div className="glass rounded-2xl p-8 border border-[#333333] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                   <Box className="w-5 h-5 text-gray-700 group-hover:text-[#F57C00] transition-colors" />
                </div>
                <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-6 border-b border-[#333333] pb-4">Dimensões Envolventes</h4>
                <div className="space-y-4">
                   {['X (Largura)', 'Y (Profundidade)', 'Z (Altura)'].map((axis, i) => (
                     <div key={axis} className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{axis}</span>
                        <div className="flex items-center gap-4 flex-grow mx-8">
                           <div className="h-px bg-[#333333] flex-grow" />
                        </div>
                        <span className="text-sm font-bold text-white font-mono">
                           {status === 'success' ? `${Object.values(stats!.dimensions)[i].toFixed(1)}` : '0.0'} mm
                        </span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="glass rounded-3xl p-8 border border-[#F57C00]/30 bg-[#F57C00]/5 blog-glow-orange animate-fadeIn">
                <div className="flex items-center justify-between mb-8">
                   <div>
                      <p className="text-[10px] font-mono text-[#F57C00] uppercase tracking-widest mb-1">Custo Projetado</p>
                      <h3 className="text-4xl font-bold text-white tracking-tighter">
                         <span className="text-lg text-gray-500 mr-2 font-normal uppercase">R$</span>
                         {status === 'success' ? `${estimatedPrice.toFixed(2)}` : '00.00'}
                      </h3>
                   </div>
                   <CheckCircle2 className={`w-10 h-10 ${status === 'success' ? 'text-[#F57C00]' : 'text-gray-800'}`} />
                </div>
                
                <div className="flex flex-col gap-3">
                   <button 
                     disabled={status !== 'success'}
                     className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${
                       status === 'success' 
                        ? 'bg-[#F57C00] text-white hover:bg-[#FF8C00] blog-glow-orange shadow-[0_0_30px_rgba(245,124,0,0.3)]' 
                        : 'bg-[#1A1A1A] text-gray-600 border border-[#333333] cursor-not-allowed'
                     }`}
                   >
                     Validar & Solicitar Fabricação
                   </button>
                   <p className="text-[10px] text-gray-500 text-center uppercase tracking-tighter">O valor é uma estimativa técnica preliminar.</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-[#F57C00]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[400px] h-[400px] bg-[#F57C00]/5 rounded-full blur-[100px]" />
    </section>
  );
}
