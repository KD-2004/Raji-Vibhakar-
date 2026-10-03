import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, ArrowRight, RotateCcw, MessageCircle, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { trackEvent } from '../utils/analytics';

interface AssessmentProps {
  onBookWithContext: (serviceName: string, notes: string) => void;
}

export const AssessmentInteractive: React.FC<AssessmentProps> = ({ onBookWithContext }) => {
  const [step, setStep] = useState(1);
  const [concern, setConcern] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [symptom, setSymptom] = useState<string>('');

  const handleReset = () => {
    setStep(1);
    setConcern('');
    setAgeGroup('');
    setSymptom('');
  };

  // Generate personalized clinical recommendation based on patient selections
  const getRecommendation = () => {
    if (concern === 'hearing') {
      return {
        title: "Pure Tone Audiometry (PTA) & Middle Ear Impedance Assessment",
        urgency: "Recommended Diagnostic Evaluation",
        serviceName: "Pure Tone Audiometry (PTA Hearing Assessment)",
        description: "A comprehensive air & bone conduction audiogram will objectively determine your hearing sensitivity across speech frequencies, followed by an impedance test to check middle ear pressure. If hearing aid assistance is indicated, a live digital trial will be conducted.",
        clinicalNote: "Rajvi Vibhakar Parikh evaluates whether the hearing difficulty is sensorineural, conductive, or mixed, and recommends tailored digital hearing solutions.",
      };
    } else if (concern === 'stuttering') {
      return {
        title: "Clinical Fluency Assessment & Stuttering Therapy",
        urgency: "Personalized Fluency Program",
        serviceName: "Stuttering & Fluency Therapy",
        description: "A clinical speech fluency evaluation assessing sound repetitions, prolongations, tension blocks, and speaking ease. Structured breathing and articulatory timing techniques are taught.",
        clinicalNote: "Structured clinical therapy supports communication ease and builds functional confidence in social and academic settings.",
      };
    } else if (concern === 'neuro') {
      return {
        title: "Aphasia & Dysarthria Rehabilitation Assessment",
        urgency: "State Rank 1 Specialized Evaluation",
        serviceName: "Dysarthria & Motor Speech Disorders",
        description: "Clinical evaluation of neurological speech clarity, word retrieval, and communication safety. Rajvi Vibhakar Parikh secured Maharashtra State Rank 1 in Motor Speech Disorders.",
        clinicalNote: "Focus is placed on functional communication recovery coordinated with family members.",
      };
    } else {
      return {
        title: "Pediatric Speech Sound & Language Developmental Evaluation",
        urgency: "Early Developmental Check",
        serviceName: "Misarticulation & Speech Sound Therapy",
        description: "An engaging, child-friendly articulation and language assessment reviewing speech sound inventory and expressive communication in English, Gujarati, Hindi, or Marathi.",
        clinicalNote: "Addressing speech sounds early supports communication confidence before and during formal school years.",
      };
    }
  };

  const rec = getRecommendation();
  const summaryNotes = `Self-Screening: Concern: ${concern || 'Not specified'} | Age: ${ageGroup || 'General'} | Primary symptom: ${symptom || 'Not specified'}`;

  const progressPercent = step <= 3 ? (step / 3) * 100 : 100;

  return (
    <section id="screening" className="py-16 md:py-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Patient Guidance Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Not Sure Which Assessment You Need?
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
            Answer 3 brief questions to receive clinical guidance on the most appropriate speech or audiological evaluation with Rajvi Vibhakar Parikh.
          </p>
        </motion.div>

        {/* Questionnaire Box */}
        <div className="bg-slate-50/90 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          {/* Subtle top progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-200">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
              initial={{ width: '33%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <AnimatePresence mode="wait">
            {step < 4 ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 pt-2"
              >
                {/* Progress Indicator */}
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200/80">
                  <span className="font-semibold text-teal-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    Question {step} of 3
                  </span>
                  <span className="font-medium text-slate-600">
                    {step === 1 ? 'Primary Concern' : step === 2 ? 'Patient Age Group' : 'Specific Difficulty'}
                  </span>
                </div>

                {/* Step 1: Primary Concern */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      What is the primary concern you or your family member is experiencing?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'hearing', label: 'Hearing Difficulty or Muffled Ear Sensation', sub: 'Asking repeats, turning TV volume high, ear fullness' },
                        { id: 'speech', label: 'Unclear Speech & Sound Pronunciation', sub: 'Lisping, misarticulation, unclear speech in a child' },
                        { id: 'stuttering', label: 'Stuttering / Stammering or Speech Hesitation', sub: 'Repetitions, prolongations, struggle when starting words' },
                        { id: 'neuro', label: 'Post-Stroke Language or Slurred Speech', sub: 'Aphasia, dysarthria, voice strain, swallowing issues' },
                      ].map((opt) => (
                        <motion.button
                          key={opt.id}
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            setConcern(opt.id);
                            setStep(2);
                            trackEvent('service_page_view', { label: `screen_concern_${opt.id}` });
                          }}
                          className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                            concern === opt.id
                              ? 'bg-teal-50 border-teal-500 shadow-sm'
                              : 'bg-white border-slate-200 hover:border-teal-400 hover:shadow-xs'
                          }`}
                        >
                          <div className="font-bold text-xs sm:text-sm text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">{opt.sub}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Age Group */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      Who is the consultation for?
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'pediatric', label: 'Toddler / Child', sub: 'Ages 2 to 6' },
                        { id: 'school', label: 'School Student', sub: 'Ages 7 to 17' },
                        { id: 'adult', label: 'Adult / Professional', sub: 'Ages 18 to 59' },
                        { id: 'senior', label: 'Senior / Elderly', sub: 'Ages 60+' },
                      ].map((opt) => (
                        <motion.button
                          key={opt.id}
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            setAgeGroup(opt.label);
                            setStep(3);
                          }}
                          className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                            ageGroup === opt.label
                              ? 'bg-teal-50 border-teal-500 shadow-sm'
                              : 'bg-white border-slate-200 hover:border-teal-400 hover:shadow-xs'
                          }`}
                        >
                          <div className="font-bold text-xs sm:text-sm text-slate-900">{opt.label}</div>
                          <div className="text-[11px] text-slate-500 mt-1">{opt.sub}</div>
                        </motion.button>
                      ))}
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                      >
                        ← Back to Previous Question
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Specific Symptom */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      Which of these best matches your experience?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Affects daily conversations and creates embarrassment or frustration',
                        'Noticeable mainly in noisy places, school, or phone calls',
                        'Has been present for more than 6 months without improvement',
                        'Recently noticed or worsening following illness, cold, or strain',
                      ].map((text, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            setSymptom(text);
                            setStep(4);
                          }}
                          className="text-left p-4 rounded-xl border bg-white border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 hover:shadow-xs transition-all text-xs sm:text-sm font-medium text-slate-800 cursor-pointer"
                        >
                          {text}
                        </motion.button>
                      ))}
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => setStep(2)}
                        className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                      >
                        ← Back to Previous Question
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Step 4: Result Card with Smooth Reveal */
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5 pt-2"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Recommended Clinical Protocol</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restart Check</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-teal-200 shadow-sm space-y-3">
                  <div className="inline-block px-2.5 py-1 rounded-md bg-teal-100 text-teal-900 text-[11px] font-bold">
                    {rec.urgency}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {rec.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {rec.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200 text-xs text-teal-950 leading-relaxed">
                  <strong className="text-teal-900 block mb-0.5">Clinical Practitioner Perspective:</strong>
                  {rec.clinicalNote}
                </div>

                {/* Direct Booking with prefilled context */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      trackEvent('appointment_open', { source: 'screening_tool' });
                      onBookWithContext(rec.serviceName, summaryNotes);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.99] rounded-xl transition-all shadow-sm cursor-pointer min-h-[44px]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment for This Service</span>
                  </button>

                  <a
                    href={`${CLINIC_INFO.contact.whatsappLink}?text=${encodeURIComponent(`Hello Rajvi Vibhakar Speech & Hearing Clinic, I completed the screening check on your website. My concern is: ${concern}, for ${ageGroup}. I would like to schedule a consultation at your Dahisar East clinic.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { source: 'screening_whatsapp' })}
                    className="inline-flex items-center justify-center gap-2 py-3 px-5 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-100/90 hover:bg-emerald-200/90 border border-emerald-300 rounded-xl transition-colors cursor-pointer min-h-[44px]"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    <span>Send Screening to WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
