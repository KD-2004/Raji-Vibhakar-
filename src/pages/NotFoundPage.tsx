import React, { useEffect } from 'react';
import { Home, Phone, MessageCircle, Calendar, ArrowRight, Search, FileQuestion } from 'lucide-react';
import { CLINIC_INFO, ALL_SERVICES } from '../data/clinicData';
import { updatePageMeta } from '../utils/router';
import { Link } from '../components/Link';
import { trackEvent } from '../utils/analytics';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onOpenBooking }) => {
  useEffect(() => {
    updatePageMeta(
      `Page Not Found (404) | Rajvi Vibhakar Speech & Hearing`,
      `The page you requested could not be found. Explore audiology services, hearing assessments, and speech therapy in Dahisar East, Mumbai.`,
      `/404`
    );
  }, []);

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8">
        <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
            Error 404 · Page Not Found
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            We Couldn't Find the Page You're Looking For
          </h1>
          <p className="text-xs sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            The page may have moved, had its name changed, or is temporarily unavailable. You can return to our homepage or explore our verified services below.
          </p>
        </div>

        {/* Quick Nav Options */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            onNavigate={onNavigate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <button
            onClick={() => {
              trackEvent('appointment_open', { source: '404_page' });
              onOpenBooking();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-teal-700" />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Popular Services Directory */}
        <div className="pt-8 border-t border-slate-200 text-left space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-center">
            Explore Clinical Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            {ALL_SERVICES.slice(0, 6).map((service) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                onNavigate={onNavigate}
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all flex items-center justify-between text-xs text-slate-800 font-semibold group"
              >
                <span className="group-hover:text-teal-700 transition-colors">{service.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="pt-4 text-xs text-slate-600 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-teal-700" />
            <span>Call: </span>
            <a href={`tel:${CLINIC_INFO.contact.phone}`} className="font-semibold text-slate-900 hover:underline">
              {CLINIC_INFO.contact.displayPhone}
            </a>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <a
              href={CLINIC_INFO.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 hover:underline"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
