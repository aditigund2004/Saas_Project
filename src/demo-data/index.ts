import {
  Clinic,
  Doctor,
  Receptionist,
  Patient,
  PatientFeedback,
  FeedbackInternalNote,
  FeedbackActivity,
  Appointment,
  Prescription,
  Invoice,
  Expense,
  InventoryItem,
  InventoryMovement,
  StockRequest,
  Supplier,
  PurchaseOrder,
  SubscriptionPlan,
  ClinicSubscription,
  WhatsAppNotification,
  FollowUpTask,
  PlatformMetric,
  SupportTicket,
  BackgroundJob,
  SystemAuditLog,
  IntegrationStatus,
  ClinicalEncounter,
  StaffMember,
  User,
<<<<<<< HEAD
  FamilyMember,
=======
>>>>>>> origin/main
  SaaSBillingInvoice,
  SaaSPayment,
  SaaSRefund,
  SaaSExpense,
  ClinicPaymentRecord,
<<<<<<< HEAD
  ClinicRefundRecord
=======
  ClinicRefundRecord,
  ReceiptRecord
>>>>>>> origin/main
} from '../types';

export const DEMO_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter Clinic',
    tagline: 'Best for solo practitioners & startup dental/specialty clinics',
    monthlyPrice: 2499,
    annualPrice: 24990,
    maxDoctors: 2,
    maxBranches: 1,
    maxStaff: 4,
    features: [
      '14-Day Full Access Free Trial',
      'Up to 2 Doctor Schedules',
      'Single Branch Management',
      'Online & Walk-In Bookings',
      'Digital Prescriptions & Print PDF',
      'QR Verification Preview',
      'Basic WhatsApp Confirmation Templates',
      'Daily Reception Queue & Checklist',
      'Standard Financial & Patient Reports'
    ]
  },
  {
    id: 'growth',
    name: 'Growth Practice',
    tagline: 'Ideal for established clinics expanding doctors and daily footfall',
    monthlyPrice: 4499,
    annualPrice: 44990,
    maxDoctors: 5,
    maxBranches: 2,
    maxStaff: 8,
    features: [
      'Everything in Starter Plan',
      'Up to 5 Doctor Profiles & Rotas',
      '2 Branch Operations & Switching',
      'Automated SMS & WhatsApp Reminders',
      'Clinical Prescription Composer & PDF Generator',
      'Live Waiting Queue Management',
      'Billing, Invoicing & Daily Collections',
      'Clinical Inventory Alerts & Reorders',
      'Dedicated Email & Chat Support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional Multi-Specialty',
    tagline: 'Ideal for busy multi-doctor practices and multi-branch setups',
    monthlyPrice: 6999,
    annualPrice: 69990,
    maxDoctors: 10,
    maxBranches: 3,
    maxStaff: 15,
    isPopular: true,
    features: [
      'Everything in Starter Plan',
      'Up to 10 Doctors & 3 Branches',
      'Branch-Level Analytics & Switching',
      'Automated WhatsApp Reminders & Follow-Ups',
      'Full Digital Rx Builder with Drug Presets',
      'QR Authenticity Verification Portal',
      'Billing, Invoicing & Expense Tracking',
      'Clinical Inventory & Low-Stock Alerts',
      'Receptionist Walk-In Express Mode',
      'Custom Operational & Financial Reports'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise / Nursing Home',
    tagline: 'For clinic chains & 10–30 bed local nursing homes',
    monthlyPrice: 14999,
    annualPrice: 149990,
    maxDoctors: 30,
    maxBranches: 10,
    maxStaff: 50,
    features: [
      'Everything in Professional Plan',
      'Unlimited Doctors & 10 Branches',
      'Nursing Home Bed Occupancy Tracker (10-30 Beds)',
      'Multi-Branch Consolidated Reporting',
      'Advanced Role-Based Permissions',
      'WhatsApp Business API Dedicated Webhook Adapter',
      'Automated Pharmacy & Consumables Restock',
      'Priority 24/7 Support & Onboarding Specialist',
      'Custom Clinical Print Header Layouts'
    ]
  }
];

export const DEMO_CLINICS: Clinic[] = [
  {
    id: 'clinic-citycare',
    slug: 'citycare-family-clinic',
    name: 'CityCare Family Clinic',
    tagline: 'Compassionate Primary Healthcare & Preventive Family Medicine',
    specialty: 'General Medicine',
    specialties: ['General Medicine', 'Family Medicine', 'Preventive Health'],
    description: 'Comprehensive family health practice providing routine wellness checks, chronic lifestyle disease monitoring, immunizations, and rapid diagnostic lab consults.',
    logo: '🏥',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    address: '14 Central Health Arcade, FC Road',
    locality: 'Deccan Gymkhana',
    city: 'Pune',
    phone: '+91 98220 12345',
    email: 'care@citycare.demo',
    ownerName: 'Dr. Aarav Mehta, MBBS, MD',
    status: 'Active',
    subscriptionPlanId: 'professional',
    trialEndsAt: '2026-11-20T00:00:00.000Z',
    isTrial: false,
    operatingHours: 'Mon - Sat: 08:30 AM - 08:00 PM',
    bookingPolicy: 'Free cancellations up to 2 hours before scheduled slot. Walk-ins accepted with queue priority.',
    consultationFeeRange: '₹500 - ₹800',
    rating: 4.9,
    reviewsCount: 178,
    nextAvailableSlot: 'Today, 03:30 PM',
    sampleReviews: [
      { patientName: 'Suresh Menon', rating: 5, comment: 'Dr. Aarav Mehta took the time to explain my cholesterol panel thoroughly without rushing.', date: '2026-10-18' },
      { patientName: 'Pooja Kulkarni', rating: 5, comment: 'Efficient reception desk. Verified my online appointment in 5 minutes.', date: '2026-10-14' }
    ],
    branches: [
      {
        id: 'branch-citycare-main',
        clinicId: 'clinic-citycare',
        name: 'FC Road Main Clinic',
        code: 'CC-FCR',
        address: '14 Central Health Arcade, FC Road',
        city: 'Pune',
        phone: '+91 98220 12345',
        email: 'main@citycare.demo',
        operatingHours: '08:30 AM - 08:00 PM',
        isMain: true,
        activeDoctorsCount: 2
      }
    ],
    services: [
      { id: 'srv-cc-1', name: 'General Consultation', durationMinutes: 30, fee: 600, category: 'Consultation', description: 'Comprehensive primary care checkup, vitals review, and clinical diagnosis.' },
      { id: 'srv-cc-2', name: 'Routine Health Assessment & Vitals Scan', durationMinutes: 45, fee: 800, category: 'Wellness', description: 'Holistic vitals assessment, BMI, blood sugar spot check, and preventative care.' },
      { id: 'srv-cc-3', name: 'Chronic Care & Medication Follow-up', durationMinutes: 15, fee: 500, category: 'Follow-up', description: 'Hypertension, diabetes review, and dosage titration.' }
    ]
  },
  {
    id: 'clinic-heartwell',
    slug: 'heartwell-cardiology-centre',
    name: 'HeartWell Cardiology Centre',
    tagline: 'Advanced Cardiovascular Diagnostics & Preventive Cardiac Care',
    specialty: 'Cardiology',
    specialties: ['Cardiology', 'Preventive Cardiac Care', 'Hypertension Management'],
    description: 'Specialized cardiovascular institute offering 2D Echocardiography, Computerized Stress TMT, Holter monitoring, and post-angioplasty rehabilitation.',
    logo: '❤️',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    address: 'Suite 502, MediPark Heart Tower, BKC',
    locality: 'Bandra East',
    city: 'Mumbai',
    phone: '+91 98200 45678',
    email: 'appointments@heartwell.demo',
    ownerName: 'Dr. Rohan Deshmukh, MD, DM',
    status: 'Active',
    subscriptionPlanId: 'enterprise',
    trialEndsAt: '2026-11-15T00:00:00.000Z',
    isTrial: false,
    operatingHours: 'Mon - Fri: 09:00 AM - 07:00 PM, Sat: 09:00 AM - 02:00 PM',
    bookingPolicy: 'Prior fasting required for lipid profiles. Please bring recent ECG and echo reports.',
    consultationFeeRange: '₹900 - ₹1,500',
    rating: 4.9,
    reviewsCount: 214,
    nextAvailableSlot: 'Tomorrow, 10:00 AM',
    sampleReviews: [
      { patientName: 'Ashok Singhania', rating: 5, comment: 'World-class diagnostic facility. Dr. Deshmukh provides calm and extremely reassuring counsel.', date: '2026-10-19' }
    ],
    branches: [
      {
        id: 'branch-heartwell-main',
        clinicId: 'clinic-heartwell',
        name: 'BKC Cardiovascular Wing',
        code: 'HW-BKC',
        address: 'Suite 502, MediPark Heart Tower, BKC',
        city: 'Mumbai',
        phone: '+91 98200 45678',
        email: 'bkc@heartwell.demo',
        operatingHours: '09:00 AM - 07:00 PM',
        isMain: true,
        activeDoctorsCount: 1
      }
    ],
    services: [
      { id: 'srv-hw-1', name: 'Cardiology Specialist Consultation', durationMinutes: 30, fee: 1200, category: 'Consultation', description: 'Comprehensive cardiac assessment, chest pain evaluation, and ECG review.' },
      { id: 'srv-hw-2', name: 'ECG & Cardiovascular Risk Assessment', durationMinutes: 30, fee: 1500, category: 'Diagnostic', description: 'High-resolution 12-lead ECG, blood pressure mapping, and arrhythmia screening.' },
      { id: 'srv-hw-3', name: 'Cardiac Post-Procedure Follow-up', durationMinutes: 20, fee: 900, category: 'Follow-up', description: 'Post-angioplasty/stent progress monitoring and anti-platelet therapy review.' }
    ]
  },
  {
    id: 'clinic-brightsmile',
    slug: 'brightsmile-dental-studio',
    name: 'BrightSmile Dental Studio',
    tagline: 'General Dentistry, Clear Aligners & Cosmetic Orthodontics',
    specialty: 'General Dentistry',
    specialties: ['General Dentistry', 'Orthodontics', 'Cosmetic Smile Design'],
    description: 'Boutique digital dental studio specializing in clear aligners, painless rotary root canals, ultrasonic teeth whitening, and pediatric preventive dentistry.',
    logo: '🦷',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    address: '42 Lotus Enclave, Indiranagar 100ft Road',
    locality: 'Indiranagar',
    city: 'Bengaluru',
    phone: '+91 98450 78901',
    email: 'care@brightsmile.demo',
    ownerName: 'Dr. Isha Shah, MDS',
    status: 'Active',
    subscriptionPlanId: 'professional',
    trialEndsAt: '2026-11-25T00:00:00.000Z',
    isTrial: true,
    operatingHours: 'Mon - Sat: 09:30 AM - 08:30 PM',
    bookingPolicy: 'Complimentary digital intraoral smile scan with all initial orthodontic consultations.',
    consultationFeeRange: '₹400 - ₹1,200',
    rating: 4.8,
    reviewsCount: 156,
    nextAvailableSlot: 'Today, 05:00 PM',
    sampleReviews: [
      { patientName: 'Tanvi Nair', rating: 5, comment: 'Dr. Isha Shah made getting invisible aligners totally seamless. Painless scan!', date: '2026-10-15' }
    ],
    branches: [
      {
        id: 'branch-brightsmile-main',
        clinicId: 'clinic-brightsmile',
        name: 'Indiranagar Dental Studio',
        code: 'BS-IND',
        address: '42 Lotus Enclave, Indiranagar 100ft Road',
        city: 'Bengaluru',
        phone: '+91 98450 78901',
        email: 'studio@brightsmile.demo',
        operatingHours: '09:30 AM - 08:30 PM',
        isMain: true,
        activeDoctorsCount: 2
      }
    ],
    services: [
      { id: 'srv-bs-1', name: 'Comprehensive Dental Consultation', durationMinutes: 30, fee: 500, category: 'Consultation', description: 'Oral checkup, digital intraoral camera scan, and personalized treatment plan.' },
      { id: 'srv-bs-2', name: 'Ultrasonic Teeth Cleaning & Polishing', durationMinutes: 45, fee: 1200, category: 'Hygiene', description: 'Gentle ultrasonic plaque debridement and stain-free airflow polishing.' },
      { id: 'srv-bs-3', name: 'Orthodontic & Clear Aligner Assessment', durationMinutes: 30, fee: 800, category: 'Orthodontics', description: '3D digital bite simulation and malocclusion aligner evaluation.' },
      { id: 'srv-bs-4', name: 'Dental Follow-up & Splint Review', durationMinutes: 20, fee: 400, category: 'Follow-up', description: 'Retainer checkup, minor occlusal adjustment, and healing evaluation.' }
    ]
  },
  {
    id: 'clinic-skinspring',
    slug: 'skinspring-dermatology-clinic',
    name: 'SkinSpring Dermatology Clinic',
    tagline: 'Evidence-Based Clinical Dermatology & Clinical Skin Care',
    specialty: 'Dermatology',
    specialties: ['Dermatology', 'Clinical Skin Care', 'Trichology'],
    description: 'Expert medical dermatology practice providing targeted clinical protocols for acne, psoriasis, hair restoration, eczema, and dermatosurgical assessments.',
    logo: '✨',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    address: 'Shop 8, Jubilee Crest, Road 36',
    locality: 'Jubilee Hills',
    city: 'Hyderabad',
    phone: '+91 98660 89012',
    email: 'contact@skinspring.demo',
    ownerName: 'Dr. Ananya Rao, MD DVL',
    status: 'Active',
    subscriptionPlanId: 'starter',
    trialEndsAt: '2026-11-08T00:00:00.000Z',
    isTrial: true,
    operatingHours: 'Tue - Sun: 10:00 AM - 07:00 PM',
    bookingPolicy: 'Skin patch test conducted prior to procedural treatments. 24-hr advance notice for peel sessions.',
    consultationFeeRange: '₹700 - ₹1,200',
    rating: 4.9,
    reviewsCount: 192,
    nextAvailableSlot: 'Tomorrow, 11:30 AM',
    sampleReviews: [
      { patientName: 'Divya Reddy', rating: 5, comment: 'Dr. Ananya Rao accurately diagnosed my stubborn contact dermatitis within 10 minutes.', date: '2026-10-12' }
    ],
    branches: [
      {
        id: 'branch-skinspring-main',
        clinicId: 'clinic-skinspring',
        name: 'Jubilee Hills Center',
        code: 'SS-JH',
        address: 'Shop 8, Jubilee Crest, Road 36',
        city: 'Hyderabad',
        phone: '+91 98660 89012',
        email: 'jubilee@skinspring.demo',
        operatingHours: '10:00 AM - 07:00 PM',
        isMain: true,
        activeDoctorsCount: 1
      }
    ],
    services: [
      { id: 'srv-ss-1', name: 'Clinical Dermatology Consultation', durationMinutes: 25, fee: 900, category: 'Consultation', description: 'Diagnostic evaluation of skin, scalp, dermis, and allergic conditions.' },
      { id: 'srv-ss-2', name: 'Comprehensive Skin & Scalp Assessment', durationMinutes: 40, fee: 1200, category: 'Diagnostics', description: 'Trichoscopy, mole mapping, and tailored therapeutic skin barrier plan.' },
      { id: 'srv-ss-3', name: 'Skin Follow-up & Prescription Refill', durationMinutes: 15, fee: 700, category: 'Follow-up', description: 'Medication response check for acne, eczema, or psoriasis maintenance.' }
    ]
  },
  {
    id: 'clinic-movewell',
    slug: 'movewell-orthopedic-physiotherapy',
    name: 'MoveWell Orthopedic and Physiotherapy Centre',
    tagline: 'Orthopedics, Physical Therapy & Sports Injury Assessment',
    specialty: 'Orthopedics',
    specialties: ['Orthopedics', 'Physiotherapy', 'Sports Injury Assessment'],
    description: 'Integrated musculoskeletal care center featuring ultrasound-guided joint care, sports injury biomechanical evaluations, and personalized manual physical therapy.',
    logo: '🦴',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
    address: 'Plot 104, Sector 18, Commercial Hub',
    locality: 'Vashi',
    city: 'Navi Mumbai',
    phone: '+91 98210 23456',
    email: 'reception@movewell.demo',
    ownerName: 'Dr. Vikram Patil, MS Ortho',
    status: 'Active',
    subscriptionPlanId: 'professional',
    trialEndsAt: '2026-11-22T00:00:00.000Z',
    isTrial: false,
    operatingHours: 'Mon - Sat: 08:00 AM - 08:00 PM',
    bookingPolicy: 'Please bring previous X-rays or MRI scans. Comfortable loose attire recommended.',
    consultationFeeRange: '₹600 - ₹1,400',
    rating: 4.8,
    reviewsCount: 143,
    nextAvailableSlot: 'Today, 04:15 PM',
    sampleReviews: [
      { patientName: 'Rahul Chawla', rating: 5, comment: 'Dr. Vikram Patil and Meera Nair helped me recover from an ACL tear ahead of schedule.', date: '2026-10-17' }
    ],
    branches: [
      {
        id: 'branch-movewell-main',
        clinicId: 'clinic-movewell',
        name: 'Vashi Orthopedic & Rehab Hub',
        code: 'MW-VSH',
        address: 'Plot 104, Sector 18, Commercial Hub',
        city: 'Navi Mumbai',
        phone: '+91 98210 23456',
        email: 'vashi@movewell.demo',
        operatingHours: '08:00 AM - 08:00 PM',
        isMain: true,
        activeDoctorsCount: 2
      }
    ],
    services: [
      { id: 'srv-mw-1', name: 'Orthopedic Specialist Consultation', durationMinutes: 30, fee: 1000, category: 'Consultation', description: 'Clinical examination of bones, joints, spine, ligaments, and gait.' },
      { id: 'srv-mw-2', name: 'Sports Injury & Biomechanical Assessment', durationMinutes: 45, fee: 1400, category: 'Sports Rehab', description: 'In-depth kinetic chain analysis, ligament stability, and return-to-play timeline.' },
      { id: 'srv-mw-3', name: 'Targeted Physiotherapy Session', durationMinutes: 45, fee: 800, category: 'Physiotherapy', description: 'Hands-on manual therapy, therapeutic dry needling, and targeted rehab exercises.' },
      { id: 'srv-mw-4', name: 'Orthopedic Follow-up & Range of Motion', durationMinutes: 20, fee: 600, category: 'Follow-up', description: 'Post-cast removal checkup, joint flexion assessment, and exercise progression.' }
    ]
  }
];

export const DEMO_DOCTORS: Doctor[] = [
  {
    id: 'doc-aarav-mehta',
    doctorIdNumber: 'DOC-101',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    branchIds: ['branch-citycare-main'],
    name: 'Dr. Aarav Mehta',
    specialty: 'General Medicine & Internal Health',
    qualifications: 'MBBS, MD (General Medicine)',
    registrationNumber: 'MDC-2012-08819',
    experienceYears: 12,
    consultationFee: 600,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    email: 'aarav.mehta@citycare.demo',
    phone: '+91 98220 11223',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '09:00 AM - 01:00 PM, 04:30 PM - 07:30 PM',
    appointmentDurationMinutes: 30,
    breaks: '01:00 PM - 02:00 PM',
    status: 'Active',
    rating: 4.9,
    reviewsCount: 112,
    bio: 'Dedicated primary care physician with 12 years of clinical experience managing hypertension, diabetes, seasonal infectious ailments, and preventive wellness for entire families.',
    createdAt: '2025-01-10'
  },
  {
    id: 'doc-neha-kulkarni',
    doctorIdNumber: 'DOC-102',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    branchIds: ['branch-citycare-main'],
    name: 'Dr. Neha Kulkarni',
    specialty: 'Family Medicine & Preventive Healthcare',
    qualifications: 'MBBS, DNB (Family Medicine)',
    registrationNumber: 'MDC-2015-04192',
    experienceYears: 9,
    consultationFee: 700,
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80',
    email: 'neha.kulkarni@citycare.demo',
    phone: '+91 98220 33445',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    workingHours: '10:00 AM - 02:00 PM, 05:00 PM - 08:00 PM',
    appointmentDurationMinutes: 30,
    breaks: '02:00 PM - 03:00 PM',
    status: 'Active',
    rating: 4.8,
    reviewsCount: 88,
    bio: 'Specialist in holistic family wellness, women health, adolescent medicine, and geriatric chronic care management.',
    createdAt: '2025-03-15'
  },
  {
    id: 'doc-rohan-deshmukh',
    doctorIdNumber: 'DOC-201',
    clinicId: 'clinic-heartwell',
    clinicName: 'HeartWell Cardiology Centre',
    branchIds: ['branch-heartwell-main'],
    name: 'Dr. Rohan Deshmukh',
    specialty: 'Interventional Cardiology & Preventive Cardiac Care',
    qualifications: 'MBBS, MD, DM (Cardiology), FACC',
    registrationNumber: 'MMC-2008-01129',
    experienceYears: 16,
    consultationFee: 1200,
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
    email: 'rohan.deshmukh@heartwell.demo',
    phone: '+91 98200 11992',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    workingHours: '09:30 AM - 01:30 PM, 04:00 PM - 06:30 PM',
    appointmentDurationMinutes: 30,
    breaks: '01:30 PM - 03:30 PM',
    status: 'Active',
    rating: 4.9,
    reviewsCount: 164,
    bio: 'Renowned cardiologist with extensive expertise in preventive lipidology, non-invasive coronary artery disease assessment, and pacemaker follow-ups.',
    createdAt: '2025-01-05'
  },
  {
    id: 'doc-isha-shah',
    doctorIdNumber: 'DOC-301',
    clinicId: 'clinic-brightsmile',
    clinicName: 'BrightSmile Dental Studio',
    branchIds: ['branch-brightsmile-main'],
    name: 'Dr. Isha Shah',
    specialty: 'General Dentistry & Orthodontics',
    qualifications: 'BDS, MDS (Orthodontics & Dentofacial Orthopedics)',
    registrationNumber: 'KDC-2014-07721',
    experienceYears: 10,
    consultationFee: 800,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    email: 'isha.shah@brightsmile.demo',
    phone: '+91 98450 66778',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
    workingHours: '10:00 AM - 02:00 PM, 04:30 PM - 08:00 PM',
    appointmentDurationMinutes: 30,
    status: 'Active',
    rating: 4.9,
    reviewsCount: 120,
    bio: 'Expert in certified invisible aligners, aesthetic ceramic braces, smile makeovers, and minimally invasive preventative dental therapies.',
    createdAt: '2025-02-12'
  },
  {
    id: 'doc-kunal-joshi',
    doctorIdNumber: 'DOC-302',
    clinicId: 'clinic-brightsmile',
    clinicName: 'BrightSmile Dental Studio',
    branchIds: ['branch-brightsmile-main'],
    name: 'Dr. Kunal Joshi',
    specialty: 'Endodontics & Conservative Dentistry',
    qualifications: 'BDS, MDS (Conservative Dentistry & Endodontics)',
    registrationNumber: 'KDC-2013-09431',
    experienceYears: 11,
    consultationFee: 700,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    email: 'kunal.joshi@brightsmile.demo',
    phone: '+91 98450 44556',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    workingHours: '09:30 AM - 01:30 PM, 04:00 PM - 07:30 PM',
    appointmentDurationMinutes: 30,
    status: 'Active',
    rating: 4.8,
    reviewsCount: 94,
    bio: 'Specialist in microscopic painless single-sitting root canals, aesthetic composite restorations, and digital dental crowns.',
    createdAt: '2025-03-20'
  },
  {
    id: 'doc-ananya-rao',
    doctorIdNumber: 'DOC-401',
    clinicId: 'clinic-skinspring',
    clinicName: 'SkinSpring Dermatology Clinic',
    branchIds: ['branch-skinspring-main'],
    name: 'Dr. Ananya Rao',
    specialty: 'Clinical Dermatology & Trichology',
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    registrationNumber: 'TSMC-2011-03221',
    experienceYears: 13,
    consultationFee: 900,
    avatar: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=400&q=80',
    email: 'ananya.rao@skinspring.demo',
    phone: '+91 98660 77889',
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    workingHours: '10:30 AM - 02:30 PM, 04:30 PM - 07:00 PM',
    appointmentDurationMinutes: 25,
    status: 'Active',
    rating: 4.9,
    reviewsCount: 145,
    bio: 'Distinguished clinical dermatologist specializing in chronic psoriasis management, recalcitrant acne, hair restoration, and diagnostic dermoscopy.',
    createdAt: '2025-01-22'
  },
  {
    id: 'doc-vikram-patil',
    doctorIdNumber: 'DOC-501',
    clinicId: 'clinic-movewell',
    clinicName: 'MoveWell Orthopedic and Physiotherapy Centre',
    branchIds: ['branch-movewell-main'],
    name: 'Dr. Vikram Patil',
    specialty: 'Orthopedic Surgery & Sports Injury Assessment',
    qualifications: 'MBBS, MS (Orthopedics), Fellowship in Arthroscopy (Germany)',
    registrationNumber: 'MMC-2009-08821',
    experienceYears: 15,
    consultationFee: 1000,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    email: 'vikram.patil@movewell.demo',
    phone: '+91 98210 55667',
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
    workingHours: '09:00 AM - 01:00 PM, 05:00 PM - 08:00 PM',
    appointmentDurationMinutes: 30,
    status: 'Active',
    rating: 4.9,
    reviewsCount: 130,
    bio: 'Senior orthopedic specialist focusing on knee & shoulder arthroscopy, ligament reconstruction, degenerative joint arthritis, and fracture trauma management.',
    createdAt: '2025-01-18'
  },
  {
    id: 'doc-meera-nair',
    doctorIdNumber: 'DOC-502',
    clinicId: 'clinic-movewell',
    clinicName: 'MoveWell Orthopedic and Physiotherapy Centre',
    branchIds: ['branch-movewell-main'],
    name: 'Dr. Meera Nair',
    specialty: 'Physiotherapy & Musculoskeletal Sports Rehab',
    qualifications: 'BPT, MPT (Sports Musculoskeletal Physiotherapy)',
    registrationNumber: 'MMPT-2016-04412',
    experienceYears: 8,
    consultationFee: 700,
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80',
    email: 'meera.nair@movewell.demo',
    phone: '+91 98210 77889',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHours: '08:00 AM - 12:30 PM, 03:30 PM - 07:30 PM',
    appointmentDurationMinutes: 45,
    status: 'Active',
    rating: 4.8,
    reviewsCount: 96,
    bio: 'Lead physical therapist specializing in sports injury kinetics, manual joint mobilization, posture correction, and post-operative orthopedic recovery.',
    createdAt: '2025-04-10'
  }
];

export const DEMO_RECEPTIONISTS: Receptionist[] = [
  {
    id: 'rec-shweta',
    staffIdNumber: 'REC-101',
    clinicId: 'clinic-citycare',
    branchIds: ['branch-citycare-main'],
    name: 'Shweta Kulkarni',
    email: 'reception@citycare.demo',
    phone: '+91 98220 55667',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    shift: 'Full Day (09:00 - 18:00)',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    permissions: [
      'register_patients',
      'manage_appointments',
      'check_in_patients',
      'view_patient_feedback',
      'view_reports'
    ],
    status: 'Active',
    joiningDate: '2025-02-01',
    createdAt: '2025-02-01'
  },
  {
    id: 'rec-priya',
    staffIdNumber: 'REC-301',
    clinicId: 'clinic-brightsmile',
    branchIds: ['branch-brightsmile-main'],
    name: 'Priya Nair',
    email: 'frontdesk@brightsmile.demo',
    phone: '+91 98450 77889',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    shift: 'Morning (08:00 - 16:00)',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    permissions: ['register_patients', 'manage_appointments', 'check_in_patients'],
    status: 'Active',
    joiningDate: '2025-06-15',
    createdAt: '2025-06-15'
  },
  {
    id: 'rec-rahul',
    staffIdNumber: 'REC-201',
    clinicId: 'clinic-heartwell',
    branchIds: ['branch-heartwell-main'],
    name: 'Rahul Verma',
    email: 'frontdesk@heartwell.demo',
    phone: '+91 98200 88990',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    shift: 'Evening (12:00 - 20:00)',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    permissions: ['register_patients', 'manage_appointments', 'check_in_patients'],
    status: 'Active',
    joiningDate: '2025-08-01',
    createdAt: '2025-08-01'
  }
];

export const DEMO_PATIENT_FEEDBACK: PatientFeedback[] = [
  {
    id: 'fb-101',
    referenceNumber: 'FB-2601',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    branchName: 'Downtown Dental Studio',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    patientEmail: 'aarav.patel@example.demo',
    appointmentId: 'apt-2601',
    appointmentRef: 'APT-2601',
    category: 'Doctor Care',
    rating: 5,
    message: 'Dr. Arvind Rao performed a painless root canal procedure. The 3D digital imaging explanation before starting gave me immense comfort. Clinic hygiene was truly exemplary.',
    suggestions: 'Keep the warm herbal tea in the waiting lounge available in late afternoons as well.',
    status: 'Resolved',
    resolutionNote: 'Thank you Aarav for your kind words! We have restocked our afternoon refreshment bar and shared your compliment with Dr. Rao.',
    submittedAt: '2026-10-21T11:45:00.000Z',
    updatedAt: '2026-10-21T16:20:00.000Z'
  },
  {
    id: 'fb-102',
    referenceNumber: 'FB-2602',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    branchName: 'Downtown Dental Studio',
    patientId: 'pt-1042',
    patientName: 'Ananya Iyer',
    patientPhone: '+91 98765 43211',
    patientEmail: 'ananya.iyer@example.demo',
    appointmentId: 'apt-2602',
    appointmentRef: 'APT-2602',
    category: 'Waiting Time',
    rating: 3,
    message: 'Doctor was brilliant and very thorough, but I had to wait 28 minutes past my scheduled 11:30 AM appointment time. Please improve appointment scheduling buffers.',
    suggestions: 'Send an automated WhatsApp notification if a doctor is running more than 15 minutes late.',
    status: 'Reviewed',
    submittedAt: '2026-10-22T14:10:00.000Z',
    updatedAt: '2026-10-22T17:30:00.000Z'
  },
  {
    id: 'fb-103',
    referenceNumber: 'FB-2603',
    clinicId: 'clinic-citycare',
    branchId: 'branch-apex-westside',
    branchName: 'Westside Pediatric & Ortho Wing',
    patientId: 'pt-1043',
    patientName: 'Vikram Malhotra',
    patientPhone: '+91 98765 43212',
    patientEmail: 'vikram.m@example.demo',
    appointmentId: 'apt-2603',
    appointmentRef: 'APT-2603',
    category: 'Reception & Staff',
    rating: 4,
    message: 'Warm welcome at the reception counter. Digital check-in was very fast via tablet. Staff guided me immediately to the aligner scanning room.',
    suggestions: 'Add clearer parking signage near the basement entrance ramp.',
    status: 'New',
    submittedAt: '2026-10-23T09:15:00.000Z',
    updatedAt: '2026-10-23T09:15:00.000Z'
  },
  {
    id: 'fb-104',
    referenceNumber: 'FB-2604',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    branchName: 'Downtown Dental Studio',
    patientId: 'pt-1044',
    patientName: 'Meera Nambiar',
    patientPhone: '+91 98765 43213',
    patientEmail: 'meera.n@example.demo',
    category: 'Billing & Value',
    rating: 5,
    message: 'Transparent pricing with no surprise charges. Received digital invoice and tax summary instantly on WhatsApp before leaving the desk.',
    suggestions: 'None, fantastic experience!',
    status: 'Resolved',
    resolutionNote: 'Thank you Meera! We take pride in 100% upfront digital billing.',
    submittedAt: '2026-10-19T16:00:00.000Z',
    updatedAt: '2026-10-20T10:00:00.000Z'
  },
  {
    id: 'fb-105',
    referenceNumber: 'FB-2605',
    clinicId: 'clinic-citycare',
    branchId: 'branch-apex-westside',
    branchName: 'Westside Pediatric & Ortho Wing',
    patientId: 'pt-1045',
    patientName: 'Kabir Joshi',
    patientPhone: '+91 98765 43214',
    patientEmail: 'kabir.j@example.demo',
    category: 'Clinic Cleanliness',
    rating: 5,
    message: 'Sterilization standards are top tier. You can see the sealed autoclave pouches opened right in front of you. Extremely reassuring for dental treatments.',
    suggestions: 'Keep it up!',
    status: 'New',
    submittedAt: '2026-10-23T12:00:00.000Z',
    updatedAt: '2026-10-23T12:00:00.000Z'
  },
  {
    id: 'fb-106',
    referenceNumber: 'FB-2606',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    branchName: 'Downtown Dental Studio',
    patientId: 'pt-1046',
    patientName: 'Sunita Nair',
    patientPhone: '+91 98765 43215',
    patientEmail: 'sunita.n@example.demo',
    category: 'General Experience',
    rating: 4,
    message: 'Overall a very seamless experience. The prescription QR code worked smoothly at the pharmacy next door.',
    suggestions: 'Allow online payments via UPI directly inside the patient portal.',
    status: 'Reviewed',
    submittedAt: '2026-10-20T14:30:00.000Z',
    updatedAt: '2026-10-21T09:00:00.000Z'
  },
  {
    id: 'fb-201',
    referenceNumber: 'FB-3001',
    clinicId: 'clinic-pulse-ortho',
    branchId: 'branch-pulse-main',
    branchName: 'Pulse Main Orthopedic Center',
    patientId: 'pt-2001',
    patientName: 'Ramesh Kulkarni',
    patientPhone: '+91 98450 99881',
    patientEmail: 'ramesh.k@example.demo',
    category: 'Doctor Care',
    rating: 5,
    message: 'Dr. Rohan Iyer evaluated my knee MRI thoroughly. Great conservative physiotherapy approach before considering surgery.',
    status: 'New',
    submittedAt: '2026-10-22T10:00:00.000Z',
    updatedAt: '2026-10-22T10:00:00.000Z'
  }
];

export const DEMO_FEEDBACK_NOTES: FeedbackInternalNote[] = [
  {
    id: 'note-1',
    feedbackId: 'fb-101',
    clinicId: 'clinic-citycare',
    authorStaffId: 'usr-clinicadmin-apex',
    authorStaffName: 'Dr. Arvind Rao, MDS',
    authorRole: 'Clinic Admin / Doctor',
    note: 'Acknowledged compliment with clinical team. Patient was treated with single-sitting rotary endodontics.',
    createdAt: '2026-10-21T14:00:00.000Z'
  },
  {
    id: 'note-2',
    feedbackId: 'fb-101',
    clinicId: 'clinic-citycare',
    authorStaffId: 'rec-shweta',
    authorStaffName: 'Shweta Kulkarni',
    authorRole: 'Head Receptionist',
    note: 'Follow-up WhatsApp message sent confirming recovery. Patient requested afternoon appointments for next phase.',
    createdAt: '2026-10-21T16:15:00.000Z'
  },
  {
    id: 'note-3',
    feedbackId: 'fb-102',
    clinicId: 'clinic-citycare',
    authorStaffId: 'usr-clinicadmin-apex',
    authorStaffName: 'Dr. Arvind Rao, MDS',
    authorRole: 'Clinic Admin / Doctor',
    note: 'An emergency trauma patient arrived at 11:15 AM requiring immediate local hemostasis, which pushed back subsequent morning slots.',
    createdAt: '2026-10-22T15:20:00.000Z'
  },
  {
    id: 'note-4',
    feedbackId: 'fb-102',
    clinicId: 'clinic-citycare',
    authorStaffId: 'rec-shweta',
    authorStaffName: 'Shweta Kulkarni',
    authorRole: 'Head Receptionist',
    note: 'Called Ananya to convey clinical apologies and offered a 10% courtesy waiver on upcoming dental hygiene visit.',
    createdAt: '2026-10-22T17:25:00.000Z'
  }
];

export const DEMO_FEEDBACK_ACTIVITIES: FeedbackActivity[] = [
  {
    id: 'act-fb-1',
    feedbackId: 'fb-101',
    clinicId: 'clinic-citycare',
    action: 'Feedback submitted by patient (Rating: 5 Stars)',
    actorName: 'Aarav Patel',
    actorRole: 'Patient',
    timestamp: '2026-10-21 11:45 AM'
  },
  {
    id: 'act-fb-2',
    feedbackId: 'fb-101',
    clinicId: 'clinic-citycare',
    action: 'Status updated to Reviewed',
    actorName: 'Shweta Kulkarni',
    actorRole: 'Head Receptionist',
    timestamp: '2026-10-21 02:05 PM'
  },
  {
    id: 'act-fb-3',
    feedbackId: 'fb-101',
    clinicId: 'clinic-citycare',
    action: 'Internal staff note added',
    actorName: 'Dr. Arvind Rao, MDS',
    actorRole: 'Clinic Admin / Doctor',
    timestamp: '2026-10-21 02:10 PM'
  },
  {
    id: 'act-fb-4',
    feedbackId: 'fb-101',
    clinicId: 'clinic-citycare',
    action: 'Status updated to Resolved with patient resolution note',
    actorName: 'Dr. Arvind Rao, MDS',
    actorRole: 'Clinic Admin / Doctor',
    timestamp: '2026-10-21 04:20 PM'
  },
  {
    id: 'act-fb-5',
    feedbackId: 'fb-102',
    clinicId: 'clinic-citycare',
    action: 'Feedback submitted by patient (Rating: 3 Stars)',
    actorName: 'Ananya Iyer',
    actorRole: 'Patient',
    timestamp: '2026-10-22 02:10 PM'
  },
  {
    id: 'act-fb-6',
    feedbackId: 'fb-102',
    clinicId: 'clinic-citycare',
    action: 'Status updated to Reviewed',
    actorName: 'Shweta Kulkarni',
    actorRole: 'Head Receptionist',
    timestamp: '2026-10-22 05:30 PM'
  }
];

export const DEMO_PATIENTS: Patient[] = [
  {
    id: 'pt-1041',
    clinicId: 'clinic-citycare',
    patientIdNumber: 'PT-1041',
    name: 'Aarav Patel',
    email: 'aarav.patel@example.demo',
    phone: '+91 98765 43210',
    dob: '1992-06-14',
    gender: 'Male',
    bloodGroup: 'B+',
    allergies: ['Penicillin', 'Sulfa drugs'],
    medicalHistory: 'Mild hypertension controlled with dietary lifestyle. No diabetic history.',
    address: '402 Sunrise Heights, Bandra West, Mumbai',
    emergencyContact: 'Sunita Patel (Spouse) - +91 98765 43219',
<<<<<<< HEAD
    emergencyContactDetails: {
      name: 'Sunita Patel',
      relationship: 'Spouse',
      phone: '+91 98765 43219',
      alternatePhone: '+91 98765 43220',
      email: 'sunita.patel@example.demo',
      address: '402 Sunrise Heights, Bandra West, Mumbai',
      isAuthorizedToMakeDecisions: true
    },
    emergencyMedicalDetails: {
      bloodGroup: 'B+',
      allergies: ['Penicillin', 'Sulfa drugs'],
      chronicConditions: ['Mild Hypertension'],
      currentMedications: ['Telmisartan 20mg (Morning OD)', 'Multivitamin'],
      organDonor: true,
      primaryHospital: 'Lilavati Hospital & Research Centre, Bandra West',
      insuranceProvider: 'Star Health & Allied Insurance',
      policyNumber: 'SH-POL-2024-88910',
      specialInstructions: 'Allergic to penicillin class antibiotics; substitute with Macrolides (Azithromycin) or Clindamycin in emergency.'
    },
=======
>>>>>>> origin/main
    registeredAt: '2026-08-12',
    status: 'Active'
  },
  {
    id: 'pt-1042',
    clinicId: 'clinic-citycare',
    patientIdNumber: 'PT-1042',
    name: 'Meera Deshmukh',
    email: 'meera.deshmukh@example.demo',
    phone: '+91 98111 22334',
    dob: '1987-11-23',
    gender: 'Female',
    bloodGroup: 'O+',
    allergies: ['Latex'],
    medicalHistory: 'Chronic migraine, prior dental crown lower right first molar (2022).',
    address: 'Flat 12, Gulmohar Apartments, Dadar, Mumbai',
    emergencyContact: 'Rajesh Deshmukh - +91 98111 22339',
<<<<<<< HEAD
    emergencyContactDetails: {
      name: 'Rajesh Deshmukh',
      relationship: 'Husband',
      phone: '+91 98111 22339',
      alternatePhone: '+91 98111 22340',
      email: 'rajesh.deshmukh@example.demo',
      address: 'Flat 12, Gulmohar Apartments, Dadar, Mumbai',
      isAuthorizedToMakeDecisions: true
    },
    emergencyMedicalDetails: {
      bloodGroup: 'O+',
      allergies: ['Latex'],
      chronicConditions: ['Chronic Migraine'],
      currentMedications: ['Sumatriptan 50mg (SOS)'],
      organDonor: false,
      primaryHospital: 'Hinduja Healthcare Surgical, Khar',
      insuranceProvider: 'HDFC ERGO General Insurance',
      policyNumber: 'HDFC-MED-99412',
      specialInstructions: 'Strict non-latex gloves and rubber dam consumables required during dental procedures.'
    },
=======
>>>>>>> origin/main
    registeredAt: '2026-09-03',
    status: 'Active'
  },
  {
    id: 'pt-1043',
    clinicId: 'clinic-citycare',
    patientIdNumber: 'PT-1043',
    name: 'Vikram Sethi',
    email: 'vikram.sethi@example.demo',
    phone: '+91 99223 34455',
    dob: '1979-03-08',
    gender: 'Male',
    bloodGroup: 'A+',
    allergies: [],
    medicalHistory: 'Asthma on PRN inhaler. No known medication allergies.',
    address: 'Rowhouse 4, Green Pines, Andheri East, Mumbai',
    emergencyContact: 'Ananya Sethi - +91 99223 34459',
<<<<<<< HEAD
    emergencyContactDetails: {
      name: 'Ananya Sethi',
      relationship: 'Spouse',
      phone: '+91 99223 34459',
      email: 'ananya.sethi@example.demo',
      isAuthorizedToMakeDecisions: true
    },
    emergencyMedicalDetails: {
      bloodGroup: 'A+',
      allergies: [],
      chronicConditions: ['Bronchial Asthma'],
      currentMedications: ['Budecort Inhaler 200mcg (PRN)'],
      organDonor: true,
      primaryHospital: 'Nanavati Super Speciality Hospital, Vile Parle',
      insuranceProvider: 'ICICI Lombard Health Care',
      policyNumber: 'IL-HLTH-77123',
      specialInstructions: 'Patient carries rescue inhaler. Keep salbutamol nebulization ready if acute bronchospasm occurs.'
    },
=======
>>>>>>> origin/main
    registeredAt: '2026-09-20',
    status: 'Active'
  },
  {
    id: 'pt-1044',
    clinicId: 'clinic-citycare',
    patientIdNumber: 'PT-1044',
    name: 'Tanvi Nair',
    email: 'tanvi.nair@example.demo',
    phone: '+91 97334 55667',
    dob: '2001-09-15',
    gender: 'Female',
    bloodGroup: 'AB+',
    allergies: ['NSAIDs'],
    medicalHistory: 'Wisdom tooth impaction symptomatic since 2 weeks.',
    address: 'Hostel 3, University Campus, Kalina, Mumbai',
    emergencyContact: 'K. Nair (Father) - +91 97334 55660',
    registeredAt: '2026-10-18',
    status: 'Active'
  },
  {
    id: 'pt-1045',
    clinicId: 'clinic-citycare',
    patientIdNumber: 'PT-1045',
    name: 'Rohan Varma',
    email: 'rohan.varma@example.demo',
    phone: '+91 98445 66778',
    dob: '1995-12-04',
    gender: 'Male',
    bloodGroup: 'O-',
    allergies: [],
    medicalHistory: 'Routine dental prophylaxis and checkup.',
    address: 'B-601, Windchimes, Powai, Mumbai',
    emergencyContact: 'Pooja Varma - +91 98445 66770',
    registeredAt: '2026-10-22',
    status: 'Active'
  }
];

<<<<<<< HEAD
export const DEMO_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'fm-101',
    primaryPatientId: 'pt-1041',
    name: 'Sunita Patel',
    relationship: 'Wife',
    gender: 'Female',
    dob: '1994-03-21',
    bloodGroup: 'B+',
    phone: '+91 98765 43219',
    allergies: [],
    chronicConditions: [],
    currentMedications: ['Prenatal Iron & Calcium Supplement'],
    medicalNotes: 'Regular preventive dental checkups. All past procedures uneventful.',
    recordsCount: 2,
    records: [
      {
        id: 'frec-101',
        type: 'Consultation',
        title: 'Routine Comprehensive Dental Prophylaxis',
        doctorName: 'Dr. Arvind Rao, MDS',
        clinicName: 'CityCare Family Clinic & Implant Centre',
        date: '2026-09-15',
        summary: 'Supragingival scaling and polishing completed. Gingival health intact.',
        diagnosis: 'Healthy Periodontium / Grade 0 Plaque',
        status: 'Completed'
      },
      {
        id: 'frec-102',
        type: 'Prescription',
        title: 'Preventive Fluoride Rinse & Chlorhexidine',
        doctorName: 'Dr. Arvind Rao, MDS',
        clinicName: 'CityCare Family Clinic & Implant Centre',
        date: '2026-09-15',
        summary: '0.2% Chlorhexidine mouthwash twice daily for 7 days post-scaling.',
        status: 'Completed'
      }
    ],
    registeredAt: '2026-08-15'
  },
  {
    id: 'fm-102',
    primaryPatientId: 'pt-1041',
    name: 'Vihaan Patel',
    relationship: 'Son',
    gender: 'Male',
    dob: '2020-04-12',
    bloodGroup: 'B+',
    phone: '+91 98765 43210',
    allergies: ['Peanuts'],
    chronicConditions: ['Mild Childhood Bronchial Hyperreactivity'],
    currentMedications: ['Multivitamin Chewable Drops'],
    medicalNotes: 'Pediatric dental assessment shows primary dentition intact with zero caries.',
    recordsCount: 2,
    records: [
      {
        id: 'frec-103',
        type: 'Consultation',
        title: 'Pediatric Oral Health & Pit/Fissure Screening',
        doctorName: 'Dr. Arvind Rao, MDS',
        clinicName: 'CityCare Family Clinic & Implant Centre',
        date: '2026-07-20',
        summary: 'Preventive pit and fissure sealants applied on deciduous molars.',
        diagnosis: 'Caries-Free Pediatric Dentition',
        status: 'Completed'
      },
      {
        id: 'frec-104',
        type: 'Vaccination',
        title: 'Annual MMR Booster & Flu Inoculation',
        doctorName: 'Dr. Arvind Rao, MDS',
        clinicName: 'CityCare Family Clinic & Implant Centre',
        date: '2026-05-10',
        summary: 'Scheduled pediatric immunizations administered without adverse reaction.',
        status: 'Completed'
      }
    ],
    registeredAt: '2026-08-15'
  },
  {
    id: 'fm-103',
    primaryPatientId: 'pt-1041',
    name: 'Kavita Patel',
    relationship: 'Mother',
    gender: 'Female',
    dob: '1962-08-19',
    bloodGroup: 'O+',
    phone: '+91 98765 43288',
    allergies: ['NSAIDs / Ibuprofen'],
    chronicConditions: ['Hypertension', 'Bilateral Knee Osteoarthritis'],
    currentMedications: ['Amlodipine 5mg (Morning)', 'Glucosamine Sulfate'],
    medicalNotes: 'Senior wellness protocol. Avoid NSAIDs due to gastric sensitivity and kidney clearance.',
    recordsCount: 2,
    records: [
      {
        id: 'frec-105',
        type: 'Consultation',
        title: 'Geriatric Orthodontic & Periodontal Evaluation',
        doctorName: 'Dr. Arvind Rao, MDS',
        clinicName: 'CityCare Family Clinic & Implant Centre',
        date: '2026-08-04',
        summary: 'Deep periodontal debridement and subgingival irrigation.',
        diagnosis: 'Mild Chronic Adult Periodontitis',
        status: 'Completed'
      },
      {
        id: 'frec-106',
        type: 'Prescription',
        title: 'Antimicrobial Dental Gel & Desensitizing Paste',
        doctorName: 'Dr. Arvind Rao, MDS',
        clinicName: 'CityCare Family Clinic & Implant Centre',
        date: '2026-08-04',
        summary: 'Metronidazole gel application and potassium nitrate paste for 14 days.',
        status: 'Completed'
      }
    ],
    registeredAt: '2026-08-15'
  }
];

