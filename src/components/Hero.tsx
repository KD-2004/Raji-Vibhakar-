import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MessageCircle, Phone, MapPin, CheckCircle2, Star, ExternalLink, Ear, MessageSquare, Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { ClinicLogo } from './ClinicLogo';
import { Link } from './Link';
import { trackEvent } from '../utils/analytics';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigate?: (path: string) => void;
}

type HeroTab = 'hearing' | 'speech' | 'aids';

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<HeroTab>('hearing');
  const googleLink = CLINIC_INFO.location.officialGbpUrl || CLINIC_INFO.location.googleMapsSearchUrl;

  const tabData = {
    hearing: {
      title: "Diagnostic Hearing Assessment",
      specialist: "Pure Tone Audiometry (PTA) & Middle Ear Impedance",
      duration: "25–35 mins",
      badge: "Air & Bone Conduction",
      serviceName: "Pure Tone Audiometry",
      points: [
        "Calibrated frequency testing across speech octaves (250Hz – 8kHz)",
        "Tympanometry & acoustic reflex test for middle ear pressure",
        "Instant printed audiogram & personalized clinical counseling",
      ],
    },
    speech: {
      title: "Speech & Language Therapy",
      specialist: "Pediatric & Adult Fluency / Articulation / Post-Stroke",
      duration: "30–45 mins",
      badge: "MUHS State Merit Rank 1",
      serviceName: "Speech Therapy in Dahisar East",
      points: [
        "Child speech sound (misarticulation) & language development",
        "Stuttering / stammering modification & breathing ease",
        "Aphasia & motor speech rehabilitation in English, Gujarati, Hindi, Marathi",
      ],
    },
    aids: {
      title: "Live Digital Hearing Aid Trials",
      specialist: "Prescription Programming & Custom Fit Evaluation",
      duration: "30–40 mins",
      badge: "Objective Live Trial",
      serviceName: "Hearing Aid Trial",
      points: [
        "Experience digital speech clarity in live conversation before deciding",
        "Discreet, custom styles: Invisible CIC, RIC, Rechargeable & Bluetooth",
        "Objective programming precisely calibrated to your audiogram graph",
      ],
    },
  };

  const current = tabData[activeTab];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50 pt-6 pb-12 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 border-b border-slate-200/70">
      {/* Background subtle radial texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0f766e 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Core CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-4 sm:space-y-6"
          >
            {/* Top Verified Location & Google Rating Kicker */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-semibold text-teal-800 tracking-wide">
              <span className="inline-flex items-center gap-1.5 text-teal-700 bg-teal-50/90 px-3 py-1 rounded-full border border-teal-200/70 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Dahisar East, Mumbai</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <a
                href={googleLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('google_maps_click', { source: 'hero_rating' })}
                className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-900 transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                <span>5.0 Star Google Rating (1 Review)</span>
              </a>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-600 font-medium">Opp. Pragati Hospital</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] [text-wrap:balance]">
              Audiologist &amp; Speech-Language Therapist in Dahisar East, Mumbai
            </h1>

            {/* Verified Business Description */}
            <p className="text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Welcome to <strong className="text-slate-900 font-semibold">{CLINIC_INFO.businessName}</strong>. Led by <strong className="text-slate-900 font-semibold">{CLINIC_INFO.professionalName}</strong> ({CLINIC_INFO.professionalTitle}, State Merit Rank 1 in Motor Speech Disorders, BASLP AYJNISHD). Providing diagnostic hearing assessments, live digital hearing aid trials, and speech therapy for children, adults, and seniors.
            </p>

            {/* 2 Primary Service Cards with crawlable Links and hover micro-animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href="/speech-therapy-dahisar-east"
                  onNavigate={onNavigate}
                  className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all flex items-start gap-3 text-left h-full"
                >
                  <div className="p-2.5 rounded-lg bg-teal-50 text-teal-700 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Speech &amp; Language Therapy</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Misarticulation, stuttering, aphasia, voice therapy</div>
                  </div>
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href="/hearing-aid-trial"
                  onNavigate={onNavigate}
                  className="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 hover:border-cyan-400 hover:shadow-md transition-all flex items-start gap-3 text-left h-full"
                >
                  <div className="p-2.5 rounded-lg bg-cyan-50 text-cyan-700 shrink-0">
                    <Ear className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Audiology &amp; Hearing Aids</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Pure tone tests &amp; live digital hearing aid trials</div>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Action Buttons with smooth spring feedback */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  trackEvent('appointment_open', { source: 'hero_primary' });
                  onOpenBooking();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md shadow-teal-900/15 transition-all cursor-pointer min-h-[46px]"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Book Clinic Appointment</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href={CLINIC_INFO.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'hero_whatsapp' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all cursor-pointer min-h-[46px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Chat on WhatsApp</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href={`tel:${CLINIC_INFO.contact.phone}`}
                onClick={() => trackEvent('phone_click', { source: 'hero_phone' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all cursor-pointer min-h-[46px]"
                title="Call Clinic"
              >
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Call 8898330707</span>
              </motion.a>
            </div>

            {/* Clinic Address snippet with verified Google Maps anchor */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600 border-t border-slate-200/80">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="leading-snug">
                {CLINIC_INFO.location.fullAddress}
              </span>
              <a
                href={googleLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('google_maps_click', { source: 'hero_address' })}
                className="text-teal-700 font-semibold hover:underline inline-flex items-center gap-0.5 ml-1"
              >
                <span>(Directions on Google Maps)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Clinical Care Navigator Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-4 sm:p-6 relative overflow-hidden space-y-4">
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-500" />

              {/* Clinic Header Info */}
              <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] sm:text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                      Dahisar East Clinic
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-700 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Open Mon–Sat 9AM–8PM
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                    {CLINIC_INFO.businessName}
                  </h2>
                  <p className="text-xs text-slate-600 font-medium truncate">
                    {CLINIC_INFO.professionalName} · {CLINIC_INFO.degrees}
                  </p>
                </div>
                <div className="p-1.5 bg-teal-50/80 rounded-xl border border-teal-100/80 shrink-0">
                  <ClinicLogo size="sm" />
                </div>
              </div>

              {/* Interactive Segmented Selector Tabs */}
              <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200/80 relative">
                {(['hearing', 'speech', 'aids'] as HeroTab[]).map((tab) => {
                  const isSelected = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        trackEvent('service_page_view', { label: `hero_tab_${tab}` });
                      }}
                      className={`flex-1 relative z-10 py-2 px-1.5 text-center text-[11px] sm:text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                        isSelected ? 'text-teal-950' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab === 'hearing' && 'Hearing Test'}
                      {tab === 'speech' && 'Speech Therapy'}
                      {tab === 'aids' && 'Hearing Aids'}
                      {isSelected && (
                        <motion.div
                          layoutId="heroTabIndicator"
                          className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200/80 -z-10"
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Consultation Scope with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3.5 pt-1"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{current.title}</h3>
                      <p className="text-[11px] text-teal-700 font-medium">{current.specialist}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded text-[10px] font-semibold shrink-0">
                      {current.badge}
                    </span>
                  </div>

                  {/* Included Steps Checklist */}
                  <ul className="space-y-2 text-xs text-slate-700">
                    {current.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Clock className="w-3 h-3 text-teal-600" />
                      Duration: {current.duration}
                    </span>
                    <span className="text-emerald-700 font-semibold">
                      Individual 1-on-1 Care
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Card Footer CTA */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    trackEvent('appointment_open', { source: `hero_card_${activeTab}` });
                    onOpenBooking();
                  }}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 min-h-[42px]"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book {current.title}</span>
                </motion.button>

                <div className="flex items-center justify-between text-[11px] text-slate-600 px-1 pt-1">
                  <span>Shop 1, Ramkunwar Thakur Marg</span>
                  <a
                    href={googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('google_maps_click', { source: 'hero_card_maps' })}
                    className="text-teal-700 hover:text-teal-800 font-semibold inline-flex items-center gap-0.5"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
