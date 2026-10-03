import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Phone, Clock, MessageCircle, CheckCircle2, User, AlertCircle, Shield } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { trackEvent } from '../utils/analytics';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialNotes?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
  initialNotes = '',
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [ageGroup, setAgeGroup] = useState('Adult (18–59)');
  const [selectedService, setSelectedService] = useState(initialService || 'Pure Tone Audiometry (Hearing Test)');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (9:00 AM – 1:00 PM)');
  const [language, setLanguage] = useState('English');
  const [notes, setNotes] = useState(initialNotes || '');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDeliveredViaWhatsApp, setIsDeliveredViaWhatsApp] = useState(false);

  const googleLink = CLINIC_INFO.location.officialGbpUrl || CLINIC_INFO.location.googleMapsSearchUrl;

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
    if (initialNotes) {
      setNotes(initialNotes);
    }
  }, [initialService, initialNotes]);

  // Handle escape key & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      trackEvent('appointment_open', { source: 'modal' });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    if (!patientName.trim()) {
      setErrorMsg('Please enter the patient full name.');
      return false;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    trackEvent('appointment_submit', { method: 'whatsapp', service_name: selectedService });

    const text = `Hello ${CLINIC_INFO.businessName},
I would like to book an appointment at your Dahisar East clinic.

Patient Name: ${patientName}
Age Group: ${ageGroup}
Phone: ${phone}
Service: ${selectedService}
Preferred Date: ${preferredDate || 'Earliest available slot'}
Preferred Time: ${preferredTime}
Language: ${language}
${notes ? `Notes / Clinical Concern: ${notes}` : ''}

Clinic Location: Shop 1, Ramkunwar Thakur Marg, opp. Pragati Hospital, Dahisar East, Mumbai
Thank you!`;

    const waUrl = `${CLINIC_INFO.contact.whatsappLink}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setIsDeliveredViaWhatsApp(true);
    trackEvent('appointment_whatsapp_opened', { method: 'whatsapp', service_name: selectedService });
  };

  const handleResetAndClose = () => {
    setIsDeliveredViaWhatsApp(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleResetAndClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>

          {!isDeliveredViaWhatsApp ? (
            <form onSubmit={handleWhatsAppBooking} className="space-y-4 sm:space-y-5">
              {/* Header */}
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-700 uppercase tracking-wider mb-1">
                  <span>Dahisar East Clinic</span>
                  <span>·</span>
                  <span>Appointment Request</span>
                </div>
                <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  Schedule Your Consultation
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  At <strong>{CLINIC_INFO.businessName}</strong> · {CLINIC_INFO.professionalName} ({CLINIC_INFO.professionalTitle})
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Patient Name & Age Group */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-7 space-y-1.5">
                  <label htmlFor="modal-patient-name" className="block text-xs font-semibold text-slate-800">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      id="modal-patient-name"
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter patient name"
                      className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-5 space-y-1.5">
                  <label htmlFor="modal-patient-age" className="block text-xs font-semibold text-slate-800">
                    Age Group
                  </label>
                  <select
                    id="modal-patient-age"
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full px-3 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all min-h-[44px]"
                  >
                    <option value="Toddler / Child (2–6)">Toddler (2–6 yrs)</option>
                    <option value="Child (7–12)">Child (7–12 yrs)</option>
                    <option value="Teenager (13–17)">Teenager (13–17 yrs)</option>
                    <option value="Adult (18–59)">Adult (18–59 yrs)</option>
                    <option value="Senior (60+)">Senior (60+ yrs)</option>
                  </select>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label htmlFor="modal-patient-phone" className="block text-xs font-semibold text-slate-800">
                  Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    id="modal-patient-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all min-h-[44px]"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-1.5">
                <label htmlFor="modal-patient-service" className="block text-xs font-semibold text-slate-800">
                  Required Service
                </label>
                <select
                  id="modal-patient-service"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all min-h-[44px]"
                >
                  <optgroup label="Audiology & Hearing Solutions">
                    <option value="Pure Tone Audiometry (Hearing Test)">Pure Tone Audiometry (Hearing Test)</option>
                    <option value="Middle Ear Test (Impedance & Tympanometry)">Middle Ear Test (Impedance & Tympanometry)</option>
                    <option value="Live Hearing Aid Trial">Live Hearing Aid Trial</option>
                    <option value="Digital Hearing Aids Consultation (ITC, RIC, CIC, BTE)">Digital Hearing Aids Consultation</option>
                    <option value="Analog Hearing Aids Servicing">Analog Hearing Aids Servicing</option>
                  </optgroup>
                  <optgroup label="Speech Therapy & Fluency Care">
                    <option value="Speech and Language Therapy Evaluation">Speech and Language Therapy Evaluation</option>
                    <option value="Misarticulation & Sound Pronunciation">Misarticulation & Sound Pronunciation</option>
                    <option value="Stuttering & Fluency Therapy">Stuttering & Fluency Therapy</option>
                    <option value="Aphasia Post-Stroke Rehabilitation">Aphasia Post-Stroke Rehabilitation</option>
                    <option value="Dysarthria & Motor Speech Therapy">Dysarthria & Motor Speech Therapy</option>
                    <option value="Voice Therapy for Hoarseness">Voice Therapy for Hoarseness</option>
                    <option value="Swallowing Therapy & Dysphagia Care">Swallowing Therapy & Dysphagia Care</option>
                  </optgroup>
                </select>
              </div>

              {/* Date & Time Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor="modal-patient-date" className="block text-xs font-semibold text-slate-800">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      id="modal-patient-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-patient-time" className="block text-xs font-semibold text-slate-800">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <select
                      id="modal-patient-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all min-h-[44px]"
                    >
                      <option value="Morning (9:00 AM – 1:00 PM)">Morning (9:00 AM – 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                      <option value="Evening (4:00 PM – 8:00 PM)">Evening (4:00 PM – 8:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Consultation Language */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800">
                  Preferred Consultation Language
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {['English', 'Gujarati (ગુજરાતી)', 'Hindi (हिंदी)', 'Marathi (मराठी)'].map((lang) => (
                    <button
                      type="button"
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`py-2 px-2.5 rounded-lg border text-center transition-all cursor-pointer min-h-[38px] ${
                        language === lang
                          ? 'bg-teal-50 border-teal-600 font-semibold text-teal-900'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {lang.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clinical Notes / Symptoms */}
              <div className="space-y-1.5">
                <label htmlFor="modal-patient-notes" className="block text-xs font-semibold text-slate-800">
                  Brief Problem / Symptoms (Optional)
                </label>
                <textarea
                  id="modal-patient-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your hearing or speech concern..."
                  className="w-full p-3 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all resize-none min-h-[56px]"
                />
              </div>

              {/* Privacy Notice */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Privacy Notice:</strong> Details provided are used solely to coordinate your clinic consultation. We respect your confidentiality.
                </span>
              </div>

              {/* Direct Actions: Actual Delivery via WhatsApp or Direct Call */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer min-h-[46px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Request via WhatsApp</span>
                </button>

                <a
                  href={`tel:${CLINIC_INFO.contact.phone}`}
                  onClick={() => trackEvent('phone_click', { source: 'modal' })}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer min-h-[46px]"
                >
                  <Phone className="w-4 h-4 text-teal-700" />
                  <span>Call 8898330707</span>
                </a>
              </div>

              <div className="text-[11px] text-center text-slate-500 pt-1">
                Shop 1, Ramkunwar Thakur Marg, opp. Pragati Hospital, Dahisar East, Mumbai
              </div>
            </form>
          ) : (
            /* Genuine Confirmation Notice: Informs user that WhatsApp was opened */
            <div className="py-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  WhatsApp Opened
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Please Tap "Send" in WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                  Your appointment request for <strong>{patientName}</strong> has been loaded into WhatsApp. Please send the message to deliver your inquiry to our clinic.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-900">{selectedService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Preferred Slot:</span>
                  <span className="font-semibold text-slate-900">{preferredDate || 'Earliest available'} ({preferredTime.split(' ')[0]})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Clinic Location:</span>
                  <span className="font-semibold text-teal-800">Dahisar East, Opp. Pragati Hospital</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <a
                  href={`tel:${CLINIC_INFO.contact.phone}`}
                  onClick={() => trackEvent('phone_click', { source: 'modal_success_fallback' })}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us: +91 8898330707</span>
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="py-3 px-5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer min-h-[44px]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
