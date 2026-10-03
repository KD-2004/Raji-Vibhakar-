import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HEALTH_INSIGHTS, CLINIC_INFO } from '../data/clinicData';
import { Link } from './Link';

interface HealthInsightsSectionProps {
  onOpenBookingForTopic: (topic: string) => void;
  onNavigate?: (path: string) => void;
}

export const HealthInsightsSection: React.FC<HealthInsightsSectionProps> = ({
  onNavigate,
}) => {
  return (
    <section id="insights" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Evidence-Based Guidance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
              Speech &amp; Hearing Health Insights
            </h2>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              Educational guides to help families understand communication milestones, hearing health, stuttering, aphasia, and therapy-related questions.
            </p>
          </div>

          <Link
            href="/insights"
            onNavigate={onNavigate}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800 self-start md:self-auto"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Articles Grid with crawlable Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HEALTH_INSIGHTS.map((insight, idx) => (
            <motion.article
              key={insight.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {insight.category}
                  </span>
                  <span>{insight.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-teal-700 transition-colors leading-snug">
                  <Link
                    href={`/insights/${insight.slug}`}
                    onNavigate={onNavigate}
                    className="text-left hover:text-teal-700 block"
                  >
                    {insight.title}
                  </Link>
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {insight.excerpt}
                </p>

                {/* Key Points */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Key Clinical Points:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {insight.keyTakeaways.slice(0, 2).map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer with crawlable Link */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/insights/${insight.slug}`}
                    onNavigate={onNavigate}
                    className="text-teal-700 font-semibold hover:text-teal-800"
                  >
                    Read Guide →
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Educational Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 text-center">
          <strong>Educational information only:</strong> {CLINIC_INFO.disclaimer}
        </div>
      </div>
    </section>
  );
};
