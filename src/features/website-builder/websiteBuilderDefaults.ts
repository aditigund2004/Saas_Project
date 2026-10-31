export type WebsiteTemplateType = 'modern' | 'minimal' | 'premium';
export type WebsiteStatusType = 'draft' | 'ready' | 'published' | 'changes_pending';

export interface ClinicWebsiteSettings {
  template: WebsiteTemplateType;
  status: WebsiteStatusType;
  heroHeading: string;
  heroSubheading: string;
  heroCtaText: string;
  bannerImage: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: 'Plus Jakarta Sans' | 'Inter' | 'Playfair Display' | 'Outfit';
  aboutTitle: string;
  aboutText: string;
  aboutValues: string[];
  facilities: string[];
  whyChooseUs: { title: string; description: string; icon: string }[];
  testimonials: { patientName: string; feedback: string; rating: number; date: string }[];
  customNotice?: string;
  showServices: boolean;
  showDoctors: boolean;
  showTestimonials: boolean;
  showWhyChooseUs: boolean;
  showFaq: boolean;
  showContactMap: boolean;
  publishedAt?: string;
  customDomain?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export const TEMPLATE_METADATA: Record<
  WebsiteTemplateType,
  {
    name: string;
    description: string;
    badge: string;
    previewAccent: string;
    recommendedFor: string;
    features: string[];
  }
> = {
  modern: {
    name: 'Modern Medical Clinic',
    description: 'Clean, dynamic card-based design with vibrant medical blues and teals, trust badges, and floating doctor callouts.',
    badge: 'Most Popular',
    previewAccent: '#2563eb',
    recommendedFor: 'Multi-specialty family clinics, dental studios, pediatric hubs',
    features: ['Vibrant color accents', 'Compact service cards', 'Doctor availability badges', 'Quick appointment wizard']
  },
  minimal: {
    name: 'Minimal Private Practice',
    description: 'Serene, editorial typography with generous whitespace, elegant slate borders, and an authoritative clinical feel.',
    badge: 'Editorial & Clean',
    previewAccent: '#0f766e',
    recommendedFor: 'Private consultants, dermatology & aesthetics, psychiatric practices',
    features: ['Refined serif / clean sans', 'Subtle border aesthetics', 'Distraction-free reading', 'High patient trust focus']
  },
  premium: {
    name: 'Premium Specialist Clinic',
    description: 'Luxurious executive medical aesthetic with deep navy gradients, gold/emerald highlights, and VIP service showcasing.',
    badge: 'Executive / Premium',
    previewAccent: '#0f172a',
    recommendedFor: 'Orthopedic centers, super-specialty surgery, boutique dental clinics',
    features: ['Dark-accented hero banner', 'Gold & emerald highlights', 'Facility photograph gallery', 'Concierge booking flow']
  }
};

export const COLOR_PRESETS = [
  { name: 'Clinical Blue', primary: '#2563eb', secondary: '#0ea5e9' },
  { name: 'Teal Health', primary: '#0f766e', secondary: '#14b8a6' },
  { name: 'Emerald Care', primary: '#059669', secondary: '#10b981' },
  { name: 'Indigo Specialist', primary: '#4f46e5', secondary: '#6366f1' },
  { name: 'Rose Medical', primary: '#e11d48', secondary: '#f43f5e' },
  { name: 'Slate Enterprise', primary: '#334155', secondary: '#64748b' }
];

export const FONT_OPTIONS: Array<'Plus Jakarta Sans' | 'Inter' | 'Playfair Display' | 'Outfit'> = [
  'Plus Jakarta Sans',
  'Inter',
  'Playfair Display',
  'Outfit'
];

export const SAMPLE_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1400&q=80'
];

