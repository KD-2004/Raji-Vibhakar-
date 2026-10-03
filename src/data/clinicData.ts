/**
 * Verified Clinic Data & Professional Authority Model
 * Rajvi Vibhakar Speech & Hearing Clinic — Dahisar East, Mumbai
 *
 * Conforms 100% to Master Specification:
 * - Zero unverified business attributes (no priceRange, no invented coordinates)
 * - Zero unverified claims (no '5 minutes from station', no 'ground floor', no 'free trial')
 * - Accurate professional designation: Audiologist & Speech-Language Therapist
 * - Accurate state merit title: State Merit Rank 1 under MUHS in Motor Speech Disorders (2020)
 */

export const CANONICAL_DOMAIN = 'https://rajvivibhakar.com';

export interface ServiceDetail {
  id: string;
  slug: string;
  name: string;
  customerTitle: string;
  category: 'speech' | 'hearing';
  tagline: string;
  description: string;
  clinicalScope: string[];
  whoItHelps: string[];
  procedure: string;
  relatedServiceSlugs: string[];
  faqs?: { q: string; a: string }[];
}

export const CLINIC_INFO = {
  businessName: "Rajvi Vibhakar Speech & Hearing Clinic",
  siteName: "Rajvi Vibhakar Speech & Hearing",
  tagline: "Audiology, Hearing Aid Trials & Speech-Language Therapy in Dahisar East",
  professionalName: "Rajvi Vibhakar Parikh",
  professionalTitle: "Audiologist & Speech-Language Therapist",
  degrees: "BASLP (AYJNISHD, Mumbai)",
  honor: "State Merit Rank 1 under MUHS in Motor Speech Disorders (2020)",
  contact: {
    phone: "8898330707",
    displayPhone: "+91 8898330707",
    whatsappLink: "https://wa.me/918898330707",
    email: "rajvivibhakar@gmail.com",
  },
  location: {
    shopAndStreet: "Shop No. 1, Ramkunwar Thakur Marg",
    landmark: "Opp. Pragati Hospital, Krishna Colony",
    area: "Dahisar East, Mumbai, Maharashtra 400068",
    fullAddress: "Shop No. 1, Ramkunwar Thakur Marg, opp. Pragati Hospital, Krishna Colony, Dahisar East, Mumbai, Maharashtra 400068, India",
    // Official Google Maps & Google Business Profile location URL
    googleMapsSearchUrl: "https://maps.app.goo.gl/PyJNyyxjWgHZ6Yar9?g_st=ac",
    officialGbpUrl: "https://maps.app.goo.gl/PyJNyyxjWgHZ6Yar9?g_st=ac",
    googleRating: "5.0",
    googleReviewCount: "1 review",
    googleCategory: "Speech & hearing specialist",
    timings: [
      { days: "Monday – Saturday", hours: "9:00 AM – 8:00 PM" },
      { days: "Sunday", hours: "By Prior Appointment / Closed" },
    ],
  },
  disclaimer: "Educational information only: This website provides general information about hearing, speech and communication services. It does not replace an individual clinical evaluation or diagnosis.",
  professionalCredentials: {
    degree: "Bachelor’s in Audiology and Speech and Language Pathology (BASLP)",
    institution: "Ali Yawar Jung National Institute of Speech and Hearing Disabilities (Divyangjan) - AYJNISHD, Mumbai",
    meritRank: "State Merit Rank 1 under Maharashtra University of Health Sciences (MUHS) in Motor Speech Disorders (2020)",
    conference: "Indian Speech and Hearing Association Annual Conference (2020)",
    creProgram: "RCI-approved CRE program on Autism Spectrum Disorder: Assessment and Management (November 2025)",
    clinicalTimeline: [
      {
        period: "2017 – 2018",
        role: "Student Clinician",
        description: "Assisted 383 audiology cases and 157 speech diagnostic and therapeutic cases during foundational training at AYJNISHD.",
      },
      {
        period: "2018 – 2020",
        role: "Student Clinician",
        description: "Assessed and managed 544 audiology cases and 416 speech diagnostic and therapeutic cases across varied pediatric and adult communication disorders.",
      },
      {
        period: "2020 – 2022",
        role: "Student Intern",
        description: "Completed clinical rotations; assessed 910 audiology cases and 546 speech diagnostic and therapeutic cases.",
      },
      {
        period: "2022 – Present",
        role: "Clinician & Private Practitioner",
        description: "Practicing as speech-language therapist and audiologist across private healthcare clinics in Mumbai and Audiologist at Manav Kalyan Kendra (NGO).",
      },
    ],
    volunteerWork: "Volunteered as Speech-Language Therapist with REWA LADAKH in Leh Ladakh.",
    languages: ["English", "Gujarati (ગુજરાતી)", "Hindi (हिंदी)", "Marathi (मराठी)"],
  },
  customerBenefits: [
    {
      title: "Live Hearing Aid Trials",
      description: "Test modern digital hearing aids in real conversation with family members prior to any purchase decision.",
    },
    {
      title: "State Merit Rank 1 under MUHS in Motor Speech Disorders (2020)",
      description: "Care led by Rajvi Vibhakar Parikh, who achieved State Merit Rank 1 under MUHS in Motor Speech Disorders.",
    },
    {
      title: "Multilingual Consultations",
      description: "Consultations in your mother tongue: English, Gujarati, Hindi, or Marathi for comfort across all generations.",
    },
    {
      title: "Dahisar East Clinic Location",
      description: "Located opposite Pragati Hospital on Ramkunwar Thakur Marg in Krishna Colony, Dahisar East.",
    },
  ],
};

