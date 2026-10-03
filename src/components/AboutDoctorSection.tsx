import React from 'react';
import { motion } from '../utils/motion';
import { Award, GraduationCap, Building2, Globe, CheckCircle2, HeartHandshake, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { ClinicLogo } from './ClinicLogo';
import { Link } from './Link';

interface AboutSectionProps {
  onNavigate?: (path: string) => void;
}

export const AboutDoctorSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section id="about" className="content-auto py-16 md:py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Practitioner Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="bg-gradient-to-b from-teal-50/80 via-white to-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-md relative overflow-hidden">
              <div className="flex items-center gap-3.5 pb-5 border-b border-slate-200/70">
                <ClinicLogo size="lg" />
                <div>
                  <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                    Clinical Practitioner
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {CLINIC_INFO.professionalName}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {CLINIC_INFO.professionalTitle}
                  </p>
                </div>
              </div>

              {/* Verified Credentials Box */}
              <div className="py-5 space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">AYJNISHD (Divyangjan) Alumna:</strong>
                    Bachelor’s in Audiology and Speech and Language Pathology (BASLP), Mumbai
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-900 block">Maharashtra State Merit Rank 1 (2020):</strong>
                    Rank 1 under MUHS in Motor Speech Disorders
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Active Mumbai Practice:</strong>
                    Clinician across private clinics in Mumbai &amp; Audiologist at Manav Kalyan Kendra (NGO)
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Consultations Available In:</strong>
                    English, Gujarati (ગુજરાતી), Hindi (हिंदी), and Marathi (मराठी)
                  </div>
                </div>
              </div>

              {/* Volunteering & Full About Link */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Volunteered at REWA Ladakh</span>
                </div>
                <Link
                  href="/about"
                  onNavigate={onNavigate}
                  className="text-teal-700 font-semibold hover:text-teal-800 flex items-center gap-1"
                >
                  <span>Full CV</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clinical Values */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase">
              <span>Patient-Centered Clinical Care</span>
              <span aria-hidden="true">·</span>
              <span>Dahisar East, Mumbai</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
              Professional, Transparent Care for Communication &amp; Hearing
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              When it comes to speech sound difficulty in a young child, stuttering fluency, or hearing loss in an elderly parent, navigating therapy and device choices should be transparent. Rajvi Vibhakar Parikh conducts thorough, objective evaluations with <strong>honest clinical advice and zero commercial pressure.</strong>
            </p>

            {/* Key Business Pillars */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">Objective, Live Hearing Aid Trials:</strong>
                  We never require patients to purchase hearing devices without a live trial. You test modern digital hearing aids in person to evaluate sound clarity in conversation.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">Motor Speech &amp; Dysarthria (MUHS State Rank 1):</strong>
                  Rajvi achieved State Merit Rank 1 in Motor Speech Disorders under MUHS, providing evidence-based techniques for dysarthria, post-stroke aphasia, and voice strain therapy.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 block mb-0.5">Comfortable Native Language Consultations:</strong>
                  Patients communicate best in their mother tongue. Consultations in Gujarati, Hindi, Marathi, and English ensure children and seniors feel comfortable and understood.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const AboutSection = AboutDoctorSection;
