import React, { useEffect } from 'react';
import { Award, GraduationCap, Building2, Globe, HeartHandshake, Calendar, Phone, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { updatePageMeta } from '../utils/router';
import { Link } from '../components/Link';
import { trackEvent } from '../utils/analytics';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  const creds = CLINIC_INFO.professionalCredentials;

  useEffect(() => {
    updatePageMeta(
      `About Rajvi Vibhakar Parikh | Audiologist & Speech-Language Therapist Dahisar East`,
      `Verified clinical background of Rajvi Vibhakar Parikh (BASLP, AYJNISHD), State Merit Rank 1 in Motor Speech Disorders (2020). Audiology & speech therapy in Dahisar East, Mumbai.`,
      `/about`
    );
  }, []);

  return (
    <div className="bg-slate-50 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumb with real links */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" onNavigate={onNavigate} className="hover:text-teal-700 underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">About Rajvi Vibhakar Parikh</span>
        </nav>

        {/* Profile Header */}
        <header className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
                Clinical Practitioner Profile
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {CLINIC_INFO.professionalName}
              </h1>
              <p className="text-sm sm:text-base text-teal-800 font-semibold mt-1">
                {CLINIC_INFO.professionalTitle} · {CLINIC_INFO.degrees}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => {
                  trackEvent('appointment_open', { source: 'about_page_header' });
                  onOpenBooking();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer min-h-[42px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
              <a
                href={CLINIC_INFO.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'about_page_header' })}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[42px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Rajvi Vibhakar Parikh is an audiologist and speech-language therapist practicing in Mumbai, with structured clinical training across audiological diagnostics and speech-language therapy cases. She leads her private practice at Shop No. 1, Ramkunwar Thakur Marg, opp. Pragati Hospital, Dahisar East, Mumbai.
          </p>
        </header>

        {/* Verified Education & Honors */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-teal-700" />
            <span>Academic Qualifications &amp; Honors</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block mb-1">
                Degree
              </span>
              <div className="font-bold text-slate-900 text-sm sm:text-base">
                {creds.degree}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                {creds.institution}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                State Merit Achievement
              </span>
              <div className="font-bold text-amber-950 text-sm sm:text-base">
                {creds.meritRank}
              </div>
              <div className="text-xs text-amber-800/80 mt-1">
                Recognized for academic distinction in motor speech disorders under Maharashtra University of Health Sciences.
              </div>
            </div>
          </div>
        </section>

        {/* Verified Clinical Training & Case Experience */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
              Verified Experience
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Clinical Case History &amp; Training Timeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Verified case distribution recorded during clinical rotations and professional practice:
            </p>
          </div>

          <div className="space-y-4">
            {creds.clinicalTimeline.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                <div className="sm:w-36 shrink-0">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-teal-100/80 text-teal-900 font-mono text-xs font-bold">
                    {item.period}
                  </span>
                  <div className="text-xs font-semibold text-slate-800 mt-1">
                    {item.role}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Work & Continuing Education */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-700" />
            <span>Professional Work, Conferences &amp; Volunteering</span>
          </h2>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Current Practice:</strong> Practicing as speech-language therapist and audiologist across private healthcare clinics in Mumbai.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Community Healthcare:</strong> Audiologist at Manav Kalyan Kendra (NGO), Mumbai.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Professional Conferences:</strong> Participated in the Indian Speech and Hearing Association Annual Conference (2020).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Continuing Education:</strong> Completed RCI-approved CRE program on Autism Spectrum Disorder: Assessment and Management (November 2025).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Volunteer Service:</strong> Volunteered at REWA LADAKH as a speech-language therapist in Leh Ladakh.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Globe className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span><strong>Languages for Consultations:</strong> English, Gujarati (ગુજરાતી), Hindi (हिंदी), and Marathi (मराठी).</span>
            </li>
          </ul>
        </section>

        {/* Educational Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 border border-slate-200">
          <strong>Educational information only:</strong> {CLINIC_INFO.disclaimer}
        </div>
      </div>
    </div>
  );
};
