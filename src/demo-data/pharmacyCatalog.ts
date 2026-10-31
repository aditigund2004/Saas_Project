export interface PharmacyMedicine {
  id: string;
  name: string;
  genericName: string;
  brandName: string;
  category: string;
  form: 'Tablet' | 'Capsule' | 'Syrup' | 'Mouthwash' | 'Ointment' | 'Powder' | 'Injection';
  strength: string;
  packSize: string;
  mrp: number;
  price: number;
  discountPercent: number;
  manufacturer: string;
  inStock: boolean;
  stockCount: number;
  requiresPrescription: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  dosageInstructions: string;
  image: string;
  activeComposition: string;
}

export interface MedicineOrder {
  id: string;
  orderNumber: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  deliveryAddress: string;
  deliveryMethod: 'Clinic Pickup' | 'Standard Delivery' | 'Express 2-Hour Delivery';
  items: {
    medicineId: string;
    name: string;
    strength: string;
    quantity: number;
    price: number;
    prescriptionNumber?: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'NetBanking' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending';
  orderStatus: 'Order Placed' | 'Prescription Verified' | 'Dispensed & Packed' | 'Out for Delivery' | 'Delivered' | 'Ready for Pickup';
  prescriptionAttached?: string;
  clinicId: string;
  clinicName: string;
  createdAt: string;
  estimatedDelivery: string;
}

export const PHARMACY_CATEGORIES = [
  'All Medicines',
  'Prescription Antibiotics',
  'Pain & Fever Relief',
  'Cardiac & Blood Pressure',
  'Diabetes Care',
  'Oral & Dental Care',
  'Gastrointestinal & Antacids',
  'Vitamins & Supplements',
  'First Aid & Ointments'
];

export const DEMO_PHARMACY_CATALOG: PharmacyMedicine[] = [
  {
    id: 'med-aug-625',
    name: 'Augmentin 625 Duo Tablet',
    genericName: 'Amoxicillin + Potassium Clavulanate',
    brandName: 'Augmentin 625 Duo',
    category: 'Prescription Antibiotics',
    form: 'Tablet',
    strength: '500mg + 125mg',
    packSize: 'Strip of 10 Tablets',
    mrp: 220,
    price: 185,
    discountPercent: 16,
    manufacturer: 'GlaxoSmithKline Pharmaceuticals Ltd',
    inStock: true,
    stockCount: 42,
    requiresPrescription: true,
    rating: 4.8,
    reviewsCount: 142,
    description: 'High-potency penicillin antibiotic indicated for acute bacterial dental infections, respiratory infections, and post-operative prophylaxis.',
    dosageInstructions: 'Take 1 tablet every 12 hours strictly at the start of a meal.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)'
  },
  {
    id: 'med-zerodol-p',
    name: 'Zerodol-P Pain Relief Tablet',
    genericName: 'Aceclofenac + Paracetamol',
    brandName: 'Zerodol-P',
    category: 'Pain & Fever Relief',
    form: 'Tablet',
    strength: '100mg + 325mg',
    packSize: 'Strip of 10 Tablets',
    mrp: 98,
    price: 82,
    discountPercent: 16,
    manufacturer: 'Ipca Laboratories Ltd',
    inStock: true,
    stockCount: 88,
    requiresPrescription: true,
    rating: 4.7,
    reviewsCount: 95,
    description: 'Targeted analgesic and anti-inflammatory combination for dental trauma, root canal soreness, musculoskeletal ache, and post-operative swelling.',
    dosageInstructions: 'Take 1 tablet twice daily strictly after meals with water. Do not take on empty stomach.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Aceclofenac (100mg) + Paracetamol (325mg)'
  },
  {
    id: 'med-hexidine-rinse',
    name: 'Hexidine 0.2% Antiseptic Oral Rinse',
    genericName: 'Chlorhexidine Gluconate 0.2% w/v',
    brandName: 'Hexidine',
    category: 'Oral & Dental Care',
    form: 'Mouthwash',
    strength: '0.2% w/v',
    packSize: '160ml Bottle',
    mrp: 140,
    price: 122,
    discountPercent: 13,
    manufacturer: 'ICPA Health Products Ltd',
    inStock: true,
    stockCount: 65,
    requiresPrescription: false,
    rating: 4.9,
    reviewsCount: 210,
    description: 'Bactericidal antimicrobial mouthwash effective against dental plaque, gingivitis, bleeding gums, and oral ulcers. Promotes clean mucosal healing.',
    dosageInstructions: 'Swish 10ml undiluted in mouth for 60 seconds twice daily after brushing. Spit out completely; do not swallow.',
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Chlorhexidine Gluconate Solution I.P. equivalent to Chlorhexidine Gluconate 0.2% w/v'
  },
  {
    id: 'med-telma-40',
    name: 'Telmikind 40 Antihypertensive Tablet',
    genericName: 'Telmisartan',
    brandName: 'Telmikind 40',
    category: 'Cardiac & Blood Pressure',
    form: 'Tablet',
    strength: '40mg',
    packSize: 'Strip of 10 Tablets',
    mrp: 115,
    price: 94,
    discountPercent: 18,
    manufacturer: 'Mankind Pharma Ltd',
    inStock: true,
    stockCount: 50,
    requiresPrescription: true,
    rating: 4.8,
    reviewsCount: 78,
    description: 'Angiotensin II receptor antagonist used in the management of essential hypertension and reduction of cardiovascular risk in adults.',
    dosageInstructions: 'Take 1 tablet once daily in the morning with or without food at the same time every day.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Telmisartan 40mg'
  },
  {
    id: 'med-pantocid-40',
    name: 'Pantocid 40 Gastro-Resistant Tablet',
    genericName: 'Pantoprazole Sodium',
    brandName: 'Pantocid 40',
    category: 'Gastrointestinal & Antacids',
    form: 'Tablet',
    strength: '40mg',
    packSize: 'Strip of 15 Tablets',
    mrp: 175,
    price: 148,
    discountPercent: 15,
    manufacturer: 'Sun Pharmaceutical Industries Ltd',
    inStock: true,
    stockCount: 110,
    requiresPrescription: true,
    rating: 4.8,
    reviewsCount: 164,
    description: 'Proton pump inhibitor (PPI) that decreases stomach acid production. Co-prescribed with painkillers to prevent NSAID-induced gastritis.',
    dosageInstructions: 'Take 1 tablet whole once daily in the morning on an empty stomach, 30 minutes before breakfast.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Pantoprazole Sodium Sesquihydrate equivalent to Pantoprazole 40mg'
  },
  {
    id: 'med-glycomet-gp1',
    name: 'Glycomet-GP 1 Tablet',
    genericName: 'Metformin Hydrochloride + Glimepiride',
    brandName: 'Glycomet-GP 1',
    category: 'Diabetes Care',
    form: 'Tablet',
    strength: '500mg + 1mg',
    packSize: 'Strip of 15 Tablets',
    mrp: 125,
    price: 106,
    discountPercent: 15,
    manufacturer: 'USV Pvt Ltd',
    inStock: true,
    stockCount: 40,
    requiresPrescription: true,
    rating: 4.7,
    reviewsCount: 62,
    description: 'Combination antidiabetic medicine for glycemic control in patients with Type-2 Diabetes Mellitus alongside diet and physical exercise.',
    dosageInstructions: 'Take 1 tablet daily with breakfast or first main meal of the day.',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Metformin (500mg Sustained Release) + Glimepiride (1mg)'
  },
  {
    id: 'med-dolo-650',
    name: 'Dolo 650 Antipyretic Tablet',
    genericName: 'Paracetamol',
    brandName: 'Dolo 650',
    category: 'Pain & Fever Relief',
    form: 'Tablet',
    strength: '650mg',
    packSize: 'Strip of 15 Tablets',
    mrp: 35,
    price: 31,
    discountPercent: 11,
    manufacturer: 'Micro Labs Ltd',
    inStock: true,
    stockCount: 220,
    requiresPrescription: false,
    rating: 4.9,
    reviewsCount: 512,
    description: 'Standard antipyretic and mild-to-moderate pain reliever for fever, body aches, headache, toothache, and cold symptoms.',
    dosageInstructions: 'Take 1 tablet every 6 to 8 hours as needed. Do not exceed 4 tablets in 24 hours.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Paracetamol I.P. 650mg'
  },
  {
    id: 'med-shelcal-500',
    name: 'Shelcal 500 Calcium & Vitamin D3',
    genericName: 'Calcium Carbonate + Cholecalciferol',
    brandName: 'Shelcal 500',
    category: 'Vitamins & Supplements',
    form: 'Tablet',
    strength: '500mg + 250 IU',
    packSize: 'Strip of 15 Tablets',
    mrp: 150,
    price: 128,
    discountPercent: 15,
    manufacturer: 'Torrent Pharmaceuticals Ltd',
    inStock: true,
    stockCount: 95,
    requiresPrescription: false,
    rating: 4.8,
    reviewsCount: 180,
    description: 'Essential dietary supplement to maintain bone mineral density, dental enamel strength, and optimal calcium metabolism in joints.',
    dosageInstructions: 'Take 1 tablet daily after lunch or dinner with a glass of water.',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Elemental Calcium (500mg) derived from Oyster Shell + Vitamin D3 (250 IU)'
  },
  {
    id: 'med-betadine-oint',
    name: 'Betadine 10% Microbicidal Ointment',
    genericName: 'Povidone-Iodine 10% w/w',
    brandName: 'Betadine 10%',
    category: 'First Aid & Ointments',
    form: 'Ointment',
    strength: '10% w/w',
    packSize: '20g Tube',
    mrp: 130,
    price: 112,
    discountPercent: 14,
    manufacturer: 'Win-Medicare Pvt Ltd',
    inStock: true,
    stockCount: 75,
    requiresPrescription: false,
    rating: 4.9,
    reviewsCount: 230,
    description: 'Gold-standard topical microbicidal antiseptic ointment for minor cuts, abrasions, burns, surgical wound dressings, and prevention of infection.',
    dosageInstructions: 'Clean the affected skin area gently and apply a thin film 1 to 2 times daily. Cover with sterile gauze if required.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Povidone-Iodine IP 10% w/w (available Iodine 1% w/w)'
  },
  {
    id: 'med-montair-lc',
    name: 'Montair-LC Antiallergic Tablet',
    genericName: 'Montelukast + Levocetirizine',
    brandName: 'Montair-LC',
    category: 'Pain & Fever Relief',
    form: 'Tablet',
    strength: '10mg + 5mg',
    packSize: 'Strip of 10 Tablets',
    mrp: 195,
    price: 165,
    discountPercent: 15,
    manufacturer: 'Cipla Ltd',
    inStock: true,
    stockCount: 55,
    requiresPrescription: true,
    rating: 4.8,
    reviewsCount: 118,
    description: 'Dual antiallergic therapy for allergic rhinitis, seasonal sneezing, nasal congestion, and associated wheezing or cough.',
    dosageInstructions: 'Take 1 tablet daily at bedtime. May cause mild drowsiness.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Montelukast Sodium (10mg) + Levocetirizine Dihydrochloride (5mg)'
  },
  {
    id: 'med-becosules',
    name: 'Becosules Performance B-Complex & Zinc',
    genericName: 'Vitamin B Complex + Vitamin C + Zinc',
    brandName: 'Becosules',
    category: 'Vitamins & Supplements',
    form: 'Capsule',
    strength: 'Multi-nutrient formula',
    packSize: 'Strip of 30 Capsules',
    mrp: 165,
    price: 139,
    discountPercent: 16,
    manufacturer: 'Pfizer Ltd',
    inStock: true,
    stockCount: 140,
    requiresPrescription: false,
    rating: 4.9,
    reviewsCount: 340,
    description: 'High-strength therapeutic multivitamin for mouth ulcers, tissue regeneration, physical fatigue, and immune system reinforcement.',
    dosageInstructions: 'Take 1 capsule once daily after a meal.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Thiamine (10mg), Riboflavin (10mg), Niacinamide (50mg), Folic Acid (1mg), Ascorbic Acid (150mg), Zinc (41.4mg)'
  },
  {
    id: 'med-electral-ors',
    name: 'Electral WHO-Formula ORS Powder',
    genericName: 'Oral Rehydration Salts IP',
    brandName: 'Electral',
    category: 'First Aid & Ointments',
    form: 'Powder',
    strength: '21.8g Sachet (WHO Formula)',
    packSize: 'Pack of 5 Sachets',
    mrp: 110,
    price: 98,
    discountPercent: 11,
    manufacturer: 'FDC Ltd',
    inStock: true,
    stockCount: 180,
    requiresPrescription: false,
    rating: 4.9,
    reviewsCount: 420,
    description: 'WHO recommended oral electrolyte formula to restore vital water and salts lost due to dehydration, acute diarrhea, vomiting, or excessive heat.',
    dosageInstructions: 'Dissolve entire contents of one 21.8g sachet in 1 liter of fresh boiled and cooled drinking water. Consume within 24 hours.',
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&w=400&q=80',
    activeComposition: 'Sodium Chloride (2.6g), Potassium Chloride (1.5g), Sodium Citrate (2.9g), Dextrose Anhydrous (13.5g)'
  }
];

export const INITIAL_DEMO_MEDICINE_ORDERS: MedicineOrder[] = [
  {
    id: 'mord-901',
    orderNumber: 'RX-ORD-901',
    patientId: 'pt-1041',
    patientName: 'Aarav Patel',
    patientPhone: '+91 98765 43210',
    deliveryAddress: 'Flat 402, Sea Green Heights, Shivaji Park, Dadar West, Mumbai 400028',
    deliveryMethod: 'Express 2-Hour Delivery',
    items: [
      {
        medicineId: 'med-aug-625',
        name: 'Augmentin 625 Duo Tablet',
        strength: '500mg + 125mg',
        quantity: 1,
        price: 185,
        prescriptionNumber: 'RX-2026-8812'
      },
      {
        medicineId: 'med-zerodol-p',
        name: 'Zerodol-P Pain Relief Tablet',
        strength: '100mg + 325mg',
        quantity: 1,
        price: 82,
        prescriptionNumber: 'RX-2026-8812'
      },
      {
        medicineId: 'med-hexidine-rinse',
        name: 'Hexidine 0.2% Antiseptic Oral Rinse',
        strength: '0.2% w/v (160ml)',
        quantity: 1,
        price: 122
      }
    ],
    subtotal: 389,
    deliveryFee: 0,
    discount: 39,
    total: 350,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    prescriptionAttached: 'RX-2026-8812 (Verified by Dr. Arvind Rao)',
    clinicId: 'clinic-citycare',
    clinicName: 'CityCare Family Clinic Pharmacy',
    createdAt: '2026-10-25T11:45:00Z',
    estimatedDelivery: 'Delivered on Oct 25, 2026'
  }
];