export const SPEECH_SERVICES: ServiceDetail[] = [
  {
    id: "speech-therapy-dahisar-east",
    slug: "speech-therapy-dahisar-east",
    name: "Speech and Language Therapy",
    customerTitle: "Speech and Language Therapy in Dahisar East, Mumbai",
    category: "speech",
    tagline: "Structured clinical evaluation and therapy for speech, fluency, and communication disorders.",
    description: "Speech and language therapy addresses speech clarity, articulation, stuttering fluency, and language comprehension for children, adults, and seniors.",
    clinicalScope: [
      "Clinical assessment of speech sound clarity and articulation",
      "Language facilitation for developmental communication concerns",
      "Stuttering fluency shaping and stuttering modification",
      "Rehabilitation for post-stroke aphasia and motor speech conditions",
    ],
    whoItHelps: [
      "Children having difficulty producing clear sounds or developing expressive language",
      "Individuals experiencing stuttering, speech blocks, or vocal fatigue",
      "Adults recovering from neurological events such as stroke or head injury",
    ],
    procedure: "Evaluations assess speech clarity, language comprehension, and voice mechanics. A personalized, evidence-based therapy plan is then formulated.",
    relatedServiceSlugs: ["misarticulation-therapy", "stuttering-therapy", "aphasia-therapy", "dysarthria-therapy"],
    faqs: [
      {
        q: "What happens during an initial speech evaluation?",
        a: "The clinician conducts an examination of speech anatomy, assesses receptive and expressive language skills, and determines specific therapy targets."
      },
      {
        q: "How many sessions are typically recommended?",
        a: "Session frequency depends on the individual condition, severity, and consistency of home practice guided by the clinician."
      }
    ]
  },
  {
    id: "misarticulation-therapy",
    slug: "misarticulation-therapy",
    name: "Misarticulation Therapy",
    customerTitle: "Misarticulation & Speech Sound Therapy in Dahisar East",
    category: "speech",
    tagline: "Correcting sound substitutions, omissions, and distortions for clear communication.",
    description: "Targeted clinical therapy to correct speech sound errors such as sound substitutions (e.g., saying 'tat' for 'cat'), distortions, or lisping.",
    clinicalScope: [
      "Assessment of articulatory placement and tongue-palate coordination",
      "Sound stimulation and auditory discrimination training",
      "Syllable, word, and conversational sentence level generalization",
    ],
    whoItHelps: [
      "Children whose speech is difficult for teachers, peers, or strangers to understand",
      "Children and adults with lisps or difficulty with specific consonants (r, s, l, k, g)",
    ],
    procedure: "We identify specific sound placement errors, use tactile and auditory cues to establish correct sound production, and systematically practice in words and conversation.",
    relatedServiceSlugs: ["speech-therapy-dahisar-east", "stuttering-therapy", "voice-therapy"],
    faqs: [
      {
        q: "At what age should misarticulation be addressed?",
        a: "While some sound errors are developmental, persistent errors past expected milestones warrant an evaluation to prevent habituation."
      }
    ]
  },
  {
    id: "stuttering-therapy",
    slug: "stuttering-therapy",
    name: "Stuttering Therapy",
    customerTitle: "Stuttering & Fluency Therapy in Dahisar East, Mumbai",
    category: "speech",
    tagline: "Evidence-based therapy targeting repetitions, prolongations, and speech blocks.",
    description: "Clinical fluency therapy designed for children, adolescents, and adults experiencing stuttering or stammering.",
    clinicalScope: [
      "Fluency shaping techniques including easy vocal onset and light articulatory contact",
      "Diaphragmatic breath coordination for natural speech flow",
      "Desensitization to speaking anxiety in social, academic, or professional situations",
    ],
    whoItHelps: [
      "Children beginning to show speech sound repetitions or struggle",
      "Teens and working adults experiencing nervousness or blocking during presentations or conversations",
    ],
    procedure: "Assessment measures disfluency types and rate of speech. Therapy trains smooth phonation, breathing control, and manageable speech modification strategies.",
    relatedServiceSlugs: ["speech-therapy-dahisar-east", "misarticulation-therapy", "voice-therapy"],
    faqs: [
      {
        q: "Can stuttering improve with therapy in adults?",
        a: "Yes. Stuttering management in adults focuses on fluency control and reducing tension, reliably improving functional communication ease."
      }
    ]
  },
  {
    id: "aphasia-therapy",
    slug: "aphasia-therapy",
    name: "Aphasia Therapy",
    customerTitle: "Post-Stroke Aphasia Rehabilitation in Dahisar East",
    category: "speech",
    tagline: "Language rehabilitation following stroke or neurological conditions.",
    description: "Rehabilitative therapy targeting word retrieval, language comprehension, reading, and functional expression following a stroke or brain injury.",
    clinicalScope: [
      "Semantic word retrieval drills and lexical retrieval strategies",
      "Auditory comprehension enhancement exercises",
      "Caregiver communication guidance to facilitate home interaction",
    ],
    whoItHelps: [
      "Stroke survivors experiencing difficulty finding words, forming sentences, or understanding spoken speech",
      "Individuals recovering from localized brain trauma",
    ],
    procedure: "We assess expressive and receptive language abilities, establish communication baselines, and implement structured cognitive-linguistic exercises.",
    relatedServiceSlugs: ["speech-therapy-dahisar-east", "dysarthria-therapy", "swallowing-therapy"],
  },
  {
    id: "dysarthria-therapy",
    slug: "dysarthria-therapy",
    name: "Dysarthria Therapy",
    customerTitle: "Dysarthria & Motor Speech Disorders (MUHS State Rank 1 Specialty)",
    category: "speech",
    tagline: "Therapy for slurred, slow, or weak speech resulting from neuromuscular conditions.",
    description: "Rajvi Vibhakar Parikh achieved State Merit Rank 1 under MUHS in Motor Speech Disorders (2020). This specialized therapy addresses speech clarity caused by muscle weakness or neurological conditions.",
    clinicalScope: [
      "Orofacial and speech muscle coordination exercises",
      "Respiratory-phonatory coordination to improve vocal loudness and breath support",
      "Pacing and articulatory precision training for improved intelligibility",
    ],
    whoItHelps: [
      "Individuals diagnosed with Parkinson's disease, post-stroke weakness, Bell's palsy, or neuromuscular conditions",
      "Speakers experiencing rapid speech fatigue, slurred speech, or low vocal volume",
    ],
    procedure: "Detailed cranial nerve and motor speech assessment followed by tailored drills to optimize breathing, voicing, and articulatory precision.",
    relatedServiceSlugs: ["speech-therapy-dahisar-east", "aphasia-therapy", "voice-therapy", "swallowing-therapy"],
  },
  {
    id: "voice-therapy",
    slug: "voice-therapy",
    name: "Voice Therapy",
    customerTitle: "Voice Therapy for Hoarseness & Vocal Strain in Dahisar East",
    category: "speech",
    tagline: "Clinical voice rehabilitation for hoarseness, vocal nodules, and vocal fatigue.",
    description: "Therapy for individuals experiencing chronic hoarseness, vocal strain, vocal fold nodules, or muscle tension dysphonia.",
    clinicalScope: [
      "Vocal hygiene education and strain reduction techniques",
      "Resonant voice therapy and breath support exercises",
      "Safe vocal projection for occupational voice users (teachers, corporate speakers)",
    ],
    whoItHelps: [
      "Teachers, public speakers, and professional voice users with frequent voice loss or strain",
      "Anyone experiencing persistent hoarseness following medical evaluation by an ENT specialist",
    ],
    procedure: "Assessment of vocal quality, pitch, loudness, and respiratory support followed by structured vocal conditioning exercises.",
    relatedServiceSlugs: ["speech-therapy-dahisar-east", "dysarthria-therapy"],
  },
  {
    id: "swallowing-therapy",
    slug: "swallowing-therapy",
    name: "Swallowing Therapy",
    customerTitle: "Swallowing Therapy & Dysphagia Care in Dahisar East",
    category: "speech",
    tagline: "Evaluation and therapy for swallowing difficulties and safe oral intake.",
    description: "Clinical evaluation and rehabilitation for swallowing difficulties (dysphagia), promoting safe eating and drinking to reduce coughing and choking risks.",
    clinicalScope: [
      "Clinical swallowing examination and oral stage transit assessment",
      "Compensatory head postures and safe swallowing maneuvers",
      "Diet texture modification counseling in coordination with treating physicians",
    ],
    whoItHelps: [
      "Seniors or stroke patients who cough, clear their throat, or hesitate while eating or drinking",
      "Individuals experiencing a sensation of food sticking in the throat",
    ],
    procedure: "Bedside swallowing assessment, muscle strengthening exercises, and recommendations on safe eating postures and consistencies.",
    relatedServiceSlugs: ["speech-therapy-dahisar-east", "dysarthria-therapy", "aphasia-therapy"],
  },
];

