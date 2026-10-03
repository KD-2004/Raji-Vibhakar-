import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Calendar, MessageCircle, Menu, X, MapPin, ExternalLink, Star, ChevronRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { ClinicLogo } from './ClinicLogo';
import { Link } from './Link';
import { trackEvent } from '../utils/analytics';

interface NavbarProps {
  onOpenBooking: () => void;
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const googleLink = CLINIC_INFO.location.officialGbpUrl || CLINIC_INFO.location.googleMapsSearchUrl;

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Zone 1: Clinic Top Notice Ribbon */}
      <div className="bg-slate-900 text-slate-200 text-[11px] sm:text-xs py-1.5 px-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Physical clinic address anchor */}
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="truncate">
              Shop No. 1, Ramkunwar Thakur Marg, Dahisar East, Mumbai
            </span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-teal-300 font-medium">Opp. Pragati Hospital</span>
          </div>

          {/* Right: Verified Google rating & Call */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={googleLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('google_maps_click', { source: 'topbar' })}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors"
              title="Open Google location"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold">5.0</span>
              <span className="hidden sm:inline">Google Rating (1 Review)</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
            </a>

            <span className="text-slate-700 hidden sm:inline">|</span>

            {/* Direct Phone Number */}
            <a
              href={`tel:${CLINIC_INFO.contact.phone}`}
              onClick={() => trackEvent('phone_click', { source: 'topbar' })}
              className="inline-flex items-center gap-1 font-semibold text-white hover:text-teal-300 transition-colors"
              title="Call Clinic Reception"
            >
              <Phone className="w-3 h-3 text-teal-400" />
              <span>{CLINIC_INFO.contact.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-18 flex items-center justify-between gap-2">
        {/* Brand / Logo with crawlable Link */}
        <Link
          href="/"
          onNavigate={handleLinkClick}
          className="flex items-center gap-2 sm:gap-3 group shrink min-w-0 text-left"
          aria-label="Rajvi Vibhakar Speech & Hearing Clinic"
        >
          <ClinicLogo size="md" priority />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-slate-900 text-sm sm:text-base md:text-lg tracking-tight group-hover:text-teal-700 transition-colors truncate">
              <span className="sm:hidden">Rajvi Vibhakar Clinic</span>
              <span className="hidden sm:inline">{CLINIC_INFO.businessName}</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-teal-700 tracking-wide truncate">
              <span className="sm:hidden">Audiology &amp; Speech · Dahisar East</span>
              <span className="hidden sm:inline">Rajvi Vibhakar Parikh (BASLP, AYJNISHD)</span>
            </span>
          </div>
        </Link>

        {/* Crawlable Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <Link href="/#services" onNavigate={handleLinkClick} className="hover:text-teal-700 transition-colors">
            Services
          </Link>
          <Link href="/#hearing-aids" onNavigate={handleLinkClick} className="hover:text-teal-700 transition-colors">
            Hearing Aids
          </Link>
          <Link href="/insights" onNavigate={handleLinkClick} className="hover:text-teal-700 transition-colors">
            Insights
          </Link>
          <Link href="/about" onNavigate={handleLinkClick} className="hover:text-teal-700 transition-colors">
            About Practitioner
          </Link>
          <Link href="/contact" onNavigate={handleLinkClick} className="hover:text-teal-700 transition-colors">
            Contact &amp; Location
          </Link>
        </nav>

        {/* Direct Actions (Call, WhatsApp, Book, Menu) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* WhatsApp Direct */}
          <motion.a
            whileTap={{ scale: 0.96 }}
            href={CLINIC_INFO.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'navbar' })}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors whitespace-nowrap min-h-[38px]"
            title="Message on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>WhatsApp</span>
          </motion.a>

          {/* Call Direct */}
          <motion.a
            whileTap={{ scale: 0.96 }}
            href={`tel:${CLINIC_INFO.contact.phone}`}
            onClick={() => trackEvent('phone_click', { source: 'navbar' })}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors min-h-[38px]"
            title="Call Clinic"
          >
            <Phone className="w-3.5 h-3.5 text-teal-700 shrink-0" />
            <span className="hidden md:inline">{CLINIC_INFO.contact.displayPhone}</span>
            <span className="md:hidden">Call</span>
          </motion.a>

          {/* Book Appointment CTA */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              trackEvent('appointment_open', { source: 'navbar' });
              onOpenBooking();
            }}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition-colors cursor-pointer min-h-[38px]"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Book Slot</span>
          </motion.button>

          {/* Mobile Hamburger Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-h-[44px] min-w-[44px] p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center justify-center"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-teal-800" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence & Crawlable Links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4 shadow-xl overflow-hidden"
          >
            <nav className="flex flex-col space-y-1 text-sm font-semibold text-slate-700">
              <Link
                href="/"
                onNavigate={handleLinkClick}
                className="flex min-h-[44px] items-center justify-between text-left px-3.5 py-2.5 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition-colors"
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/#services"
                onNavigate={handleLinkClick}
                className="flex min-h-[44px] items-center justify-between text-left px-3.5 py-2.5 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition-colors"
              >
                <span>Our Speech &amp; Hearing Services</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/#hearing-aids"
                onNavigate={handleLinkClick}
                className="flex min-h-[44px] items-center justify-between text-left px-3.5 py-2.5 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition-colors"
              >
                <span>Hearing Aid Form Factors</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/insights"
                onNavigate={handleLinkClick}
                className="flex min-h-[44px] items-center justify-between text-left px-3.5 py-2.5 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition-colors"
              >
                <span>Health Insights &amp; Articles</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/about"
                onNavigate={handleLinkClick}
                className="flex min-h-[44px] items-center justify-between text-left px-3.5 py-2.5 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition-colors"
              >
                <span>About Rajvi Vibhakar Parikh</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/contact"
                onNavigate={handleLinkClick}
                className="flex min-h-[44px] items-center justify-between text-left px-3.5 py-2.5 rounded-xl hover:bg-teal-50 hover:text-teal-900 transition-colors"
              >
                <span>Clinic Location &amp; Directions (Dahisar East)</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/book-appointment"
                onNavigate={handleLinkClick}
                className="flex items-center justify-between text-left px-3.5 py-2.5 rounded-xl bg-teal-50 text-teal-900 font-bold border border-teal-200/70"
              >
                <span>Book an Appointment</span>
                <ChevronRight className="w-4 h-4 text-teal-700" />
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={CLINIC_INFO.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'mobile_drawer' })}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Message on WhatsApp</span>
              </motion.a>

              <motion.a
                whileTap={{ scale: 0.97 }}
                href={`tel:${CLINIC_INFO.contact.phone}`}
                onClick={() => trackEvent('phone_click', { source: 'mobile_drawer' })}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span>Call Clinic (+91 8898330707)</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