export function getDefaultWebsiteSettings(clinic: any): ClinicWebsiteSettings {
  const isDental = clinic?.specialty?.toLowerCase().includes('dental');
  const isOrtho = clinic?.specialty?.toLowerCase().includes('ortho');
  const isDerma = clinic?.specialty?.toLowerCase().includes('skin') || clinic?.specialty?.toLowerCase().includes('derma');

  let defaultTemplate: WebsiteTemplateType = 'modern';
  let primary = '#2563eb';
  let secondary = '#0ea5e9';

  if (isDerma) {
    defaultTemplate = 'minimal';
    primary = '#0f766e';
    secondary = '#14b8a6';
  } else if (isOrtho) {
    defaultTemplate = 'premium';
    primary = '#1e293b';
    secondary = '#38bdf8';
  }

  return {
    template: defaultTemplate,
    status: 'published',
    heroHeading: `Exceptional ${clinic?.specialty || 'Healthcare'} Care for You and Your Family`,
    heroSubheading: clinic?.tagline || 'Book appointments online, consult verified specialists, and receive instant digital prescriptions with zero waiting room hassle.',
    heroCtaText: 'Book an Appointment',
    bannerImage: clinic?.image || SAMPLE_HERO_IMAGES[0],
    primaryColor: primary,
    secondaryColor: secondary,
    fontFamily: 'Plus Jakarta Sans',
    aboutTitle: `Trusted ${clinic?.specialty || 'Clinical'} Excellence in ${clinic?.city || 'Your City'}`,
    aboutText: clinic?.description || `${clinic?.name || 'Our clinic'} is committed to providing compassionate, evidence-based care with modern diagnostic facilities, flexible consultation slots, and patient-first medical communication.`,
    aboutValues: [
      'Patient Dignity & Personalized Time',
      'Evidence-Based Clinical Protocols',
      'Transparent Pricing & No Hidden Fees',
      'Verified Digital Prescriptions & Records'
    ],
    facilities: [
      'Modern Air-Conditioned Waiting Lounge',
      'Full Sterilization & Hygiene Protocol',
      'On-site Rapid Diagnostics & Lab Sampling',
      'Wheelchair Accessible Consultation Rooms'
    ],
    whyChooseUs: [
      {
        title: 'Zero Double-Booking Conflicts',
        description: 'Synchronized digital scheduling ensures your consultation slot is reserved exclusively for you.',
        icon: 'Calendar'
      },
      {
        title: 'Board-Certified Specialists',
        description: 'Consult seasoned doctors with 10+ years of verified medical credentials and clinical expertise.',
        icon: 'Award'
      },
      {
        title: 'Instant WhatsApp Reminders',
        description: 'Receive real-time booking confirmation, doctor arrival updates, and digital Rx on your smartphone.',
        icon: 'Smartphone'
      },
      {
        title: 'Verifiable Digital Records',
        description: 'Tamper-evident prescriptions with secure QR code verification for pharmacies and insurance.',
        icon: 'ShieldCheck'
      }
    ],
    testimonials: [
      {
        patientName: 'Suresh Menon',
        feedback: 'The doctor explained my test results with utmost clarity and patience. Reception was quick and organized.',
        rating: 5,
        date: '2 weeks ago'
      },
      {
        patientName: 'Pooja Kulkarni',
        feedback: 'Clean clinic, courteous staff, and I got my digital prescription on WhatsApp within 2 minutes of consultation.',
        rating: 5,
        date: '1 month ago'
      },
      {
        patientName: 'Rajesh Sharma',
        feedback: 'Best clinic experience in town. Booked online at 10 PM and had my confirmed appointment slot for 9 AM next morning.',
        rating: 5,
        date: '3 weeks ago'
      }
    ],
    customNotice: 'Walk-ins welcome between 9:00 AM - 1:00 PM. Prior booking recommended for evening slots.',
    showServices: true,
    showDoctors: true,
    showTestimonials: true,
    showWhyChooseUs: true,
    showFaq: true,
    showContactMap: true,
    publishedAt: '2026-10-20T10:00:00.000Z',
    customDomain: `${clinic?.slug || 'clinic'}.clinicos.in`,
    seoTitle: `${clinic?.name || 'Clinic'} - Book Appointments Online`,
    seoDescription: `Schedule an appointment at ${clinic?.name || 'our clinic'}. Verified doctors, transparent pricing, and instant confirmations.`
  };
}

