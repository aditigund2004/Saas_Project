export interface HealthArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Cardiology & BP' | 'Dental Health' | 'Medication Safety' | 'Diabetes & Nutrition' | 'Emergency & First Aid' | 'Pediatrics & Family' | 'Mental Wellness' | 'Preventive Lifestyle';
  readTime: string;
  doctorAuthor: {
    name: string;
    qualifications: string;
    specialty: string;
    avatar: string;
  };
  publishedDate: string;
  coverImage: string;
  featured: boolean;
  summary: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    content: string;
    bulletPoints?: string[];
    calloutWarning?: string;
  }[];
  clinicalFAQs: {
    question: string;
    answer: string;
  }[];
  tags: string[];
}

export const HEALTH_EDUCATION_CATEGORIES = [
  'All Topics',
  'Cardiology & BP',
  'Dental Health',
  'Medication Safety',
  'Diabetes & Nutrition',
  'Emergency & First Aid',
  'Pediatrics & Family',
  'Mental Wellness',
  'Preventive Lifestyle'
];

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'art-hypertension-guide',
    slug: 'hypertension-management-guide',
    title: 'Understanding High Blood Pressure: The "Silent Killer" Protocol',
    subtitle: 'Evidence-based guidance on morning monitoring, salt restriction, and why skipping your BP pill is dangerous.',
    category: 'Cardiology & BP',
    readTime: '4 min read',
    doctorAuthor: {
      name: 'Dr. Rohan Deshmukh',
      qualifications: 'MD, DM (Cardiology), FACC',
      specialty: 'Interventional Cardiologist',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: 'October 24, 2026',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    summary: 'Hypertension affects over 1 in 4 adults in India and often presents with zero initial symptoms. This guide explains ideal target numbers (<130/80 mmHg), dietary salt reduction, and how consistent medication adherence protects your heart and kidneys from irreversible damage.',
    keyTakeaways: [
      'Normal blood pressure is <120/80 mmHg; stage 1 hypertension starts above 130/80 mmHg.',
      'Always rest 5 minutes with feet flat on the floor before taking a digital blood pressure measurement.',
      'Reducing sodium intake to under 2,000 mg/day (less than 1 level teaspoon of salt) can lower systolic BP by 5-8 mmHg.',
      'Never discontinue antihypertensive medication (like Telmisartan or Amlodipine) without doctor approval, even if numbers feel normal.'
    ],
    sections: [
      {
        heading: 'Why Blood Pressure is Termed the "Silent Killer"',
        content: 'Unlike a toothache or migraine, sustained high blood pressure rarely gives clear warning signs until blood vessels have suffered structural fatigue. Over months and years, unmanaged pressure causes microscopic tears in the arterial lining, accelerating cholesterol plaque formation and straining the left ventricle of the heart.',
        calloutWarning: 'Warning: If your systolic reading exceeds 180 mmHg or diastolic exceeds 120 mmHg accompanied by chest pain or shortness of breath, this is a Hypertensive Crisis. Call 108/112 immediately.'
      },
      {
        heading: 'The 4 Golden Rules of Accurate Home BP Monitoring',
        content: 'A significant proportion of patients experience "white-coat hypertension" or inaccurate home readings due to improper technique. Follow these steps for clinical-grade precision:',
        bulletPoints: [
          'Measure twice daily: Once in the morning before medication/breakfast, and once before bedtime.',
          'Empty your bladder first; a full bladder can artificially elevate systolic readings by up to 10 mmHg.',
          'Do NOT drink tea, coffee, or smoke for at least 30 minutes prior to measurement.',
          'Position the cuff directly over the brachial artery at heart level, resting your arm comfortably on a table.'
        ]
      },
      {
        heading: 'Dietary Action: The DASH Framework Made Indian-Friendly',
        content: 'You do not need an exotic Western diet to manage blood pressure. Simply increase potassium-rich local foods (bananas, coconut water, steamed spinach, bottle gourd) and cut packaged snacks, pickles, papads, and processed sauces that harbor hidden sodium.'
      }
    ],
    clinicalFAQs: [
      {
        question: 'Can I stop my BP medicine if my readings have stayed normal for 3 months?',
        answer: 'No. Your readings are normal precisely because the medication is doing its pharmacological job. Abrupt cessation can cause dangerous rebound hypertension.'
      },
      {
        question: 'Does walking 30 minutes a day really help?',
        answer: 'Yes. Regular moderate aerobic exercise like brisk walking strengthens your heart muscle, allowing it to pump blood with less effort and reducing baseline arterial resistance.'
      }
    ],
    tags: ['Blood Pressure', 'Hypertension', 'Cardiology', 'Salt Restriction', 'DASH Diet']
  },
  {
    id: 'art-antibiotic-resistance',
    slug: 'antibiotic-resistance-patient-guide',
    title: 'Antibiotic Safety & Resistance: Why You Must Finish Every Pill',
    subtitle: 'The science behind bacterial survival, superbugs, and why saving leftover pills for later is dangerous.',
    category: 'Medication Safety',
    readTime: '3 min read',
    doctorAuthor: {
      name: 'Dr. Aarav Mehta',
      qualifications: 'MBBS, MD (Internal Medicine)',
      specialty: 'Consultant Physician',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    },
    publishedDate: 'October 20, 2026',
    coverImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    featured: true,
    summary: 'Feeling better after 2 days of antibiotics does not mean the infection is fully eradicated. Stopping early allows partially weakened bacteria to mutate, creating antibiotic-resistant superbugs that may no longer respond to common medications.',
    keyTakeaways: [
      'Antibiotics only treat bacterial infections; they have zero effect on viral colds, flu, or common sore throats.',
      'Always complete the exact prescribed course (e.g. 5 days of Augmentin) even when fever or pain subsides on Day 2.',
      'Never share antibiotics or take leftover pills from an earlier prescription.',
      'Take doses at evenly spaced intervals to maintain continuous therapeutic blood levels.'
    ],
    sections: [
      {
        heading: 'How Bacterial Resistance Happens Inside Your Body',
        content: 'When you take an antibiotic, it rapidly eliminates the most vulnerable bacteria within 24 to 48 hours, causing symptoms to rapidly improve. However, the slightly tougher bacteria remain alive until days 4 and 5. If you discontinue early, those surviving bacteria replicate and share defensive mutations, rendering future infections much harder to treat.',
        calloutWarning: 'Clinical Fact: Overuse and early cessation of antibiotics are the primary drivers of drug-resistant pathogens globally.'
      },
      {
        heading: 'Common Mistakes to Avoid with Antibiotic Regimens',
        content: 'Here are crucial rules every patient must follow when prescribed antibacterial drugs:',
        bulletPoints: [
          'Do NOT demand antibiotics from your doctor for a viral cough or runny nose.',
          'Take with food or empty stomach exactly as directed on the label (e.g. Augmentin at meal start; Azithromycin 1 hour before or 2 hours after food).',
          'If you experience mild loose stools, consume probiotics or fresh curd; if watery/bloody diarrhea occurs, contact your doctor immediately.'
        ]
      }
    ],
    clinicalFAQs: [
      {
        question: 'What should I do if I miss an antibiotic dose?',
        answer: 'Take it as soon as you remember. If it is already close to your next scheduled dose, skip the missed one and continue your regular timing. Never double the dose.'
      }
    ],
    tags: ['Antibiotics', 'Drug Resistance', 'Pharmacology', 'Infection Control']
  },
  {
    id: 'art-dental-hygiene-guide',
    slug: 'complete-oral-hygiene-protocol',
    title: 'The Modern Oral Hygiene Protocol: Flossing, Rinsing & Plaque Control',
    subtitle: 'Why brushing alone misses 40% of tooth surfaces, and how proper care prevents costly root canal treatments.',
    category: 'Dental Health',
    readTime: '5 min read',
    doctorAuthor: {
      name: 'Dr. Isha Shah',
      qualifications: 'BDS, MDS (Periodontics & Implantology)',
      specialty: 'Chief Dental Surgeon',
      avatar: 'https://images.unsplash.com/photo-1594824813576-9040ff5a0c02?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: 'October 18, 2026',
    coverImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    featured: false,
    summary: 'Plaque biofilm forms continuously on enamel and subgingival margins. Left undisturbed for 48 hours, it hardens into calculus (tartar) which cannot be brushed away at home. Learn the 2-minute 2-times modified Bass technique, flossing tips, and antiseptic mouthwash rules.',
    keyTakeaways: [
      'Brush for 2 full minutes twice daily using a soft-bristled brush held at a 45-degree angle to the gum line.',
      'Flossing once daily cleans interdental contacts where 80% of adult tooth decay begins.',
      'Wait 30 minutes after consuming acidic fruits or sodas before brushing to avoid enamel abrasion.',
      'Schedule clinical ultrasonic scaling every 6 months to remove subgingival calculus deposits.'
    ],
    sections: [
      {
        heading: 'The Modified Bass Technique: How to Actually Brush',
        content: 'Vigorous horizontal scrubbing acts like a saw against your gums, leading to cervical abrasion and painful tooth sensitivity. Instead, angle bristles 45 degrees towards the gum margin, use small circular vibratory strokes, and sweep downwards away from the gumline.',
        bulletPoints: [
          'Spend 30 seconds on each quadrant (upper right, upper left, lower right, lower left).',
          'Do NOT forget the inner lingual and palatal surfaces of your back molars.',
          'Gently brush your tongue or use a tongue scraper to remove volatile sulfur-producing bacteria that cause bad breath.'
        ]
      },
      {
        heading: 'When & How to Use Chlorhexidine Mouthwash',
        content: 'Antiseptic mouthwashes like Chlorhexidine 0.2% are exceptional after dental extractions or periodontal therapy. However, routine continuous use beyond 2 weeks is not recommended as it can cause superficial extrinsic staining and alter natural oral microflora. For daily maintenance, use an alcohol-free fluoride rinse.',
        calloutWarning: 'Dentist Tip: Never rinse with water immediately after brushing with fluoride toothpaste; spit the foam out and leave the fluoride film to protect enamel.'
      }
    ],
    clinicalFAQs: [
      {
        question: 'Why do my gums bleed when I floss?',
        answer: 'Bleeding is a classic sign of mild gingivitis (inflammation caused by trapped bacteria), NOT a sign to stop flossing. With gentle daily flossing, bleeding usually resolves within 7-10 days.'
      }
    ],
    tags: ['Dental Care', 'Oral Hygiene', 'Flossing', 'Gingivitis', 'Teeth Cleaning']
  },
  {
    id: 'art-diabetes-foot-care',
    slug: 'diabetes-glycemic-control-and-foot-care',
    title: 'Type-2 Diabetes Protocol: HbA1c Targets, Meal Spacing & Foot Safety',
    subtitle: 'Comprehensive guide to preserving microvascular health, preventing neuropathy, and managing postprandial spikes.',
    category: 'Diabetes & Nutrition',
    readTime: '6 min read',
    doctorAuthor: {
      name: 'Dr. Aarav Mehta',
      qualifications: 'MBBS, MD (Internal Medicine)',
      specialty: 'Consultant Physician',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: 'October 15, 2026',
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    featured: false,
    summary: 'Managing Type-2 Diabetes is much more than avoiding white sugar. It requires monitoring HbA1c every 3 months (target generally <7.0%), recognizing hypoglycemic warning signs, and performing daily foot checks to avoid diabetic foot ulcers.',
    keyTakeaways: [
      'Target HbA1c for most non-pregnant adults is below 7.0%; fasting blood glucose should be 80-130 mg/dL.',
      'Hypoglycemia (blood sugar <70 mg/dL) is dangerous: follow the "Rule of 15" with 15g fast-acting glucose.',
      'Inspect your feet every night under good lighting; never walk barefoot even indoors.',
      'Combine soluble fiber (beans, oats, salads) with carbohydrate meals to blunt glucose absorption spikes.'
    ],
    sections: [
      {
        heading: 'The "Rule of 15" for Low Blood Sugar (Hypoglycemia)',
        content: 'If you feel sudden cold sweats, shakiness, dizziness, rapid heart rate, or intense hunger, check your glucose immediately. If below 70 mg/dL:',
        bulletPoints: [
          'Consume 15 grams of fast-acting sugar (half glass fruit juice, 3-4 glucose tablets, or 1 tablespoon sugar in water).',
          'Wait 15 minutes and re-test your blood sugar.',
          'If still below 70 mg/dL, repeat the 15g intake.',
          'Once restored above 70 mg/dL, eat your regular meal or a small carbohydrate snack with protein.'
        ],
        calloutWarning: 'Warning: If a diabetic patient becomes unconscious or cannot swallow, do NOT force liquids. Administer emergency glucagon or call 108/112 immediately.'
      },
      {
        heading: 'Why Daily Diabetic Foot Examination Saves Limbs',
        content: 'Prolonged hyperglycemia dampens peripheral nerve sensitivity (diabetic neuropathy) and reduces microvascular circulation. A small blister, pebble in a shoe, or ingrown toenail can go entirely unnoticed and turn into an infected deep ulcer within days.',
        bulletPoints: [
          'Wash feet daily in lukewarm (not hot) water and pat dry thoroughly, especially between toes.',
          'Moisturize dry heels and soles, but avoid lotion between toes to prevent fungal maceration.',
          'Wear seamless cotton socks and properly fitted shoes with protective cushioning.'
        ]
      }
    ],
    clinicalFAQs: [
      {
        question: 'Can I replace my prescribed Metformin with herbal remedies?',
        answer: 'Absolutely not. Metformin is one of the safest, most studied insulin-sensitizing medications in modern medicine. Unverified supplements can cause dangerous blood glucose swings and renal toxicity.'
      }
    ],
    tags: ['Diabetes', 'HbA1c', 'Metformin', 'Diabetic Foot', 'Hypoglycemia']
  },
  {
    id: 'art-cpr-first-aid',
    slug: 'emergency-cpr-and-first-aid-basics',
    title: 'Hands-Only CPR & Emergency First Aid: How to Save a Life in Minutes',
    subtitle: 'What every family member must know before the ambulance arrives: Cardiac arrest, choking, and burn triage.',
    category: 'Emergency & First Aid',
    readTime: '4 min read',
    doctorAuthor: {
      name: 'Dr. Rohan Deshmukh',
      qualifications: 'MD, DM (Cardiology), FACC',
      specialty: 'Interventional Cardiologist',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: 'October 12, 2026',
    coverImage: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80',
    featured: true,
    summary: 'When someone collapses from sudden cardiac arrest, biological brain death begins in just 4 to 6 minutes without circulation. Hands-only CPR keeps oxygenated blood flowing to the brain until emergency medical teams arrive with a defibrillator.',
    keyTakeaways: [
      'Call emergency 108 / 112 immediately and place your phone on speaker before beginning chest compressions.',
      'Push hard and fast in the center of the chest at 100 to 120 beats per minute (to the tempo of "Stayin Alive").',
      'Compress to a depth of at least 2 inches (5 cm) and allow the chest to recoil fully between pumps.',
      'Do not stop until emergency paramedics take over, an AED is ready to shock, or the victim wakes up.'
    ],
    sections: [
      {
        heading: 'Recognizing Cardiac Arrest vs Fainting',
        content: 'A person in cardiac arrest will be completely unresponsive and will NOT be breathing normally (or will have abnormal gasping / agonal breathing). If you shake their shoulders and get no response and see no normal breathing, assume cardiac arrest.',
        calloutWarning: 'Critical: You CANNOT harm someone by doing CPR if they are in cardiac arrest. Doing nothing guarantees a fatal outcome.'
      },
      {
        heading: 'Immediate Steps for Severe Burn Injuries',
        content: 'Burn trauma requires rapid cooling to arrest thermal damage to deeper skin tissue:',
        bulletPoints: [
          'Cool the burn immediately with cool, gently running tap water for at least 10 to 20 minutes.',
          'Do NOT apply ice, ice water, butter, toothpaste, or oil (these trap heat and introduce severe bacterial infection).',
          'Remove tight rings, watches, or restrictive clothing near the area before swelling begins.',
          'Cover loosely with sterile non-stick plastic wrap or clean cotton cloth and proceed to the nearest hospital.'
        ]
      }
    ],
    clinicalFAQs: [
      {
        question: 'Do I need to give mouth-to-mouth rescue breaths?',
        answer: 'For adult bystanders outside a hospital, Hands-Only CPR (continuous rapid chest compressions without rescue breaths) has been proven equally effective and prevents delays in blood flow.'
      }
    ],
    tags: ['CPR', 'First Aid', 'Emergency Response', 'Burns', 'Cardiac Arrest']
  },
  {
    id: 'art-mental-wellness',
    slug: 'de-escalating-panic-attacks-and-chronic-stress',
    title: 'Recognizing & De-escalating Panic Attacks: The 5-4-3-2-1 Grounding Method',
    subtitle: 'Clinical techniques to regulate your nervous system when anxiety mimics a physical medical emergency.',
    category: 'Mental Wellness',
    readTime: '3 min read',
    doctorAuthor: {
      name: 'Dr. Neha Kapoor',
      qualifications: 'MD (Psychiatry), DNB',
      specialty: 'Neuropsychiatrist & Mental Health Specialist',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80'
    },
    publishedDate: 'October 10, 2026',
    coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
    featured: false,
    summary: 'A panic attack can produce intense chest tightness, shortness of breath, trembling, and a sense of impending doom that frequently sends patients to the emergency room thinking they are having a heart attack. Learn how parasympathetic grounding works.',
    keyTakeaways: [
      'Panic attacks peak within 10 minutes and are not physically dangerous, though deeply distressing.',
      'Use the 5-4-3-2-1 sensory grounding method to pull your prefrontal cortex out of acute fight-or-flight mode.',
      'Practice box breathing: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s.',
      'Rule out physical cardiovascular symptoms with your physician before attributing persistent symptoms to anxiety.'
    ],
    sections: [
      {
        heading: 'The 5-4-3-2-1 Sensory Grounding Technique',
        content: 'During an acute anxiety surge, your amygdala floods your bloodstream with adrenaline. Force your brain back into present sensory reality by naming out loud:',
        bulletPoints: [
          '5 things you can see around you (e.g. wall clock, shoes, chair, pen, plant)',
          '4 things you can physically touch (e.g. table surface, fabric of your jeans, cool water bottle)',
          '3 things you can clearly hear (e.g. ceiling fan hum, distant traffic, your own breathing)',
          '2 things you can smell (e.g. soap on your hands, coffee aroma)',
          '1 thing you can taste (or take a slow sip of cold water)'
        ]
      }
    ],
    clinicalFAQs: [
      {
        question: 'When should I call the emergency helpline during panic?',
        answer: 'If this is the first time you are experiencing severe chest crushing pain or breathlessness, always seek immediate medical evaluation (Call 108 or Tele-MANAS 14416) to rule out cardiac pathology.'
      }
    ],
    tags: ['Mental Health', 'Anxiety', 'Panic Attack', 'Grounding', 'Wellness']
  }
];