=======
>>>>>>> origin/main
export const DEMO_APPOINTMENTS: Appointment[] = [
  // 1. Scenario 1: Pending Request (Ready for receptionist to verify and confirm)
  {
    id: 'apt-req-001',
    requestId: 'REQ-2026-001',
    referenceNumber: 'APT-2601',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    branchId: 'branch-citycare-main',
    branchName: 'FC Road Main Clinic',
    doctorId: 'doc-aarav-mehta',
    doctorName: 'Dr. Aarav Mehta',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    patientEmail: 'aarav.patel@example.demo',
    serviceId: 'srv-cc-1',
    serviceName: 'General Consultation',
    consultationFee: 600,
    consultationType: 'First Consultation',
    requestedDate: '2026-10-24',
    requestedTime: '10:30 AM',
    date: '2026-10-24',
    time: '10:30 AM',
    durationMinutes: 30,
    status: 'Pending Clinic Confirmation',
    notes: 'Experiencing recurrent headaches, fatigue, and mild chest tightness after exercise.',
    patientAlternativePreferences: {
      secondPreferredDate: '2026-10-25',
      preferredTimeOfDay: 'Morning',
      noteForReceptionist: 'Prefers morning slot between 10:00 AM and 12:00 PM if available.'
    },
    responseHistory: [
      {
        id: 'aud-1',
        action: 'Booking request submitted by patient',
        timestamp: '2026-10-23 09:15 AM',
        actor: 'Aarav Patel (Patient)',
        notes: 'Requested preferred slot: 24 Oct 2026, 10:30 AM'
      }
    ],
    createdAt: '2026-10-23T09:15:00.000Z'
  },

  // 2. Scenario 2: Alternative Slot Proposed (Ready for patient to accept or decline)
  {
    id: 'apt-req-002',
    requestId: 'REQ-2026-002',
    referenceNumber: 'APT-2602',
    clinicId: 'clinic-heartwell',
    clinicName: 'HeartWell Cardiology Centre',
    branchId: 'branch-heartwell-main',
    branchName: 'BKC Cardiovascular Wing',
    doctorId: 'doc-rohan-deshmukh',
    doctorName: 'Dr. Rohan Deshmukh',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    patientEmail: 'aarav.patel@example.demo',
    serviceId: 'srv-hw-1',
    serviceName: 'Cardiology Specialist Consultation',
    consultationFee: 1200,
    consultationType: 'First Consultation',
    requestedDate: '2026-10-24',
    requestedTime: '11:00 AM',
    date: '2026-10-24',
    time: '11:00 AM',
    durationMinutes: 30,
    status: 'Alternative Slot Proposed',
    notes: 'Referred by family physician for resting ECG irregularity evaluation.',
    patientAlternativePreferences: {
      secondPreferredDate: '2026-10-24',
      preferredTimeOfDay: 'Afternoon',
      noteForReceptionist: 'Flexible after 03:00 PM if morning is occupied.'
    },
    proposedAlternatives: [
      {
        id: 'prop-alt-1',
        proposedDate: '2026-10-24',
        proposedTime: '03:30 PM',
        proposedDoctorId: 'doc-rohan-deshmukh',
        proposedDoctorName: 'Dr. Rohan Deshmukh',
        reason: 'Dr. Deshmukh has an emergency hospital catheterization lab procedure from 10:30 AM to 01:00 PM. Slot at 03:30 PM is reserved for your assessment.',
        proposedAt: '2026-10-23 11:30 AM',
        status: 'Pending'
      }
    ],
    responseHistory: [
      {
        id: 'aud-2a',
        action: 'Booking request submitted by patient',
        timestamp: '2026-10-23 10:00 AM',
        actor: 'Aarav Patel (Patient)'
      },
      {
        id: 'aud-2b',
        action: 'Alternative slot proposed by clinic receptionist',
        timestamp: '2026-10-23 11:30 AM',
        actor: 'Rahul Verma (Receptionist)',
        notes: 'Original 11:00 AM slot unavailable due to emergency Cath lab. Offered 03:30 PM.'
      }
    ],
    createdAt: '2026-10-23T10:00:00.000Z'
  },

  // 3. Scenario 3: Confirmed Appointment Upcoming
  {
    id: 'apt-req-003',
    requestId: 'REQ-2026-003',
    referenceNumber: 'APT-2603',
    clinicId: 'clinic-brightsmile',
    clinicName: 'BrightSmile Dental Studio',
    branchId: 'branch-brightsmile-main',
    branchName: 'Indiranagar Dental Studio',
    doctorId: 'doc-isha-shah',
    doctorName: 'Dr. Isha Shah',
    patientId: 'pt-1044',
    patientName: 'Tanvi Nair',
    patientPhone: '+91 97334 55667',
    patientEmail: 'tanvi.nair@example.demo',
    serviceId: 'srv-bs-3',
    serviceName: 'Orthodontic & Clear Aligner Assessment',
    consultationFee: 800,
    consultationType: 'Follow-up',
    requestedDate: '2026-10-24',
    requestedTime: '02:00 PM',
    confirmedDate: '2026-10-24',
    confirmedTime: '02:00 PM',
    date: '2026-10-24',
    time: '02:00 PM',
    durationMinutes: 30,
    status: 'Confirmed',
    notes: 'Clear aligner tray progression checkup step 8.',
    responseHistory: [
      {
        id: 'aud-3a',
        action: 'Booking request submitted',
        timestamp: '2026-10-22 04:00 PM',
        actor: 'Tanvi Nair'
      },
      {
        id: 'aud-3b',
        action: 'Slot verified and confirmed by receptionist',
        timestamp: '2026-10-22 04:30 PM',
        actor: 'Priya Nair (Receptionist)'
      }
    ],
    createdAt: '2026-10-22T16:00:00.000Z'
  },

  // 4. Scenario 5 (Part A): Patient Checked In (Waiting in Queue)
  {
    id: 'apt-req-004',
    requestId: 'REQ-2026-004',
    referenceNumber: 'APT-2604',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    branchId: 'branch-citycare-main',
    branchName: 'FC Road Main Clinic',
    doctorId: 'doc-aarav-mehta',
    doctorName: 'Dr. Aarav Mehta',
    patientId: 'pt-1042',
    patientName: 'Meera Deshmukh',
    patientPhone: '+91 98111 22334',
    patientEmail: 'meera.deshmukh@example.demo',
    serviceId: 'srv-cc-2',
    serviceName: 'Routine Health Assessment & Vitals Scan',
    consultationFee: 800,
    consultationType: 'First Consultation',
    requestedDate: '2026-10-24',
    requestedTime: '09:30 AM',
    confirmedDate: '2026-10-24',
    confirmedTime: '09:30 AM',
    date: '2026-10-24',
    time: '09:30 AM',
    durationMinutes: 45,
    status: 'Patient Checked In',
    queueNumber: '#Q-01',
    notes: 'Patient checked in at front desk, seated in waiting lounge.',
    responseHistory: [
      { id: 'aud-4a', action: 'Confirmed by receptionist', timestamp: '2026-10-23 03:00 PM', actor: 'Shweta Kulkarni' },
      { id: 'aud-4b', action: 'Patient arrived and checked in', timestamp: '2026-10-24 09:20 AM', actor: 'Shweta Kulkarni', notes: 'Assigned token #Q-01' }
    ],
    createdAt: '2026-10-23T15:00:00.000Z'
  },

  // 5. Scenario 5 (Part B): In Consultation with Doctor
  {
    id: 'apt-req-005',
    requestId: 'REQ-2026-005',
    referenceNumber: 'APT-2605',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    branchId: 'branch-citycare-main',
    branchName: 'FC Road Main Clinic',
    doctorId: 'doc-aarav-mehta',
    doctorName: 'Dr. Aarav Mehta',
    patientId: 'pt-1043',
    patientName: 'Vikram Sethi',
    patientPhone: '+91 99223 34455',
    patientEmail: 'vikram.sethi@example.demo',
    serviceId: 'srv-cc-1',
    serviceName: 'General Consultation',
    consultationFee: 600,
    consultationType: 'First Consultation',
    requestedDate: '2026-10-24',
    requestedTime: '10:00 AM',
    confirmedDate: '2026-10-24',
    confirmedTime: '10:00 AM',
    date: '2026-10-24',
    time: '10:00 AM',
    durationMinutes: 30,
    status: 'In Consultation',
    queueNumber: '#Q-02',
    notes: 'Doctor currently performing diagnostic examination in Chamber 1.',
    responseHistory: [
      { id: 'aud-5a', action: 'Appointment confirmed', timestamp: '2026-10-23 05:00 PM', actor: 'Shweta Kulkarni' },
      { id: 'aud-5b', action: 'Patient checked in', timestamp: '2026-10-24 09:50 AM', actor: 'Shweta Kulkarni' },
      { id: 'aud-5c', action: 'Doctor initiated consultation', timestamp: '2026-10-24 10:02 AM', actor: 'Dr. Aarav Mehta' }
    ],
    createdAt: '2026-10-23T17:00:00.000Z'
  },

  // 6. Scenario 5 (Part C): Completed Consultation
  {
    id: 'apt-req-006',
    requestId: 'REQ-2026-006',
    referenceNumber: 'APT-2598',
    clinicId: 'clinic-movewell',
    clinicName: 'MoveWell Orthopedic and Physiotherapy Centre',
    branchId: 'branch-movewell-main',
    branchName: 'Vashi Orthopedic & Rehab Hub',
    doctorId: 'doc-vikram-patil',
    doctorName: 'Dr. Vikram Patil',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    patientEmail: 'aarav.patel@example.demo',
    serviceId: 'srv-mw-2',
    serviceName: 'Sports Injury & Biomechanical Assessment',
    consultationFee: 1400,
    consultationType: 'First Consultation',
    requestedDate: '2026-10-22',
    requestedTime: '11:00 AM',
    confirmedDate: '2026-10-22',
    confirmedTime: '11:00 AM',
    date: '2026-10-22',
    time: '11:00 AM',
    durationMinutes: 45,
    status: 'Completed',
    notes: 'Right ankle grade-1 anterior talofibular sprain. Immobilized with pneumatic air-cast; follow-up scheduled.',
    responseHistory: [
      { id: 'aud-6a', action: 'Booking confirmed', timestamp: '2026-10-21 11:00 AM', actor: 'Receptionist' },
      { id: 'aud-6b', action: 'Consultation completed & digital Rx issued', timestamp: '2026-10-22 11:50 AM', actor: 'Dr. Vikram Patil' }
    ],
    createdAt: '2026-10-21T11:00:00.000Z'
  }
];

