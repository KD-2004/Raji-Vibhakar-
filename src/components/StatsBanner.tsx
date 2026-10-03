import React from 'react';
import { motion } from '../utils/motion';
import { Award, Ear, Star, Globe, MapPin, ExternalLink, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { trackEvent } from '../utils/analytics';

export const StatsBanner: React.FC = () => {
  const googleLink = CLINIC_INFO.location.officialGbpUrl || CLINIC_INFO.location.googleMapsSearchUrl;

  const pillars = [
    {
      icon: <Ear className="w-5 h-5 text-teal-600" />,
      tag: "Live Device Trials",
      title: "Objective Hearing Aid Trials",
      desc: "Experience speech clarity in real conversation with family members prior to any device selection.",
      check: "No Pressure · Patient Decides",
      accent: "teal",
    },
    {
      icon: <Award className="w-5 h-5 text-amber-600" />,
      tag: "Academic Merit",
      title: "State Merit Rank 1 (MUHS)",
      desc: "Rank 1 in Motor Speech Disorders (2020) & BASLP degree from AYJNISHD (Divyangjan), Mumbai.",
      check: "Verified Academic Distinction",
      accent: "amber",
    },
    {
      icon: <MapPin className="w-5 h-5 text-emerald-600" />,
      tag: "Dahisar East, Mumbai",
      title: "Opp. Pragati Hospital",
      desc: "Shop No. 1, Ramkunwar Thakur Marg, Krishna Colony. Easy access from Dahisar station & highway.",
      check: "Direct Physical Clinic",
      accent: "emerald",
      isMap: true,
    },
    {
      icon: <Globe className="w-5 h-5 text-cyan-600" />,
      tag: "Multilingual Care",
      title: "4 Language Fluency",
      desc: "Consultations in English, Gujarati (ગુજરાતી), Hindi (हिंदी), and Marathi (मराठी) for patient comfort.",
      check: "Comfortable Communication",
      accent: "cyan",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-slate-50/60 to-slate-50 py-10 sm:py-14 px-4 sm:px-6 relative overflow-hidden border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-1.5 text-teal-700 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Clinical Quality &amp; Patient Standards</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Why Patients Trust Our Dahisar East Practice
            </h2>
          </div>

          <a
            href={googleLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('directions_click', { source: 'stats_banner' })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100/80 text-amber-900 border border-amber-200 text-xs font-bold transition-all self-start sm:self-auto shrink-0 shadow-2xs"
          >
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>5.0 Star Google Rating (1 Review)</span>
            <ExternalLink className="w-3 h-3 text-amber-700" />
          </a>
        </div>

        {/* 4 Pillars Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {pillars.map((p, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                    {p.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {p.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-700">
                <span className="flex items-center gap-1 text-teal-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{p.check}</span>
                </span>
                {p.isMap && (
                  <a
                    href={googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('directions_click', { source: 'stats_pillar_map' })}
                    className="text-teal-700 hover:text-teal-800 text-[11px] font-bold inline-flex items-center gap-0.5"
                  >
                    <span>Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
