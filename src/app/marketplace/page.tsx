'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Box, 
  Download, 
  ArrowRight, 
  Star, 
  Layers, 
  Cpu, 
  CreditCard,
  ChevronRight,
  X,
  Activity,
  ShieldCheck 
} from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PRODUCTS = [
  {
    id: 1,
    name: 'Cyber-Drone Core STL',
    category: 'Blueprint',
    price: 'R$ 45,00',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800',
    type: 'Digital'
  },
  {
    id: 2,
    name: 'T-800 Arm Replica',
    category: 'Peças Prontas',
    price: 'R$ 280,00',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
    type: 'Físico'
  },
  {
    id: 3,
    name: 'Precision Nozzle Set',
    category: 'Ferramentas',
    price: 'R$ 120,00',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=800',
    type: 'Equipamento'
  },
  {
    id: 4,
    name: 'Mechanical Spider Link',
    category: 'Blueprint',
    price: 'R$ 25,00',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    type: 'Digital'
  },
];

const CATEGORIES = [
  { name: 'Todos', icon: Layers },
  { name: 'Blueprints STL', icon: Download },
  { name: 'Componentes', icon: Cpu },
  { name: 'Peças Prontas', icon: Box },
];

export default function MarketplacePage() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((acc, item) => {
    const priceValue = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
    return acc + priceValue;
  }, 0);

  const handlePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        setIsCheckoutOpen(false);
        setCart([]);
        setPaymentStatus('idle');
      }, 2000);
    }, 3000);
  };
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#F57C00]/5 blur-[120px] -z-10" />
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#333333] bg-[#1A1A1A] mb-8"
          >
            <ShoppingBag className="w-4 h-4 text-[#F57C00]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#A0A0A0]">Supply Chain Digital</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tighter">
            DevMaker <span className="text-[#F57C00]">Marketplace</span>
          </h1>
          <p className="text-[#A0A0A0] max-w-2xl mx-auto text-lg leading-relaxed">
            A fonte suprema de ativos de engenharia, modelos 3D exclusivos e hardware de alta precisão. 
            Materialize seu próximo breakthrough.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[72px] z-40 bg-[#0A0A0A]/80 backdrop-blur-xl border-y border-[#333333]">
        <div className="container-custom py-4 flex flex-wrap justify-center gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              className="px-6 py-2 rounded-xl text-sm font-medium border border-[#333333] text-[#A0A0A0] hover:text-[#F57C00] hover:border-[#F57C00] transition-all flex items-center gap-2 group whitespace-nowrap"
            >
              <cat.icon className="w-4 h-4 text-gray-600 group-hover:text-[#F57C00]" />
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl border border-[#333333] overflow-hidden group hover:border-[#F57C00]/50 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase font-bold text-[#F57C00] border border-[#F57C00]/30 tracking-widest">
                      {product.type}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8 px-4">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full py-3 bg-[#F57C00] text-white rounded-xl text-xs uppercase font-bold tracking-widest blog-glow-orange flex items-center justify-center gap-2"
                    >
                       {product.type === 'Digital' ? <Download className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                       Adicionar à Fila
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-gray-500 uppercase font-mono">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-white font-bold">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-white font-bold mb-4 group-hover:text-[#F57C00] transition-colors line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold font-mono text-white">{product.price}</span>
                    <button className="p-2 rounded-lg bg-[#333333]/30 border border-[#333333] text-gray-400 group-hover:text-[#F57C00] transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
             <button className="px-10 py-4 rounded-xl border border-[#333333] text-[#A0A0A0] hover:text-white hover:border-white transition-all uppercase tracking-widest text-xs font-bold">
                Carregar Protocolos Adicionais
             </button>
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="pb-24">
         <div className="container-custom">
            <div className="glass rounded-[40px] border border-[#F57C00]/20 p-8 md:p-16 relative overflow-hidden group">
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="max-w-xl text-center md:text-left">
                     <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-tighter">
                        Seja um <span className="text-[#F57C00]">Arquiteto</span> da Rede
                     </h2>
                     <p className="text-[#A0A0A0] text-lg mb-8 leading-relaxed">
                        Tem designs de alta performance? Junte-se ao Marketplace da DevMaker e monetize seus blueprints. 
                        Nossa rede de especialistas aguarda seu talento.
                     </p>
                     <button className="px-8 py-4 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#F57C00] hover:text-white transition-all shadow-xl">
                        Candidate-se como Criador
                     </button>
                  </div>
                  <div className="relative w-full md:w-80 aspect-square">
                     <div className="absolute inset-0 bg-[#F57C00]/20 rounded-full blur-[60px]" />
                     <div className="w-full h-full border-2 border-dashed border-[#F57C00]/30 rounded-3xl animate-[spin_20s_linear_infinite] p-8 flex items-center justify-center">
                        <Box className="w-32 h-32 text-[#F57C00] animate-bounce" />
                     </div>
                  </div>
               </div>
               {/* Background Decor */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#F57C00]/10 blur-[100px] rounded-full" />
            </div>
         </div>
      </section>

      <Footer />

      {/* Floating Cart UI */}
      <AnimatePresence>
        {cart.length > 0 && !isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-10 right-10 z-50"
          >
             <button 
               onClick={() => setIsCheckoutOpen(true)}
               className="flex items-center gap-4 bg-[#F57C00] text-white p-4 rounded-2xl shadow-[0_0_40px_rgba(245,124,0,0.5)] blog-glow-orange group transition-all hover:scale-105"
             >
                <div className="relative">
                   <ShoppingBag className="w-6 h-6" />
                   <span className="absolute -top-2 -right-2 bg-white text-[#F57C00] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {cart.length}
                   </span>
                </div>
                <div className="text-left pr-4">
                   <p className="text-[10px] uppercase font-bold text-white/70">Fila de Projetos</p>
                   <p className="text-sm font-bold font-mono">R$ {total.toFixed(2)}</p>
                </div>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
         {isCheckoutOpen && (
           <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md" 
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg glass border border-[#333333] rounded-[40px] p-10 overflow-hidden"
              >
                 <button 
                    onClick={() => setIsCheckoutOpen(false)}
                    className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
                 >
                    <X className="w-6 h-6" />
                 </button>

                 <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-[#1A1A1A] border border-[#F57C00]/30 rounded-2xl flex items-center justify-center mb-6 mx-auto blog-glow-orange">
                       <CreditCard className="w-8 h-8 text-[#F57C00]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">Finalizar Blueprint</h3>
                    <p className="text-gray-500 text-sm mt-2">Transação de alta performance em ambiente seguro.</p>
                 </div>

                 <div className="space-y-4 mb-10">
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-2 font-mono uppercase tracking-widest">
                       <span>Item</span>
                       <span>Preço</span>
                    </div>
                    <div className="max-h-32 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                       {cart.map((item, i) => (
                         <div key={i} className="flex justify-between items-center text-white">
                            <span className="text-sm font-medium">{item.name}</span>
                            <span className="text-sm font-bold font-mono text-[#F57C00]">{item.price}</span>
                         </div>
                       ))}
                    </div>
                    <div className="border-t border-[#333333] pt-6 flex justify-between items-center">
                       <span className="text-lg font-bold text-white uppercase tracking-tighter">Total do Contrato</span>
                       <span className="text-2xl font-bold font-mono text-white">R$ {total.toFixed(2)}</span>
                    </div>
                 </div>

                 <button 
                   disabled={paymentStatus !== 'idle'}
                   onClick={handlePayment}
                   className="w-full py-5 bg-[#F57C00] text-white rounded-2xl font-bold uppercase tracking-widest blog-glow-orange hover:bg-[#FF8C00] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {paymentStatus === 'idle' && 'Processar Pagamento Neural'}
                    {paymentStatus === 'processing' && (
                       <div className="flex items-center justify-center gap-3">
                          <Activity className="w-5 h-5 animate-spin" />
                          Autenticando na Rede...
                       </div>
                    )}
                    {paymentStatus === 'success' && 'Sincronização Concluída!'}
                 </button>

                 <div className="mt-6 flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white">Encrypted Transaction</span>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </main>
  );
}
