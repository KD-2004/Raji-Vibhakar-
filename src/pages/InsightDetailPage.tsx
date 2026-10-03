import React, { useEffect } from 'react';
import { Calendar, MessageCircle, ArrowRight, UserCheck, CheckCircle2, BookOpen } from 'lucide-react';
import { HealthInsight, CLINIC_INFO, ALL_SERVICES } from '../data/clinicData';
import { updatePageMeta } from '../utils/router';
import { Link } from '../components/Link';
import { trackEvent } from '../utils/analytics';

interface InsightDetailPageProps {
  insight: HealthInsight;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const InsightDetailPage: React.FC<InsightDetailPageProps> = ({
  insight,
  onNavigate,
  onOpenBooking,
}) => {
  useEffect(() => {
    updatePageMeta(
      `${insight.title} | Rajvi Vibhakar Speech & Hearing`,
      insight.excerpt,
      `/insights/${insight.slug}`
    );
    trackEvent('article_view', { article_id: insight.slug });
  }, [insight]);

  const relatedService = ALL_SERVICES.find(s => s.slug === insight.relatedServiceSlug);

  return (
    <article className="bg-slate-50 py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb Navigation with crawlable Links */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
          <Link href="/" onNavigate={onNavigate} className="hover:text-teal-700 underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/insights" onNavigate={onNavigate} className="hover:text-teal-700 underline">
            Health Insights
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-xs">{insight.title}</span>
        </nav>

        {/* Article Header */}
        <header className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              {insight.category}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{insight.readTime}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">Published {insight.publishedDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {insight.title}
          </h1>

          {/* Article information */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-700">
            <div className="flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-900">Educational health article</div>
                <div className="text-slate-600 mt-0.5">Published: {insight.publishedDate}</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  General information only. This article does not replace an individual clinical evaluation.
                </div>
              </div>
            </div>

          {/* Clinical Evidence Sources */}
            <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600">
              <span className="font-semibold text-slate-800 block mb-1">Clinical Sources &amp; Literature:</span>
              <ul className="list-disc pl-4 space-y-0.5">
                {insight.clinicalSources.map((source, idx) => (
                  <li key={idx}>
                    {source.url ? (
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">
                        {source.title}
                      </a>
                    ) : (
                      <span>{source.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        {/* Key Takeaways Box */}
        <section className="bg-teal-50/70 rounded-2xl p-6 border border-teal-200 space-y-3">
          <h2 className="text-sm font-bold text-teal-950 uppercase tracking-wider">
            Clinical Key Takeaways
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-teal-900">
            {insight.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Main Body Content */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          {insight.fullContent.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Related Service Bridge with crawlable Link */}
        {relatedService && (
          <section className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                Related Clinical Service
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {relatedService.customerTitle}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Evaluations conducted in person at our Dahisar East clinic.
              </p>
            </div>
            <Link
              href={`/${relatedService.slug}`}
              onNavigate={onNavigate}
              className="inline-flex items-center gap-2 py-2.5 px-4 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 min-h-[42px]"
            >
              <span>Explore Service</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        )}

        {/* Appointment CTA Block */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold">
            Need an Individual Clinical Evaluation?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Schedule an appointment with Rajvi Vibhakar Parikh at our Dahisar East clinic (opposite Pragati Hospital) for a comprehensive hearing test or speech-language evaluation.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                trackEvent('appointment_open', { source: `article_${insight.slug}` });
                onOpenBooking();
              }}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer min-h-[44px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <a
              href={CLINIC_INFO.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { source: `article_${insight.slug}` })}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Educational Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 border border-slate-200">
          <strong>Educational information only:</strong> {CLINIC_INFO.disclaimer}
        </div>
      </div>
    </article>
  );
};
