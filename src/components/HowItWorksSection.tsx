import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Stethoscope, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { CLINIC_INFO, HOW_IT_WORKS_STEPS } from '../data/clinicData';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const stepIcons = [
    <Calendar className="w-5 h-5 text-teal-600" />,
    <Stethoscope className="w-5 h-5 text-cyan-600" />,
    <Sparkles className="w-5 h-5 text-emerald-600" />,
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-slate-50/70 border-b border-slate-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2 block">
            Simple 3-Step Patient Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            How to Get Started at Our Dahisar East Clinic
          </h2>
          <p className="text-slate-600 text-sm mt-2.5">
            We value your time with zero long waiting room delays and compassionate, transparent clinical care.
          </p>
        </motion.div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                    {stepIcons[idx]}
                  </div>
                  <span className="text-2xl font-black text-slate-200 font-mono">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx === 0 && (
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={onOpenBooking}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline cursor-pointer"
                  >
                    Select preferred time slot →
                  </button>
                </div>
              )}

              {idx === 2 && (
                <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-emerald-700 font-semibold">
                  ✓ Includes Live Hearing Aid Trials
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Customer Reassurance Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-teal-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold">
              Have an urgent question about hearing or speech for your family?
            </h4>
            <p className="text-xs text-teal-100">
              Speak directly with our clinic reception or message our clinic on WhatsApp.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <a
              href={`tel:${CLINIC_INFO.contact.phone}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2 rounded-xl bg-white text-teal-900 font-semibold text-xs hover:bg-teal-50 transition-colors shadow-xs min-h-[44px]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 8898330707</span>
            </a>
            <a
              href={CLINIC_INFO.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs transition-colors shadow-xs min-h-[44px]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