export const DEMO_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-2026-8812',
    prescriptionNumber: 'RX-2026-8812',
    verificationId: 'v_apex_8812a',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    doctorId: 'doc-arvind-rao',
    doctorName: 'Dr. Arvind Rao',
    doctorRegistration: 'MDC-2012-08819',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    patientAgeGender: '34 Yrs / Male',
    date: '2026-10-23',
    diagnosis: 'Acute Irreversible Pulpitis #37 (Lower left second molar)',
    vitals: {
      bp: '124/82 mmHg',
      pulse: '76 bpm',
      temp: '98.4 °F',
      weight: '72 kg'
    },
    medications: [
      {
        id: 'med-1',
        name: 'Amoxicillin + Potassium Clavulanate (Augmentin 625)',
        dosage: '625 mg',
        frequency: '1 tablet twice daily (1-0-1)',
        duration: '5 days',
        route: 'Oral, immediately after meals',
        instructions: 'Complete full course. Patient verified no penicillin hypersensitivity in clinical note.'
      },
      {
        id: 'med-2',
        name: 'Aceclofenac 100mg + Paracetamol 325mg (Zerodol-P)',
        dosage: '1 tablet',
        frequency: 'Twice daily as needed (1-0-1)',
        duration: '3 days',
        route: 'Oral, with milk or food',
        instructions: 'Take only when pain persists. Do not exceed prescribed daily dose.'
      },
      {
        id: 'med-3',
        name: 'Chlorhexidine Gluconate 0.2% Antiseptic Mouthrinse',
        dosage: '10 ml',
        frequency: 'Rinse for 60 seconds twice daily',
        duration: '7 days',
        route: 'Oral rinse',
        instructions: 'Do not eat or drink water for 30 minutes following oral rinse.'
      }
    ],
    additionalInstructions: 'Warm saline rinses starting tomorrow morning. Avoid biting hard food on the left side until obturation and permanent coronal restoration are completed.',
    followUpDate: '2026-10-28',
    status: 'Active',
    qrVerificationUrl: '/verify-prescription/v_apex_8812a',
    createdAt: '2026-10-23T11:00:00.000Z'
  },
  {
    id: 'rx-2026-8799',
    prescriptionNumber: 'RX-2026-8799',
    verificationId: 'v_apex_8799b',
    clinicId: 'clinic-citycare',
    branchId: 'branch-apex-westside',
    doctorId: 'doc-priya-sharma',
    doctorName: 'Dr. Priya Sharma',
    doctorRegistration: 'MDC-2016-04192',
    patientId: 'pt-1044',
    patientName: 'Tanvi Nair',
    patientAgeGender: '25 Yrs / Female',
    date: '2026-10-14',
    diagnosis: 'Class I Malocclusion with Moderate Anterior Crowding',
    vitals: {
      bp: '118/76 mmHg',
      pulse: '72 bpm',
      temp: '98.6 °F',
      weight: '54 kg'
    },
    medications: [
      {
        id: 'med-4',
        name: 'Orthodontic Relief Wax & Benzocaine 20% Oral Gel',
        dosage: 'Small dab',
        frequency: 'As needed on sore mucosal spots',
        duration: '10 days',
        route: 'Topical application',
        instructions: 'Apply gently over aligner attachment edges if irritation occurs.'
      }
    ],
    additionalInstructions: 'Wear aligners consistently for 22 hours per day. Switch to Aligner Tray #15 on day 10 as scheduled.',
    followUpDate: '2026-11-04',
    status: 'Active',
    qrVerificationUrl: '/verify-prescription/v_apex_8799b',
    createdAt: '2026-10-14T11:30:00.000Z'
  }
];

