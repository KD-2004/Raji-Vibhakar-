import React, { useState } from 'react';
import { motion, AnimatePresence } from '../utils/motion';
import { MessageSquare, Ear, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { SPEECH_SERVICES, HEARING_SERVICES, HEARING_AID_STYLES } from '../data/clinicData';
import { Link } from './Link';
import { trackEvent } from '../utils/analytics';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  onNavigate?: (path: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'speech' | 'hearing'>('speech');
  const [selectedAidCode, setSelectedAidCode] = useState<string>('RIC');

  const currentServices = activeTab === 'speech' ? SPEECH_SERVICES : HEARING_SERVICES;

  return (
    <section id="services" className="py-16 md:py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            <span>Specialized Clinical Solutions</span>
            <span aria-hidden="true">·</span>
            <span>Dahisar East, Mumbai</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            Speech Therapy &amp; Audiology Services Designed for Patients
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Whether your child needs support with speech sounds, an adult is seeking stuttering fluency, or you wish to test digital hearing aids in real conversation, explore our verified clinical services below.
          </p>
        </motion.div>

        {/* Tab Controls: Speech vs Hearing with Smooth Sliding Background */}
        <div className="flex p-1.5 bg-slate-100/90 rounded-xl max-w-md mb-10 border border-slate-200/80 relative">
          <button
            onClick={() => {
              setActiveTab('speech');
              trackEvent('service_page_view', { label: 'tab_speech' });
            }}
            className={`flex-1 relative z-10 flex items-center justify-center gap-2 py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'speech' ? 'text-teal-950 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Speech &amp; Fluency</span>
            {activeTab === 'speech' && (
              <motion.div
                layoutId="activeServiceTabPill"
                className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200/70 -z-10"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('hearing');
              trackEvent('service_page_view', { label: 'tab_hearing' });
            }}
            className={`flex-1 relative z-10 flex items-center justify-center gap-2 py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'hearing' ? 'text-teal-950 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Ear className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>Hearing &amp; Audiology</span>
            {activeTab === 'hearing' && (
              <motion.div
                layoutId="activeServiceTabPill"
                className="absolute inset-0 bg-white rounded-lg shadow-xs border border-slate-200/70 -z-10"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}
          </button>
        </div>

        {/* Services Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  {/* Card Top Label */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 group-hover:bg-teal-700 group-hover:text-white transition-colors shrink-0">
                      {service.category === 'speech' ? (
                        <MessageSquare className="w-4 h-4" />
                      ) : (
                        <Ear className="w-4 h-4" />
                      )}
                    </div>

                    {service.id === 'dysarthria-therapy' && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        MUHS State Rank 1
                      </span>
                    )}
                    {service.id === 'hearing-aid-trial' && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        Live Hearing Aid Trial
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-900 transition-colors leading-snug">
                      <Link
                        href={`/${service.slug}`}
                        onNavigate={onNavigate}
                        className="hover:text-teal-700 transition-colors"
                      >
                        {service.customerTitle}
                      </Link>
                    </h3>
                    <p className="text-xs text-teal-700 font-medium mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Who It Helps */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Signs for Clinical Evaluation:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {service.whoItHelps.slice(0, 2).map((item, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Actions with crawlable Links */}
                <div className="pt-5 mt-5 border-t border-slate-200/70 flex items-center justify-between gap-2">
                  <Link
                    href={`/${service.slug}`}
                    onNavigate={onNavigate}
                    className="text-xs font-semibold text-slate-700 hover:text-teal-700 transition-colors inline-flex items-center gap-1"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <button
                    onClick={() => onSelectService(service.customerTitle)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 active:scale-95 px-3 py-1.5 rounded-lg border border-teal-200/60 transition-all cursor-pointer"
                  >
                    <span>Book Consultation</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Digital Hearing Aid Styles Showcase */}
        <div id="hearing-aids" className="mt-20 pt-16 border-t border-slate-200">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
              Live Device Trials &amp; Styles
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Modern Hearing Aid Form Factors (ITC, RIC, CIC, BTE &amp; CROS)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Every ear canal and audiogram configuration is distinct. We provide live trials across custom and discreet styles so you find the optimal combination of speech clarity and comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {HEARING_AID_STYLES.map((style) => {
              const isSelected = selectedAidCode === style.code;
              return (
                <motion.div
                  key={style.code}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelectedAidCode(style.code)}
                  className={`p-4 rounded-xl transition-all cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-teal-50/70 border-teal-500 shadow-sm ring-1 ring-teal-500/20'
                      : 'bg-slate-50 border-slate-200/90 hover:border-teal-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                        isSelected ? 'bg-teal-700 text-white' : 'bg-teal-100/80 text-teal-900'
                      }`}>
                        {style.code}
                      </span>
                      <span className="text-[10px] text-teal-700 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                        {style.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{style.name}</h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{style.description}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-slate-600 font-medium">
                    {style.bestFor}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-teal-50/70 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-teal-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
              <span>
                <strong>Objective Hearing Aid Trials:</strong> We program trial devices to your audiogram so you judge speech clarity in person with zero sales pressure.
              </span>
            </div>
            <button
              onClick={() => onSelectService('Hearing Aid Trial')}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold text-xs transition-colors shrink-0 cursor-pointer"
            >
              Book Hearing Aid Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