export const HEARING_SERVICES: ServiceDetail[] = [
  {
    id: "audiologist-dahisar-east",
    slug: "audiologist-dahisar-east",
    name: "Audiologist in Dahisar East",
    customerTitle: "Audiologist & Diagnostic Hearing Clinic in Dahisar East, Mumbai",
    category: "hearing",
    tagline: "Expert audiological consultation and comprehensive hearing care by Rajvi Vibhakar Parikh (BASLP).",
    description: "Professional audiological services including clinical hearing threshold evaluations, middle ear testing, hearing aid trials, and personalized device programming.",
    clinicalScope: [
      "Clinical hearing threshold testing across low to high pitches",
      "Differential diagnosis of hearing impairment types",
      "Objective digital hearing aid selection, fitting, and verification",
    ],
    whoItHelps: [
      "Adults experiencing communication difficulty in everyday or noisy environments",
      "Seniors and families seeking transparent, objective hearing aid counseling",
    ],
    procedure: "Complete evaluation using calibrated diagnostic equipment followed by clear counseling on your hearing health.",
    relatedServiceSlugs: ["hearing-test-dahisar-east", "pure-tone-audiometry", "hearing-aid-trial"],
  },
  {
    id: "hearing-test-dahisar-east",
    slug: "hearing-test-dahisar-east",
    name: "Hearing Test in Dahisar East",
    customerTitle: "Clinical Hearing Test in Dahisar East, Mumbai",
    category: "hearing",
    tagline: "Comprehensive diagnostic hearing evaluation with calibrated testing equipment.",
    description: "Complete audiological assessment to determine hearing thresholds across frequencies, identify hearing loss type, and recommend appropriate interventions.",
    clinicalScope: [
      "Pure Tone Audiometry (Air and Bone conduction testing)",
      "Speech discrimination and speech reception threshold testing",
      "Detailed explanation of your audiogram report",
    ],
    whoItHelps: [
      "Adults asking others to repeat themselves or struggling in noisy environments",
      "Seniors experiencing progressive hearing changes",
      "Individuals with ringing sounds in the ears (tinnitus)",
    ],
    procedure: "Conducted in a quiet calibrated setup using audiometric headphones and bone vibrator. Immediate printed audiogram and explanation provided.",
    relatedServiceSlugs: ["pure-tone-audiometry", "impedance-audiometry", "hearing-aid-trial"],
  },
  {
    id: "pure-tone-audiometry",
    slug: "pure-tone-audiometry",
    name: "Pure Tone Audiometry",
    customerTitle: "Pure Tone Audiometry (PTA) Hearing Assessment in Dahisar East",
    category: "hearing",
    tagline: "Gold-standard hearing test measuring hearing thresholds across low to high pitches.",
    description: "A standardized diagnostic test assessing air and bone conduction hearing sensitivity from 250 Hz to 8000 Hz, mapping your exact hearing profile.",
    clinicalScope: [
      "Frequency-by-frequency hearing threshold identification",
      "Differential diagnosis of conductive, sensorineural, or mixed hearing loss",
      "Calibrated audiometer measurement with printed audiogram",
    ],
    whoItHelps: [
      "Anyone experiencing muffled speech, trouble hearing high-frequency consonants, or ear fullness",
      "Individuals needing pre-employment or ENT pre-surgical audiology evaluation",
    ],
    procedure: "You listen to gentle tones at varying pitches and press a response button whenever a tone is detected.",
    relatedServiceSlugs: ["hearing-test-dahisar-east", "impedance-audiometry", "hearing-aid-trial"],
  },
  {
    id: "impedance-audiometry",
    slug: "impedance-audiometry",
    name: "Impedance Audiometry",
    customerTitle: "Impedance Audiometry & Middle Ear Test in Dahisar East",
    category: "hearing",
    tagline: "Objective middle ear assessment for eardrum movement and middle ear pressure.",
    description: "A fast, objective test evaluating eardrum mobility and middle ear function, commonly used to detect fluid behind the eardrum or eustachian tube dysfunction.",
    clinicalScope: [
      "Tympanometry to assess middle ear pressure and eardrum compliance",
      "Acoustic reflex testing for middle ear muscle response",
      "Evaluation of suspected middle ear effusion or perforation",
    ],
    whoItHelps: [
      "Children with recurring ear colds, ear infections, or suspected fluid",
      "Adults feeling ear blockage, popping, or pressure after flights or colds",
    ],
    procedure: "A soft probe tip is placed comfortably at the ear opening. Automated pressure measurements take place with zero discomfort.",
    relatedServiceSlugs: ["pure-tone-audiometry", "hearing-test-dahisar-east"],
  },
  {
    id: "hearing-aid-trial",
    slug: "hearing-aid-trial",
    name: "Hearing Aid Trial",
    customerTitle: "Live Hearing Aid Trial in Dahisar East, Mumbai",
    category: "hearing",
    tagline: "Experience real sound clarity in conversation before deciding on any hearing device.",
    description: "An in-clinic trial where modern digital hearing aids are programmed to your specific audiogram, allowing you to test speech clarity and comfort firsthand.",
    clinicalScope: [
      "Audiogram-matched prescription programming",
      "Real-time speech clarity testing with family members",
      "Objective trial across multiple styles (RIC, CIC, ITC, BTE)",
    ],
    whoItHelps: [
      "Individuals considering hearing aids for the first time who want to evaluate sound quality",
      "Existing hearing aid users seeking an upgrade from older devices",
    ],
    procedure: "Following your hearing test, trial devices are programmed and fitted. You converse with family in the clinic to verify comfort and clarity.",
    relatedServiceSlugs: ["digital-hearing-aids", "pure-tone-audiometry", "hearing-test-dahisar-east"],
  },
  {
    id: "digital-hearing-aids",
    slug: "digital-hearing-aids",
    name: "Digital Hearing Aids",
    customerTitle: "Digital Hearing Aids (ITC, RIC, CIC, BTE & CROS) in Dahisar East",
    category: "hearing",
    tagline: "Modern digital technology with speech enhancement, background noise management, and custom styles.",
    description: "Consultation, selection, fitting, and programming of digital hearing aids designed to enhance speech understanding in quiet and noisy environments.",
    clinicalScope: [
      "Selection from custom styles: ITC, RIC, CIC, BTE, and CROS",
      "Digital sound processing programming tailored to user lifestyle",
      "Follow-up fine-tuning and maintenance counseling",
    ],
    whoItHelps: [
      "Individuals with mild to profound hearing loss seeking clear conversation",
      "Working professionals and seniors seeking discreet or easy-to-handle styles",
    ],
    procedure: "We evaluate ear anatomy, hearing loss configuration, and lifestyle needs to recommend and program appropriate digital models.",
    relatedServiceSlugs: ["hearing-aid-trial", "pure-tone-audiometry"],
  },
  {
    id: "analog-hearing-aids",
    slug: "analog-hearing-aids",
    name: "Analog Hearing Aids",
    customerTitle: "Analog Hearing Aid Consultation & Servicing in Dahisar East",
    category: "hearing",
    tagline: "Servicing, ear mold replacement, and clinical counseling for analog hearing aid users.",
    description: "Inspection, cleaning, ear mold fitting, and honest clinical counseling for patients currently using analog hearing aids.",
    clinicalScope: [
      "Inspection and cleaning of existing devices and ear molds",
      "Sound tube replacement and acoustic seal check",
      "Objective comparison between analog amplification and digital processing",
    ],
    whoItHelps: [
      "Patients currently wearing analog devices who need mold adjustments or maintenance",
    ],
    procedure: "Physical device inspection, sound check, and personalized guidance.",
    relatedServiceSlugs: ["digital-hearing-aids", "hearing-aid-trial"],
  },
];

