import React, { useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, MessageCircle, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { updatePageMeta } from '../utils/router';
import { Link } from '../components/Link';
import { trackEvent } from '../utils/analytics';

interface ContactPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenBooking }) => {
  const loc = CLINIC_INFO.location;
  const googleLink = loc.officialGbpUrl || loc.googleMapsSearchUrl;

  useEffect(() => {
    updatePageMeta(
      `Contact Rajvi Vibhakar’s Speech & Hearing Clinic | Mumbai`,
      `Visit Rajvi Vibhakar’s Speech & Hearing Clinic at Shop No. 1, Rajaram Mahtre Welfare Association, R.T. Road, Dahisar East, opposite Pragati Hospital, Mumbai 400068. Call 8898330707.`,
      `/contact`
    );
  }, []);

  return (
    <div className="bg-slate-50 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumb with real links */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-600 flex items-center gap-1.5">
          <Link href="/" onNavigate={onNavigate} className="hover:text-teal-700 underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Contact &amp; Location</span>
        </nav>

        <header className="space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
            Rajvi Vibhakar’s Speech &amp; Hearing Clinic
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clinic Contact &amp; Location Information
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Located in Rajaram Mahtre Welfare Association on R.T. Road, directly opposite Pragati Hospital. We welcome inquiries and appointment bookings.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Contact Details */}
          <div className="md:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              <h2 className="text-lg font-bold text-slate-900">
                Clinic Details
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Address:</strong>
                    <div className="text-slate-600 leading-relaxed mt-0.5">
                      {loc.fullAddress}
                    </div>
                    <div className="text-xs text-teal-800 font-medium mt-1">
                      Landmark: Opp. Pragati Hospital
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Telephone:</strong>
                    <a
                      href={`tel:${CLINIC_INFO.contact.phone}`}
                      onClick={() => trackEvent('phone_click', { source: 'contact_page' })}
                      className="text-teal-700 hover:underline font-mono text-sm sm:text-base font-semibold"
                    >
                      {CLINIC_INFO.contact.displayPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Email:</strong>
                    <a
                      href={`mailto:${CLINIC_INFO.contact.email}`}
                      className="text-teal-700 hover:underline"
                    >
                      {CLINIC_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Consultation Hours:</strong>
                    <div className="text-slate-600 mt-0.5">
                      Monday – Saturday: 9:00 AM – 8:00 PM
                    </div>
                    <div className="text-slate-600 text-xs mt-0.5">
                      Sunday: By Prior Appointment / Closed
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    trackEvent('appointment_open', { source: 'contact_page' });
                    onOpenBooking();
                  }}
                  className="flex-1 py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer min-h-[44px] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Consultation</span>
                </button>
                <a
                  href={CLINIC_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { source: 'contact_page' })}
                  className="py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps & Navigation */}
          <div className="md:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-slate-900">
                    Location &amp; Directions
                  </h2>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    5.0 ★ (1 Review)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Open directions on your navigation app to travel directly to Rajvi Vibhakar’s Speech &amp; Hearing Clinic on R.T. Road, opposite Pragati Hospital.
                </p>

                {/* Clear Location Box */}
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 p-6 text-center space-y-3">
                  <MapPin className="w-8 h-8 text-teal-700 mx-auto" />
                  <div className="text-xs font-semibold text-slate-800">
                    {CLINIC_INFO.businessName}
                  </div>
                  <div className="text-[11px] text-slate-600 max-w-xs mx-auto">
                    {loc.fullAddress}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={googleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('google_maps_click', { source: 'contact_page_map' })}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 border border-slate-200">
          <strong>Educational information only:</strong> {CLINIC_INFO.disclaimer}
        </div>
      </div>
    </div>
  );
};