export const DEMO_INVOICES: Invoice[] = [
  {
    id: 'inv-2026-0391',
    invoiceNumber: 'INV-2026-0391',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    appointmentId: 'apt-001',
    date: '2026-10-23',
    dueDate: '2026-10-23',
    items: [
      { id: 'item-1', description: 'Single-Sitting Endodontic Therapy (#37)', quantity: 1, unitPrice: 4500, total: 4500 },
      { id: 'item-2', description: 'Digital RVG Diagnostic Radiographs (x2)', quantity: 2, unitPrice: 350, total: 700 }
    ],
    subtotal: 5200,
    discount: 200,
    tax: 0,
    totalAmount: 5000,
    amountPaid: 5000,
    status: 'Paid',
    paymentMethod: 'UPI / QR Payment'
  },
  {
    id: 'inv-2026-0392',
    invoiceNumber: 'INV-2026-0392',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    patientId: 'pt-1042',
    patientName: 'Meera Deshmukh',
    patientPhone: '+91 98111 22334',
    appointmentId: 'apt-002',
    date: '2026-10-23',
    dueDate: '2026-10-23',
    items: [
      { id: 'item-3', description: 'Comprehensive Dental Consultation & OPG', quantity: 1, unitPrice: 800, total: 800 }
    ],
    subtotal: 800,
    discount: 0,
    tax: 0,
    totalAmount: 800,
    amountPaid: 800,
    status: 'Paid',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'inv-2026-0388',
    invoiceNumber: 'INV-2026-0388',
    clinicId: 'clinic-citycare',
    branchId: 'branch-apex-westside',
    patientId: 'pt-1044',
    patientName: 'Tanvi Nair',
    patientPhone: '+91 97334 55667',
    appointmentId: 'apt-007',
    date: '2026-10-14',
    dueDate: '2026-10-28',
    items: [
      { id: 'item-4', description: 'Clear Aligner Orthodontic Treatment Trays (Installment 2/4)', quantity: 1, unitPrice: 25000, total: 25000 }
    ],
    subtotal: 25000,
    discount: 2000,
    tax: 0,
    totalAmount: 23000,
    amountPaid: 15000,
    status: 'Partially Paid',
    paymentMethod: 'Bank Transfer'
  }
];