export const ALL_SERVICES: ServiceDetail[] = [...SPEECH_SERVICES, ...HEARING_SERVICES];

export const HEARING_AID_STYLES = [
  {
    code: "CIC",
    name: "Completely-In-Canal",
    badge: "Discreet",
    description: "Fits deeply within the ear canal for cosmetic discretion.",
    bestFor: "Mild to moderate hearing loss; canal anatomy permitting.",
  },
  {
    code: "RIC",
    name: "Receiver-In-Canal",
    badge: "Common Style",
    description: "Small casing rests behind the ear with a thin wire delivering natural, open sound into the canal.",
    bestFor: "Mild to severe hearing loss; open ear canal comfort.",
  },
  {
    code: "ITC",
    name: "In-The-Canal",
    badge: "Custom Molded",
    description: "Custom-made from an ear impression to fit securely in the outer ear canal.",
    bestFor: "Mild to moderately severe hearing loss; easy handling.",
  },
  {
    code: "BTE",
    name: "Behind-The-Ear",
    badge: "Durable & Versatile",
    description: "Rests behind the ear connected to a custom ear mold. Highly durable and capable of substantial amplification.",
    bestFor: "Moderate to profound hearing loss; suitable across age groups.",
  },
  {
    code: "CROS",
    name: "CROS System",
    badge: "Single-Sided Care",
    description: "Transmits sound wirelessly from an unaidable ear to the better ear for improved sound awareness.",
    bestFor: "Single-sided deafness (asymmetric hearing loss).",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Schedule Your Visit",
    description: "Contact the clinic via phone (+91 8898330707) or WhatsApp to reserve your dedicated evaluation time slot.",
  },
  {
    step: "02",
    title: "Clinical Evaluation",
    description: "Visit our Dahisar East clinic for an in-depth hearing test or speech-language evaluation in a comfortable setting.",
  },
  {
    step: "03",
    title: "Report & Treatment Plan",
    description: "Rajvi Vibhakar Parikh explains findings clearly in your preferred language and outlines practical, evidence-based recommendations.",
  },
];

