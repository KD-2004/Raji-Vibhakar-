# Clinic Portal & Professional Website for Rajvi Vibhakar Parikh

A modern, high-trust healthcare portal for **Rajvi Vibhakar Parikh** (Audiologist and Speech-Language Pathologist), designed strictly with genuine clinical credentials, verified Dahisar East (Mumbai) clinic address, authentic services (speech therapy & audiology diagnostics/hearing aids), and direct WhatsApp & phone consultation booking.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions have been aligned based on your preferences:
> - **Layout Format**: Single-page clinic portal with smooth navigation, interactive appointment booking modal, and verified service deep-dives.
> - **Primary Call-to-Action**: Direct WhatsApp (`https://wa.me/918898330707`) and click-to-call (`tel:8898330707`) consultation booking.
> - **Color Palette & Visual Tone**: Medical teal (`#0D9488`), cyan (`#06B6D4`), and crisp clinical slate, matching the official clinic ear-and-cross emblem.
> - **Zero Fabricated Details Guarantee**: 100% of all data—MUHS State Merit Rank 1, AYJNISHD BASLP degree, Manav Kalyan Kendra NGO affiliation, 3,500+ documented clinical cases, Leh Ladakh voluntary work, Dahisar East address, and four spoken languages (English, Gujarati, Hindi, Marathi)—is sourced directly from authentic documents.

---

## 1. Overview & Core Concept

- **What It Does**: Serves as the primary digital home and patient booking portal for Rajvi Vibhakar Parikh's speech therapy and audiology practice in Dahisar East, Mumbai. Patients and families can learn about specific conditions (stuttering, aphasia, pediatric speech, hearing loss), schedule clinic appointments, view genuine clinic hours and location, and directly message or call for consultations.
- **Target Audience / Persona**:
  1. Parents seeking expert evaluation for children with delayed speech, misarticulation, stuttering, or autism spectrum communication needs.
  2. Adults and seniors experiencing age-related hearing decline, needing pure tone audiometry, or seeking digital hearing aid trials (ITC, RIC, CIC, BTE, CROS).
  3. Neurological rehabilitation patients recovering from stroke, aphasia, dysarthria, or swallowing disorders.
  4. ENT doctors and pediatricians in Mumbai looking for a qualified, state-ranked BASLP specialist to refer patients.
- **Key Value**: Professional credibility, complete clarity on services, verified physical clinic location opposite Pragati Hospital in Dahisar East, and zero-friction appointment booking via phone, WhatsApp, or the online appointment request modal.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Explore & Verify Credentials**: Patients land on a clean, reassuring hero with Dr. Rajvi's authentic title, AYJNISHD training, MUHS Rank 1 award, and verified Google Business profile accreditation.
2. **Browse Clinical Services**: Interactive tabbed categorization separating **Speech-Language Therapy** (Aphasia, Stuttering, Misarticulation, Dysarthria, Voice & Swallowing) from **Audiology & Hearing Aids** (PTA, Impedance Audiometry, Hearing Aid Trials across Digital/Analog ITC, RIC, CIC, BTE, CROS).
3. **Interactive Appointment Modal**: Clicking "Book Appointment" or "Schedule Consultation" opens a streamlined booking modal allowing patients to choose between Speech Therapy or Audiology, pick a preferred day/time, specify patient age group, and either submit directly or initiate an instant pre-filled WhatsApp message.
4. **Clinic Visit & Contact**: Full Google Maps location guide (Ramkunwar Thakur Marg, Dahisar East), working hours (Mon-Sat from 9:00 AM), multilingual communication badges (English, Gujarati, Hindi, Marathi), and direct one-touch calling.

### Visual Identity & Theme
- **Color Distribution (60-30-10 Rule)**:
  - **60% Dominant Neutral**: `#F8FAFC` (Canvas Slate 50) and `#FFFFFF` (Surface Cards).
  - **30% Structural Depth**: Deep Navy `#0F172A` for typography, `#E2E8F0` for hairline borders, and subtle `#F0FDFA` (Teal 50) card accents.
  - **10% High-Intent Accent**: Clinical Teal `#0D9488` (Primary Actions, Status, Highlights) and Vibrant Cyan `#06B6D4` (Interactive hover & badges).
- **Typography & Hierarchy**:
  - Display Font: `Plus Jakarta Sans` / `Outfit` (clean, contemporary medical authority).
  - Body Prose: `Plus Jakarta Sans` with balanced line-height (`1.65`) for optimal readability by patients of all ages.
  - Metrics / Numbers: Tabular numerals (`tabular-nums`) for case counts, years, and timings.
