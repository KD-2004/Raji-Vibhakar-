/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePath, updatePageMeta } from './utils/router';
import { ALL_SERVICES, HEALTH_INSIGHTS } from './data/clinicData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { AboutDoctorSection } from './components/AboutDoctorSection';
import { HealthInsightsSection } from './components/HealthInsightsSection';
import { AssessmentInteractive } from './components/AssessmentInteractive';
import { LocationSection } from './components/LocationSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { MobileStickyContact } from './components/MobileStickyContact';

// Dedicated SEO Pages
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { InsightsIndexPage } from './pages/InsightsIndexPage';
import { InsightDetailPage } from './pages/InsightDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

export interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps = {}) {
  const [spaPath, navigate] = usePath();
  const currentPath = initialPath !== undefined ? initialPath : spaPath;
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');
  const [screeningNotes, setScreeningNotes] = useState('');

  // Handle homepage metadata
  useEffect(() => {
    if (currentPath === '/' || currentPath === '') {
      updatePageMeta(
        `Audiologist & Speech-Language Therapist | Rajvi Vibhakar`,
        `Rajvi Vibhakar provides audiology and speech-language therapy for hearing problems, hearing tests, hearing loss assessments, hearing aid trials and speech-language therapy for children and adults. Call 8898330707.`,
        `/`
      );
    }
  }, [currentPath]);

  const handleOpenBooking = () => {
    setSelectedServiceForBooking('');
    setScreeningNotes('');
    setIsBookingOpen(true);
  };

  const handleSelectServiceForBooking = (serviceName: string) => {
    setSelectedServiceForBooking(serviceName);
    setScreeningNotes('');
    setIsBookingOpen(true);
  };

  const handleBookWithContext = (serviceName: string, notes: string) => {
    setSelectedServiceForBooking(serviceName);
    setScreeningNotes(notes);
    setIsBookingOpen(true);
  };

  const handleBookForInsightTopic = (topic: string) => {
    setSelectedServiceForBooking('Consultation');
    setScreeningNotes(`Inquiry regarding: ${topic}`);
    setIsBookingOpen(true);
  };

  // Route Resolution
  const renderCurrentRoute = () => {
    // 1. Dedicated About Page
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} onOpenBooking={handleOpenBooking} />;
    }

    // 2. Dedicated Contact Page
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} onOpenBooking={handleOpenBooking} />;
    }

    // 3. Dedicated Booking Page
    if (currentPath === '/book-appointment') {
      return <BookAppointmentPage onNavigate={navigate} />;
    }

    // 4. Privacy Policy
    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicyPage onNavigate={navigate} />;
    }

    // 5. Health Insights Index
    if (currentPath === '/insights') {
      return <InsightsIndexPage onNavigate={navigate} onOpenBooking={handleOpenBooking} />;
    }

    // 6. Individual Health Insight Article
    if (currentPath.startsWith('/insights/')) {
      const slug = currentPath.replace('/insights/', '');
      const insight = HEALTH_INSIGHTS.find((i) => i.slug === slug);
      if (insight) {
        return (
          <InsightDetailPage
            insight={insight}
            onNavigate={navigate}
            onOpenBooking={handleOpenBooking}
          />
        );
      }
    }

    // 7. Individual Service Page
    const cleanSlug = currentPath.replace(/^\//, '');
    const matchedService = ALL_SERVICES.find((s) => s.slug === cleanSlug);
    if (matchedService) {
      return (
        <ServiceDetailPage
          service={matchedService}
          onNavigate={navigate}
          onOpenBooking={handleOpenBooking}
        />
      );
    }

    // 8. Homepage
    if (currentPath === '/' || currentPath === '') {
      return (
        <main className="flex-1">
          {/* Customer-First Hero with Direct CTAs */}
          <Hero onOpenBooking={handleOpenBooking} onNavigate={navigate} />

          {/* Practice Trust & Patient Care Guarantees Bar */}
          <StatsBanner />

          {/* Clinical Services with Patient Benefits */}
          <ServicesSection
            onSelectService={handleSelectServiceForBooking}
            onNavigate={navigate}
          />

          {/* 3-Step Simple Patient Journey */}
          <HowItWorksSection onOpenBooking={handleOpenBooking} />

          {/* Meet the Lead Specialist */}
          <AboutDoctorSection onNavigate={navigate} />

          {/* Patient Care & Health Insights */}
          <HealthInsightsSection
            onOpenBookingForTopic={handleBookForInsightTopic}
            onNavigate={navigate}
          />

          {/* Interactive Self-Screening Assessment */}
          <AssessmentInteractive onBookWithContext={handleBookWithContext} />

          {/* Rajvi Vibhakar’s Clinic Location & Google Profile */}
          <LocationSection />

          {/* Frequently Asked Patient Questions */}
          <FAQSection />
        </main>
      );
    }

    // 9. Real 404 Not Found Handling
    return <NotFoundPage onNavigate={navigate} onOpenBooking={handleOpenBooking} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900 pb-20 md:pb-0">
      {/* Clinic Top Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} onNavigate={navigate} />

      {/* Main View: Dynamically renders the active route or homepage with smooth transition */}
      <motion.div
        key={currentPath}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col"
      >
        {renderCurrentRoute()}
      </motion.div>

      {/* Clinic Footer */}
      <Footer onOpenBooking={handleOpenBooking} onNavigate={navigate} />

      {/* Direct WhatsApp Appointment Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedServiceForBooking}
        initialNotes={screeningNotes}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyContact onOpenBooking={handleOpenBooking} />
    </div>
  );
}
