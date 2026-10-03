import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { trackEvent } from '../utils/analytics';

interface MobileStickyContactProps {
  onOpenBooking: () => void;
}

export const MobileStickyContact: React.FC<MobileStickyContactProps> = ({ onOpenBooking }) => {
  return (
    <aside
      aria-label="Quick mobile clinic contact"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-3 py-2 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* WhatsApp Direct Action */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href={CLINIC_INFO.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { source: 'mobile_sticky' })}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 bg-emerald-50 active:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold shadow-xs transition-colors min-h-[44px]"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>WhatsApp</span>
        </motion.a>

        {/* Direct Phone Call */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href={`tel:${CLINIC_INFO.contact.phone}`}
          onClick={() => trackEvent('phone_click', { source: 'mobile_sticky' })}
          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-100 active:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors min-h-[44px]"
          title="Call Clinic"
        >
          <Phone className="w-3.5 h-3.5 text-teal-700 shrink-0" />
          <span>Call</span>
        </motion.a>

        {/* Book Consultation Modal */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            trackEvent('appointment_open', { source: 'mobile_sticky' });
            onOpenBooking();
          }}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-2 bg-teal-700 active:bg-teal-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer min-h-[44px]"
        >
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Book Visit</span>
        </motion.button>
      </div>
    </aside>
  );
};