export const DEMO_EXPENSES: Expense[] = [
  {
    id: 'exp-101',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    category: 'Supplies',
    description: 'Dental composite restorative kit & rotary NiTi endo files',
    amount: 14800,
    date: '2026-10-21',
    paymentMethod: 'Corporate Net Banking',
    vendorName: 'DentSupply Pharma Ltd',
    receiptNumber: 'DSP-88219'
  },
  {
    id: 'exp-102',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    category: 'Utilities',
    description: 'High-speed fiber medical internet & biomedical waste collection',
    amount: 4200,
    date: '2026-10-18',
    paymentMethod: 'UPI',
    vendorName: 'Metro Telecom & GreenWaste Services'
  },
  {
    id: 'exp-103',
    clinicId: 'clinic-citycare',
    branchId: 'branch-apex-westside',
    category: 'Equipment',
    description: 'Autoclave class B sterilization validation & sensor recalibration',
    amount: 8500,
    date: '2026-10-15',
    paymentMethod: 'Credit Card',
    vendorName: 'BioMed Tech Solutions'
  }
];

export const DEMO_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-item-1',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    name: 'Disposable Dental Examination Kits (Mirror, Probe, Tweezer)',
    sku: 'MED-KIT-01',
    category: 'Sterile Disposables',
    unit: 'Boxes (50 pcs)',
    batchNumber: 'BT-2026-081',
    expiryDate: '2028-06-30',
    currentStock: 18,
    minStockLevel: 5,
    costPerUnit: 650,
    supplier: 'CareLine Healthcare',
    status: 'In Stock',
    lastUpdated: '2026-10-22'
  },
  {
    id: 'inv-item-2',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    name: 'Articaine 4% Local Anesthetic with Adrenaline 1:100,000',
    sku: 'ANE-ART-02',
    category: 'Anesthetics',
    unit: 'Vials Pack (50)',
    batchNumber: 'BT-ART-992',
    expiryDate: '2026-12-15',
    currentStock: 3,
    minStockLevel: 6,
    costPerUnit: 1400,
    supplier: 'SeptoDent India',
    status: 'Low Stock',
    lastUpdated: '2026-10-20'
  },
  {
    id: 'inv-item-3',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    name: 'Sterile Surgical Latex Gloves (Size Medium)',
    sku: 'GLV-MED-03',
    category: 'PPE & Safety',
    unit: 'Boxes (100 pairs)',
    batchNumber: 'BT-GLV-414',
    expiryDate: '2027-11-20',
    currentStock: 12,
    minStockLevel: 8,
    costPerUnit: 420,
    supplier: 'SafetyFirst Medical',
    status: 'In Stock',
    lastUpdated: '2026-10-21'
  },
  {
    id: 'inv-item-4',
    clinicId: 'clinic-citycare',
    branchId: 'branch-apex-westside',
    name: 'Rotary Protaper Gold Endodontic Files Assorted (25mm)',
    sku: 'ENDO-PRO-04',
    category: 'Endodontics',
    unit: 'Packs (6 files)',
    batchNumber: 'BT-PRO-102',
    expiryDate: '2029-01-10',
    currentStock: 2,
    minStockLevel: 4,
    costPerUnit: 2200,
    supplier: 'Dentsply Sirona',
    status: 'Low Stock',
    lastUpdated: '2026-10-19'
  },
  {
    id: 'inv-item-5',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    name: 'Amoxicillin + Clavulanic Acid 625mg Tablets',
    sku: 'MED-AMX-05',
    category: 'Oral Antibiotics',
    unit: 'Boxes (10x10 strips)',
    batchNumber: 'BT-AMX-771',
    expiryDate: '2027-08-30',
    currentStock: 24,
    minStockLevel: 10,
    costPerUnit: 890,
    supplier: 'Sun Pharma Distribution',
    status: 'In Stock',
    lastUpdated: '2026-10-23'
  },
  {
    id: 'inv-item-6',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    name: 'Ketorolac Tromethamine 10mg Dispersible Tablets',
    sku: 'MED-KET-06',
    category: 'Analgesics',
    unit: 'Boxes (10x10 strips)',
    batchNumber: 'BT-KET-332',
    expiryDate: '2026-11-05',
    currentStock: 4,
    minStockLevel: 5,
    costPerUnit: 520,
    supplier: 'Cipla Therapeutics',
    status: 'Expiring Soon',
    lastUpdated: '2026-10-22'
  },
  {
    id: 'inv-item-7',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    name: 'Chlorhexidine Gluconate 0.2% Antiseptic Mouthrinse 150ml',
    sku: 'DEN-CHX-07',
    category: 'Oral Antiseptics',
    unit: 'Bottles (Carton of 24)',
    batchNumber: 'BT-CHX-509',
    expiryDate: '2027-03-31',
    currentStock: 15,
    minStockLevel: 6,
    costPerUnit: 960,
    supplier: 'ICPA Health Products',
    status: 'In Stock',
    lastUpdated: '2026-10-21'
  },
  {
    id: 'inv-item-8',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    name: 'Light Cure Universal Composite Resin Shade A2',
    sku: 'RES-FIL-08',
    category: 'Restorative',
    unit: 'Syringe 4g',
    batchNumber: 'BT-3M-119',
    expiryDate: '2026-10-30',
    currentStock: 1,
    minStockLevel: 3,
    costPerUnit: 1850,
    supplier: '3M Oral Care',
    status: 'Expiring Soon',
    lastUpdated: '2026-10-18'
  }
];

export const DEMO_INVENTORY_MOVEMENTS: InventoryMovement[] = [
  {
    id: 'mov-101',
    clinicId: 'clinic-citycare',
    itemId: 'inv-item-1',
    itemName: 'Disposable Dental Examination Kits (Mirror, Probe, Tweezer)',
    sku: 'MED-KIT-01',
    type: 'Receipt',
    quantity: 10,
    previousStock: 8,
    newStock: 18,
    reason: 'Fulfillment of PO-2026-088 from CareLine Healthcare',
    actor: 'Ramesh Verma (Inventory)',
    date: '2026-10-22 11:30'
  },
  {
    id: 'mov-102',
    clinicId: 'clinic-citycare',
    itemId: 'inv-item-2',
    itemName: 'Articaine 4% Local Anesthetic with Adrenaline 1:100,000',
    sku: 'ANE-ART-02',
    type: 'Dispensed',
    quantity: -2,
    previousStock: 5,
    newStock: 3,
    reason: 'Dispensed for Operatory 1 & 2 morning surgeries',
    actor: 'Shweta Kulkarni (Front Desk)',
    date: '2026-10-20 09:15'
  },
  {
    id: 'mov-103',
    clinicId: 'clinic-citycare',
    itemId: 'inv-item-6',
    itemName: 'Ketorolac Tromethamine 10mg Dispersible Tablets',
    sku: 'MED-KET-06',
    type: 'Adjustment',
    quantity: -1,
    previousStock: 5,
    newStock: 4,
    reason: 'Routine quarterly audit: 1 box found damaged in transit',
    actor: 'Ramesh Verma (Inventory)',
    date: '2026-10-22 16:45'
  },
  {
    id: 'mov-104',
    clinicId: 'clinic-citycare',
    itemId: 'inv-item-5',
    itemName: 'Amoxicillin + Clavulanic Acid 625mg Tablets',
    sku: 'MED-AMX-05',
    type: 'Receipt',
    quantity: 15,
    previousStock: 9,
    newStock: 24,
    reason: 'Replenishment delivery batch BT-AMX-771',
    actor: 'Ramesh Verma (Inventory)',
    date: '2026-10-23 14:00'
  }
];

