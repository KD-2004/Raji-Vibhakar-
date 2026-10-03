import React, { useEffect } from 'react';
import { Calendar, Phone, MessageCircle, MapPin, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { ServiceDetail, CLINIC_INFO, ALL_SERVICES } from '../data/clinicData';
import { updatePageMeta } from '../utils/router';
import { Link } from '../components/Link';
import { trackEvent } from '../utils/analytics';

interface ServiceDetailPageProps {
  service: ServiceDetail;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onNavigate,
  onOpenBooking,
}) => {
  useEffect(() => {
    const pageTitle = `${service.customerTitle} | Rajvi Vibhakar`;
    const metaDescription = `${service.description} Rajvi Vibhakar Parikh (BASLP, AYJNISHD) provides this service at the Dahisar East clinic in Mumbai. Call 8898330707 for an appointment.`;
    updatePageMeta(pageTitle, metaDescription, `/${service.slug}`);
    trackEvent('service_page_view', { service_name: service.slug });
  }, [service]);

  // Find related services for internal linking
  const relatedServices = ALL_SERVICES.filter(s =>
    service.relatedServiceSlugs.includes(s.slug)
  );

  return (
    <div className="bg-slate-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumb Navigation with crawlable Links */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/" onNavigate={onNavigate} className="hover:text-teal-700 underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/#services" onNavigate={onNavigate} className="hover:text-teal-700 underline">
            Services
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{service.name}</span>
        </nav>

        {/* Main Header with H1 */}
        <header className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider">
            <span>{service.category === 'speech' ? 'Speech-Language Therapy' : 'Audiology & Hearing Care'}</span>
            <span>·</span>
            <span>Dahisar East, Mumbai</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {service.customerTitle}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {service.description}
          </p>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-slate-100">
            <button
              onClick={() => {
                trackEvent('appointment_open', { service_name: service.slug, source: 'service_page_cta' });
                onOpenBooking();
              }}
              className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer min-h-[44px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment for {service.name}</span>
            </button>
            <a
              href={CLINIC_INFO.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { service_name: service.slug, source: 'service_page' })}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Inquiry</span>
            </a>
            <a
              href={`tel:${CLINIC_INFO.contact.phone}`}
              onClick={() => trackEvent('phone_click', { service: service.slug, source: 'service_page' })}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-teal-700" />
              <span>Call 8898330707</span>
            </a>
          </div>
        </header>

        {/* Clinical Scope & What We Do */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Clinical Scope &amp; Assessment Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {service.procedure}
          </p>

          <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.clinicalScope.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Who Benefits from this Service */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            When to Consider an Evaluation
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {service.whoItHelps.map((target, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <ArrowRight className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>{target}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Service Specific FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-teal-700" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-4 pt-2">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h3 className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Clinical Practitioner Card */}
        <section className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 sm:p-8 border border-teal-200 space-y-3">
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
            Practitioner In Charge
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {CLINIC_INFO.professionalName} · {CLINIC_INFO.degrees}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {CLINIC_INFO.professionalTitle}. Achieved State Merit Rank 1 under MUHS in Motor Speech Disorders (2020). Consultations are conducted directly at our Dahisar East clinic.
          </p>
          <div className="pt-2 text-xs text-slate-600 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
            <span>{CLINIC_INFO.location.fullAddress}</span>
          </div>
        </section>

        {/* Related Services Internal Linking with crawlable Links */}
        {relatedServices.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Related Clinical Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  onNavigate={onNavigate}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-teal-500 hover:shadow-xs transition-all text-left flex items-start justify-between gap-3 group"
                >
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {rel.tagline}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 shrink-0 mt-0.5 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Educational Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 border border-slate-200">
          <strong>Educational information only:</strong> {CLINIC_INFO.disclaimer}
        </div>
      </div>
    </div>
  );
};
