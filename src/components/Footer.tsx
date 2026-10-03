import React from 'react';
import { Phone, Mail, MapPin, Clock, Calendar, MessageCircle, Star, ExternalLink } from 'lucide-react';
import { CLINIC_INFO, SPEECH_SERVICES, HEARING_SERVICES } from '../data/clinicData';
import { ClinicLogo } from './ClinicLogo';
import { Link } from './Link';
import { trackEvent } from '../utils/analytics';

interface FooterProps {
  onOpenBooking: () => void;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onNavigate }) => {
  const googleLink = CLINIC_INFO.location.officialGbpUrl || CLINIC_INFO.location.googleMapsSearchUrl;

  const handleLink = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 px-4 sm:px-6 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Col 1: Clinic Identity & Verified Credentials */}
          <div className="md:col-span-4 space-y-3.5">
            <div className="flex items-center gap-3">
              <ClinicLogo size="md" />
              <div>
                <div className="font-bold text-white text-base tracking-tight">
                  {CLINIC_INFO.displayBusinessName}
                </div>
                <div className="text-[11px] text-teal-400 font-medium">
                  {CLINIC_INFO.professionalName} ({CLINIC_INFO.professionalTitle})
                </div>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed pr-4 text-xs">
              Audiology services, Pure Tone Audiometry hearing assessments, live digital hearing aid trials, and speech-language therapy by Rajvi Vibhakar.
            </p>

            <div className="text-[11px] text-slate-400 space-y-0.5">
              <div>Bachelors in Audiology &amp; Speech-Language Pathology (BASLP) · AYJNISHD, Mumbai</div>
              <div>State Merit Rank 1 under MUHS in Motor Speech Disorders (2020)</div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={googleLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('google_maps_click', { source: 'footer_rating' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 transition-colors text-[11px] font-semibold"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>5.0 Star Google Rating (1 Review)</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href={googleLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('review_link_click', { source: 'footer_review_cta' })}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors text-[11px]"
              >
                <span>View Google Reviews</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Col 2: Speech Services with crawlable Links */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Speech-Language Therapy
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {SPEECH_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    onNavigate={handleLink}
                    className="hover:text-white transition-colors text-left"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Audiology Services with crawlable Links */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Audiology &amp; Hearing
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {HEARING_SERVICES.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={`/${h.slug}`}
                    onNavigate={handleLink}
                    className="hover:text-white transition-colors text-left"
                  >
                    {h.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/insights"
                  onNavigate={handleLink}
                  className="hover:text-teal-300 text-teal-400 font-medium transition-colors text-left pt-1 block"
                >
                  Health Insights &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Clinic Location & Contact */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Rajvi Vibhakar’s Speech &amp; Hearing Clinic
            </div>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.location.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.contact.phone}`}
                  onClick={() => trackEvent('phone_click', { source: 'footer' })}
                  className="hover:text-white font-mono"
                >
                  {CLINIC_INFO.contact.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${CLINIC_INFO.contact.email}`} className="hover:text-white">
                  {CLINIC_INFO.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div>Mon–Sat: 9:00 AM – 8:00 PM</div>
                  <div className="text-slate-500 text-[11px]">Sunday: By Appointment</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  trackEvent('appointment_open', { source: 'footer' });
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-3 bg-teal-800 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mandatory Educational Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Educational information only:</strong> {CLINIC_INFO.disclaimer}
        </div>

        {/* Bottom Sub-bar with crawlable Links */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {CLINIC_INFO.businessName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/about" onNavigate={handleLink} className="hover:text-slate-300">
              About
            </Link>
            <span>·</span>
            <Link href="/contact" onNavigate={handleLink} className="hover:text-slate-300">
              Contact
            </Link>
            <span>·</span>
            <Link href="/privacy-policy" onNavigate={handleLink} className="hover:text-slate-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
