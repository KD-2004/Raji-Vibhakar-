import React, { useEffect } from 'react';
import { BookOpen, ArrowRight, UserCheck } from 'lucide-react';
import { HEALTH_INSIGHTS, CLINIC_INFO } from '../data/clinicData';
import { updatePageMeta } from '../utils/router';
import { Link } from '../components/Link';

interface InsightsIndexPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const InsightsIndexPage: React.FC<InsightsIndexPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageMeta(
      `Speech & Hearing Health Insights | Dahisar East Mumbai | Rajvi Vibhakar`,
      `Clinical articles on hearing loss symptoms, childhood speech milestones, stuttering techniques, and post-stroke aphasia recovery. Reviewed by Rajvi Vibhakar Parikh.`,
      `/insights`
    );
  }, []);

  return (
    <div className="bg-slate-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" onNavigate={onNavigate} className="hover:text-teal-700 underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Health Insights</span>
        </nav>

        <header className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Clinical Knowledge &amp; Patient Guidance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Speech &amp; Hearing Health Insights
          </h1>
          <p className="text-xs sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Educational resources for individuals and families navigating communication delays, stuttering, hearing loss, and neurological rehabilitation.
          </p>
        </header>

        {/* Article Grid with real crawlable Links */}
        <div className="space-y-5">
          {HEALTH_INSIGHTS.map((insight) => (
            <article
              key={insight.slug}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:border-teal-400 transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  {insight.category}
                </span>
                <span>{insight.readTime} · Reviewed {insight.lastReviewed}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                <Link
                  href={`/insights/${insight.slug}`}
                  onNavigate={onNavigate}
                  className="hover:text-teal-700 transition-colors text-left"
                >
                  {insight.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {insight.excerpt}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-teal-600" />
                  <span>{insight.reviewer}</span>
                </span>

                <Link
                  href={`/insights/${insight.slug}`}
                  onNavigate={onNavigate}
                  className="inline-flex items-center gap-1.5 text-teal-700 font-semibold hover:text-teal-800"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Educational Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 border border-slate-200">
          <strong>Educational information only:</strong> {CLINIC_INFO.disclaimer}
        </div>
      </div>
    </div>
  );
};