export const FAQS = [
  {
    question: "Where is the clinic located in Dahisar East?",
    answer: "The clinic is located at Shop No. 1, Ramkunwar Thakur Marg, opposite Pragati Hospital, Krishna Colony, Dahisar East, Mumbai 400068.",
  },
  {
    question: "Do I need to book an appointment prior to visiting?",
    answer: "Prior booking is recommended to ensure dedicated time for your diagnostic hearing test or speech evaluation without unnecessary waiting.",
  },
  {
    question: "Can I test hearing aids before deciding to purchase?",
    answer: "Yes, we offer live hearing aid trials where digital hearing aids are programmed to your audiogram so you can assess clarity in conversation before making any decision.",
  },
  {
    question: "What languages are available for consultations?",
    answer: "Consultations are conducted comfortably in English, Gujarati (ગુજરાતી), Hindi (हिंदी), and Marathi (मराठी).",
  },
  {
    question: "How long does a hearing assessment take?",
    answer: "A standard diagnostic Pure Tone Audiometry hearing test takes approximately 20 to 30 minutes, including a review of your audiogram.",
  },
  {
    question: "What qualifications does Rajvi Vibhakar Parikh hold?",
    answer: "Rajvi Vibhakar Parikh holds a Bachelor’s in Audiology and Speech and Language Pathology (BASLP) from Ali Yawar Jung National Institute of Speech and Hearing Disabilities (AYJNISHD, Mumbai) and secured State Merit Rank 1 under MUHS in Motor Speech Disorders (2020).",
  },
];

