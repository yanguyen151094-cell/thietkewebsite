import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import QuickContact from '@/components/feature/QuickContact';
import PromoPopup from '@/components/feature/PromoPopup';
import HeroSection from './components/HeroSection';
import WebServicesSection from './components/WebServicesSection';
import TemplatesPreview from './components/TemplatesPreview';
import AdServicesSection from './components/AdServicesSection';
import IndustriesSection from './components/IndustriesSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import ConsultationForm from './components/ConsultationForm';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <WebServicesSection />
        <TemplatesPreview />
        <AdServicesSection />
        <IndustriesSection />
        <PricingSection />
        <TestimonialsSection />
        <ConsultationForm />
      </main>
      <Footer />
      <QuickContact />
      <PromoPopup />
    </div>
  );
}
