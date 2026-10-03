import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Clock, MessageCircle, User, AlertCircle, ExternalLink, CheckCircle2, Shield } from 'lucide-react';
import { CLINIC_INFO, ALL_SERVICES } from '../data/clinicData';
import { updatePageMeta } from '../utils/router';
import { trackEvent } from '../utils/analytics';
import { Link } from '../components/Link';

interface BookAppointmentPageProps {
  onNavigate: (path: string) => void;
}

export const BookAppointmentPage: React.FC<BookAppointmentPageProps> = ({ onNavigate }) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [ageGroup, setAgeGroup] = useState('Adult (18–59)');
  const [selectedService, setSelectedService] = useState('Pure Tone Audiometry (Hearing Test)');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (9:00 AM – 1:00 PM)');
  const [language, setLanguage] = useState('English');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [whatsappSentNotice, setWhatsappSentNotice] = useState(false);

  useEffect(() => {
    updatePageMeta(
      `Book Consultation | Hearing Test & Speech Therapy in Dahisar East`,
      `Reserve your hearing test, digital hearing aid trial, or speech-language therapy consultation at our Dahisar East clinic. Call or WhatsApp 8898330707.`,
      `/book-appointment`
    );
    trackEvent('appointment_open', { source: 'book_page' });
  }, []);

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

    trackEvent('appointment_submit', { method: 'whatsapp', service: selectedService });

    const message = `Hello Rajvi Vibhakar Speech & Hearing Clinic,
I would like to book a consultation at your Dahisar East clinic.

Patient Name: ${patientName}
Age Group: ${ageGroup}
Contact Phone: ${phone}
Service Requested: ${selectedService}
Preferred Date: ${preferredDate || 'Next available slot'}
Preferred Time: ${preferredTime}
Consultation Language: ${language}
${notes ? `Notes / Clinical Concern: ${notes}` : ''}

Clinic Address: Shop No. 1, Rajaram Mahtre Welfare Association, R.T. Road, Dahisar East, Opp. Pragati Hospital, Mumbai 400068
Thank you!`;

    const waUrl = `${CLINIC_INFO.contact.whatsappLink}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setWhatsappSentNotice(true);
    trackEvent('appointment_whatsapp_opened', { method: 'whatsapp', service: selectedService });
  };

  return (
    <div className="bg-slate-50 py-10 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-600 flex items-center gap-1.5">
          <Link href="/" onNavigate={onNavigate} className="hover:text-teal-700 underline cursor-pointer">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Book Appointment</span>
        </nav>

        <header className="space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
            Dahisar East, Mumbai
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Schedule a Clinic Consultation
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Appointments are scheduled directly with <strong>{CLINIC_INFO.businessName}</strong>. Select your preferred consultation options below.
          </p>
        </header>

        {whatsappSentNotice ? (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-5">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-slate-900">
                WhatsApp Opened
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your prefilled consultation details were loaded into WhatsApp. <strong>Please tap "Send" in WhatsApp</strong> to deliver your message directly to our clinic staff.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <div><strong>Patient:</strong> {patientName}</div>
              <div><strong>Service:</strong> {selectedService}</div>
              <div><strong>Preferred Slot:</strong> {preferredDate || 'Earliest available'} ({preferredTime.split(' ')[0]})</div>
              <div><strong>Location:</strong> Shop No. 1, Rajaram Mahtre Welfare Association, R.T. Road, Dahisar East, Opp. Pragati Hospital, Mumbai 400068</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`tel:${CLINIC_INFO.contact.phone}`}
                onClick={() => trackEvent('phone_click', { source: 'booking_confirmation' })}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly: {CLINIC_INFO.contact.displayPhone}</span>
              </a>
              <button
                type="button"
                onClick={() => setWhatsappSentNotice(false)}
                className="py-3 px-5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 rounded-xl transition-colors cursor-pointer min-h-[44px]"
              >
                Edit Details
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppBooking} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Patient Name */}
            <div className="space-y-1.5">
              <label htmlFor="patient-full-name" className="block text-xs font-semibold text-slate-800">
                Patient Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  id="patient-full-name"
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all min-h-[44px]"
                />
              </div>
            </div>

            {/* Age Group & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="patient-age-group" className="block text-xs font-semibold text-slate-800">
                  Age Group
                </label>
                <select
                  id="patient-age-group"
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

              <div className="space-y-1.5">
                <label htmlFor="patient-contact-phone" className="block text-xs font-semibold text-slate-800">
                  Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    id="patient-contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-1.5">
              <label htmlFor="patient-service" className="block text-xs font-semibold text-slate-800">
                Service Requested
              </label>
              <select
                id="patient-service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all min-h-[44px]"
              >
                <optgroup label="Hearing & Audiology">
                  <option value="Hearing Test in Dahisar East">Hearing Test in Dahisar East</option>
                  <option value="Pure Tone Audiometry (Hearing Test)">Pure Tone Audiometry (Hearing Test)</option>
                  <option value="Impedance Audiometry & Middle Ear Test">Impedance Audiometry & Middle Ear Test</option>
                  <option value="Live Hearing Aid Trial">Live Hearing Aid Trial</option>
                  <option value="Digital Hearing Aids Consultation (ITC, RIC, CIC, BTE)">Digital Hearing Aids Consultation</option>
                  <option value="Analog Hearing Aids Servicing">Analog Hearing Aids Servicing</option>
                </optgroup>
                <optgroup label="Speech & Language Therapy">
                  <option value="Comprehensive Speech and Language Therapy">Comprehensive Speech and Language Therapy</option>
                  <option value="Misarticulation & Sound Pronunciation">Misarticulation & Sound Pronunciation</option>
                  <option value="Stuttering & Fluency Therapy">Stuttering & Fluency Therapy</option>
                  <option value="Aphasia Post-Stroke Rehabilitation">Aphasia Post-Stroke Rehabilitation</option>
                  <option value="Dysarthria & Motor Speech Therapy">Dysarthria & Motor Speech Therapy</option>
                  <option value="Voice Therapy for Hoarseness">Voice Therapy for Hoarseness</option>
                  <option value="Swallowing Therapy & Dysphagia Care">Swallowing Therapy & Dysphagia Care</option>
                </optgroup>
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="patient-preferred-date" className="block text-xs font-semibold text-slate-800">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <input
                    id="patient-preferred-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all min-h-[44px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="patient-preferred-time" className="block text-xs font-semibold text-slate-800">
                  Preferred Time Slot
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <select
                    id="patient-preferred-time"
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

            {/* Language */}
            <div className="space-y-1.5">
              <label htmlFor="patient-language" className="block text-xs font-semibold text-slate-800">
                Consultation Language Preference
              </label>
              <select
                id="patient-language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2.5 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all min-h-[44px]"
              >
                <option value="English">English</option>
                <option value="Gujarati (ગુજરાતી)">Gujarati (ગુજરાતી)</option>
                <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
                <option value="Marathi (मराठी)">Marathi (मराठी)</option>
              </select>
            </div>

            {/* Clinical Concern Notes */}
            <div className="space-y-1.5">
              <label htmlFor="patient-notes" className="block text-xs font-semibold text-slate-800">
                Brief Appointment Note (Optional)
              </label>
              <textarea
                id="patient-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add a short appointment note if helpful. Please do not include detailed or sensitive medical information."
                className="w-full p-3 text-base sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-600 focus:bg-white text-slate-900 transition-all resize-none min-h-[60px]"
              />
            </div>

            {/* Privacy Acknowledgement */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
              <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span>
                <strong>Privacy Notice:</strong> We respect your privacy. Details you provide are used to coordinate your clinic enquiry. If you choose WhatsApp, the message and information you include are transmitted through WhatsApp and are subject to WhatsApp's own terms and privacy policy.
              </span>
            </div>

            {/* Submit Action: Delivers via WhatsApp */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer min-h-[46px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm & Send via WhatsApp</span>
              </button>
              <a
                href={`tel:${CLINIC_INFO.contact.phone}`}
                onClick={() => trackEvent('phone_click', { source: 'book_page' })}
                className="inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[46px]"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span>Call Clinic</span>
              </a>
            </div>

            <div className="text-[11px] text-center text-slate-600 pt-1">
              Shop No. 1, Rajaram Mahtre Welfare Association, R.T. Road, Dahisar East, Opp. Pragati Hospital, Mumbai 400068
            </div>
          </form>
        )}

        {/* Educational Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 border border-slate-200">
          <strong>Educational information only:</strong> {CLINIC_INFO.disclaimer}
        </div>
      </div>
    </div>
  );
};