export interface HealthInsight {
  id: string;
  slug: string;
  title: string;
  category: 'Hearing Health' | 'Speech Therapy' | 'Child Development';
  readTime: string;
  publishedDate: string;
  lastReviewed: string;
  excerpt: string;
  author: string;
  reviewer: string;
  keyTakeaways: string[];
  fullContent: string[];
  clinicalSources: { title: string; url?: string }[];
  relatedServiceSlug: string;
}

export const HEALTH_INSIGHTS: HealthInsight[] = [
  {
    id: 'early-signs-hearing-loss',
    slug: 'early-signs-of-hearing-loss',
    title: 'Recognizing Early Signs of High-Frequency Hearing Loss in Adults',
    category: 'Hearing Health',
    readTime: '4 min read',
    publishedDate: '2026-10-01',
    lastReviewed: 'October 2026',
    excerpt: 'Hearing loss often begins gradually with high-frequency consonants (such as s, f, th), making speech sound muffled rather than completely quiet.',
    author: 'Rajvi Vibhakar Parikh, Audiologist & Speech-Language Therapist',
    reviewer: 'Reviewed by Rajvi Vibhakar Parikh (BASLP, AYJNISHD)',
    clinicalSources: [
      { title: 'American Speech-Language-Hearing Association (ASHA) — Adult Hearing Screening Guidelines' },
      { title: 'Indian Speech and Hearing Association (ISHA) — Clinical Practice Protocols' },
    ],
    relatedServiceSlug: 'pure-tone-audiometry',
    keyTakeaways: [
      'Speech is heard but word clarity is reduced, particularly in background noise.',
      'Higher frequency consonant sounds (s, f, th, k) become harder to distinguish.',
      'Frequent requests for repetition during telephone or group conversations.',
      'A Pure Tone Audiometry test establishes an accurate baseline audiogram.',
    ],
    fullContent: [
      'Sensorineural hearing changes associated with aging (presbycusis) or prolonged noise exposure often begin by affecting sensory hair cells responsible for high-frequency sounds. Because low-frequency vowel sounds remain audible, individuals often notice decreased clarity rather than an overall loss of volume.',
      'Common early signs include feeling that people around you are mumbling, needing to turn up television volume, or experiencing heightened listening fatigue after social events.',
      'A comprehensive Pure Tone Audiometry evaluation identifies hearing thresholds across air and bone conduction pathways, allowing the clinician to provide appropriate guidance and, if indicated, trial digital hearing devices.',
    ],
  },
  {
    id: 'child-speech-development',
    slug: 'child-speech-development',
    title: 'Childhood Speech Development: Understanding Communication Milestones',
    category: 'Child Development',
    readTime: '5 min read',
    publishedDate: '2026-10-01',
    lastReviewed: 'October 2026',
    excerpt: 'Developmental milestones help parents and educators identify when speech or language patterns warrant a professional clinical evaluation.',
    author: 'Rajvi Vibhakar Parikh, Audiologist & Speech-Language Therapist',
    reviewer: 'Reviewed by Rajvi Vibhakar Parikh (BASLP, AYJNISHD)',
    clinicalSources: [
      { title: 'Rehabilitation Council of India (RCI) — Developmental Milestones & Communication Protocols' },
      { title: 'Indian Speech and Hearing Association (ISHA) — Pediatric Guidelines' },
    ],
    relatedServiceSlug: 'speech-therapy-dahisar-east',
    keyTakeaways: [
      'By 18 Months: Responding to name and using single consistent words.',
      'By 24 Months: Beginning two-word word combinations and following simple instructions.',
      'By 3 Years: Speech intelligible to familiar caregivers and emerging sentence structure.',
      'Early assessment enables supportive, play-based strategies before formal schooling.',
    ],
    fullContent: [
      'Speech and language development includes receptive skills (what a child understands) and expressive skills (how a child uses words, sounds, and gestures). When a child understands well but uses limited words, early clinical facilitation can be beneficial.',
      'Evaluations review hearing status, oral-motor coordination, and environmental interaction to understand communication strengths and areas needing support.',
      'Therapy sessions are designed to be engaging, child-friendly, and conducted in the family’s primary language to support natural development at home.',
    ],
  },
  {
    id: 'stuttering',
    slug: 'stuttering',
    title: 'Understanding Stuttering: Clinical Concepts and Fluency Strategies',
    category: 'Speech Therapy',
    readTime: '4 min read',
    publishedDate: '2026-10-01',
    lastReviewed: 'October 2026',
    excerpt: 'Stuttering is a neurodevelopmental variation in speech timing and motor coordination that can be managed through structured clinical techniques.',
    author: 'Rajvi Vibhakar Parikh, Audiologist & Speech-Language Therapist',
    reviewer: 'Reviewed by Rajvi Vibhakar Parikh (BASLP, AYJNISHD)',
    clinicalSources: [
      { title: 'International Fluency Association (IFA) — Clinical Resources on Stuttering' },
      { title: 'ASHA — Stuttering Evidence Maps and Intervention Protocols' },
    ],
    relatedServiceSlug: 'stuttering-therapy',
    keyTakeaways: [
      'Characterized by repetitions of sounds, prolongations, and physical speech blocks.',
      'Secondary behaviors such as tension develop in response to anticipated speech blocks.',
      'Fluency techniques focus on relaxed vocal onset, natural breathing, and rate pacing.',
      'Individualized guidance supports communication ease across academic and work settings.',
    ],
    fullContent: [
      'Stuttering involves interruptions in the forward flow of speech. It is not caused by emotional weakness or lack of intelligence; rather, it reflects differences in how the brain coordinates the complex muscular timing required for speech.',
      'Clinical therapy provides practical tools: gentle phonatory onset, smooth articulatory contact, and strategies for managing moments of tension without avoidance.',
      'In young children, early intervention often supports rapid fluency gains. In teenagers and adults, therapy focuses on confidence, ease, and functional communication in everyday life.',
    ],
  },
  {
    id: 'aphasia-after-stroke',
    slug: 'aphasia-after-stroke',
    title: 'Aphasia After Stroke: Pathways to Language Rehabilitation',
    category: 'Speech Therapy',
    readTime: '5 min read',
    publishedDate: '2026-10-01',
    lastReviewed: 'October 2026',
    excerpt: 'When a stroke affects language centers in the brain, targeted speech-language therapy utilizes neuroplasticity to support communication recovery.',
    author: 'Rajvi Vibhakar Parikh, Audiologist & Speech-Language Therapist',
    reviewer: 'Reviewed by Rajvi Vibhakar Parikh (BASLP, AYJNISHD)',
    clinicalSources: [
      { title: 'National Aphasia Association — Clinical Definitions & Communication Rehabilitation' },
      { title: 'Cochrane Neuro-rehabilitation Reviews on Speech-Language Therapy After Stroke' },
    ],
    relatedServiceSlug: 'aphasia-therapy',
    keyTakeaways: [
      'Aphasia impairs language access and retrieval, while intellectual capability remains preserved.',
      'Manifestations range from expressive word-finding difficulty to receptive comprehension challenges.',
      'Consistent practice and supportive caregiver interaction support ongoing recovery.',
      'Therapy incorporates multimodality communication including writing, gesture, and naming drills.',
    ],
    fullContent: [
      'Aphasia is an acquired communication disorder resulting from damage to brain regions responsible for language processing, most commonly following a stroke. The person typically knows what they wish to communicate but experiences difficulty accessing the words.',
      'Therapy employs structured naming tasks, auditory comprehension practice, and functional everyday conversation scenarios to stimulate alternate neural pathways.',
      'Training family members to speak in clear, unhurried sentences and provide ample response time is an integral component of successful long-term rehabilitation.',
    ],
  },
];
