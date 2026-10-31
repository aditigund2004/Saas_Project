export const MEDICAL_TEMPLATES = [
  {
    id: 'general_family',
    name: 'Family Health & General Practice',
    specialtyCategory: 'General Medicine',
    archetype: 'modern',
    badge: 'Recommended',
    tagline: 'Compassionate primary healthcare & rapid digital prescriptions',
    previewColor: '#2563eb',
    secondaryColor: '#0ea5e9',
    heroHeading: 'Exceptional General Medicine Care for You & Your Family',
    heroSubheading: 'Compassionate primary healthcare, same-day appointments, preventive health checks, and instant WhatsApp digital prescriptions with zero waiting room hassle.',
    heroCtaText: 'Book an Appointment',
    bannerImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80',
    aboutTitle: 'Trusted Family Healthcare & Preventive Medicine',
    aboutText: 'Our clinic is committed to providing compassionate, evidence-based care with modern diagnostic facilities, flexible consultation slots, and patient-first medical communication.',
    aboutValues: [
      'Patient Dignity & Ample Time',
      'Evidence-Based Clinical Protocols',
      'Transparent Consultation Fees',
      'Verified Digital Prescriptions & WhatsApp Records'
    ],
    customNotice: 'Walk-ins welcome between 9:00 AM - 1:00 PM. Prior booking recommended for evening slots.',
    whyChooseUs: [
      {
        title: 'Zero Double-Booking Guarantee',
        description: 'Synchronized digital scheduling ensures your consultation slot is reserved exclusively for you.',
        icon: 'Calendar'
      },
      {
        title: 'Board-Certified Specialists',
        description: 'Consult seasoned doctors with 10+ years of verified clinical expertise and medical credentials.',
        icon: 'Award'
      },
      {
        title: 'Instant WhatsApp Reminders',
        description: 'Receive real-time booking confirmation, queue arrival updates, and digital Rx on your smartphone.',
        icon: 'Smartphone'
      },
      {
        title: 'Verifiable Digital Records',
        description: 'Tamper-evident prescriptions with secure QR code verification for pharmacies and diagnostics.',
        icon: 'ShieldCheck'
      }
    ],
    suggestedServices: [
      { id: 'srv-gen-1', name: 'Comprehensive General Consultation', fee: 800, durationMinutes: 30, category: 'Consultation', description: 'Primary consultation, physical vitals check, and customized treatment plan.' },
      { id: 'srv-gen-2', name: 'Routine Follow-up Checkup', fee: 400, durationMinutes: 15, category: 'Follow-up', description: 'Progress review and medication adjustment within 14 days.' },
      { id: 'srv-gen-3', name: 'Preventive Annual Health Screen', fee: 1500, durationMinutes: 45, category: 'Health Package', description: 'Comprehensive vitals, blood sugar check, ECG review, and lifestyle advice.' },
      { id: 'srv-gen-4', name: 'Diabetes & Hypertension Review', fee: 750, durationMinutes: 25, category: 'Chronic Care', description: 'Targeted monitoring for chronic metabolic and blood pressure conditions.' },
      { id: 'srv-gen-5', name: 'Acute Infection & Fever Care', fee: 600, durationMinutes: 20, category: 'Urgent Care', description: 'Rapid diagnosis and symptomatic relief for seasonal flu, viral fever, and infections.' }
    ],
    testimonials: [
      {
        patientName: 'Aarav Patel',
        feedback: 'Dr. Sen was extremely thorough and patient. I received my prescription on WhatsApp within 2 minutes of leaving.',
        rating: 5,
        date: '1 week ago'
      },
      {
        patientName: 'Ananya Iyer',
        feedback: 'Very well-maintained clinic and punctual consultation. Booking online was effortless.',
        rating: 5,
        date: '3 weeks ago'
      },
      {
        patientName: 'Vikram Malhotra',
        feedback: 'Transparent fees and excellent follow-up support. Highly recommended for family care.',
        rating: 5,
        date: '1 month ago'
      }
    ]
  },
  {
    id: 'dental_studio',
    name: 'Elite Dental & Smile Studio',
    specialtyCategory: 'Dentistry',
    archetype: 'modern',
    badge: 'High Footfall',
    tagline: 'Painless dentistry, implants & aesthetic smile makeovers',
    previewColor: '#0284c7',
    secondaryColor: '#06b6d4',
    heroHeading: 'Painless Dentistry & World-Class Smile Makeovers',
    heroSubheading: 'State-of-the-art dental care with zero-anxiety procedures, computerized digital smile design, ultrasonic teeth cleaning, and gentle hygiene treatments.',
    heroCtaText: 'Reserve Dental Slot',
    bannerImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80',
    aboutTitle: 'Modern Gentle Dentistry You Can Trust',
    aboutText: 'We combine advanced microscopic dentistry, painless anesthesia techniques, and warm aesthetic care to give you confident, healthy smiles that last a lifetime.',
    aboutValues: [
      '100% Painless Anesthesia Protocols',
      'Computerized Intraoral 3D Scanners',
      'Hospital-Grade Multi-Step Sterilization',
      'Transparent Treatment Estimates'
    ],
    customNotice: 'Complimentary digital smile analysis and intraoral photography on your first checkup.',
    whyChooseUs: [
      {
        title: 'Zero-Anxiety Environment',
        description: 'Painless ultrasonic tools and soothing clinical atmosphere designed for dental comfort.',
        icon: 'Award'
      },
      {
        title: 'Digital Intraoral Scans',
        description: 'See your teeth on high-resolution screens before and after treatment with zero guesswork.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Single-Visit Restorations',
        description: 'Advanced composite and CAD/CAM crowns completed in minimal clinic sittings.',
        icon: 'Calendar'
      },
      {
        title: 'WhatsApp Post-Care Support',
        description: 'Automated post-extraction tips and immediate check-in reminders after procedure.',
        icon: 'Smartphone'
      }
    ],
    suggestedServices: [
      { id: 'srv-dent-1', name: 'Comprehensive Dental Exam & Intraoral Scan', fee: 700, durationMinutes: 30, category: 'Diagnosis', description: 'Complete tooth-by-tooth digital inspection and decay detection.' },
      { id: 'srv-dent-2', name: 'Ultrasonic Scaling & Deep Stain Polishing', fee: 1800, durationMinutes: 40, category: 'Hygiene', description: 'Removes plaque, tartar, and coffee/tea stains safely.' },
      { id: 'srv-dent-3', name: 'Painless Single-Visit Root Canal Treatment', fee: 4500, durationMinutes: 60, category: 'Endodontics', description: 'Precision rotary canal cleaning with apex locator and bio-ceramic seal.' },
      { id: 'srv-dent-4', name: 'Laser In-Clinic Teeth Whitening', fee: 6000, durationMinutes: 45, category: 'Cosmetics', description: 'Up to 5 shades brighter in a single, safe 45-minute treatment.' },
      { id: 'srv-dent-5', name: 'Clear Aligners & Orthodontic Evaluation', fee: 2500, durationMinutes: 45, category: 'Orthodontics', description: '3D digital scan and alignment simulation for invisible braces.' }
    ],
    testimonials: [
      {
        patientName: 'Kavita Joshi',
        feedback: 'I used to dread root canals, but here it was completely painless! The clinic is spotless.',
        rating: 5,
        date: '2 weeks ago'
      },
      {
        patientName: 'Rohan Deshmukh',
        feedback: 'The teeth cleaning and whitening gave me an amazing smile for my wedding. Super happy!',
        rating: 5,
        date: '1 month ago'
      }
    ]
  },
  {
    id: 'pediatric_care',
    name: 'HappySprouts Pediatric & Child Wellness',
    specialtyCategory: 'Pediatrics',
    archetype: 'modern',
    badge: 'Child Friendly',
    tagline: 'Gentle child wellness, stress-free vaccinations & milestone tracking',
    previewColor: '#059669',
    secondaryColor: '#10b981',
    heroHeading: 'Compassionate Pediatric Care from Newborn to Teen',
    heroSubheading: 'Child-friendly consultations, stress-free vaccinations, developmental tracking, and round-the-clock pediatric reassurance for caring parents.',
    heroCtaText: 'Book Child Visit',
    bannerImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80',
    aboutTitle: 'Dedicated to Joyful, Healthy Childhoods',
    aboutText: 'Our clinic is intentionally designed with warm colors, play areas, and soothing doctor interactions that eliminate white-coat fear for infants and children.',
    aboutValues: [
      'Gentle & Painless Vaccination Techniques',
      'Childhood Milestone & Growth Records',
      'Warm, Child-Safe Play & Waiting Area',
      'Prompt Parent Query Response on WhatsApp'
    ],
    customNotice: 'Childhood vaccination slots open every morning from 9:30 AM to 1:00 PM.',
    whyChooseUs: [
      {
        title: 'Zero White-Coat Anxiety',
        description: 'Friendly pediatric team trained to comfort infants and toddlers during clinical checks.',
        icon: 'Award'
      },
      {
        title: 'Complete Vaccine Schedule',
        description: 'Cold-chain certified WHO-recommended immunizations with digital reminder alerts.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Nutritional & Growth Charts',
        description: 'Personalized percentile monitoring for height, weight, cognitive, and motor milestones.',
        icon: 'Calendar'
      },
      {
        title: 'Priority Urgent Triage',
        description: 'Immediate slot allocation for high fever, acute stomach pain, or dehydration.',
        icon: 'Smartphone'
      }
    ],
    suggestedServices: [
      { id: 'srv-ped-1', name: 'Pediatric OPD Health Consultation', fee: 700, durationMinutes: 30, category: 'Consultation', description: 'Complete physical assessment, chest auscultation, and growth review.' },
      { id: 'srv-ped-2', name: 'Well-Baby Check & Immunization Slot', fee: 900, durationMinutes: 30, category: 'Immunization', description: 'Certified vaccine administration with digital reminder tracking.' },
      { id: 'srv-ped-3', name: 'Growth, Speech & Milestone Assessment', fee: 1200, durationMinutes: 45, category: 'Development', description: 'Comprehensive developmental screening for toddlers and school-age kids.' },
      { id: 'srv-ped-4', name: 'Pediatric Asthma & Allergy Action Plan', fee: 1000, durationMinutes: 35, category: 'Specialist', description: 'Diagnosis of wheezing, nebulization guidance, and allergen avoidance.' }
    ],
    testimonials: [
      {
        patientName: 'Meera Nambiar (Mother)',
        feedback: 'My 3-year-old was giggling during the checkup! Dr. Neha is magic with kids.',
        rating: 5,
        date: '5 days ago'
      },
      {
        patientName: 'Praveen Varma',
        feedback: 'Clean play area, fast reception, and the digital vaccine schedule is a lifesaver.',
        rating: 5,
        date: '3 weeks ago'
      }
    ]
  },
  {
    id: 'dermatology_cosmo',
    name: 'Lumina Dermatology & Aesthetic Center',
    specialtyCategory: 'Dermatology',
    archetype: 'minimal',
    badge: 'Premium Elegance',
    tagline: 'Board-certified medical skincare, anti-aging & laser therapies',
    previewColor: '#0f766e',
    secondaryColor: '#14b8a6',
    heroHeading: 'Radiant Skin, Healthy Hair & Evidence-Based Aesthetics',
    heroSubheading: 'Board-certified dermatologists specializing in medical skin diagnosis, advanced laser treatments, hair restoration, and rejuvenating aesthetic protocols.',
    heroCtaText: 'Schedule Skin Consultation',
    bannerImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80',
    aboutTitle: 'Clinical Precision Meets Aesthetic Artistry',
    aboutText: 'We address the root biological causes of acne, pigmentation, eczema, and hair loss using US-FDA cleared medical devices and customized dermatological regimens.',
    aboutValues: [
      'US-FDA Cleared Laser Technologies',
      'Board-Certified Dermatologists Only',
      'Zero-Downtime Rejuvenation Options',
      'Confidential & Personalized Skin Protocols'
    ],
    customNotice: 'Comprehensive scalp trichoscopy & skin analysis included with your consultation.',
    whyChooseUs: [
      {
        title: 'Evidence-Based Cosmetology',
        description: 'Scientifically proven dermatological treatments backed by clinical publications.',
        icon: 'Award'
      },
      {
        title: 'Customized Topical Formulations',
        description: 'Medical skincare tailored precisely to your epidermal barrier and climate needs.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Private Aesthetic Suites',
        description: 'Serene, discreet consultation and procedure rooms for complete patient privacy.',
        icon: 'Calendar'
      },
      {
        title: 'Digital Skin Journey Tracking',
        description: 'Standardized before/after photography to track visible pigment and texture reduction.',
        icon: 'Smartphone'
      }
    ],
    suggestedServices: [
      { id: 'srv-derm-1', name: 'Specialist Dermatologist Consultation', fee: 1000, durationMinutes: 30, category: 'Consultation', description: 'Full body skin, hair, and nail evaluation with digital dermoscopy.' },
      { id: 'srv-derm-2', name: 'Targeted Acne & Pimple Laser Treatment', fee: 3500, durationMinutes: 45, category: 'Laser & Aesthetic', description: 'Reduces active inflammation, clears comedones, and prevents scarring.' },
      { id: 'srv-derm-3', name: 'PRP Hair Restoration Treatment', fee: 4800, durationMinutes: 60, category: 'Hair Restoration', description: 'Autologous growth factor micro-injections for thinning hair and telogen effluvium.' },
      { id: 'srv-derm-4', name: 'Hydra-Glow Medical Exfoliation', fee: 2800, durationMinutes: 45, category: 'Skin Rejuvenation', description: 'Deep pore vacuuming, antioxidant infusion, and hyaluronic acid hydration.' },
      { id: 'srv-derm-5', name: 'Melasma & Pigmentation Correction Peel', fee: 3200, durationMinutes: 40, category: 'Chemical Peel', description: 'Targeted epidermal depigmentation for sun spots and uneven tone.' }
    ],
    testimonials: [
      {
        patientName: 'Sunita Nair',
        feedback: 'My cystic acne cleared up in 6 weeks following their treatment plan. Life changing!',
        rating: 5,
        date: '2 weeks ago'
      },
      {
        patientName: 'Rahul Singhania',
        feedback: 'The PRP sessions gave visible hair regrowth. Very professional and spotless clinic.',
        rating: 5,
        date: '1 month ago'
      }
    ]
  },
  {
    id: 'orthopedic_physio',
    name: 'ProMotion Orthopedic & Joint Care',
    specialtyCategory: 'Orthopedics',
    archetype: 'premium',
    badge: 'Specialist Hub',
    tagline: 'Minimally invasive joint preservation, spine & sports rehab',
    previewColor: '#1e293b',
    secondaryColor: '#0284c7',
    heroHeading: 'Restore Mobility, Relieve Pain & Live Without Limits',
    heroSubheading: 'Advanced orthopedic consultations, non-surgical joint preservation, spine care, and integrated computerized physiotherapy for swift, lasting recovery.',
    heroCtaText: 'Book Ortho Consultation',
    bannerImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=80',
    aboutTitle: 'Precision Orthopedics & Mobility Recovery',
    aboutText: 'Helping athletes, professionals, and seniors recover pain-free freedom of motion through evidence-based joint injections, spine ergonomics, and rehabilitation.',
    aboutValues: [
      'Joint-Preserving Conservative Protocols',
      'On-Site Digital X-Ray & Ultrasound',
      'Integrated Biomechanical Physiotherapy',
      'Personalized Post-Injury Recovery Schedules'
    ],
    customNotice: 'Physiotherapy rehab gym and digital posture evaluation open 8:00 AM - 8:00 PM.',
    whyChooseUs: [
      {
        title: 'Non-Surgical Focus First',
        description: 'Prioritizing targeted physio, regenerative injections, and ergonomics before surgery.',
        icon: 'Award'
      },
      {
        title: 'Instant Diagnostic Review',
        description: 'On-site radiographic review so you get a diagnosis and treatment plan in 1 visit.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Sports Injury Specialists',
        description: 'Treatment protocols used by competitive athletes for rapid ligament & muscle healing.',
        icon: 'Calendar'
      },
      {
        title: 'WhatsApp Exercise Videos',
        description: 'Personalized home rehabilitation exercise video clips delivered directly to your phone.',
        icon: 'Smartphone'
      }
    ],
    suggestedServices: [
      { id: 'srv-orth-1', name: 'Senior Orthopedic Specialist Consultation', fee: 900, durationMinutes: 30, category: 'Consultation', description: 'Bone, joint, and spinal examination with gait and range-of-motion analysis.' },
      { id: 'srv-orth-2', name: 'Joint Lubrication & Viscosupplementation Injection', fee: 3500, durationMinutes: 30, category: 'Procedure', description: 'Hyaluronic acid joint injection for osteoarthritic knee pain relief.' },
      { id: 'srv-orth-3', name: 'Sports Ligament & Rotator Cuff Assessment', fee: 1200, durationMinutes: 45, category: 'Sports Medicine', description: 'Detailed biomechanical evaluation for ACL, meniscus, and shoulder strains.' },
      { id: 'srv-orth-4', name: 'Targeted Computerized Physiotherapy Session', fee: 750, durationMinutes: 45, category: 'Rehabilitation', description: 'TENS, ultrasound therapy, manual mobilization, and core strengthening.' }
    ],
    testimonials: [
      {
        patientName: 'Devendra Kulkarni',
        feedback: 'Dr. Sen helped me recover from chronic back pain without surgery. The physio team is stellar.',
        rating: 5,
        date: '2 weeks ago'
      }
    ]
  },
  {
    id: 'cardio_care',
    name: 'PulseCardio Advanced Heart Institute',
    specialtyCategory: 'Cardiology',
    archetype: 'premium',
    badge: 'Cardiac Telemetry',
    tagline: 'Cardiology consultations, ECG, 2D Echo & preventive heart checks',
    previewColor: '#e11d48',
    secondaryColor: '#f43f5e',
    heroHeading: 'World-Class Cardiac Care & Preventive Heart Health',
    heroSubheading: 'Consult leading cardiologists for digital 12-lead ECG analysis, color Doppler echocardiography, blood pressure control, and comprehensive cardiac screening.',
    heroCtaText: 'Schedule Heart Check',
    bannerImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80',
    aboutTitle: 'Protecting Hearts with Advanced Clinical Diagnostics',
    aboutText: 'Dedicated to early identification of cardiovascular risks, heart failure prevention, and proactive hypertension control through high-precision telemetry and compassionate care.',
    aboutValues: [
      'Same-Day 12-Lead ECG & Echo Reports',
      'Preventive Cardiovascular Risk Profiling',
      'Hypertension & Lipid Mastery Protocols',
      'Direct WhatsApp Doctor Reach for Emergencies'
    ],
    customNotice: 'Instant digital 12-lead ECG testing available with on-the-spot cardiologist review.',
    whyChooseUs: [
      {
        title: 'Immediate Clinical Interpretation',
        description: 'Never wait days for cardiac results; get your ECG and blood panel explained today.',
        icon: 'Award'
      },
      {
        title: 'High-Resolution 2D Echo',
        description: 'Color Doppler imaging assessing ejection fraction, valve motion, and wall thickness.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Holistic Risk Reversal',
        description: 'Comprehensive lifestyle, dietary, and medication plans to reverse arterial risks.',
        icon: 'Calendar'
      },
      {
        title: 'Emergency Priority Booking',
        description: 'Flagged rapid appointments for chest discomfort, palpitations, or acute shortness of breath.',
        icon: 'Smartphone'
      }
    ],
    suggestedServices: [
      { id: 'srv-card-1', name: 'Cardiologist Consultation & Risk Profiling', fee: 1200, durationMinutes: 30, category: 'Consultation', description: 'Comprehensive heart health assessment, vitals, auscultation, and medical plan.' },
      { id: 'srv-card-2', name: 'Digital 12-Lead ECG with Doctor Interpretation', fee: 500, durationMinutes: 15, category: 'Diagnostics', description: 'High-definition rhythm and ischemic assessment reviewed instantly.' },
      { id: 'srv-card-3', name: 'Color Doppler 2D Echocardiography', fee: 2400, durationMinutes: 40, category: 'Imaging', description: 'Non-invasive ultrasonic visualization of cardiac chambers, valves, and flow.' },
      { id: 'srv-card-4', name: 'Complete Executive Cardiac Health Package', fee: 3800, durationMinutes: 60, category: 'Health Package', description: 'Includes ECG, lipid panel, glucose check, Echo scan, and cardiologist consultation.' }
    ],
    testimonials: [
      {
        patientName: 'Sanjay Deshpande',
        feedback: 'Dr. Sen spotted my irregular heart rhythm early and got my BP stabilized. Truly grateful.',
        rating: 5,
        date: '1 week ago'
      }
    ]
  },
  {
    id: 'ayurvedic_wellness',
    name: 'Aarogya Ayurvedic & Holistic Healing',
    specialtyCategory: 'Ayurveda',
    archetype: 'minimal',
    badge: 'Natural Wellness',
    tagline: 'Authentic Nadi Pariksha pulse diagnosis & herbal remedies',
    previewColor: '#78350f',
    secondaryColor: '#b45309',
    heroHeading: 'Authentic Ayurvedic Healing & Mind-Body Harmony',
    heroSubheading: 'Time-tested Nadi Pariksha pulse diagnosis, classical herbal formulations, therapeutic diet plans, and rejuvenating wellness therapies for chronic lifestyle balance.',
    heroCtaText: 'Book Pulse Reading',
    bannerImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80',
    aboutTitle: 'Root-Cause Healing Through Ancient Ayurvedic Wisdom',
    aboutText: 'We balance your unique Tridoshas (Vata, Pitta, Kapha) using bespoke herbal remedies, seasonal cleansing guidance, and authentic therapeutic practices.',
    aboutValues: [
      'Authentic Nadi Pariksha Pulse Diagnosis',
      '100% Pure & Certified Herbal Formulations',
      'Personalized Dosha-Specific Nutrition',
      'Stress-Relief & Mind-Body Harmonization'
    ],
    customNotice: 'Authentic Panchakarma consultations and herbal dispensary open daily.',
    whyChooseUs: [
      {
        title: 'Deep Root-Cause Approach',
        description: 'Addressing the metabolic and lifestyle causes of illness rather than suppressing symptoms.',
        icon: 'Award'
      },
      {
        title: 'Master Nadi Vaidya',
        description: 'Consult seasoned Ayurvedic physicians with deep expertise in classical pulse reading.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Certified Organic Herbs',
        description: 'Medicines compounded from sustainably harvested, heavy-metal tested botanical extracts.',
        icon: 'Calendar'
      },
      {
        title: 'Personalized Daily Routine',
        description: 'Dinacharya (daily regimen) and Ritucharya (seasonal diet) delivered straight to your WhatsApp.',
        icon: 'Smartphone'
      }
    ],
    suggestedServices: [
      { id: 'srv-ayu-1', name: 'Nadi Pariksha & Ayurvedic Vaidya Consultation', fee: 650, durationMinutes: 30, category: 'Consultation', description: 'Comprehensive pulse analysis, Prakriti identification, and tailored health plan.' },
      { id: 'srv-ayu-2', name: 'Authentic Abhyanga & Herbal Steam Swedana', fee: 2200, durationMinutes: 60, category: 'Therapy', description: 'Warm medicated herbal oil full-body massage to detoxify tissues and soothe joints.' },
      { id: 'srv-ayu-3', name: 'Shirodhara Medicated Oil Relaxation Therapy', fee: 2500, durationMinutes: 50, category: 'Therapy', description: 'Gentle continuous stream of herbal oil on forehead for deep sleep and stress relief.' },
      { id: 'srv-ayu-4', name: 'Chronic Digestive & Metabolism Detox Protocol', fee: 900, durationMinutes: 35, category: 'Digestive Care', description: 'Targeted correction for acid reflux, IBS, constipation, and sluggish Agni.' }
    ],
    testimonials: [
      {
        patientName: 'Radha Krishnan',
        feedback: 'The pulse diagnosis was uncanny in its accuracy. My digestion and energy are 100% better.',
        rating: 5,
        date: '3 weeks ago'
      }
    ]
  },
  {
    id: 'modern_multispecialty',
    name: 'CityCare Multi-Specialty Health Center',
    specialtyCategory: 'Multi-Specialty',
    archetype: 'modern',
    badge: 'Multi-Specialty',
    tagline: 'Integrated specialist consultations, diagnostics & express pharmacy',
    previewColor: '#4f46e5',
    secondaryColor: '#6366f1',
    heroHeading: 'One Destination for All Your Family’s Medical Needs',
    heroSubheading: 'Over 10+ medical specialties under one roof, digital lab collection, verified specialist roster, and instant WhatsApp booking with minimal waiting time.',
    heroCtaText: 'Book Multi-Specialty Slot',
    bannerImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80',
    aboutTitle: 'Unified Multi-Specialty Clinical Excellence',
    aboutText: 'Bringing together senior physicians, surgeons, pediatricians, gynecologists, and diagnostics for seamless, stress-free family healthcare under one verified roof.',
    aboutValues: [
      'Comprehensive Multi-Specialty Coverage',
      'Rapid In-House Laboratory & Diagnostics',
      'Express Reception Queue Management',
      'Family Healthcare Subscription Plans'
    ],
    customNotice: 'Express reception desk and lab collection counters open 8:00 AM - 9:00 PM.',
    whyChooseUs: [
      {
        title: 'All Specialists in One Place',
        description: 'Easily get cross-specialty opinions without travelling between scattered clinics.',
        icon: 'Award'
      },
      {
        title: 'Connected Electronic Health Records',
        description: 'Every doctor in our clinic can securely review your medical history and allergies.',
        icon: 'ShieldCheck'
      },
      {
        title: 'Priority Senior Citizen Desk',
        description: 'Dedicated lounge and escorted assistance for elderly patients and wheelchair users.',
        icon: 'Calendar'
      },
      {
        title: 'Instant WhatsApp Invoicing & Rx',
        description: 'Paperless digital bills, lab test PDFs, and digital prescriptions on your phone.',
        icon: 'Smartphone'
      }
    ],
    suggestedServices: [
      { id: 'srv-multi-1', name: 'Multi-Specialty Senior Consultation', fee: 900, durationMinutes: 30, category: 'Consultation', description: 'Consult with board-certified specialty doctors across all major medical departments.' },
      { id: 'srv-multi-2', name: 'Comprehensive Whole-Body Master Health Check', fee: 3200, durationMinutes: 60, category: 'Health Package', description: 'Full biochemical blood screen, vitals, vision check, ECG, and physician review.' },
      { id: 'srv-multi-3', name: 'Rapid In-House Blood & Urine Diagnostics', fee: 650, durationMinutes: 20, category: 'Diagnostics', description: 'Accurate automated lab sampling with WhatsApp reports delivered in 2 hours.' },
      { id: 'srv-multi-4', name: 'Emergency OPD Triage & Stabilization', fee: 1200, durationMinutes: 30, category: 'Emergency OPD', description: 'Immediate on-duty doctor attention for acute pain, asthma attacks, and vitals drop.' }
    ],
    testimonials: [
      {
        patientName: 'Ashok Rao',
        feedback: 'From physician to lab test to digital prescription, everything was done in 45 minutes flat.',
        rating: 5,
        date: '2 weeks ago'
      }
    ]
  }
];

export const STOCK_CLINIC_PHOTOS = [
  {
    id: 'photo-1',
    name: 'Modern Reception & Waiting Lounge',
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80',
    category: 'Interior'
  },
  {
    id: 'photo-2',
    name: 'Doctor Consultation Desk & Stethoscope',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80',
    category: 'Consultation'
  },
  {
    id: 'photo-3',
    name: 'Pediatric Care & Cheerful Exam Room',
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80',
    category: 'Pediatrics'
  },
  {
    id: 'photo-4',
    name: 'Diagnostic Equipment & Clinical Laboratory',
    url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=80',
    category: 'Diagnostics'
  },
  {
    id: 'photo-5',
    name: 'High-Tech Dental Operatory Suite',
    url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80',
    category: 'Dental'
  },
  {
    id: 'photo-6',
    name: 'Friendly Physician in White Coat',
    url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1400&q=80',
    category: 'Doctor'
  },
  {
    id: 'photo-7',
    name: 'Clean Hospital Corridor & Treatment Bays',
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80',
    category: 'Facility'
  },
  {
    id: 'photo-8',
    name: 'Ayurvedic Wellness & Natural Therapy Suite',
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1400&q=80',
    category: 'Holistic'
  }
];