export const DEMO_STOCK_REQUESTS: StockRequest[] = [
  {
    id: 'req-201',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    itemName: 'Articaine 4% Local Anesthetic with Adrenaline 1:100,000',
    sku: 'ANE-ART-02',
    quantity: 5,
    unit: 'Vials Pack (50)',
    urgency: 'Urgent',
    requestedBy: 'Shweta Kulkarni',
    department: 'Reception / Operatory 1',
    requestedDate: '2026-10-23',
    status: 'Pending',
    notes: 'Only 3 packs remaining; multiple molar extractions scheduled tomorrow.'
  },
  {
    id: 'req-202',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    itemName: 'Light Cure Universal Composite Resin Shade A2',
    sku: 'RES-FIL-08',
    quantity: 4,
    unit: 'Syringe 4g',
    urgency: 'Routine',
    requestedBy: 'Dr. अरविंद राव',
    department: 'Operatory 2 (Cosmetic)',
    requestedDate: '2026-10-21',
    status: 'Approved',
    notes: 'Approved by Ramesh Verma. PO sent to 3M Oral Care.'
  },
  {
    id: 'req-203',
    clinicId: 'clinic-citycare',
    branchId: 'branch-apex-westside',
    itemName: 'Rotary Protaper Gold Endodontic Files Assorted (25mm)',
    sku: 'ENDO-PRO-04',
    quantity: 6,
    unit: 'Packs (6 files)',
    urgency: 'Urgent',
    requestedBy: 'Dr. Priya Nair',
    department: 'Endodontics Westside',
    requestedDate: '2026-10-22',
    status: 'Pending',
    notes: 'Low stock notification received.'
  }
];

export const DEMO_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    clinicId: 'clinic-citycare',
    name: 'CareLine Healthcare Logistics',
    contactPerson: 'Anand Kulkarni',
    email: 'orders@careline.in',
    phone: '+91 98200 44112',
    city: 'Mumbai',
    categories: ['Sterile Disposables', 'Surgical Packs', 'PPE'],
    paymentTerms: 'Net 30 Days',
    rating: 4.8,
    activeOrdersCount: 1
  },
  {
    id: 'sup-2',
    clinicId: 'clinic-citycare',
    name: 'SeptoDent India Pvt Ltd',
    contactPerson: 'Deepak Merchant',
    email: 'supply@septodent.co.in',
    phone: '+91 98111 22334',
    city: 'Pune',
    categories: ['Anesthetics', 'Syringes', 'Needles'],
    paymentTerms: 'Net 15 Days',
    rating: 4.9,
    activeOrdersCount: 1
  },
  {
    id: 'sup-3',
    clinicId: 'clinic-citycare',
    name: 'Sun Pharma Distribution',
    contactPerson: 'Manish Parekh',
    email: 'institutional@sunpharma.demo',
    phone: '+91 98333 55667',
    city: 'Ahmedabad',
    categories: ['Oral Antibiotics', 'Analgesics', 'Anti-inflammatory'],
    paymentTerms: 'Net 45 Days',
    rating: 4.7,
    activeOrdersCount: 0
  },
  {
    id: 'sup-4',
    clinicId: 'clinic-citycare',
    name: '3M Oral Care Direct',
    contactPerson: 'Shalini Roy',
    email: 'oralcare.orders@3m.demo',
    phone: '+91 98444 88990',
    city: 'Bengaluru',
    categories: ['Restorative', 'Adhesives', 'Impression Materials'],
    paymentTerms: 'Immediate / UPI',
    rating: 4.9,
    activeOrdersCount: 1
  }
];

export const DEMO_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'po-1',
    poNumber: 'PO-2026-088',
    clinicId: 'clinic-citycare',
    supplierId: 'sup-1',
    supplierName: 'CareLine Healthcare Logistics',
    orderDate: '2026-10-20',
    deliveryDate: '2026-10-22',
    totalAmount: 6500,
    itemsCount: 10,
    status: 'Delivered'
  },
  {
    id: 'po-2',
    poNumber: 'PO-2026-091',
    clinicId: 'clinic-citycare',
    supplierId: 'sup-2',
    supplierName: 'SeptoDent India Pvt Ltd',
    orderDate: '2026-10-23',
    deliveryDate: '2026-10-25',
    totalAmount: 7000,
    itemsCount: 5,
    status: 'Sent'
  },
  {
    id: 'po-3',
    poNumber: 'PO-2026-092',
    clinicId: 'clinic-citycare',
    supplierId: 'sup-4',
    supplierName: '3M Oral Care Direct',
    orderDate: '2026-10-23',
    deliveryDate: '2026-10-26',
    totalAmount: 7400,
    itemsCount: 4,
    status: 'Draft'
  }
];

export const DEMO_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-801',
    ticketNumber: 'TCK-2026-801',
    clinicId: 'clinic-citycare',
    clinicName: 'Apex Dental & Maxillofacial Care',
    category: 'Billing & Subscriptions',
    priority: 'High',
    status: 'Open',
    subject: 'Request invoice with GSTIN breakdown for annual Professional renewal',
    description: 'We recently renewed our Professional tier annually. We need the tax invoice with our state GSTIN 27AAACA1234B1Z5 clearly visible for input credit filing.',
    assignedTo: 'usr-support-pooja',
    assignedAgentName: 'Pooja Sharma',
    createdAt: '2026-10-23 09:14',
    updatedAt: '2026-10-23 10:45',
    messages: [
      {
        id: 'msg-1',
        senderName: 'Dr. Arvind Rao',
        senderRole: 'Clinic Owner',
        message: 'Could you please regenerate the invoice with GSTIN: 27AAACA1234B1Z5? Our accountant needs it before month end.',
        timestamp: '2026-10-23 09:14'
      },
      {
        id: 'msg-2',
        senderName: 'Pooja Sharma',
        senderRole: 'SaaS Support Agent',
        message: 'Hello Dr. Rao! I have updated your tenant billing profile with GSTIN: 27AAACA1234B1Z5 and generated the updated Tax Invoice #CP-INV-2026-118. You can view or download it directly from your Subscription tab.',
        timestamp: '2026-10-23 10:45'
      }
    ]
  },
  {
    id: 'tkt-802',
    ticketNumber: 'TCK-2026-802',
    clinicId: 'clinic-dr-mehta',
    clinicName: 'Dr. Mehta Child Care & Pediatric Clinic',
    category: 'Clinical Workflow',
    priority: 'Medium',
    status: 'In Progress',
    subject: 'Custom vaccination schedule templates for pediatric growth records',
    description: 'Can we configure default vaccination schedules (BCG, DPT, MMR) to auto-populate in the prescription composer for infants below 2 years?',
    assignedTo: 'usr-support-pooja',
    assignedAgentName: 'Pooja Sharma',
    createdAt: '2026-10-22 14:20',
    updatedAt: '2026-10-23 08:30',
    messages: [
      {
        id: 'msg-3',
        senderName: 'Dr. Rajesh Mehta',
        senderRole: 'Pediatrician',
        message: 'Having custom immunization protocols would save us 5 minutes per infant check-up.',
        timestamp: '2026-10-22 14:20'
      },
      {
        id: 'msg-4',
        senderName: 'Pooja Sharma',
        senderRole: 'SaaS Support Agent',
        message: 'Our product team is rolling out specialty-specific clinical note templates in the next release. In the meantime, I have enabled custom prescription presets in your clinic settings.',
        timestamp: '2026-10-23 08:30'
      }
    ]
  },
  {
    id: 'tkt-803',
    ticketNumber: 'TCK-2026-803',
    clinicId: 'clinic-metro-ortho',
    clinicName: 'Metro Orthopedic & Spine Center',
    category: 'Technical & Bug',
    priority: 'Critical',
    status: 'Resolved',
    subject: 'Thermal barcode printer alignment issue on OPD token printouts',
    description: 'When printing walk-in token slips from the reception terminal, the 2-inch ESC/POS printer cuts off the bottom QR code.',
    assignedTo: 'usr-support-pooja',
    assignedAgentName: 'Pooja Sharma',
    createdAt: '2026-10-21 11:00',
    updatedAt: '2026-10-21 15:40',
    messages: [
      {
        id: 'msg-5',
        senderName: 'Manoj Verma (Front Desk)',
        senderRole: 'Receptionist',
        message: 'The token QR code is half cut off.',
        timestamp: '2026-10-21 11:00'
      },
      {
        id: 'msg-6',
        senderName: 'Pooja Sharma',
        senderRole: 'SaaS Support Agent',
        message: 'Resolved by setting print margin from 5mm to 2mm in the ESC/POS layout profile.',
        timestamp: '2026-10-21 15:40'
      }
    ]
  }
];

export const DEMO_STAFF_MEMBERS: StaffMember[] = [
  {
    id: 'stf-1',
    clinicId: 'clinic-citycare',
    branchIds: ['branch-citycare-main'],
    name: 'Dr. Aarav Mehta, MBBS, MD',
<<<<<<< HEAD
    email: 'dr.arvind@apexdentalcare.demo',
    phone: '+91 98201 11223',
    role: 'doctor',
    department: 'Prosthodontics & Implants',
    status: 'Active',
    shift: '09:00 - 17:00',
    joinedDate: '2026-03-01'
=======
    email: 'aarav.mehta@citycare.demo',
    phone: '+91 98220 11223',
    role: 'doctor',
    department: 'General Medicine & Primary Care',
    status: 'Active',
    shift: '09:00 - 17:00',
    joinedDate: '2025-01-10'
>>>>>>> origin/main
  },
  {
    id: 'stf-2',
    clinicId: 'clinic-citycare',
    branchIds: ['branch-citycare-main'],
<<<<<<< HEAD
    name: 'Shweta Kulkarni',
    email: 'frontdesk@apexdentalcare.demo',
    phone: '+91 98201 55667',
    role: 'receptionist',
    department: 'Front Desk & Patient Relations',
    status: 'Active',
    shift: '08:30 - 16:30',
    joinedDate: '2026-04-10'
=======
    name: 'Dr. Neha Kulkarni, MBBS, DNB',
    email: 'neha.kulkarni@citycare.demo',
    phone: '+91 98220 22334',
    role: 'doctor',
    department: 'Pediatrics & Adolescent Medicine',
    status: 'Active',
    shift: '10:00 - 18:00',
    joinedDate: '2025-03-15'
>>>>>>> origin/main
  },
  {
    id: 'stf-3',
    clinicId: 'clinic-citycare',
<<<<<<< HEAD
    branchIds: ['branch-citycare-main', 'branch-apex-westside'],
    name: 'Ramesh Verma',
    email: 'inventory@apexdentalcare.demo',
    phone: '+91 98201 44556',
    role: 'inventory',
    department: 'Clinical Pharmacy & Procurement',
    status: 'Active',
    shift: '10:00 - 18:00',
    joinedDate: '2026-04-15'
=======
    branchIds: ['branch-citycare-main'],
    name: 'Dr. Priya Nair, BDS, MDS',
    email: 'priya.nair@citycare.demo',
    phone: '+91 98201 99887',
    role: 'doctor',
    department: 'Endodontics & Dental Surgery',
    status: 'Active',
    shift: '12:00 - 20:00',
    joinedDate: '2025-05-01'
>>>>>>> origin/main
  },
  {
    id: 'stf-4',
    clinicId: 'clinic-citycare',
    branchIds: ['branch-citycare-main'],
<<<<<<< HEAD
    name: 'Sneha Iyer, CA (Inter)',
    email: 'accounts@apexdentalcare.demo',
=======
    name: 'Shweta Kulkarni',
    email: 'reception@citycare.demo',
    phone: '+91 98220 55667',
    role: 'receptionist',
    department: 'Front Desk & Patient Relations',
    status: 'Active',
    shift: '08:30 - 16:30',
    joinedDate: '2025-02-01'
  },
  {
    id: 'stf-5',
    clinicId: 'clinic-citycare',
    branchIds: ['branch-citycare-main'],
    name: 'Pooja Joshi',
    email: 'pooja.reception@citycare.demo',
    phone: '+91 98220 66778',
    role: 'receptionist',
    department: 'Front Desk & Walk-In Desk',
    status: 'Active',
    shift: '12:30 - 20:30',
    joinedDate: '2025-07-20'
  },
  {
    id: 'stf-6',
    clinicId: 'clinic-citycare',
    branchIds: ['branch-citycare-main'],
    name: 'Sister Sunita Patil, B.Sc',
    email: 'sunita.nursing@citycare.demo',
    phone: '+91 98220 77889',
    role: 'nurse',
    department: 'Clinical Nursing & Triage',
    status: 'Active',
    shift: '08:00 - 16:00',
    joinedDate: '2025-04-12'
  },
  {
    id: 'stf-7',
    clinicId: 'clinic-citycare',
    branchIds: ['branch-citycare-main'],
    name: 'Ramesh Verma, B.Pharm',
    email: 'ramesh.pharmacy@citycare.demo',
    phone: '+91 98201 44556',
    role: 'inventory',
    department: 'Clinical Pharmacy & Procurement',
    status: 'Active',
    shift: '10:00 - 18:00',
    joinedDate: '2025-04-15'
  },
  {
    id: 'stf-8',
    clinicId: 'clinic-citycare',
    branchIds: ['branch-citycare-main'],
    name: 'Sneha Iyer, CA (Inter)',
    email: 'accounts@citycare.demo',
>>>>>>> origin/main
    phone: '+91 98201 77889',
    role: 'accountant',
    department: 'Billing & Financial Audit',
    status: 'Active',
    shift: '10:00 - 18:00',
<<<<<<< HEAD
    joinedDate: '2026-03-20'
  },
  {
    id: 'stf-5',
    clinicId: 'clinic-citycare',
    branchIds: ['branch-apex-westside'],
    name: 'Dr. Priya Nair, BDS',
    email: 'priya.nair@apexdentalcare.demo',
    phone: '+91 98201 99887',
    role: 'doctor',
    department: 'Endodontics & Conservative Dentistry',
    status: 'Active',
    shift: '12:00 - 20:00',
    joinedDate: '2026-05-01'
=======
    joinedDate: '2025-03-20'
  },
  {
    id: 'stf-9',
    clinicId: 'clinic-citycare',
    branchIds: ['branch-citycare-main'],
    name: 'Vikram Malhotra',
    email: 'operations@citycare.demo',
    phone: '+91 98201 33445',
    role: 'admin',
    department: 'Facility & Operations Administration',
    status: 'Active',
    shift: '09:00 - 18:00',
    joinedDate: '2025-01-15'
>>>>>>> origin/main
  }
];

