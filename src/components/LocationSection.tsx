import React, { useState } from 'react';
import { motion } from '../utils/motion';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, ShieldCheck, Bus, Train, Copy, Check, Share2, Star, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { trackEvent } from '../utils/analytics';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const googleLink = CLINIC_INFO.location.officialGbpUrl || CLINIC_INFO.location.googleMapsSearchUrl;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CLINIC_INFO.location.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = async () => {
    trackEvent('directions_click', { source: 'location_share' });
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rajvi Vibhakar Speech & Hearing Clinic",
          text: `Visit Rajvi Vibhakar Speech & Hearing Clinic in Dahisar East, Mumbai: ${CLINIC_INFO.location.fullAddress}`,
          url: googleLink,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      } catch (err) {
        navigator.clipboard.writeText(googleLink);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      }
    } else {
      navigator.clipboard.writeText(googleLink);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  return (
    <section id="location" className="py-16 md:py-24 bg-slate-50/80 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase mb-2">
            <span>Clinic Location &amp; Directions</span>
            <span aria-hidden="true">·</span>
            <span>Dahisar East, Mumbai</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Visit Our Dahisar East Clinic
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Located in Rajaram Mahtre Welfare Association on R.T. Road, Dahisar East, opposite Pragati Hospital, Mumbai.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Clinic Contact Details & Working Hours */}
          <div className="lg:col-span-6 space-y-6">
            {/* Primary Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                      Clinic Address
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Open Mon–Sat
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {CLINIC_INFO.businessName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                    {CLINIC_INFO.location.shopAndStreet}
                  </p>
                  <p className="text-xs text-slate-600">
                    {CLINIC_INFO.location.landmark}, {CLINIC_INFO.location.area}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Direct Google Link, Copy Address, Share */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-2.5">
                <a
                  href={googleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('directions_click', { source: 'location_card_btn' })}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.99] rounded-xl shadow-xs transition-all min-h-[44px]"
                  title="Open official Google location link"
                >
                  <Navigation className="w-4 h-4 text-teal-300" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyAddress}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-3 sm:py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer min-h-[44px]"
                    title="Copy full clinic address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-3 sm:py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer min-h-[44px]"
                    title="Share clinic Google link"
                  >
                    {shared ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Link Ready!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-slate-600" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Operating Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>Clinic Timings</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Opens 9:00 AM
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {CLINIC_INFO.location.timings.map((slot, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
                    <span className="font-semibold text-slate-800">{slot.days}</span>
                    <span className="text-slate-600 font-mono font-medium">{slot.hours}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-teal-50/70 border border-teal-100 text-xs text-teal-900 leading-snug">
                Prior appointment booking is recommended so adequate time is reserved exclusively for your hearing test or speech therapy session.
              </div>
            </motion.div>

            {/* Direct Contact Channels Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3.5"
            >
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Direct Contact Channels
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href={`tel:${CLINIC_INFO.contact.phone}`}
                  onClick={() => trackEvent('phone_click', { source: 'location_channels' })}
                  className="p-3 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 transition-colors flex items-center gap-3"
                >
                  <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-600 font-medium">Direct Phone Call</div>
                    <div className="font-semibold text-slate-900 font-mono">{CLINIC_INFO.contact.displayPhone}</div>
                  </div>
                </a>

                <a
                  href={CLINIC_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { source: 'location_channels' })}
                  className="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition-colors flex items-center gap-3"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-600 font-medium">WhatsApp Chat</div>
                    <div className="font-semibold text-emerald-800">Chat Instantly</div>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Google Verified Showcase & Transit Info */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-7 space-y-5"
            >
              {/* Header with Google badge */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center font-bold text-sm">
                    <span className="text-blue-500 font-bold">G</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      Google Business Profile
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {CLINIC_INFO.location.googleCategory}
                    </div>
                  </div>
                </div>

                <a
                  href={googleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('google_maps_click', { source: 'location_profile_badge' })}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-bold hover:bg-amber-100 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>5.0 Star Rating (1 Review)</span>
                </a>
              </div>

              {/* Business Profile Card Body */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-teal-400" />
                    <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                      Verified Healthcare Entity
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Dahisar East, Mumbai
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">
                    Rajvi Vibhakar
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Speech &amp; hearing specialist located at Shop No. 1, Rajaram Mahtre Welfare Association, R.T. Road, Dahisar East, opposite Pragati Hospital.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    Location Directions:
                  </div>
                  <a
                    href={googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('google_maps_click', { source: 'location_profile_btn' })}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Transit Directions Guide */}
              <div className="space-y-3 text-xs text-slate-600">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  How to Reach Our Clinic
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Train className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">From Dahisar Railway Station: </strong>
                    Take the East exit towards R.T. Road, Dahisar East, opposite Pragati Hospital.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <Bus className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">From Western Express Highway: </strong>
                    Convenient turnoff in Dahisar East. Landmark: Opposite Pragati Hospital.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Clinic Standards for Patients */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Patient Comfort &amp; Clinical Setup
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>Dedicated Consultation Room</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>Acoustic Testing Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>Child-Friendly Speech Room</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>Digital Hearing Aid Trials</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>Accessible Patient Entry</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>Comfortable Waiting Space</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
