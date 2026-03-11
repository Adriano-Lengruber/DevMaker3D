import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Process from '@/components/Process';
import Services from '@/components/Services';
import Materials from '@/components/Materials';
import NexusEngine from '@/components/NexusEngine';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F0F0F]">
      <Header />
      <Hero />
      <Philosophy />
      <Process />
      <Services />
      <Materials />
      <NexusEngine />
      <Portfolio />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </main>
  );
}