export const DEMO_BACKGROUND_JOBS: BackgroundJob[] = [
  {
    id: 'job-1',
    name: 'WhatsApp Appointment Reminders Dispatcher',
    schedule: 'Every 15 minutes',
    lastRun: '2 minutes ago',
    duration: '4.2s',
    status: 'Healthy',
    processedRecords: 124
  },
  {
    id: 'job-2',
    name: 'Subscription Auto-Renewal & Payment Poller',
    schedule: 'Every midnight UTC',
    lastRun: '10 hours ago',
    duration: '18.1s',
    status: 'Healthy',
    processedRecords: 22
  },
  {
    id: 'job-3',
    name: 'Clinical Inventory Expiry & Reorder Threshold Monitor',
    schedule: 'Daily at 06:00 AM',
    lastRun: '4 hours ago',
    duration: '6.4s',
    status: 'Healthy',
    processedRecords: 84
  },
  {
    id: 'job-4',
    name: 'Prescription Digital Signature & QR Cryptographic Verification Sync',
    schedule: 'Real-time event stream',
    lastRun: 'Just now',
    duration: '0.8s',
    status: 'Healthy',
    processedRecords: 650
  },
  {
    id: 'job-5',
    name: 'Encrypted Multi-Region Nightly Database Snapshot',
    schedule: 'Daily at 02:00 AM',
    lastRun: '8 hours ago',
    duration: '42.6s',
    status: 'Healthy',
    processedRecords: 1420
  }
];

export const DEMO_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'aud-1',
    actor: 'Vikramaditya Singhania',
    role: 'Platform Superadmin',
    action: 'Plan Provisioning',
    target: 'Clinic: Apex Dental (Upgraded to Professional)',
    ipAddress: '103.21.244.18',
    timestamp: '2026-10-23 10:15',
    status: 'Success'
  },
  {
    id: 'aud-2',
    actor: 'Dr. Arvind Rao',
    role: 'Clinic Doctor',
    action: 'Prescription Finalization',
    target: 'Rx-2026-8812 (Aarav Patel)',
    ipAddress: '157.34.120.4',
    timestamp: '2026-10-23 09:40',
    status: 'Success'
  },
  {
    id: 'aud-3',
    actor: 'Shweta Kulkarni',
    role: 'Receptionist',
    action: 'Patient Walk-in Registration',
    target: 'Meera Deshmukh (PT-1044)',
    ipAddress: '157.34.120.4',
    timestamp: '2026-10-23 09:20',
    status: 'Success'
  },
  {
    id: 'aud-4',
    actor: 'Ramesh Verma',
    role: 'Inventory Staff',
    action: 'Stock Adjustment',
    target: 'MED-KET-06 (Damaged unit written off)',
    ipAddress: '157.34.120.4',
    timestamp: '2026-10-22 16:45',
    status: 'Success'
  },
  {
    id: 'aud-5',
    actor: 'Pooja Sharma',
    role: 'SaaS Support Agent',
    action: 'Support Ticket Status Transition',
    target: 'TCK-2026-803 (Resolved)',
    ipAddress: '49.36.18.90',
    timestamp: '2026-10-21 15:40',
    status: 'Success'
  }
];

export const DEMO_INTEGRATIONS: IntegrationStatus[] = [
  {
    id: 'int-1',
    name: 'WhatsApp Cloud API Webhooks',
    category: 'Patient Messaging',
    provider: 'Meta Business Platform',
    status: 'Operational',
    latencyMs: 142,
    uptime90d: 99.98
  },
  {
    id: 'int-2',
    name: 'Razorpay Payment Gateway API',
    category: 'Billing & Recurring Collections',
    provider: 'Razorpay India',
    status: 'Operational',
    latencyMs: 88,
    uptime90d: 99.99
  },
  {
    id: 'int-3',
    name: 'Twilio SMS OTP & Route',
    category: 'Authentication & Alerts',
    provider: 'Twilio Inc',
    status: 'Operational',
    latencyMs: 210,
    uptime90d: 99.94
  },
  {
    id: 'int-4',
    name: 'AWS S3 Prescription & Records Vault',
    category: 'Encrypted Cloud Storage',
    provider: 'Amazon Web Services (ap-south-1)',
    status: 'Operational',
    latencyMs: 45,
    uptime90d: 100.0
  }
];

export const DEMO_ENCOUNTERS: ClinicalEncounter[] = [
  {
    id: 'enc-001',
    appointmentId: 'apt-2601',
    patientId: 'pt-1042',
    patientName: 'Aarav Patel',
    doctorId: 'doc-arvind-rao',
    doctorName: 'Dr. Arvind Rao, MDS',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    date: '2026-10-23',
    chiefComplaint: 'Severe throbbing pain in lower right jaw for past 3 days, exacerbated by cold water and biting.',
    vitals: {
      bp: '122/80 mmHg',
      pulse: '74 bpm',
      temp: '98.4 °F',
      spO2: '99%',
      weight: '68 kg'
    },
    clinicalFindings: 'Deep carious lesion on mandibular right first molar (#46). Tender to percussion. Positive vitality test with lingering pain.',
    diagnosis: 'Acute Irreversible Pulpitis of tooth #46 with Symptomatic Apical Periodontitis',
    treatmentPlan: 'Initiate single-sitting Endodontic Therapy (Root Canal Treatment) for #46 under local anesthesia followed by core buildup and zirconia crown.',
    medications: [
      {
        id: 'med-enc-1',
        name: 'Amoxicillin + Clavulanic Acid (Augmentin)',
        dosage: '625 mg',
        frequency: 'Twice daily (1-0-1)',
        duration: '5 days',
        route: 'Oral, after meals',
        instructions: 'Complete full course. Avoid alcohol.'
      },
      {
        id: 'med-enc-2',
        name: 'Ketorolac Tromethamine (Ketorol-DT)',
        dosage: '10 mg',
        frequency: 'Thrice daily SOS (1-0-1)',
        duration: '3 days',
        route: 'Oral, dissolve tablet in 1 spoon water',
        instructions: 'Take after food for pain relief.'
      }
    ],
    followUpDays: 7,
    followUpDate: '2026-10-30',
    notes: 'Patient advised soft diet on opposite side. Warned against hard foods until root canal obturation.',
    isDraft: false,
    finalizedAt: '2026-10-23 10:15'
  }
];

export const DEMO_FOLLOW_UPS: FollowUpTask[] = [
  {
    id: 'flw-001',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    doctorName: 'Dr. Arvind Rao',
    dueDate: '2026-10-28',
    reason: 'Post-RCT evaluation, temporary crown check & permanent ceramic crown impression.',
    status: 'Pending',
    contactPreference: 'WhatsApp'
  },
  {
    id: 'flw-002',
    clinicId: 'clinic-citycare',
    branchId: 'branch-apex-westside',
    patientId: 'pt-1044',
    patientName: 'Tanvi Nair',
    patientPhone: '+91 97334 55667',
    doctorName: 'Dr. Priya Sharma',
    dueDate: '2026-11-04',
    reason: 'Aligner Tracking Review - Tray #16 insertion and contact flossing check.',
    status: 'Pending',
    contactPreference: 'WhatsApp'
  },
  {
    id: 'flw-003',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    patientId: 'pt-1042',
    patientName: 'Meera Deshmukh',
    patientPhone: '+91 98111 22334',
    doctorName: 'Dr. Arvind Rao',
    dueDate: '2026-10-24',
    reason: 'Follow-up for sensitive lower molar - review post-prophylaxis sensitivity status.',
    status: 'Completed',
    contactPreference: 'Phone Call',
    lastContactedAt: '2026-10-23T09:00:00.000Z'
  }
];

export const DEMO_WHATSAPP_NOTIFICATIONS: WhatsAppNotification[] = [
  {
    id: 'wa-msg-1',
    clinicId: 'clinic-citycare',
    recipientPhone: '+91 98765 43210',
    recipientName: 'Aarav Patel',
    templateType: 'booking_confirmation',
    messageBody: 'Hello Aarav Patel, your appointment at Apex Dental & Maxillofacial Care is confirmed for 23 Oct 2026 at 10:30 AM with Dr. Arvind Rao. Appointment reference: APT-2601. Clinic address: Suite 401, Metro Health Tower, MG Road, Mumbai. Please arrive 10 minutes prior.',
    status: 'delivered',
    sentAt: '2026-10-21T09:16:00.000Z',
    deliveredAt: '2026-10-21T09:16:15.000Z',
    appointmentRef: 'APT-2601'
  },
  {
    id: 'wa-msg-2',
    clinicId: 'clinic-citycare',
    recipientPhone: '+91 98111 22334',
    recipientName: 'Meera Deshmukh',
    templateType: 'reminder',
    messageBody: 'Gentle Reminder: Hello Meera Deshmukh, your visit with Dr. Arvind Rao at Apex Dental is scheduled for today at 11:30 AM. Reply CANCEL if unable to attend.',
    status: 'delivered',
    sentAt: '2026-10-23T07:30:00.000Z',
    deliveredAt: '2026-10-23T07:30:10.000Z',
    appointmentRef: 'APT-2602'
  }
];

export const DEMO_PLATFORM_METRICS: PlatformMetric = {
  totalClinics: 28,
  activeClinics: 24,
  trialClinics: 4,
  expiredTrials: 2,
  activeSubscriptions: 22,
  monthlyRecurringRevenue: 153978,
  totalAppointmentsMonth: 4890,
  registeredUsers: 1420
};

export const DEMO_USERS: Record<string, User> = {
  super_admin: {
    id: 'usr-superadmin',
<<<<<<< HEAD
    name: 'Vikramaditya Singhania',
    email: 'admin@clinicos.health',
=======
    name: 'Super Administrator',
    email: 'superadmin@admin.com',
>>>>>>> origin/main
    phone: '+91 98000 00001',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    createdAt: '2025-01-15'
  },
  clinic_admin: {
    id: 'usr-clinicadmin-apex',
    name: 'Dr. Aarav Mehta, MBBS, MD',
    email: 'aarav.mehta@citycare.demo',
    phone: '+91 98201 11223',
    role: 'clinic_admin',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-03-01'
  },
  receptionist: {
    id: 'usr-reception-shweta',
    name: 'Shweta Kulkarni',
    email: 'frontdesk@apexdentalcare.demo',
    phone: '+91 98201 55667',
    role: 'receptionist',
    clinicId: 'clinic-citycare',
    branchId: 'branch-citycare-main',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-04-10'
  },
  patient: {
    id: 'usr-patient-aarav',
    name: 'Aarav Patel',
    email: 'aarav.patel@example.demo',
    phone: '+91 98765 43210',
    role: 'patient',
    clinicId: 'clinic-citycare',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-05-12'
  }
};

export const DEMO_SAAS_INVOICES: SaaSBillingInvoice[] = [
  {
    id: 'sub-inv-1081',
    invoiceNumber: 'SINV-2026-1081',
    clinicId: 'clinic-citycare',
    clinicName: 'Apex Dental Care',
    planId: 'professional',
    planName: 'Professional Plan',
    billingPeriod: '01 Oct 2026 – 31 Oct 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    amount: 6999,
    status: 'Paid',
    paymentMethod: 'UPI Autopay / Razorpay',
    paidAt: '2026-10-02',
    tierLimitDoctors: 8,
    tierLimitBranches: 3
  },
  {
    id: 'sub-inv-1080',
    invoiceNumber: 'SINV-2026-1080',
    clinicId: 'clinic-pulse-ortho',
    clinicName: 'Pulse Orthopedics & Joint Care',
    planId: 'professional',
    planName: 'Professional Plan',
    billingPeriod: '01 Oct 2026 – 31 Oct 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    amount: 6999,
    status: 'Paid',
    paymentMethod: 'Corporate Visa',
    paidAt: '2026-10-01',
    tierLimitDoctors: 8,
    tierLimitBranches: 3
  },
  {
    id: 'sub-inv-1079',
    invoiceNumber: 'SINV-2026-1079',
    clinicId: 'clinic-greenhaven',
    clinicName: 'GreenHaven Recovery & Nursing Home',
    planId: 'enterprise',
    planName: 'Enterprise Plan (24 Beds)',
    billingPeriod: '01 Oct 2026 – 31 Oct 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    amount: 14999,
    status: 'Paid',
    paymentMethod: 'Net Banking (SBI)',
    paidAt: '2026-10-03',
    tierLimitDoctors: 25,
    tierLimitBranches: 10
  },
  {
    id: 'sub-inv-1078',
    invoiceNumber: 'SINV-2026-1078',
    clinicId: 'clinic-dermaglow',
    clinicName: 'DermaGlow Skin & Laser Center',
    planId: 'growth',
    planName: 'Growth Plan',
    billingPeriod: '01 Oct 2026 – 31 Oct 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    amount: 4999,
    status: 'Paid',
    paymentMethod: 'UPI Autopay',
    paidAt: '2026-10-01',
    tierLimitDoctors: 4,
    tierLimitBranches: 2
  },
  {
    id: 'sub-inv-1077',
    invoiceNumber: 'SINV-2026-1077',
    clinicId: 'clinic-littlecare',
    clinicName: 'LittleCare Pediatrics Hub',
    planId: 'starter',
    planName: 'Starter Plan',
    billingPeriod: '01 Oct 2026 – 31 Oct 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    amount: 2499,
    status: 'Paid',
    paymentMethod: 'MasterCard',
    paidAt: '2026-10-02',
    tierLimitDoctors: 2,
    tierLimitBranches: 1
  },
  {
    id: 'sub-inv-1076',
    invoiceNumber: 'SINV-2026-1076',
    clinicId: 'clinic-metro-dental',
    clinicName: 'Metro Dental Specialists',
    planId: 'growth',
    planName: 'Growth Plan',
    billingPeriod: '01 Oct 2026 – 31 Oct 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    amount: 4999,
    status: 'Failed',
    paymentMethod: 'Direct Debit (Mandate Expired)',
    tierLimitDoctors: 4,
    tierLimitBranches: 2
  }
];