- **Top Bar Contract**:
  - Zone 1 (Brand): Single clean text element `"Rajvi Vibhakar Parikh"` with medical emblem.
  - Zone 2 (Nav Links): `Services`, `Credentials & Experience`, `Hearing Solutions`, `Clinic Location`.
  - Zone 3 (Primary Action): `"Book Consultation"` + direct phone button (`8898330707`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Direct WhatsApp Integration vs. Form-Only Booking**
  - *Chosen Approach*: Dual workflow. The appointment modal allows instant form submission stored in local session state AND provides a 1-click `"Send via WhatsApp"` button with a clean pre-formatted consultation request.
  - *Why*: In Mumbai, WhatsApp is the dominant, most comfortable communication channel for patients booking appointments with independent clinicians.
- **Decision 2: Genuine Clinical Experience Architecture**
  - *Chosen Approach*: Highlight the exact chronological student clinician and intern milestones from AYJNISHD (2,437+ Audiology cases and 1,119+ Speech cases managed) alongside her ongoing clinical work across private clinics and Manav Kalyan Kendra NGO.
  - *Why*: Transparently presents verified real clinical exposure instead of vague marketing claims.
- **Decision 3: Zero-Pill & Clean Typography Discipline**
  - *Chosen Approach*: Render conditions and qualifications as structured cards with hairline dividers and clean text metadata (`·` bullet separators), avoiding generic badge sandwiches.

---

## 4. Technical Architecture & System Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│  [Logo + Rajvi Vibhakar Parikh]  —  [Nav Links]  —  [Call & WhatsApp]  │
└────────────────────────────────────────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                           Hero Section                                 │
│  - BASLP (AYJNISHD), MUHS State Rank 1 in Motor Speech Disorders       │
│  - Multilingual Care: English · Gujarati · Hindi · Marathi             │
│  - Direct Actions: "Book Appointment" / "WhatsApp Dr. Rajvi"           │
└────────────────────────────────────────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    Genuine Key Achievements Banner                     │
│  3,500+ Cases Assessed  │  MUHS Rank 1  │  AYJNISHD Alumna  │  NGO Care│
└────────────────────────────────────────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                   Dual Clinical Services Explorer                      │
│   ┌───────────────────────────────┐ ┌────────────────────────────────┐ │
│   │   Speech-Language Pathology   │ │      Audiology & Hearing       │ │
│   │  - Misarticulation & Voice    │ │  - Pure Tone & Impedance Audio │ │
│   │  - Stuttering & Stammering    │ │  - Hearing Aid Trials (Digital)│ │
│   │  - Aphasia & Dysarthria       │ │  - ITC, RIC, CIC, BTE, CROS    │ │
│   │  - Swallowing & Pediatric ASD │ │  - Analog & Digital Solutions  │ │
│   └───────────────────────────────┘ └────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                 Doctor Profile & Education Timeline                    │
│  - AYJNISHD (Divyangjan) Training & Clinical Progression               │
│  - Manav Kalyan Kendra NGO & Mumbai Private Clinics                    │
│  - REWA Ladakh Speech Therapy Volunteer Work                           │
│  - ISHA Annual Conference & RCI Approved ASD Management Training       │
└────────────────────────────────────────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│              Dahisar East Clinic Information & Hours                   │
│  - Shop 1, Ramkunwar Thakur Marg, Opp. Pragati Hospital, Dahisar East  │
│  - Mon - Sat: Opens 9:00 AM  │  Interactive Directions & Contact Form  │
└────────────────────────────────────────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                    Interactive Appointment Modal                       │
│  - Select Service (Speech / Hearing / Hearing Aid Trial)               │
│  - Date & Preferred Slot  │  Instant WhatsApp Message Generator        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Verification Plan

### Automated & Compilation Checks
- Run `compile_applet` to ensure TypeScript builds with zero errors.
- Run `lint_applet` to verify syntax and import correctness.

### Functional Verification
- Verify that every button (WhatsApp, Call, Book Appointment, Map, Service Filter) has active working event handlers.
- Verify modal open/close transitions, responsive mobile viewports, and zero-pill layout compliance.
- Confirm all phone numbers (`8898330707`), emails (`rajvivibhakar@gmail.com`), and physical addresses exactly match the provided genuine documents.
