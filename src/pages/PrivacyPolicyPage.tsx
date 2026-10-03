import React, { useEffect } from 'react';
import { Shield, Lock, Eye, Mail, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { updatePageMeta } from '../utils/router';
import { Link } from '../components/Link';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageMeta(
      `Privacy Policy | Rajvi Vibhakar’s Speech & Hearing Clinic`,
      `Privacy Policy for Rajvi Vibhakar’s Speech & Hearing Clinic in Mumbai. Information about appointment enquiries, WhatsApp messaging, and website analytics.`,
      `/privacy-policy`
    );
  }, []);

  return (
    <div className="bg-slate-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-600 flex items-center gap-1.5">
          <Link href="/" onNavigate={onNavigate} className="hover:text-teal-700 underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Privacy Policy</span>
        </nav>

        <header className="space-y-2">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
            Practice Information Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Last Updated: October 2026 · {CLINIC_INFO.businessName}
          </p>
        </header>

        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-teal-700" />
              <span>1. Overview and Core Principles</span>
            </h2>
            <p>
              This Privacy Policy explains how <strong>{CLINIC_INFO.businessName}</strong>, led by <strong>{CLINIC_INFO.professionalName}</strong> ({CLINIC_INFO.professionalTitle}), handles contact details and technical telemetry collected through this website.
            </p>
            <p>
              We aim to handle contact and appointment enquiry information responsibly and only use it for the purposes described in this policy. We do not sell or rent your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-teal-700" />
              <span>2. WhatsApp Messaging & Third-Party Platforms</span>
            </h2>
            <div className="space-y-2.5">
              <p>
                To provide convenient appointment scheduling without unnecessary intermediary accounts, our website allows you to send appointment inquiries directly to our clinic via WhatsApp.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
                <div>
                  <strong>Important Notice on WhatsApp Use:</strong> When you click to initiate or send a message via WhatsApp, communication is processed through WhatsApp (Meta Platforms, Inc.). Messages sent through WhatsApp are subject to WhatsApp's own Terms of Service and Privacy Policy. Information handled by WhatsApp is governed by WhatsApp's systems and policies.
                </div>
                <div className="text-slate-600 mt-1">
                  The clinic itself does not disclose or share your appointment information with any unauthorized commercial parties.
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-700" />
              <span>3. Information Collected via Booking Forms</span>
            </h2>
            <p>
              When requesting a consultation slot through our forms, you may voluntarily provide:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Patient name and age group</li>
              <li>Contact telephone number</li>
              <li>Requested service and preferred appointment day/time</li>
              <li>Voluntary brief clinical notes regarding speech or hearing concerns</li>
            </ul>
            <p className="mt-2">
              This information is used exclusively to coordinate your clinic visit, confirm scheduling, and provide directions to Rajvi Vibhakar’s Speech & Hearing Clinic.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-700" />
              <span>4. Web Analytics & Zero-PII Policy</span>
            </h2>
            <p>
              To ensure our website remains fast, accessible, and error-free, we collect aggregated, non-personally identifiable technical telemetry (such as page views and anonymized button clicks).
            </p>
            <p>
              <strong>Analytics privacy:</strong> Our analytics code is limited to non-sensitive event information and does not send patient names, phone numbers, clinical descriptions, medical symptoms, or other appointment details to analytics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              5. Data Retention & Access Rights
            </h2>
            <p>
              Appointment enquiry information may be retained by the clinic as needed to respond to enquiries, manage appointments, and meet applicable record-keeping obligations. Requests about your personal information can be sent to the clinic using the contact details below.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-700" />
              <span>6. Contact Information</span>
            </h2>
            <p>
              For privacy-related questions or record requests, please contact:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 font-mono text-xs">
              <div><strong>Practice:</strong> {CLINIC_INFO.businessName}</div>
              <div><strong>Practitioner:</strong> {CLINIC_INFO.professionalName} ({CLINIC_INFO.professionalTitle})</div>
              <div><strong>Address:</strong> {CLINIC_INFO.location.fullAddress}</div>
              <div><strong>Email:</strong> {CLINIC_INFO.contact.email}</div>
              <div><strong>Phone:</strong> {CLINIC_INFO.contact.displayPhone}</div>
            </div>
          </section>
        </div>

        {/* Educational Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 border border-slate-200">
          <strong>Educational information only:</strong> {CLINIC_INFO.disclaimer}
        </div>
      </div>
    </div>
  );
};