export const DEMO_SAAS_PAYMENTS: SaaSPayment[] = [
  {
    id: 'spay-991',
    paymentReference: 'rzp_pay_99812A',
    clinicId: 'clinic-citycare',
    clinicName: 'Apex Dental Care',
    invoiceNumber: 'SINV-2026-1081',
    amount: 6999,
    paymentMethod: 'Razorpay',
    date: '2026-10-02',
    status: 'Success'
  },
  {
    id: 'spay-992',
    paymentReference: 'txn_vis_77189B',
    clinicId: 'clinic-pulse-ortho',
    clinicName: 'Pulse Orthopedics',
    invoiceNumber: 'SINV-2026-1080',
    amount: 6999,
    paymentMethod: 'Credit Card',
    date: '2026-10-01',
    status: 'Success'
  },
  {
    id: 'spay-993',
    paymentReference: 'neft_sbi_44120C',
    clinicId: 'clinic-greenhaven',
    clinicName: 'GreenHaven Recovery',
    invoiceNumber: 'SINV-2026-1079',
    amount: 14999,
    paymentMethod: 'Net Banking',
    date: '2026-10-03',
    status: 'Success'
  },
  {
    id: 'spay-994',
    paymentReference: 'upi_auto_33219D',
    clinicId: 'clinic-dermaglow',
    clinicName: 'DermaGlow Skin Center',
    invoiceNumber: 'SINV-2026-1078',
    amount: 4999,
    paymentMethod: 'UPI Autopay',
    date: '2026-10-01',
    status: 'Success'
  },
  {
    id: 'spay-995',
    paymentReference: 'txn_fail_11099E',
    clinicId: 'clinic-metro-dental',
    clinicName: 'Metro Dental Specialists',
    invoiceNumber: 'SINV-2026-1076',
    amount: 4999,
    paymentMethod: 'Direct Debit',
    date: '2026-10-10',
    status: 'Failed'
  }
];

export const DEMO_SAAS_REFUNDS: SaaSRefund[] = [
  {
    id: 'sref-01',
    refundReference: 'RFD-SAAS-55102',
    clinicId: 'clinic-littlecare',
    clinicName: 'LittleCare Pediatrics Hub',
    originalPaymentRef: 'spay-989',
    amount: 1200,
    reason: 'Prorated adjustment following mid-cycle tier downgrade from Pro to Starter',
    requestDate: '2026-10-14',
    status: 'Completed'
  },
  {
    id: 'sref-02',
    refundReference: 'RFD-SAAS-55103',
    clinicId: 'clinic-city-ortho',
    clinicName: 'City Orthopedics Clinic',
    originalPaymentRef: 'spay-982',
    amount: 2499,
    reason: 'Duplicate payment processing during gateway credential rotation',
    requestDate: '2026-10-08',
    status: 'Completed'
  }
];

export const DEMO_SAAS_EXPENSES: SaaSExpense[] = [
  {
    id: 'sexp-01',
    category: 'Cloud Infrastructure',
    description: 'AWS Mumbai Region EKS Clusters, RDS Multi-AZ Postgres, and CloudFront CDN bandwidth',
    date: '2026-10-01',
    amount: 34500,
    paymentStatus: 'Paid'
  },
  {
    id: 'sexp-02',
    category: 'SaaS Tooling',
    description: 'Datadog APM infrastructure monitoring, Postmark transactional email relay, and Sentry error tracking',
    date: '2026-10-05',
    amount: 12800,
    paymentStatus: 'Paid'
  },
  {
    id: 'sexp-03',
    category: 'Regulatory & Legal',
    description: 'HIPAA & DISHA compliance advisory retainer and ISO-27001 surveillance audit',
    date: '2026-10-10',
    amount: 25000,
    paymentStatus: 'Paid'
  },
  {
    id: 'sexp-04',
    category: 'Engineering & Ops',
    description: 'Meta WhatsApp Business Cloud API message pre-purchase buffer and Twilio SMS fallbacks',
    date: '2026-10-15',
    amount: 18200,
    paymentStatus: 'Paid'
  },
  {
    id: 'sexp-05',
    category: 'Payment Gateway Reserve',
    description: 'Razorpay rolling chargeback reserve requirement and monthly corporate merchant account fee',
    date: '2026-10-20',
    amount: 8900,
    paymentStatus: 'Paid'
  }
];

export const DEMO_CLINIC_PAYMENTS: ClinicPaymentRecord[] = [
  {
    id: 'cpay-101',
    paymentReference: 'PAY-2026-001',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    invoiceNumber: 'INV-2026-0391',
    amount: 5000,
    paymentMethod: 'UPI QR',
    date: '2026-10-23',
    status: 'Completed'
  },
  {
    id: 'cpay-102',
    paymentReference: 'PAY-2026-002',
    patientId: 'pt-1042',
    patientName: 'Meera Deshmukh',
    invoiceNumber: 'INV-2026-0392',
    amount: 800,
    paymentMethod: 'Credit/Debit Card',
    date: '2026-10-23',
    status: 'Completed'
  },
  {
    id: 'cpay-103',
    paymentReference: 'PAY-2026-003',
    patientId: 'pt-1044',
    patientName: 'Tanvi Nair',
    invoiceNumber: 'INV-2026-0388',
    amount: 15000,
    paymentMethod: 'UPI QR',
    date: '2026-10-14',
    status: 'Completed'
  },
  {
    id: 'cpay-104',
    paymentReference: 'PAY-2026-004',
    patientId: 'pt-1043',
    patientName: 'Rohan Kulkarni',
    invoiceNumber: 'INV-2026-0389',
    amount: 3500,
    paymentMethod: 'Cash',
    date: '2026-10-22',
    status: 'Completed'
  }
];

<<<<<<< HEAD
=======
export const DEMO_RECEIPTS: ReceiptRecord[] = [
  {
    id: 'rcp-101',
    receiptNumber: 'RCP-2026-001',
    paymentReference: 'PAY-2026-001',
    invoiceNumber: 'INV-2026-0391',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    amount: 5000,
    paymentMethod: 'UPI QR',
    date: '2026-10-23',
    time: '10:30 AM',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Practice',
    issuedBy: 'Shweta Kulkarni (Front Desk Cashier)',
    status: 'Issued',
    notes: 'Consultation & Root Canal Therapy first installment payment'
  },
  {
    id: 'rcp-102',
    receiptNumber: 'RCP-2026-002',
    paymentReference: 'PAY-2026-002',
    invoiceNumber: 'INV-2026-0392',
    patientId: 'pt-1042',
    patientName: 'Meera Deshmukh',
    amount: 800,
    paymentMethod: 'Credit/Debit Card',
    date: '2026-10-23',
    time: '11:45 AM',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Practice',
    issuedBy: 'Shweta Kulkarni (Front Desk Cashier)',
    status: 'Issued',
    notes: 'Dental scaling & hygiene consultation settlement'
  },
  {
    id: 'rcp-103',
    receiptNumber: 'RCP-2026-003',
    paymentReference: 'PAY-2026-003',
    invoiceNumber: 'INV-2026-0388',
    patientId: 'pt-1044',
    patientName: 'Tanvi Nair',
    amount: 15000,
    paymentMethod: 'UPI QR',
    date: '2026-10-14',
    time: '04:15 PM',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Practice',
    issuedBy: 'Shweta Kulkarni (Front Desk Cashier)',
    status: 'Issued',
    notes: 'Full arch ceramic crown placement payment'
  },
  {
    id: 'rcp-104',
    receiptNumber: 'RCP-2026-004',
    paymentReference: 'PAY-2026-004',
    invoiceNumber: 'INV-2026-0389',
    patientId: 'pt-1043',
    patientName: 'Rohan Kulkarni',
    amount: 3500,
    paymentMethod: 'Cash',
    date: '2026-10-22',
    time: '02:00 PM',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Practice',
    issuedBy: 'Shweta Kulkarni (Front Desk Cashier)',
    status: 'Issued',
    notes: 'Cardiology routine consult and ECG recording'
  }
];

>>>>>>> origin/main
export const DEMO_CLINIC_REFUNDS: ClinicRefundRecord[] = [
  {
    id: 'cref-101',
    requestReference: 'CRFD-2026-01',
    originalPaymentRef: 'cpay-098',
    patientName: 'Kavita Joshi',
    reason: 'Scheduled implant procedure deferred due to sudden medical antibiotic sensitivity',
    amount: 1500,
    approvalStatus: 'Approved',
    requestedAt: '2026-10-22',
    approvedAt: '2026-10-23'
  },
  {
    id: 'cref-102',
    requestReference: 'CRFD-2026-02',
    originalPaymentRef: 'cpay-094',
    patientName: 'Rajesh Malhotra',
    reason: 'Adjustment for diagnostic radiograph duplicate entry during walk-in scaling package',
    amount: 500,
    approvalStatus: 'Pending Approval',
    requestedAt: '2026-10-23'
  }
];


export const DEMO_NOTIFICATIONS: SimulatedNotification[] = [
  {
    id: 'notif-1',
    recipientRole: 'patient',
    recipientUserId: 'usr-patient-aarav',
    clinicId: 'clinic-heartwell',
    appointmentId: 'apt-req-002',
    requestId: 'REQ-2026-002',
    type: 'alternative_slot_proposed',
    title: 'Alternative Slot Proposed by HeartWell Cardiology',
    message: 'Your requested appointment time was unavailable due to emergency Cath lab procedures. An alternative slot on 24 Oct at 03:30 PM has been offered.',
    createdAt: '2026-10-23T11:30:00.000Z',
    read: false,
    priority: 'high'
  },
  {
    id: 'notif-2',
    recipientRole: 'receptionist',
    recipientUserId: 'usr-reception-shweta',
    clinicId: 'clinic-citycare',
    appointmentId: 'apt-req-001',
    requestId: 'REQ-2026-001',
    type: 'booking_request_submitted',
    title: 'New Online Booking Request Received',
    message: 'Aarav Patel has requested an appointment with Dr. Aarav Mehta for 24 Oct at 10:30 AM. Verification needed.',
    createdAt: '2026-10-23T09:15:00.000Z',
    read: false,
    priority: 'normal'
  },
  {
    id: 'notif-3',
    recipientRole: 'clinic_admin',
    recipientUserId: 'usr-clinicadmin-aarav',
    clinicId: 'clinic-citycare',
    appointmentId: 'apt-req-004',
    requestId: 'REQ-2026-004',
    type: 'request_received_by_clinic',
    title: 'Patient Checked In (#Q-01)',
    message: 'Meera Deshmukh has checked in at the front desk and is waiting in the lounge.',
    createdAt: '2026-10-24T09:20:00.000Z',
    read: false,
    priority: 'normal'
  }
];

<<<<<<< HEAD
export * from './medicineData';
export * from './queriesData';
export * from './packagesData';


export const DEMO_RECEIPTS = [
  {
    id: 'rcp-101',
    receiptNumber: 'RCP-2026-001',
    paymentReference: 'PAY-2026-001',
    invoiceNumber: 'INV-2026-0391',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    amount: 5000,
    paymentMethod: 'UPI QR',
    date: '2026-10-23',
    time: '10:30 AM',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Practice',
    issuedBy: 'Shweta Kulkarni (Front Desk Cashier)',
    status: 'Issued',
    notes: 'Consultation & Root Canal Therapy first installment payment'
  },
  {
    id: 'rcp-102',
    receiptNumber: 'RCP-2026-002',
    paymentReference: 'PAY-2026-002',
    invoiceNumber: 'INV-2026-0392',
    patientId: 'pt-1042',
    patientName: 'Meera Deshmukh',
    amount: 800,
    paymentMethod: 'Credit/Debit Card',
    date: '2026-10-23',
    time: '11:45 AM',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Practice',
    issuedBy: 'Shweta Kulkarni (Front Desk Cashier)',
    status: 'Issued',
    notes: 'Dental scaling & hygiene consultation settlement'
  },
  {
    id: 'rcp-103',
    receiptNumber: 'RCP-2026-003',
    paymentReference: 'PAY-2026-003',
    invoiceNumber: 'INV-2026-0388',
    patientId: 'pt-1044',
    patientName: 'Tanvi Nair',
    amount: 15000,
    paymentMethod: 'UPI QR',
    date: '2026-10-14',
    time: '04:15 PM',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Practice',
    issuedBy: 'Shweta Kulkarni (Front Desk Cashier)',
    status: 'Issued',
    notes: 'Full arch ceramic crown placement payment'
  },
  {
    id: 'rcp-104',
    receiptNumber: 'RCP-2026-004',
    paymentReference: 'PAY-2026-004',
    invoiceNumber: 'INV-2026-0389',
    patientId: 'pt-1043',
    patientName: 'Rohan Kulkarni',
    amount: 3500,
    paymentMethod: 'Cash',
    date: '2026-10-22',
    time: '02:00 PM',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Practice',
    issuedBy: 'Shweta Kulkarni (Front Desk Cashier)',
    status: 'Issued',
    notes: 'Cardiology routine consult and ECG recording'
=======
export const DEMO_VIRTUAL_CONSULTATIONS = [
  {
    id: 'vc-101',
    patientId: 'pt-1001',
    patientName: 'Rahul Sharma',
    patientPhone: '+91 98201 22334',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    doctorId: 'doc-aarav',
    doctorName: 'Dr. Aarav Mehta',
    doctorSpecialty: 'General Physician',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    reason: 'Fever, cough and throat irritation for 2 days. Needs urgent clinical advice & Rx.',
    status: 'In Call',
    requestedAt: 'Today, 10:45 AM',
    preferredTime: 'Immediate Live Connect',
    meetingLink: 'https://clinicos.health/meet/vc-101-live',
    notes: 'Patient reports mild seasonal allergy symptoms. Clear lungs, BP normal.',
    duration: '08:24'
  },
  {
    id: 'vc-102',
    patientId: 'pt-1002',
    patientName: 'Pooja Verma',
    patientPhone: '+91 98450 11998',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    doctorId: 'doc-aarav',
    doctorName: 'Dr. Aarav Mehta',
    doctorSpecialty: 'General Physician',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    reason: 'Review blood test report & routine diabetes management follow-up.',
    status: 'Waiting',
    requestedAt: 'Today, 11:05 AM',
    preferredTime: 'Immediate Live Connect',
    meetingLink: 'https://clinicos.health/meet/vc-102-live',
    notes: '',
    duration: '00:00'
  },
  {
    id: 'vc-103',
    patientId: 'usr-patient-aarav',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    doctorId: 'doc-aarav',
    doctorName: 'Dr. Aarav Mehta',
    doctorSpecialty: 'General Physician',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic',
    reason: 'Follow-up consultation for prescribed antibiotics and mild headache.',
    status: 'Waiting',
    requestedAt: 'Today, 11:15 AM',
    preferredTime: 'Scheduled: Today at 02:00 PM',
    meetingLink: 'https://clinicos.health/meet/vc-103-live',
    notes: '',
    duration: '00:00'
>>>>>>> origin/main
  }
];
