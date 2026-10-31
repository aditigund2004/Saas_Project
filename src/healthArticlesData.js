// -------------------------------------------------------------
// ClinicOS Centralized Health Library & Disease Awareness Data
// Medically Reviewed Patient Education Articles
// -------------------------------------------------------------

export const diseaseCategories = [
  'All',
  'Diabetes',
  'Heart Diseases',
  'Blood Pressure',
  'Respiratory Diseases',
  'Skin Diseases',
  'Neurological Disorders',
  'Digestive Diseases',
  'Kidney Diseases',
  'Liver Diseases',
  'Infectious Diseases',
  "Women's Health",
  "Children's Health",
  'Mental Health',
  'Bone and Joint Diseases',
  'Lifestyle and Nutrition',
]

export const initialDiseaseArticles = [
  {
    id: 'art-1',
    slug: 'diabetes-mellitus',
    title: 'Diabetes Mellitus: Type 1, Type 2, and Blood Sugar Management',
    category: 'Diabetes',
    shortDescription:
      'A comprehensive guide to understanding insulin regulation, early warning symptoms, diagnostic criteria, and long-term metabolic health.',
    readTime: '7 min read',
    updatedAt: 'October 24, 2026',
    author: {
      name: 'Dr. Maya Patel',
      role: 'Family Medicine & Attending Physician',
      initials: 'MP',
      clinicId: 'sunrise',
    },
    reviewedBy: {
      name: 'Dr. Arvind Sharma',
      title: 'Consultant Endocrinologist, MD',
      date: 'October 20, 2026',
    },
    status: 'Published',
    featured: true,
    views: 1420,
    diagramType: 'glycemic_pathway',
    commonSymptoms: ['Frequent urination', 'Excessive thirst', 'Unexplained weight loss', 'Fatigue', 'Blurred vision'],
    preventionHighlights: [
      'Maintain an optimal BMI (18.5 - 24.9)',
      '150 minutes of moderate aerobic exercise weekly',
      'Whole-food, low-glycemic dietary intake',
    ],
    overview:
      'Diabetes mellitus is a chronic metabolic condition characterized by persistent hyperglycemia (elevated blood glucose). In healthy individuals, pancreatic beta cells secrete insulin, a hormone that facilitates the uptake of glucose into cells for cellular energy. When insulin production is insufficient or the body cells become resistant to insulin, glucose accumulates in the bloodstream, leading to microvascular and macrovascular complications over time.',
    causes: [
      'Type 1 Diabetes: An autoimmune disorder in which the immune system targets and destroys insulin-producing beta cells in the Islets of Langerhans.',
      'Type 2 Diabetes: A progressive metabolic condition driven by peripheral insulin resistance (primarily in muscle, liver, and adipose tissue) combined with a gradual decline in pancreatic beta-cell compensatory secretion.',
      'Gestational Diabetes: Hormones produced by the placenta during pregnancy block insulin action, triggering transient or persisting insulin resistance.',
      'Secondary causes: Chronic pancreatitis, corticosteroid medications, endocrine disorders (Cushing syndrome, acromegaly), and genetic mutations affecting beta-cell function.',
    ],
    symptoms: {
      early: [
        'Polyuria (frequent, high-volume urination, especially at night)',
        'Polydipsia (unquenchable thirst despite high fluid intake)',
        'Polyphagia (constant extreme hunger)',
      ],
      common: [
        'Persistent lethargy and chronic physical fatigue',
        'Unexplained and unintentional weight loss despite normal appetite',
        'Blurred vision due to hyperosmolar changes in the eye lens',
        'Slow-healing abrasions, skin cuts, or recurrent fungal/yeast infections',
      ],
      warningSigns: [
        'Fruity-smelling breath odor (sign of diabetic ketoacidosis)',
        'Deep rapid breathing (Kussmaul breathing) and persistent nausea/vomiting',
        'Mental confusion, dizziness, or loss of consciousness',
        'Extreme hypoglycemia signs (shakiness, diaphoresis, palpitations)',
      ],
    },
    riskFactors: [
      'Body Mass Index (BMI) >= 25 kg/m² or high waist-to-hip ratio (>0.9 in men, >0.85 in women)',
      'Physical inactivity (<90 minutes of weekly cardiovascular movement)',
      'First-degree family history of Type 2 diabetes (parent or sibling)',
      'History of gestational diabetes or giving birth to a newborn weighing >4 kg (>9 lbs)',
      'Polycystic Ovary Syndrome (PCOS) characterized by insulin resistance',
      'Co-existing hypertension (>=130/80 mmHg) or dyslipidemia (HDL <35 mg/dL or Triglycerides >250 mg/dL)',
    ],
    typesAndStages: [
      {
        title: 'Prediabetes (Impaired Glucose Regulation)',
        description:
          'Blood glucose levels are elevated above normal but not yet high enough for a diabetes diagnosis (Fasting Blood Glucose 100-125 mg/dL or HbA1c 5.7%-6.4%). Highly reversible with lifestyle intervention.',
      },
      {
        title: 'Type 1 Diabetes Mellitus',
        description:
          'Absolute insulin deficiency typically diagnosed in children, adolescents, or young adults. Requires lifelong daily exogenous insulin therapy via multiple daily injections or continuous infusion pump.',
      },
      {
        title: 'Type 2 Diabetes Mellitus',
        description:
          'Accounts for 90-95% of all diabetes cases. Involves relative insulin deficiency and peripheral resistance. Managed with oral hypoglycemics, injectable GLP-1 receptor agonists, lifestyle modifications, and basal insulin.',
      },
      {
        title: 'Gestational Diabetes',
        description:
          'Discovered during the second or third trimester of gestation. Increases maternal risk of preeclampsia and subsequent lifetime risk of developing chronic Type 2 diabetes.',
      },
    ],
    diagnosis: [
      {
        testName: 'Fasting Plasma Glucose (FPG)',
        purpose: 'Measures blood sugar after an overnight 8-hour fast. Normal: <100 mg/dL; Prediabetes: 100-125 mg/dL; Diabetes: >=126 mg/dL on two separate occasions.',
      },
      {
        testName: 'Glycated Hemoglobin (HbA1c)',
        purpose: 'Reflects the average blood glucose concentration over the prior 2 to 3 months. Normal: <5.7%; Prediabetes: 5.7% - 6.4%; Diabetes: >=6.5%.',
      },
      {
        testName: 'Oral Glucose Tolerance Test (OGTT)',
        purpose: 'Two-hour plasma glucose check after drinking a 75g anhydrous glucose solution. Normal: <140 mg/dL; Diabetes: >=200 mg/dL.',
      },
      {
        testName: 'Random Plasma Glucose + C-Peptide',
        purpose: 'Random glucose >=200 mg/dL with classic hyperglycemia symptoms confirms diabetes. C-peptide distinguishes endogenous insulin reserve.',
      },
    ],
    treatment: [
      {
        modality: 'First-Line Oral Pharmacotherapy (Metformin)',
        details: 'Biguanide that decreases hepatic gluconeogenesis and improves peripheral insulin sensitivity.',
      },
      {
        modality: 'Cardio-Renal Protective Agents (SGLT2i & GLP-1 RA)',
        details: 'SGLT2 inhibitors (Empagliflozin, Dapagliflozin) promote urinary glucose excretion and protect kidneys. GLP-1 receptor agonists (Semaglutide) enhance satiety and promote weight loss.',
      },
      {
        modality: 'Insulin Replacement Protocols',
        details: 'Basal insulin (Glargine, Degludec) covers background metabolic needs, while rapid-acting prandial insulin (Lispro, Aspart) covers mealtime carbohydrate excursions.',
      },
      {
        modality: 'Continuous Glucose Monitoring (CGM)',
        details: 'Real-time interstitial glucose sensors tracking time-in-range (70-180 mg/dL target >=70% of the day).',
      },
    ],
    prevention: [
      'Maintain an active weekly schedule with at least 150 minutes of brisk walking, swimming, or cycling.',
      'Achieve a modest 5% to 7% loss of initial body weight if currently overweight.',
      'Replace refined carbohydrates (white bread, sugar-sweetened beverages) with high-fiber whole grains and legumes.',
      'Undergo annual screening blood tests if over 35 years old or possessing cardiovascular risk factors.',
      'Avoid tobacco smoke, which exacerbates vascular inflammation and increases insulin resistance.',
    ],
    dietAndLifestyle: [
      'Adopt the "Diabetes Plate Method": 1/2 plate non-starchy vegetables (spinach, broccoli), 1/4 plate lean protein (fish, tofu, chicken), 1/4 plate complex carbohydrates (brown rice, quinoa).',
      'Choose low glycemic index (GI) foods that cause gradual rises in glucose rather than rapid spikes.',
      'Prioritize sound sleep of 7-8 hours per night; obstructive sleep apnea strongly correlates with uncontrolled hyperglycemia.',
      'Inspect feet daily for micro-abrasions, blisters, or temperature changes to prevent neuropathic ulcerations.',
    ],
    whenToConsult: [
      'Experiencing persistent extreme thirst and frequent nighttime urination for more than 5 days.',
      'Blood glucose readings persistently exceeding 250 mg/dL or falling below 70 mg/dL (hypoglycemia).',
      'Presence of non-healing sores, numbness or tingling ("pins and needles") in feet or toes.',
      'Sudden visual disturbances, blurred vision, or dark floaters.',
    ],
    faqs: [
      {
        question: 'Can Type 2 diabetes be reversed or placed into remission?',
        answer:
          'Yes. Through substantial weight loss, intensive dietary changes, and consistent exercise, many patients achieve non-diabetic glucose levels without medications. This is clinically termed diabetes remission.',
      },
      {
        question: 'Is insulin treatment addictive or a sign of failure?',
        answer:
          'No. Insulin is a natural vital hormone, not an addictive drug. Starting insulin in Type 2 diabetes simply means your pancreas needs physiological assistance to protect your blood vessels and vital organs.',
      },
      {
        question: 'What is the ideal target HbA1c for most diabetic adults?',
        answer:
          'For most non-pregnant adults, an HbA1c target below 7.0% (53 mmol/mol) balances microvascular protection while minimizing dangerous hypoglycemia. Individualized targets should be established with your physician.',
      },
    ],
    disclaimer:
      'The clinical information provided here is strictly educational and does not constitute individual medical diagnosis or treatment advice. Consult a licensed physician for personalized blood sugar management.',
  },

  {
    id: 'art-2',
    slug: 'hypertension-high-blood-pressure',
    title: 'Hypertension (High Blood Pressure): The Silent Killer Explained',
    category: 'Blood Pressure',
    shortDescription:
      'Learn about arterial pressure dynamics, hypertension stages, cardiovascular risks, the DASH diet, and evidence-based blood pressure management.',
    readTime: '6 min read',
    updatedAt: 'October 25, 2026',
    author: {
      name: 'Dr. Maya Patel',
      role: 'Family Medicine & Attending Physician',
      initials: 'MP',
      clinicId: 'sunrise',
    },
    reviewedBy: {
      name: 'Dr. Sarah Jenkins',
      title: 'Cardiologist, FACC',
      date: 'October 21, 2026',
    },
    status: 'Published',
    featured: true,
    views: 1850,
    diagramType: 'blood_pressure_spectrum',
    commonSymptoms: ['Usually asymptomatic ("Silent")', 'Occasional morning headache', 'Dizziness', 'Palpitations', 'Nosebleeds'],
    preventionHighlights: [
      'Limit sodium intake to under 2,000 mg/day',
      'Engage in daily brisk cardiovascular activity',
      'Adopt the potassium-rich DASH diet pattern',
    ],
    overview:
      'Hypertension is defined as persistent systemic arterial pressure of 130 mmHg systolic or 80 mmHg diastolic and above. Often called the "silent killer," it rarely manifests early symptoms while placing unyielding mechanical strain on arterial walls. Over months and years, unmanaged elevated pressures accelerate atherosclerosis, leading to myocardial infarction, ischemic stroke, heart failure, and chronic renal failure.',
    causes: [
      'Primary (Essential) Hypertension (90-95% of cases): Multifactorial etiology combining genetic predisposition, arterial vascular stiffening, excess dietary sodium, sympathetic nervous overactivity, and diminished renal sodium excretion.',
      'Renovascular Disease: Atherosclerotic renal artery stenosis triggering excess renin-angiotensin-aldosterone axis activation.',
      'Endocrine Disorders: Primary aldosteronism (Conn syndrome), pheochromocytoma, Cushing syndrome, hyperthyroidism.',
      'Obstructive Sleep Apnea (OSA): Nocturnal hypoxia and surges in sympathetic tone elevating systemic vascular resistance.',
      'Medication-induced: Chronic NSAID usage, oral contraceptives, systemic decongestants (pseudoephedrine), and systemic corticosteroids.',
    ],
    symptoms: {
      early: [
        'Hypertension is predominantly asymptomatic; most patients feel entirely well despite dangerously high pressure.',
        'Mild unsteadiness or lightheadedness upon standing quickly.',
      ],
      common: [
        'Dull morning occipital headaches that improve throughout the day.',
        'Sensation of heart palpitations or rhythmic throbbing in the neck or ears.',
        'Spontaneous, non-traumatic epistaxis (nosebleeds).',
        'Subtle exertional dyspnea (shortness of breath) during routine stairs climbing.',
      ],
      warningSigns: [
        'Hypertensive Urgency/Crisis: Blood pressure reading > 180/120 mmHg.',
        'Severe acute "crushing" chest tightness or tearing interscapular back pain.',
        'Sudden neurological deficits: facial droop, slurred speech, or unilateral limb weakness.',
        'Acute visual obscuration or pulmonary edema with pink frothy sputum.',
      ],
    },
    riskFactors: [
      'High sodium dietary intake (>2,300 mg/day) and low dietary potassium consumption',
      'Age >= 55 years for men and >= 65 years for women due to progressive arterial elastance loss',
      'Excess body mass (overweight or visceral abdominal adiposity)',
      'Chronic unmanaged psycho-social stress and sleep fragmentation',
      'Tobacco smoking and heavy alcohol consumption (>2 drinks daily for men, >1 for women)',
      'Underlying metabolic disorders including prediabetes and chronic kidney disease',
    ],
    typesAndStages: [
      {
        title: 'Normal Blood Pressure',
        description: 'Systolic less than 120 mmHg AND diastolic less than 80 mmHg. Maintain healthy habits.',
      },
      {
        title: 'Elevated Blood Pressure',
        description: 'Systolic 120-129 mmHg AND diastolic less than 80 mmHg. Non-pharmacological lifestyle intervention indicated.',
      },
      {
        title: 'Stage 1 Hypertension',
        description: 'Systolic 130-139 mmHg OR diastolic 80-89 mmHg. Clinical ASCVD risk calculated; medications initiated if risk >=10%.',
      },
      {
        title: 'Stage 2 Hypertension',
        description: 'Systolic 140 mmHg or higher OR diastolic 90 mmHg or higher. Requires prompt dual-agent pharmacotherapy plus lifestyle adjustment.',
      },
      {
        title: 'Hypertensive Crisis',
        description: 'Systolic >180 mmHg and/or Diastolic >120 mmHg. Requires immediate emergency medical evaluation.',
      },
    ],
    diagnosis: [
      {
        testName: '24-Hour Ambulatory Blood Pressure Monitoring (ABPM)',
        purpose: 'The clinical gold standard for ruling out "white-coat hypertension" and assessing nocturnal dipping patterns.',
      },
      {
        testName: 'Serial Resting In-Clinic Measurements',
        purpose: 'At least 2 seated measurements across 2 or more distinct clinical encounters using validated oscillometric cuffs.',
      },
      {
        testName: 'Electrocardiogram (ECG)',
        purpose: 'Detects Left Ventricular Hypertrophy (LVH) and ischemic ST-T wave abnormalities caused by chronic cardiac afterload.',
      },
      {
        testName: 'Urinalysis & Serum Creatinine',
        purpose: 'Evaluates proteinuria / microalbuminuria and calculates estimated glomerular filtration rate (eGFR).',
      },
    ],
    treatment: [
      {
        modality: 'ACE Inhibitors & Angiotensin Receptor Blockers (ARBs)',
        details: 'Enalapril, Ramipril, Losartan, Telmisartan: Inhibit vasoconstriction and protect glomerular microcirculation.',
      },
      {
        modality: 'Dihydropyridine Calcium Channel Blockers (CCBs)',
        details: 'Amlodipine, Nifedipine: Dilate peripheral arterial smooth muscle cells and lower systemic resistance.',
      },
      {
        modality: 'Thiazide-like Diuretics',
        details: 'Chlorthalidone, Hydrochlorothiazide: Promote natriuresis (sodium excretion) and reduce vascular plasma volume.',
      },
      {
        modality: 'DASH Dietary Protocol',
        details: 'Dietary Approaches to Stop Hypertension reduces systolic pressure by an average of 8-14 mmHg.',
      },
    ],
    prevention: [
      'Measure blood pressure at home using a validated upper-arm digital monitor at least once monthly.',
      'Cut dietary sodium by avoiding processed meats, canned soups, frozen pre-made dinners, and salty snacks.',
      'Incorporate potassium-rich fresh fruits and vegetables (spinach, bananas, sweet potatoes) to promote sodium excretion.',
      'Engage in 30 minutes of aerobic exercise (cycling, brisk walking) at least 5 days a week.',
      'Limit alcohol intake to no more than one standard drink daily for women and two for men.',
    ],
    dietAndLifestyle: [
      'Emphasize the DASH eating plan: abundant green leafy vegetables, fresh berries, whole grains, beans, and low-fat dairy.',
      'Practice deep-breathing techniques (slow abdominal breathing for 5 minutes twice daily) to decrease sympathetic tone.',
      'Avoid excessive caffeine right before blood pressure readings to prevent transient spikes.',
      'Maintain an ergonomic sleep environment ensuring 7 to 9 hours of uninterrupted restorative rest.',
    ],
    whenToConsult: [
      'Home blood pressure reading consistently exceeds 140/90 mmHg over several days.',
      'Sudden severe headache accompanied by neck stiffness, nausea, or altered sensation.',
      'Chest pain, shortness of breath, or palpitations during mild everyday exertion.',
      'Blood pressure reading exceeds 180/120 mmHg, which warrants urgent medical care.',
    ],
    faqs: [
      {
        question: 'Can I stop my blood pressure pills once my numbers are back to normal?',
        answer:
          'No. Normal readings indicate that your prescribed medication is successfully doing its job. Discontinuing medication usually causes blood pressure to rebound to high levels, often without noticeable symptoms.',
      },
      {
        question: 'What is "white-coat hypertension"?',
        answer:
          'It is a phenomenon where blood pressure spikes in a doctor’s office due to transient anxiety or clinical stress, but remains normal in familiar home environments. Home monitoring helps clarify this pattern.',
      },
      {
        question: 'Which number is more critical: Systolic (top) or Diastolic (bottom)?',
        answer:
          'For adults over age 50, systolic blood pressure is the stronger predictor of cardiovascular disease and stroke risk. However, elevation in either number indicates hypertension and requires clinical attention.',
      },
    ],
    disclaimer:
      'This educational material does not replace clinical consultation. Do not alter or discontinue antihypertensive medications without direct supervision from your prescribing physician.',
  },

  {
    id: 'art-3',
    slug: 'coronary-artery-disease',
    title: 'Coronary Artery Disease (CAD): Arterial Health, Angina, and Prevention',
    category: 'Heart Diseases',
    shortDescription:
      'Understand atherosclerosis in coronary arteries, how angina develops, heart attack warning signs, and modern interventional treatments.',
    readTime: '8 min read',
    updatedAt: 'October 23, 2026',
    author: {
      name: 'Dr. Sarah Jenkins',
      role: 'Cardiologist & Clinical Specialist',
      initials: 'SJ',
      clinicId: 'sunrise',
    },
    reviewedBy: {
      name: 'Dr. Maya Patel',
      title: 'Family Medicine & Attending Physician',
      date: 'October 19, 2026',
    },
    status: 'Published',
    featured: true,
    views: 1290,
    diagramType: 'coronary_stenosis',
    commonSymptoms: ['Chest pressure/tightness', 'Pain radiating to jaw or left arm', 'Exertional shortness of breath', 'Cold sweats', 'Fatigue'],
    preventionHighlights: [
      'Maintain LDL-C below 70 mg/dL for high-risk individuals',
      'Absolute tobacco and nicotine cessation',
      'Daily 30-minute Mediterranean cardiovascular regimen',
    ],
    overview:
      'Coronary Artery Disease (CAD) is the leading cause of mortality worldwide. It occurs when cholesterol, fatty lipids, cellular waste products, and calcium accumulate inside the coronary arteries that supply oxygenated blood to the myocardium (heart muscle). As these atheromatous plaques enlarge, they narrow the arterial lumen, precipitating ischemic chest pain (angina). If a plaque ruptures, an acute thrombus can form rapidly, occluding blood flow and triggering an acute myocardial infarction (heart attack).',
    causes: [
      'Endothelial injury caused by hypertension, circulating toxins from cigarette smoke, or hyperhomocysteinemia.',
      'Accumulation and oxidation of low-density lipoprotein (LDL) particles in the subendothelial intima layer.',
      'Recruitment of monocytes and T-cells forming foam cells and chronic inflammatory fibroatheroma plaques.',
      'Plaque calcification and fibrous cap thinning, predisposing the vessel to sudden plaque rupture and thrombosis.',
    ],
    symptoms: {
      early: [
        'Subtle decrease in physical exercise tolerance or unusually prolonged post-exercise fatigue.',
        'Mild chest tightness that occurs during exertion and subsides completely within minutes of resting.',
      ],
      common: [
        'Angina Pectoris: Sensation of squeezing, heavy pressure, or fullness in the center of the chest.',
        'Referred pain radiating to the left shoulder, left arm, neck, jaw, or interscapular back.',
        'Exertional dyspnea (shortness of breath) occurring with or without chest discomfort.',
        'Cold sweats (diaphoresis), nausea, lightheadedness, or sudden unexplained dizziness.',
      ],
      warningSigns: [
        'Acute Myocardial Infarction: Severe crushing chest pain lasting >10 minutes unrelieved by sublingual nitroglycerin.',
        'Pain accompanied by feeling of impending doom, profound diaphoresis, and vomiting.',
        'Atypical presentations in women and diabetics: severe indigestion, jaw ache, or isolated extreme breathlessness without classic chest pressure.',
      ],
    },
    riskFactors: [
      'Elevated circulating Low-Density Lipoprotein Cholesterol (LDL-C) and elevated Apolipoprotein B (ApoB)',
      'Cigarette smoking and exposure to secondhand environmental tobacco smoke',
      'Systemic hypertension causing persistent mechanical endothelial shear stress',
      'Diabetes Mellitus and metabolic syndrome accelerating atherogenesis',
      'Premature family history of CAD (male first-degree relative <55 years, female relative <65 years)',
      'Chronic systemic inflammation (elevated high-sensitivity C-reactive protein, hs-CRP)',
    ],
    typesAndStages: [
      {
        title: 'Stable Angina',
        description: 'Predictable chest discomfort occurring under fixed physical exertion and relieved reliably within 5 minutes of rest or nitroglycerin.',
      },
      {
        title: 'Unstable Angina',
        description: 'Chest discomfort occurring at rest, of new onset, or rapidly escalating in frequency and severity. Represents an emergency.',
      },
      {
        title: 'Non-ST Elevation Myocardial Infarction (NSTEMI)',
        description: 'Partial or transient coronary occlusion leading to myocardial cell necrosis confirmed by elevated cardiac troponin biomarkers.',
      },
      {
        title: 'ST-Elevation Myocardial Infarction (STEMI)',
        description: 'Transmural, total coronary artery occlusion requiring immediate emergent catheterization and primary percutaneous intervention (PCI stenting).',
      },
    ],
    diagnosis: [
      {
        testName: 'Coronary Computed Tomography Angiography (CCTA)',
        purpose: 'Non-invasive high-resolution 3D visualization of coronary arterial anatomy and calcified/soft plaque burden.',
      },
      {
        testName: 'Exercise Treadmill Stress Testing (TMT) / Stress Echo',
        purpose: 'Evaluates cardiac electrical activity and regional wall motion abnormalities under controlled physical exertion.',
      },
      {
        testName: 'High-Sensitivity Cardiac Troponin (hs-cTn)',
        purpose: 'Biochemical biomarker highly specific for myocardial cellular injury and acute coronary syndromes.',
      },
      {
        testName: 'Catheter Coronary Angiogram',
        purpose: 'Invasive gold standard providing definitive fluoroscopic visualization of coronary stenosis and enabling immediate stent placement.',
      },
    ],
    treatment: [
      {
        modality: 'Antiplatelet Therapy',
        details: 'Aspirin (75-100 mg daily) plus P2Y12 inhibitors (Clopidogrel, Ticagrelor) preventing platelet aggregation and thrombus formation.',
      },
      {
        modality: 'HMG-CoA Reductase Inhibitors (Statins)',
        details: 'Atorvastatin or Rosuvastatin: Lower LDL cholesterol, stabilize atherosclerotic fibrous caps, and reduce vascular inflammation.',
      },
      {
        modality: 'Percutaneous Coronary Intervention (PCI / Stenting)',
        details: 'Transradial balloon angioplasty followed by drug-eluting stent (DES) deployment to restore coronary lumen patency.',
      },
      {
        modality: 'Coronary Artery Bypass Grafting (CABG)',
        details: 'Surgical revascularization utilizing internal mammary arteries and saphenous vein grafts for severe multivessel disease.',
      },
    ],
    prevention: [
      'Strict control of LDL cholesterol, targeting <55-70 mg/dL in diagnosed or high-risk patients.',
      'Achieve target blood pressure of <130/80 mmHg with dietary sodium reduction and appropriate medications.',
      'Commit to 150-300 minutes per week of moderate-intensity aerobic exercise under physician guidance.',
      'Complete smoking cessation; cardiovascular risk drops dramatically within the first 12 months after quitting.',
      'Manage stress through mindfulness, structured cardiac rehabilitation programs, and adequate sleep.',
    ],
    dietAndLifestyle: [
      'Adopt an authentic Mediterranean dietary pattern rich in extra virgin olive oil, wild fatty fish, legumes, and walnuts.',
      'Eliminate ultra-processed foods containing industrial trans-fatty acids and high refined sugars.',
      'Monitor resting heart rate and blood pressure daily using home digital monitors.',
      'Stay compliant with prescribed daily cardiac medications even when feeling completely healthy.',
    ],
    whenToConsult: [
      'Any new, unexplained chest discomfort, pressure, or heaviness, particularly when provoked by exertion.',
      'Sudden onset of shortness of breath accompanied by cold sweats or nausea.',
      'Known stable angina that starts occurring with less physical exertion or while resting.',
      'Call emergency medical services (911/112) immediately if chest pain lasts more than 5 minutes.',
    ],
    faqs: [
      {
        question: 'What is the main difference between angina and a heart attack?',
        answer:
          'Angina is temporary myocardial ischemia (oxygen starvation) caused by reduced blood flow without permanent heart muscle death. A heart attack occurs when blood flow is blocked completely for long enough that heart muscle cells die permanently.',
      },
      {
        question: 'Can blocked arteries be unclogged naturally without surgery or stents?',
        answer:
          'While advanced, calcified plaques cannot be completely melted away, intensive lifestyle changes combined with statin therapy can stabilize vulnerable plaques, reverse lipid-rich soft plaques, and significantly widen effective blood flow.',
      },
      {
        question: 'Why do women experience different heart attack symptoms than men?',
        answer:
          'Women more frequently suffer from coronary microvascular dysfunction rather than single massive epicardial blockages. As a result, women often report fatigue, back ache, jaw pain, or nausea instead of crushing central chest pressure.',
      },
    ],
    disclaimer:
      'This article provides general cardiovascular education. Severe chest pain is a medical emergency; seek immediate hospital emergency care without delay.',
  },

  {
    id: 'art-4',
    slug: 'asthma',
    title: 'Asthma: Understanding Triggers, Airway Inflammation, and Inhaler Therapy',
    category: 'Respiratory Diseases',
    shortDescription:
      'Explore chronic airway hyperresponsiveness, peak flow monitoring, controller vs reliever inhalers, and individualized asthma action plans.',
    readTime: '6 min read',
    updatedAt: 'October 22, 2026',
    author: {
      name: 'Dr. Michael Chen',
      role: 'Pulmonologist & Internal Medicine',
      initials: 'MC',
      clinicId: 'sunset',
    },
    reviewedBy: {
      name: 'Dr. Maya Patel',
      title: 'Family Medicine & Attending Physician',
      date: 'October 18, 2026',
    },
    status: 'Published',
    featured: true,
    views: 1110,
    diagramType: 'airway_bronchospasm',
    commonSymptoms: ['Expiratory wheezing', 'Nighttime coughing', 'Chest tightness', 'Shortness of breath', 'Exercise-induced dyspnea'],
    preventionHighlights: [
      'Eliminate environmental allergens (dust mites, pet dander)',
      'Daily inhaled corticosteroid maintenance therapy',
      'Pre-exercise warm-ups and cold weather masks',
    ],
    overview:
      'Asthma is a chronic inflammatory disorder of the conducting airways characterized by bronchial hyperresponsiveness, smooth muscle bronchoconstriction, and excessive mucus secretion. This results in recurrent episodes of wheezing, breathlessness, chest tightness, and coughing that vary over time and in intensity. While asthma has no definitive cure, proper inhaled controller therapy enables virtually all patients to lead fully active, symptom-free lives.',
    causes: [
      'Genetic predisposition to atopy (the genetic tendency to develop allergic diseases including eczema and allergic rhinitis).',
      'Airway mucosal hyperreactivity triggered by inhaled aeroallergens (house dust mites, pollens, animal dander, fungal spores).',
      'Viral respiratory tract infections (particularly Rhinovirus and Respiratory Syncytial Virus) in early childhood.',
      'Exposure to occupational sensitizers (isocyanates, flour dust, industrial chemical vapors).',
      'Non-allergic triggers: cold dry air, emotional stress, exercise, and air pollutants like particulate matter (PM2.5).',
    ],
    symptoms: {
      early: [
        'Persistent dry cough, notably worsening at night or during the early morning hours.',
        'Frequent need to clear throat or subtle feeling of chest heaviness during routine walks.',
      ],
      common: [
        'Audible high-pitched expiratory wheezing during normal breathing.',
        'Shortness of breath that escalates after laughing, crying, or physical exertion.',
        'Chest tightness feeling like an elastic band constricting the thoracic cage.',
        'Disturbed sleep due to bouts of nocturnal coughing or wheezing.',
      ],
      warningSigns: [
        'Acute Severe Asthma Exacerbation: Inability to speak in full sentences without pausing for breath.',
        'Suprasternal and intercostal retractions (skin sucking in around ribs and neck during inhalation).',
        'Peak Expiratory Flow (PEF) dropping below 50% of the patient’s personal best.',
        'Cyanosis (bluish discoloration of lips or fingernails), extreme exhaustion, or silent chest.',
      ],
    },
    riskFactors: [
      'Personal history of atopic conditions such as allergic eczema (dermatitis) or seasonal allergic rhinitis',
      'Family history of asthma in a biological parent or sibling',
      'Childhood exposure to maternal or environmental secondhand tobacco smoke',
      'Urban dwelling with high ambient vehicle exhaust emissions and industrial pollutants',
      'Adult-onset obesity, which promotes systemic low-grade airway inflammatory cytokines',
    ],
    typesAndStages: [
      {
        title: 'Allergic (Extrinsic) Asthma',
        description: 'Most common phenotype, driven by IgE-mediated responses to aeroallergens. Usually begins in childhood.',
      },
      {
        title: 'Non-Allergic (Intrinsic) Asthma',
        description: 'Not associated with allergies. Often develops in adults and responds somewhat less readily to inhaled steroids alone.',
      },
      {
        title: 'Exercise-Induced Bronchoconstriction (EIB)',
        description: 'Bronchial narrowing triggered specifically by hyperventilation of cold, dry air during intense athletic training.',
      },
      {
        title: 'Severe Persistent Asthma',
        description: 'Requires high-dose ICS-LABA regimens and may benefit from targeted biological therapies (e.g., anti-IgE or anti-IL-5 monoclonal antibodies).',
      },
    ],
    diagnosis: [
      {
        testName: 'Spirometry with Bronchodilator Reversibility',
        purpose: 'Measures FEV1 and FVC. A post-bronchodilator increase in FEV1 of >=12% and >=200 mL confirms reversible airflow limitation.',
      },
      {
        testName: 'Peak Expiratory Flow (PEF) Variability',
        purpose: 'Demonstrating excessive diurnal peak flow variability (>10% twice daily over 2 weeks) supports an asthma diagnosis.',
      },
      {
        testName: 'Fractional Exhaled Nitric Oxide (FeNO)',
        purpose: 'Non-invasive biomarker reflecting type-2 eosinophilic airway inflammation and steroid responsiveness.',
      },
      {
        testName: 'Allergy Skin Prick Testing',
        purpose: 'Identifies specific IgE-mediated environmental triggers for targeted avoidance.',
      },
    ],
    treatment: [
      {
        modality: 'Inhaled Corticosteroids (ICS) — The Foundation',
        details: 'Fluticasone, Budesonide: Daily anti-inflammatory medication that suppresses underlying bronchial edema and prevents attacks.',
      },
      {
        modality: 'Long-Acting Beta-2 Agonists (LABA)',
        details: 'Formoterol, Salmeterol: Smooth muscle relaxants combined with ICS for 24-hour airway patency.',
      },
      {
        modality: 'Short-Acting Beta-2 Agonists (SABA Relievers)',
        details: 'Albuterol / Salbutamol: Quick-relief rescue bronchodilator used for acute symptoms or prior to exercise.',
      },
      {
        modality: 'Targeted Biologics for Severe Asthma',
        details: 'Omalizumab, Dupilumab, Mepolizumab: Monoclonal antibodies blocking inflammatory cascades in refractory disease.',
      },
    ],
    prevention: [
      'Encase pillows and mattresses in certified allergen-impermeable dust mite covers.',
      'Maintain indoor relative humidity below 50% using dehumidifiers to prevent mold growth.',
      'Receive an annual influenza vaccine and pneumococcal vaccines to prevent triggering viral pneumonia.',
      'Always use a spacer device with metered-dose inhalers (MDIs) to maximize drug deposition into lower airways.',
      'Never skip your daily preventative controller inhaler even when feeling completely healthy.',
    ],
    dietAndLifestyle: [
      'Incorporate an anti-inflammatory Mediterranean diet with vitamins C, D, and E for antioxidant pulmonary protection.',
      'Perform a 10-minute warm-up before aerobic workouts and wear a breathable scarf over nose/mouth in cold winter weather.',
      'Avoid non-selective beta-blockers and aspirin/NSAIDs if you have Aspirin-Exacerbated Respiratory Disease (AERD).',
      'Keep a home peak flow meter to catch airway narrowing days before audible wheezing occurs.',
    ],
    whenToConsult: [
      'Requiring rescue reliever inhaler more than twice per week for daytime symptoms.',
      'Waking up from sleep coughing or wheezing more than once a month.',
      'Peak flow drops below 70% of your personal best despite using controller medications.',
      'Seek emergency medical assistance immediately if rescue inhaler provides no relief or if breathing is labored at rest.',
    ],
    faqs: [
      {
        question: 'Can children "outgrow" their childhood asthma?',
        answer:
          'Many children experience a marked reduction or complete absence of asthma symptoms during puberty as their airways physically enlarge. However, airway hyperresponsiveness can recur later in adulthood.',
      },
      {
        question: 'Are inhaled steroids dangerous for long-term health?',
        answer:
          'No. Inhaled corticosteroids act locally inside the lungs in microgram doses. Unlike oral steroid tablets, systemic absorption is minimal, making maintenance inhalers exceptionally safe and life-saving.',
      },
      {
        question: 'Is it safe for someone with asthma to play competitive sports?',
        answer:
          'Yes. With well-controlled asthma, individuals can participate in all sports at elite and Olympic levels. Using a reliever inhaler 15 minutes before exercise prevents exercise-induced symptoms.',
      },
    ],
    disclaimer:
      'This article is educational only. An acute asthma attack can become life-threatening; follow your written Asthma Action Plan and seek immediate emergency care if symptoms do not improve.',
  },

  {
    id: 'art-5',
    slug: 'pneumonia',
    title: 'Pneumonia: Causes, Bacterial vs Viral Types, and Recovery Milestones',
    category: 'Respiratory Diseases',
    shortDescription:
      'A deep dive into alveolar lung infection, distinguishing bacterial from viral pneumonia, diagnostic imaging, and post-infection lung recovery.',
    readTime: '7 min read',
    updatedAt: 'October 21, 2026',
    author: {
      name: 'Dr. Michael Chen',
      role: 'Pulmonologist & Internal Medicine',
      initials: 'MC',
      clinicId: 'sunset',
    },
    reviewedBy: {
      name: 'Dr. Sarah Jenkins',
      title: 'Cardiologist & Clinical Specialist',
      date: 'October 17, 2026',
    },
    status: 'Published',
    featured: false,
    views: 890,
    diagramType: 'alveolar_consolidation',
    commonSymptoms: ['High fever with chills', 'Productive cough with greenish/rusty phlegm', 'Pleuritic chest pain', 'Tachypnea', 'Fatigue'],
    preventionHighlights: [
      'Pneumococcal conjugate vaccination (PCV15/PCV20)',
      'Annual seasonal influenza vaccination',
      'Consistent hand hygiene and tobacco smoke avoidance',
    ],
    overview:
      'Pneumonia is an acute inflammatory infection affecting the pulmonary parenchyma, specifically the microscopic alveoli (air sacs) where gas exchange takes place. When infectious pathogens evade the upper respiratory defenses, the resulting inflammatory response floods the alveoli with exudative fluid, neutrophils, and cellular debris. This consolidation impedes oxygen diffusion into the bloodstream, manifesting clinically as fever, tachypnea, productive cough, and hypoxemia.',
    causes: [
      'Bacterial Pathogens: Streptococcus pneumoniae (pneumococcus, most common community-acquired cause), Haemophilus influenzae, Staphylococcus aureus, and atypical organisms (Mycoplasma pneumoniae, Legionella).',
      'Viral Pathogens: Influenza A & B, Respiratory Syncytial Virus (RSV), SARS-CoV-2, and Adenovirus.',
      'Fungal Organisms: Pneumocystis jirovecii and Histoplasma capsulatum, predominantly seen in immunocompromised individuals.',
      'Aspiration: Inhalation of gastric contents or oropharyngeal secretions into the bronchial tree in patients with impaired swallowing reflexes.',
    ],
    symptoms: {
      early: [
        'Persistent flu-like malaise, scratchy throat, and low-grade fever that abruptly turns worse.',
        'Gradual onset of dry cough that progresses to deep chest rattling.',
      ],
      common: [
        'High spiking fever accompanied by shaking chills (rigors) and profuse sweating.',
        'Productive cough producing thick yellow, dark green, or rust-tinged purulent sputum.',
        'Sharp, stabbing pleuritic chest pain that intensifies when taking a deep breath or coughing.',
        'Rapid, shallow breathing (tachypnea) and marked physical weakness.',
      ],
      warningSigns: [
        'Oxygen saturation falling below 92% on room air via pulse oximeter.',
        'New-onset mental confusion, disorientation, or extreme somnolence, especially in elderly adults.',
        'Systolic blood pressure dropping below 90 mmHg (hypotensive septic shock).',
        'Bluish discoloration of the lips or fingernail beds (central cyanosis).',
      ],
    },
    riskFactors: [
      'Extreme ages: infants under 2 years and senior adults aged 65 and older',
      'Pre-existing chronic lung diseases (COPD, bronchiectasis, asthma, cystic fibrosis)',
      'Immunocompromised status (chemotherapy, organ transplantation, HIV, chronic steroid use)',
      'Current cigarette smoking, which paralyzes bronchial mucociliary clearance mechanisms',
      'Recent viral upper respiratory illness (such as influenza) that damaged mucosal barriers',
    ],
    typesAndStages: [
      {
        title: 'Community-Acquired Pneumonia (CAP)',
        description: 'Contracted outside healthcare facilities. Most common presentation, frequently responsive to outpatient oral antimicrobial regimens.',
      },
      {
        title: 'Hospital-Acquired Pneumonia (HAP) / VAP',
        description: 'Develops 48 hours or more after hospital admission. Frequently caused by multi-drug resistant pathogens (Pseudomonas, MRSA).',
      },
      {
        title: 'Aspiration Pneumonia',
        description: 'Resulting from oropharyngeal contents entering lower airways, commonly involving mixed anaerobic oral flora.',
      },
      {
        title: 'The 4 Pathological Stages',
        description: '1. Congestion (vascular engorgement), 2. Red Hepatization (exudate with RBCs), 3. Gray Hepatization (fibrin deposition), 4. Resolution (macrophage clearance).',
      },
    ],
    diagnosis: [
      {
        testName: 'Chest Radiograph (X-Ray PA & Lateral)',
        purpose: 'Identifies lobar consolidation, patchy bronchopneumonic infiltrates, or pleural effusion.',
      },
      {
        testName: 'Pulse Oximetry & Arterial Blood Gas (ABG)',
        purpose: 'Evaluates severity of hypoxemia and gas exchange efficiency.',
      },
      {
        testName: 'Complete Blood Count (CBC) with Differential',
        purpose: 'Detects leukocytosis (elevated white blood cell count >12,000/mcL) with a left shift indicating bacterial infection.',
      },
      {
        testName: 'Sputum Gram Stain and Culture',
        purpose: 'Identifies the precise microbial pathogen and determines antibiotic susceptibility.',
      },
    ],
    treatment: [
      {
        modality: 'Targeted Antibiotic Therapy',
        details: 'Empiric macrolides (Azithromycin), beta-lactams (Amoxicillin-Clavulanate, Ceftriaxone), or respiratory fluoroquinolones for bacterial CAP.',
      },
      {
        modality: 'Supplemental Oxygen & Respiratory Support',
        details: 'Administered via nasal cannula or high-flow mask to maintain peripheral SpO2 above 92-94%.',
      },
      {
        modality: 'Intravenous Hydration and Electrolyte Management',
        details: 'Corrects dehydration from fever, improves blood pressure, and thins tenacious bronchial secretions.',
      },
      {
        modality: 'Chest Physiotherapy and Early Mobilization',
        details: 'Incentive spirometry and postural drainage techniques helping clear pooled secretions from dependent lung zones.',
      },
    ],
    prevention: [
      'Receive pneumococcal vaccines (PCV15/20 and PPSV23) as recommended by age and underlying health conditions.',
      'Get your annual seasonal influenza shot to avoid post-influenza secondary bacterial pneumonia.',
      'Practice meticulous hand hygiene with soap and water or alcohol-based hand rub.',
      'Completely avoid tobacco smoking to restore pulmonary bronchial macrophage clearance.',
      'Maintain upright posture during eating and drinking for patients with dysphagia to prevent aspiration.',
    ],
    dietAndLifestyle: [
      'Drink 2.5 to 3 liters of fluids daily (water, broths, electrolyte solutions) to liquify mucus plugs.',
      'Prioritize protein-dense nutrition (eggs, legumes, fish) to support cellular tissue repair and immune synthesis.',
      'Practice deep breathing with an incentive spirometer 10 times every hour while awake.',
      'Allow adequate convalescent rest; full energy levels typically take 3 to 6 weeks to return post-infection.',
    ],
    whenToConsult: [
      'Fever exceeding 102°F (38.9°C) that persists despite fever-reducing medications.',
      'Chest pain on deep inspiration accompanied by coughing up rust-colored or bloody phlegm.',
      'Difficulty breathing during simple conversation or at complete rest.',
      'Any confusion, severe weakness, or lethargy in an elderly family member.',
    ],
    faqs: [
      {
        question: 'How is pneumonia different from acute bronchitis?',
        answer:
          'Bronchitis is an inflammation confined to the bronchial tubes that conduct air, rarely causing consolidation or severe hypoxemia. Pneumonia reaches deep into the functional alveoli (air sacs), which fill with infected fluid, confirmed on chest X-ray.',
      },
      {
        question: 'Is pneumonia contagious from person to person?',
        answer:
          'The viruses and bacteria that cause pneumonia are contagious through respiratory droplets from coughing and sneezing. However, whether an exposed individual develops a simple cold, bronchitis, or pneumonia depends on their personal immune defenses.',
      },
      {
        question: 'Why does fatigue linger for weeks after finishing antibiotic treatment?',
        answer:
          'Lung tissue requires considerable metabolic energy to clear inflammatory debris, heal alveolar membranes, and restore full gas diffusion. Mild exertional fatigue during recovery is normal and expected.',
      },
    ],
    disclaimer:
      'This medical information is for educational purposes. Severe breathing difficulty or low oxygen saturation requires immediate evaluation at an emergency healthcare facility.',
  },

  {
    id: 'art-6',
    slug: 'migraine',
    title: 'Migraine: Neurological Mechanisms, Auras, and Acute & Preventive Therapies',
    category: 'Neurological Disorders',
    shortDescription:
      'Unravel the neurovascular pathways of migraine headaches, the 4 phases of attacks, CGRP antagonists, and evidence-based trigger management.',
    readTime: '7 min read',
    updatedAt: 'October 24, 2026',
    author: {
      name: 'Dr. Emily Carter',
      role: 'Neurologist & Pain Specialist',
      initials: 'EC',
      clinicId: 'metro',
    },
    reviewedBy: {
      name: 'Dr. Maya Patel',
      title: 'Family Medicine & Attending Physician',
      date: 'October 19, 2026',
    },
    status: 'Published',
    featured: true,
    views: 1540,
    diagramType: 'migraine_phases',
    commonSymptoms: ['Unilateral throbbing head pain', 'Photophobia (light sensitivity)', 'Phonophobia (sound sensitivity)', 'Nausea/Vomiting', 'Visual aura'],
    preventionHighlights: [
      'Maintain strict circadian sleep and meal regularity',
      'Track and eliminate individual dietary triggers',
      'Targeted CGRP antagonist or beta-blocker prophylaxis',
    ],
    overview:
      'Migraine is a complex primary neurovascular brain disorder characterized by recurrent attacks of moderate to severe throbbing, typically unilateral headache lasting 4 to 72 hours. Far more than a simple tension headache, migraine involves cortical spreading depression, activation of the trigeminovascular system, and release of vasoactive neuropeptides such as Calcitonin Gene-Related Peptide (CGRP) and substance P. These neurochemicals produce sterile neurogenic inflammation, dural vasodilation, and profound central pain sensitization.',
    causes: [
      'Cortical Spreading Depression (CSD): A self-propagating wave of neuronal and glial depolarization that creeps across the cerebral cortex, triggering the visual/sensory aura.',
      'Trigeminovascular System Activation: Sensory neurons from the trigeminal ganglion release inflammatory neuropeptides (CGRP, PACAP) around sensitive meningeal blood vessels.',
      'Central and Peripheral Sensitization: Hyperexcitability of brainstem and thalamic neurons causing allodynia (pain from normally non-painful stimuli like brushing hair).',
      'Genetic channelopathies: Mutations in calcium, sodium, and potassium transport channels affecting neuronal excitation thresholds.',
    ],
    symptoms: {
      early: [
        'Prodrome Phase (24-48 hours before pain): Uncontrolled yawning, sudden neck stiffness, fluid retention, and intense food cravings (especially sweets).',
        'Subtle mood shifts: irritability, hyperactivity, or profound apathy.',
      ],
      common: [
        'Unilateral (one-sided), intensely pulsating or throbbing head pain exacerbated by standard physical activity.',
        'Photophobia (pain from normal ambient light) and Phonophobia (intolerance to everyday sounds).',
        'Osmophobia (hypersensitivity to odors and perfumes).',
        'Gastrointestinal symptoms: nausea, anorexia, and episodic vomiting.',
      ],
      warningSigns: [
        'The "Thunderclap" headache: pain peaking at maximum 10/10 intensity within 60 seconds (rule out subarachnoid hemorrhage).',
        'Headache accompanied by systemic fever, neck rigidity, confusion, or focal motor weakness.',
        'New-onset headache in an individual older than 50 years of age.',
        'Progressive headache that changes markedly with posture (coughing, bending over, or standing).',
      ],
    },
    riskFactors: [
      'Biological sex: women are 3 times more likely to experience migraine than men due to estrogen fluctuations',
      'Strong family pedigree: over 70% of migraine sufferers have a first-degree biological relative with migraine',
      'Irregular sleep patterns: chronic sleep deprivation or sleeping in unusually late on weekends',
      'Sensory overload: bright flickering lights, prolonged computer screen glare, and loud acoustic environments',
      'Dietary triggers: aged cheeses (tyramine), cured meats (nitrates), MSG, aspartame, alcohol (red wine), and caffeine withdrawal',
    ],
    typesAndStages: [
      {
        title: 'Migraine without Aura (Common Migraine)',
        description: 'Accounts for ~75% of attacks. Diagnosed when recurring episodes feature unilateral throbbing pain, nausea, and light/sound sensitivity without preceding focal neurological signs.',
      },
      {
        title: 'Migraine with Aura (Classic Migraine)',
        description: 'Features reversible focal neurological symptoms preceding headache by 5-60 minutes, including scintillating scotomas (flickering zigzag lights) and sensory paresthesia.',
      },
      {
        title: 'Chronic Migraine',
        description: 'Headache occurring on 15 or more days per month for greater than 3 months, with at least 8 of those days meeting criteria for a migraine attack.',
      },
      {
        title: 'The 4 Distinct Attack Phases',
        description: '1. Prodrome (premonitory signs), 2. Aura (neurological phenomena), 3. Headache/Attack (severe throbbing pain), 4. Postdrome ("migraine hangover" with cognitive sluggishness).',
      },
    ],
    diagnosis: [
      {
        testName: 'Clinical Diagnostic Criteria (ICHD-3)',
        purpose: 'Migraine is a clinical diagnosis based on International Classification of Headache Disorders guidelines; no single blood test can diagnose it.',
      },
      {
        testName: 'Brain Magnetic Resonance Imaging (MRI)',
        purpose: 'Indicated only when red flags ("SNOOP" criteria) are present to rule out structural lesions, intracranial hypertension, or vascular malformations.',
      },
      {
        testName: 'Digital Headache Diary',
        purpose: 'Tracking attack frequency, duration, response to triptans, and menstrual cycle correlation over 2 to 3 months.',
      },
    ],
    treatment: [
      {
        modality: 'Acute Abortive Therapy (Triptans & Gepants)',
        details: 'Sumatriptan, Rizatriptan: 5-HT1B/1D agonists that induce intracranial vasoconstriction and inhibit CGRP. Gepants (Rimegepant, Ubrogepant): Oral small-molecule CGRP receptor antagonists.',
      },
      {
        modality: 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)',
        details: 'Naproxen sodium, Ibuprofen: Taken at the very onset of the attack to dampen peripheral prostaglandin synthesis.',
      },
      {
        modality: 'Targeted CGRP Monoclonal Antibodies',
        details: 'Erenumab, Fremanezumab, Galcanezumab: Monthly subcutaneous injections that prevent migraine attacks by neutralizing CGRP or its receptor.',
      },
      {
        modality: 'Neuromodulation Devices',
        details: 'Non-invasive vagus nerve stimulators (gammaCore) and trigeminal nerve stimulators (Cefaly) offering drug-free prevention and acute relief.',
      },
    ],
    prevention: [
      'Maintain an uncompromisingly consistent sleep schedule, waking and sleeping at the exact same hour daily.',
      'Never skip meals; hypoglycemia triggers rapid sympathetic counter-regulatory surges that precipitate attacks.',
      'Stay reliably hydrated with at least 2 liters of water daily, especially in hot environments.',
      'Practice regular aerobic cardiovascular exercise (30 minutes, 3 times weekly) to elevate endogenous endorphins.',
      'Use blue-light blocking filters on computer monitors and take periodic 20-20-20 visual breaks.',
    ],
    dietAndLifestyle: [
      'Keep a systematic food log to identify personal triggers rather than unnecessarily eliminating all foods.',
      'Gradually taper caffeine rather than stopping abruptly, which causes severe rebound vasodilation headaches.',
      'Supplement with evidence-based nutraceuticals: Magnesium Glycinate (400 mg/day), Riboflavin / Vitamin B2 (400 mg/day), and Coenzyme Q10.',
      'Incorporate mindfulness-based stress reduction (MBSR) or progressive muscle relaxation during stressful work days.',
    ],
    whenToConsult: [
      'Headaches occur on 4 or more days per month, indicating a need for daily preventive medication.',
      'Over-the-counter pain medications are needed more than 2 to 3 days weekly (risk of Medication Overuse Headache).',
      'Sudden onset of new neurological symptoms: speech difficulty, double vision, or limb clumsiness.',
      'A headache that feels completely different from past attacks or reaches maximum intensity in under a minute.',
    ],
    faqs: [
      {
        question: 'What is a "migraine hangover" (Postdrome)?',
        answer:
          'After the throbbing pain subsides, up to 80% of patients experience the postdrome phase for 24 to 48 hours. Symptoms include cognitive fog, profound physical exhaustion, difficulty concentrating, and mood fragility.',
      },
      {
        question: 'Why do pain pills sometimes make migraines worse?',
        answer:
          'Taking acute pain relievers (like triptans, acetaminophen, or NSAIDs) more than 10-15 days per month can cause "Medication Overuse Headaches" (rebound headaches), trapping the brain in a chronic daily headache cycle.',
      },
      {
        question: 'Can drinking caffeine help or hurt a migraine?',
        answer:
          'Caffeine is a double-edged sword: a small amount taken at the very onset of an attack can enhance analgesic absorption and constrict dilated vessels. However, daily high caffeine intake leads to withdrawal headaches that mimic severe migraines.',
      },
    ],
    disclaimer:
      'This article is strictly for educational purposes. Any sudden "thunderclap" headache or headache accompanied by neurological deficits requires immediate emergency evaluation.',
  },

  {
    id: 'art-7',
    slug: 'chronic-kidney-disease',
    title: 'Chronic Kidney Disease (CKD): Glomerular Health, GFR Stages, and Protection',
    category: 'Kidney Diseases',
    shortDescription:
      'Discover how kidneys filter blood, understand eGFR and albuminuria stages, nephrotoxic drug risks, and kidney-sparing therapies.',
    readTime: '8 min read',
    updatedAt: 'October 23, 2026',
    author: {
      name: 'Dr. Michael Chen',
      role: 'Pulmonologist & Internal Medicine',
      initials: 'MC',
      clinicId: 'sunset',
    },
    reviewedBy: {
      name: 'Dr. Maya Patel',
      title: 'Family Medicine & Attending Physician',
      date: 'October 19, 2026',
    },
    status: 'Published',
    featured: false,
    views: 960,
    diagramType: 'gfr_stages',
    commonSymptoms: ['Peripheral edema (swollen ankles)', 'Foamy urine', 'Persistent fatigue', 'Pruritus (itching)', 'Nocturia'],
    preventionHighlights: [
      'Maintain tight blood pressure control (<130/80 mmHg)',
      'Manage blood glucose strictly (HbA1c <7.0%)',
      'Avoid regular over-the-counter NSAIDs (ibuprofen/naproxen)',
    ],
    overview:
      'Chronic Kidney Disease (CKD) is characterized by gradual, irreversible loss of renal function spanning months or years. The human kidneys contain approximately one million microscopic filtering units called nephrons. When underlying vascular, diabetic, or inflammatory insults progressively destroy these nephrons, the remaining functional units undergo compensatory hyperfiltration and eventual sclerosis. CKD is categorized into 5 clinical stages based on Estimated Glomerular Filtration Rate (eGFR) and levels of urine albuminuria.',
    causes: [
      'Diabetic Nephropathy: Chronic hyperglycemia damages glomeruli through advanced glycation end-products and hyperfiltration.',
      'Hypertensive Nephrosclerosis: Uncontrolled arterial hypertension induces hyaline arteriolosclerosis, narrowing renal arterioles and causing ischemic glomerulosclerosis.',
      'Glomerulonephritis: Primary immune-mediated inflammation of glomeruli (e.g., IgA nephropathy, membranous nephropathy).',
      'Polycystic Kidney Disease (PKD): An inherited genetic condition causing progressive growth of massive fluid-filled renal cysts.',
      'Analgesic and Drug Nephropathy: Chronic cumulative exposure to Non-Steroidal Anti-Inflammatory Drugs (NSAIDs) or aminoglycosides.',
      'Chronic obstructive uropathy: Longstanding bilateral obstruction from benign prostatic hyperplasia or recurrent nephrolithiasis (kidney stones).',
    ],
    symptoms: {
      early: [
        'Early CKD (Stages 1 to 3) is overwhelmingly silent and asymptomatic; patients feel entirely normal.',
        'Mild nocturia (awakening multiple times at night to urinate due to impaired urinary concentrating ability).',
      ],
      common: [
        'Peripheral edema: bilateral swelling in ankles, feet, legs, and periorbital puffiness upon waking.',
        'Persistent physical fatigue and pallor due to decreased renal erythropoietin production (renal anemia).',
        'Foamy or frothy urine indicating substantial protein leakage (albuminuria).',
        'Generalized pruritus (intense skin itching) caused by uremic toxin deposition.',
      ],
      warningSigns: [
        'Uremic Encephalopathy: Cognitive sluggishness, asterixis ("flapping tremor"), and severe mental confusion.',
        'Uremic Pericarditis: Pleuritic retrosternal chest pain with an audible pericardial friction rub.',
        'Severe intractable metabolic acidosis with Kussmaul respirations.',
        'Marked oliguria or anuria (near total cessation of urine output) with fluid overload.',
      ],
    },
    riskFactors: [
      'Diabetes mellitus (Type 1 or Type 2) — accounts for ~40% of all end-stage renal disease cases',
      'Systemic arterial hypertension — responsible for ~25% of all chronic renal failures',
      'Known cardiovascular disease or peripheral vascular disease',
      'First-degree family history of chronic kidney disease or kidney failure',
      'Age greater than 60 years due to age-related nephron loss',
      'Recurrent episodes of acute kidney injury (AKI) from dehydration or sepsis',
    ],
    typesAndStages: [
      {
        title: 'Stage 1: Normal or High eGFR (>=90 mL/min/1.73m²)',
        description: 'Kidney damage present (protein in urine or structural ultrasound defect) with preserved normal filtration rate.',
      },
      {
        title: 'Stage 2: Mild eGFR Reduction (60-89 mL/min/1.73m²)',
        description: 'Mild functional decrease with persistent kidney damage markers for >=3 months. Focus on halting progression.',
      },
      {
        title: 'Stage 3: Moderate eGFR Reduction (30-59 mL/min/1.73m²)',
        description: 'Subdivided into 3a (45-59) and 3b (30-44). Anemia and bone-mineral disorders emerge; nephrology referral recommended.',
      },
      {
        title: 'Stage 4: Severe eGFR Reduction (15-29 mL/min/1.73m²)',
        description: 'Advanced kidney damage. Preparation for renal replacement therapy (arteriovenous fistula creation or transplant evaluation).',
      },
      {
        title: 'Stage 5: Kidney Failure / ESRD (<15 mL/min/1.73m²)',
        description: 'End-Stage Renal Disease requiring renal replacement therapy: hemodialysis, peritoneal dialysis, or kidney transplantation.',
      },
    ],
    diagnosis: [
      {
        testName: 'Estimated Glomerular Filtration Rate (eGFR)',
        purpose: 'Calculated from serum creatinine, age, and biological sex using the CKD-EPI equation to measure filtration efficiency.',
      },
      {
        testName: 'Urine Albumin-to-Creatinine Ratio (uACR)',
        purpose: 'Spot urine test measuring microalbuminuria. Normal: <30 mg/g; Microalbuminuria: 30-300 mg/g; Macroalbuminuria: >300 mg/g.',
      },
      {
        testName: 'Renal Ultrasonography',
        purpose: 'Assesses kidney size, cortical echogenicity, corticomedullary differentiation, and rules out hydronephrosis.',
      },
      {
        testName: 'Comprehensive Metabolic Panel (CMP)',
        purpose: 'Monitors serum potassium, sodium, bicarbonate, calcium, phosphorus, and blood urea nitrogen (BUN).',
      },
    ],
    treatment: [
      {
        modality: 'Renin-Angiotensin System Blockers (ACEi / ARB)',
        details: 'Dilate the efferent glomerular arteriole, lowering intraglomerular pressure and dramatically slowing proteinuria.',
      },
      {
        modality: 'SGLT2 Inhibitors (Empagliflozin, Dapagliflozin)',
        details: 'Breakthrough therapy proven to slow CKD progression and decrease cardiovascular events in both diabetic and non-diabetic patients.',
      },
      {
        modality: 'Non-Steroidal Mineralocorticoid Antagonists (Finerenone)',
        details: 'Reduces renal inflammation and fibrosis in diabetic kidney disease while protecting cardiovascular function.',
      },
      {
        modality: 'Renal Replacement Therapy (Dialysis & Transplantation)',
        details: 'Hemodialysis or peritoneal dialysis initiated when uremic symptoms, refractory hyperkalemia, or fluid overload arise.',
      },
    ],
    prevention: [
      'Maintain blood pressure tightly below 130/80 mmHg using renal-protective medications.',
      'Check fasting blood sugar and HbA1c annually; maintain HbA1c <7.0% if diagnosed with diabetes.',
      'Avoid long-term over-the-counter NSAIDs (Ibuprofen, Naproxen); use acetaminophen for mild aches when appropriate.',
      'Undergo annual screening (eGFR and uACR) if you possess hypertension, diabetes, or a family history of kidney disease.',
      'Avoid commercial "kidney detox" herbal supplements, which often contain nephrotoxic aristolochic acid or heavy metals.',
    ],
    dietAndLifestyle: [
      'Adopt a strict low-sodium dietary pattern (<2,000 mg daily) to decrease fluid retention and ease blood pressure.',
      'Moderate protein intake (0.6 to 0.8 g/kg body weight/day in Stages 3-5) under specialized renal dietitian guidance.',
      'Monitor dietary potassium (bananas, potatoes, tomatoes) and phosphorus (colas, processed cheese) if eGFR falls below 30.',
      'Completely discontinue cigarette smoking, which accelerates glomerulosclerosis and doubles the rate of renal decline.',
    ],
    whenToConsult: [
      'Persistent swelling in feet, ankles, hands, or around the eyes.',
      'Noticing foamy or bubbly urine that requires multiple flushes to clear.',
      'Decreased urine volume despite normal daily water and fluid intake.',
      'Persistent metallic taste in mouth accompanied by nausea and loss of appetite.',
    ],
    faqs: [
      {
        question: 'Can damaged kidneys heal or regrow functional nephrons?',
        answer:
          'Unlike liver cells, dead nephrons cannot regenerate once fibrosed. However, modern treatments (SGLT2 inhibitors, ACE inhibitors, BP control) can successfully protect your remaining nephrons and prevent the need for dialysis.',
      },
      {
        question: 'Why are pain relievers like ibuprofen dangerous for kidney patients?',
        answer:
          'NSAIDs block renal prostaglandin production, which normally dilates the afferent arteriole. Without prostaglandins, blood flow to the filtration units drops sharply, causing acute kidney injury on top of chronic damage.',
      },
      {
        question: 'Does drinking huge amounts of water "flush out" chronic kidney disease?',
        answer:
          'No. While adequate hydration is healthy, drinking gallons of water does not repair kidney tissue and in advanced CKD can lead to dangerous fluid overload, pulmonary edema, and severe hyponatremia (low blood sodium).',
      },
    ],
    disclaimer:
      'This educational material is not a substitute for specialized nephrology evaluation. Individual dietary restrictions (potassium, phosphorus, protein) vary by stage and require individualized physician guidance.',
  },

  {
    id: 'art-8',
    slug: 'fatty-liver-disease',
    title: 'Fatty Liver Disease (MASLD / NAFLD): Reversing Hepatic Steatosis',
    category: 'Liver Diseases',
    shortDescription:
      'Explore metabolic dysfunction-associated steatotic liver disease, progression to NASH and fibrosis, liver enzymes, and dietary reversal.',
    readTime: '6 min read',
    updatedAt: 'October 25, 2026',
    author: {
      name: 'Dr. Emily Carter',
      role: 'Internal Medicine & Hepatology',
      initials: 'EC',
      clinicId: 'metro',
    },
    reviewedBy: {
      name: 'Dr. Maya Patel',
      title: 'Family Medicine & Attending Physician',
      date: 'October 21, 2026',
    },
    status: 'Published',
    featured: false,
    views: 1180,
    diagramType: 'liver_steatosis_spectrum',
    commonSymptoms: ['Often asymptomatic ("Silent")', 'Dull right upper abdominal fullness', 'Chronic fatigue', 'Elevated ALT/AST enzymes', 'Abdominal bloating'],
    preventionHighlights: [
      'Eliminate high-fructose corn syrup and sugary beverages',
      'Target a 7% to 10% reduction in total body weight',
      'Moderate aerobic exercise combined with resistance training',
    ],
    overview:
      'Metabolic Dysfunction-Associated Steatotic Liver Disease (MASLD, historically termed Non-Alcoholic Fatty Liver Disease or NAFLD) is the accumulation of excessive neutral triglycerides in hepatocytes exceeding 5% of total liver weight, occurring in the absence of significant alcohol consumption. Driven largely by insulin resistance and central obesity, fatty liver ranges from simple steatosis to Non-Alcoholic Steatohepatitis (NASH/MASH), which involves active hepatocyte ballooning, inflammation, progressive bridging fibrosis, and potentially irreversible cirrhosis.',
    causes: [
      'Peripheral and Hepatic Insulin Resistance: Failed suppression of lipolysis in adipose tissue floods the portal circulation with free fatty acids.',
      'De Novo Lipogenesis: Excessive dietary consumption of refined carbohydrates and fructose converted directly into hepatic triglycerides.',
      'Lipotoxicity and Oxidative Stress: Accumulation of toxic lipid intermediates causing mitochondrial dysfunction and endoplasmic reticulum stress.',
      'Gut Microbiome Dysbiosis: Increased intestinal permeability allowing endotoxins (LPS) into portal blood, activating hepatic Kupffer cells.',
    ],
    symptoms: {
      early: [
        'MASLD is overwhelmingly silent; the vast majority of patients feel completely healthy with zero symptoms.',
        'Mild post-prandial sluggishness or vague fatigue.',
      ],
      common: [
        'A dull, vague ache or feeling of fullness in the right upper quadrant of the abdomen.',
        'Persistent, unexplained generalized daytime exhaustion and low stamina.',
        'Mild hepatomegaly (liver enlargement) detectable upon physician palpation.',
      ],
      warningSigns: [
        'Progression to Advanced Cirrhosis: Jaundice (yellowing of sclera and skin) and dark tea-colored urine.',
        'Ascites (accumulation of fluid causing progressive abdominal distension).',
        'Spider angiomas on chest/face, palmar erythema (red palms), and easy skin bruising.',
        'Hepatic Encephalopathy: daytime sleepiness, nighttime agitation, and confusion.',
      ],
    },
    riskFactors: [
      'Central visceral obesity (waist circumference >102 cm in men, >88 cm in women)',
      'Type 2 diabetes mellitus or prediabetes (over 70% of diabetic patients have MASLD)',
      'Atherogenic dyslipidemia (elevated triglycerides >150 mg/dL and low HDL cholesterol)',
      'Polycystic Ovary Syndrome (PCOS) and Obstructive Sleep Apnea (OSA)',
      'High intake of industrial high-fructose corn syrup (sodas, sweet sauces, commercial pastries)',
    ],
    typesAndStages: [
      {
        title: 'Simple Steatosis (MASL / NAFL)',
        description: 'Fat accumulation in >5% of hepatocytes without significant inflammation or cellular injury. Highly reversible with lifestyle intervention.',
      },
      {
        title: 'Steatohepatitis (MASH / NASH)',
        description: 'Fat accumulation accompanied by hepatocyte ballooning, lobular inflammation, and cell death. Carries substantial risk of scarring.',
      },
      {
        title: 'Hepatic Fibrosis (Stages F1 to F3)',
        description: 'Perisinusoidal and bridging collagen scarring in liver architecture. Reversible if the metabolic driver is corrected.',
      },
      {
        title: 'Cirrhosis (Stage F4)',
        description: 'Permanent nodular remodeling and microvascular distortion with portal hypertension and increased risk of hepatocellular carcinoma (HCC).',
      },
    ],
    diagnosis: [
      {
        testName: 'Abdominal Ultrasound',
        purpose: 'First-line imaging test detecting increased hepatic parenchymal echogenicity ("bright liver") compared to adjacent renal cortex.',
      },
      {
        testName: 'Liver Function Tests (ALT, AST, GGT)',
        purpose: 'Measures liver transaminases. ALT is typically higher than AST in early MASLD; normal enzymes do not rule out advanced disease.',
      },
      {
        testName: 'Transient Elastography (FibroScan)',
        purpose: 'Non-invasive shear-wave technology measuring liver stiffness (fibrosis stage in kPa) and Controlled Attenuation Parameter (fat CAP score).',
      },
      {
        testName: 'FIB-4 Index & NAFLD Fibrosis Score',
        purpose: 'Calculated from age, AST, ALT, and platelet count to stratify low vs high risk for advanced hepatic fibrosis.',
      },
    ],
    treatment: [
      {
        modality: 'Structured Weight Loss (7-10% Body Weight)',
        details: 'The clinical cornerstone: A 7-10% reduction in total body weight consistently reverses steatohepatitis and stabilizes fibrosis.',
      },
      {
        modality: 'Incretin Mimetics (GLP-1 RA / GIP Agonists)',
        details: 'Semaglutide, Tirzepatide: Profound weight loss, visceral fat reduction, and proven resolution of steatohepatitis in clinical trials.',
      },
      {
        modality: 'Targeted Pharmacotherapy (Resmetirom)',
        details: 'Thyroid hormone receptor-beta (THR-β) selective agonist approved for non-cirrhotic MASH with moderate to advanced fibrosis.',
      },
      {
        modality: 'Cardiovascular Risk Management',
        details: 'Statins are completely safe and strongly recommended in fatty liver to reduce the #1 cause of mortality: cardiovascular disease.',
      },
    ],
    prevention: [
      'Completely eliminate sugar-sweetened beverages (sodas, sweetened iced teas, fruit juice concentrates).',
      'Engage in at least 150-300 minutes of weekly moderate aerobic activity (brisk walking, cycling) plus 2 days of strength training.',
      'Avoid high-fat fast foods rich in saturated and industrial trans fats.',
      'Limit alcohol consumption strictly; alcohol compounds metabolic liver injury and accelerates fibrosis.',
      'Drink 2 to 3 cups of filtered black coffee daily, which has strong clinical evidence for reducing hepatic fibrosis progression.',
    ],
    dietAndLifestyle: [
      'Embrace a Mediterranean diet rich in extra virgin olive oil, green vegetables, fatty fish, legumes, and nuts.',
      'Avoid late-night heavy meals; time-restricted eating (12-14 hour overnight fast) improves hepatic lipid metabolism.',
      'Check fasting blood sugar and lipid panels at least once a year.',
      'Avoid unnecessary over-the-counter supplements and excessive acetaminophen without physician advice.',
    ],
    whenToConsult: [
      'Elevated ALT or AST enzymes noted on routine blood work.',
      'Ultrasound report indicating "fatty infiltration of liver" or "increased hepatic echogenicity".',
      'Noticeable yellowing of the eyes or skin, or sudden abdominal swelling.',
      'Unexplained progressive exhaustion in someone with diabetes or visceral obesity.',
    ],
    faqs: [
      {
        question: 'Can fatty liver disease be completely cured or reversed?',
        answer:
          'Yes. Early fatty liver (steatosis) and early steatohepatitis (MASH) are highly reversible. With a 7% to 10% weight loss through nutrition and exercise, the liver can shed excess fat and repair early scarring within months.',
      },
      {
        question: 'Can people who are thin or normal weight get fatty liver?',
        answer:
          'Yes. This is termed "lean MASLD" and occurs in normal-weight individuals who possess excess visceral fat, genetic variants (such as PNPLA3), or metabolic insulin resistance despite a normal overall BMI.',
      },
      {
        question: 'Does drinking black coffee really help the liver?',
        answer:
          'Yes. Multiple large clinical studies confirm that drinking 2 to 3 cups of unsweetened coffee daily is associated with reduced liver stiffness, lower liver enzyme levels, and slower progression to fibrosis.',
      },
    ],
    disclaimer:
      'This material provides metabolic health education and does not replace medical consultation. Do not initiate extreme crash diets without physician guidance.',
  },

  {
    id: 'art-9',
    slug: 'dengue-fever',
    title: 'Dengue Fever: Warning Signs, Critical Phase Monitoring, and Fluid Management',
    category: 'Infectious Diseases',
    shortDescription:
      'Understand the Aedes mosquito vector, identify life-threatening warning signs in the Critical Phase, and avoid dangerous medications.',
    readTime: '6 min read',
    updatedAt: 'October 25, 2026',
    author: {
      name: 'Dr. Maya Patel',
      role: 'Family Medicine & Attending Physician',
      initials: 'MP',
      clinicId: 'sunrise',
    },
    reviewedBy: {
      name: 'Dr. Michael Chen',
      title: 'Pulmonologist & Internal Medicine',
      date: 'October 22, 2026',
    },
    status: 'Published',
    featured: false,
    views: 1350,
    diagramType: 'dengue_phases',
    commonSymptoms: ['Sudden high fever (104°F)', 'Severe retro-orbital eye pain', 'Breakbone muscle/joint aches', 'Maculopapular rash', 'Mild mucosal bleeding'],
    preventionHighlights: [
      'Eliminate all standing water in flowerpots, tires, and coolers',
      'Use DEET / Picaridin mosquito repellents on exposed skin',
      'Wear light-colored, long-sleeved clothing during dawn and dusk',
    ],
    overview:
      'Dengue is an acute mosquito-borne viral illness caused by four distinct antigenically related serotypes of the Dengue virus (DENV-1, DENV-2, DENV-3, DENV-4) of the Flaviviridae family. Transmitted predominantly by female Aedes aegypti and Aedes albopictus mosquitoes, the virus infects up to 400 million people annually worldwide. Dengue is dynamic: following an abrupt febrile phase, patients enter a critical window (days 3-7) where capillary permeability can cause plasma leakage, severe thrombocytopenia, hemorrhage, and Dengue Shock Syndrome.',
    causes: [
      'Bite of an infectious female Aedes aegypti mosquito, which breeds primarily in artificial man-made containers of clean standing water.',
      'Daytime biting habits: Aedes mosquitoes bite aggressively during the early daylight hours after dawn and in late afternoon before dusk.',
      'Secondary Dengue Infection: Infection with a different DENV serotype creates "Antibody-Dependent Enhancement" (ADE), significantly increasing severe dengue risk.',
      'Rapid replication within monocytes, macrophages, and dendritic cells precipitating a storm of inflammatory cytokines.',
    ],
    symptoms: {
      early: [
        'Sudden explosive onset of high-grade fever reaching 104°F (40°C).',
        'Severe, agonizing retro-orbital headache (intense pain located specifically behind the eyes).',
      ],
      common: [
        '"Breakbone Fever": Intensely debilitating generalized myalgia (muscle pain) and arthralgia (joint pain).',
        'Transient facial flushing and a fine maculopapular morbilliform rash appearing on limbs and trunk.',
        'Gastrointestinal upset: loss of appetite, nausea, vomiting, and altered taste sensation.',
        'Mild mucosal bleeding: minor epistaxis (nosebleeds), bleeding gums on toothbrushing, or petechiae on skin.',
      ],
      warningSigns: [
        'THE CRITICAL PHASE (Days 3 to 7, often right as the fever begins to break):',
        'Severe, continuous, unremitting abdominal pain or tenderness.',
        'Persistent vomiting (at least 3 episodes in 24 hours) preventing oral rehydration.',
        'Clinical fluid accumulation: ascites, pleural effusion, or facial puffiness.',
        'Spontaneous mucosal hemorrhage, lethargy, restlessness, or sudden drop in platelet count with surging hematocrit.',
      ],
    },
    riskFactors: [
      'Living in or traveling to tropical and subtropical geographic regions (South Asia, Southeast Asia, Latin America, Caribbean)',
      'High seasonal rainfall creating abundant stagnant puddles and outdoor water storage containers',
      'Prior dengue infection with a different serotype (increases risk of severe dengue by up to 20-fold through ADE)',
      'Young children and infants who have narrower physiological margins for plasma volume depletion',
      'Co-existing comorbidities including peptic ulcer disease, sickle cell disease, or anticoagulant therapy',
    ],
    typesAndStages: [
      {
        title: 'Phase 1: Febrile Phase (Days 1 to 3)',
        description: 'High spiking fever, severe retro-orbital headache, body aches, dehydration risk. Managed with oral hydration and paracetamol.',
      },
      {
        title: 'Phase 2: Critical Phase (Days 3 to 7)',
        description: 'Occurs as fever drops. Increased vascular permeability causes plasma leakage into pleural and peritoneal cavities. High vigilance required.',
      },
      {
        title: 'Phase 3: Convalescent / Recovery Phase (Days 7 to 10)',
        description: 'Vascular leakage resolves, extravasated fluid is reabsorbed. Classic "islands of white in a sea of red" rash appears with mild itching.',
      },
      {
        title: 'Severe Dengue (DHF / DSS)',
        description: 'Severe plasma leakage leading to hypotensive shock, severe hemorrhage (GI bleeding), and acute organ impairment (hepatitis, myocarditis).',
      },
    ],
    diagnosis: [
      {
        testName: 'Dengue NS1 Antigen Test',
        purpose: 'Detects non-structural viral protein in blood during the first 1 to 5 days of illness with high specificity.',
      },
      {
        testName: 'Dengue IgM and IgG Antibodies',
        purpose: 'Detectable after day 5. IgM indicates active or recent infection; IgG indicates prior exposure.',
      },
      {
        testName: 'Serial Complete Blood Count (CBC)',
        purpose: 'Crucial for monitoring: a rising hematocrit (>20% increase) indicates plasma leakage; platelet counts (<100,000/mcL) track disease severity.',
      },
    ],
    treatment: [
      {
        modality: 'Meticulous Oral & Intravenous Fluid Therapy',
        details: 'The clinical cornerstone: Oral Rehydration Salts (ORS), fresh coconut water, and isotonic crystalloid IV fluids (Ringer’s Lactate) titrated to hematocrit.',
      },
      {
        modality: 'Antipyresis with Paracetamol / Acetaminophen',
        details: 'Dosed safely (max 3 g/day in adults) for fever and pain. STRICTLY AVOID ASPIRIN AND NSAIDS (Ibuprofen, Diclofenac) as they precipitate severe hemorrhage.',
      },
      {
        modality: 'Serial Hemodynamic & Hematocrit Monitoring',
        details: 'Regular checks of blood pressure, pulse pressure (>20 mmHg target), urine output (>0.5 mL/kg/h), and hematocrit.',
      },
      {
        modality: 'Judicious Blood Component Transfusion',
        details: 'Platelet and packed RBC transfusions are reserved strictly for significant clinical bleeding or refractory shock, not for low numbers alone.',
      },
    ],
    prevention: [
      'Empty, scrub, and turn over all outdoor water containers (buckets, birdbaths, plant saucers, discarded tires) weekly.',
      'Apply insect repellent containing 20-30% DEET or Picaridin to all exposed skin surfaces during daytime hours.',
      'Install tightly fitted window and door screens to keep mosquitoes outside living spaces.',
      'Wear loose-fitting, light-colored long-sleeve shirts and full trousers when outdoors in endemic zones.',
      'Support municipal vector fogging and biological larviciding in communities during monsoon seasons.',
    ],
    dietAndLifestyle: [
      'Drink abundant fluids: oral rehydration salts (ORS), tender coconut water, diluted fruit juices, and clear broths.',
      'Eat light, easily digestible meals (rice porridge, bananas, steamed vegetables) to minimize nausea.',
      'Strict bed rest during both the febrile and critical recovery phases to conserve cellular reserves.',
      'Never take over-the-counter painkillers without verifying that they contain only paracetamol.',
    ],
    whenToConsult: [
      'Any warning sign during the critical phase: severe abdominal pain, persistent vomiting, or mucosal bleeding.',
      'Lethargy, extreme restlessness, cold clammy hands and feet, or decreased urination.',
      'Fever resolving but the patient appears visibly weaker or more unwell than before.',
      'Platelet count dropping below 50,000/mcL or hematocrit rising sharply on laboratory tests.',
    ],
    faqs: [
      {
        question: 'Why is taking ibuprofen or aspirin extremely dangerous in dengue?',
        answer:
          'Dengue inherently reduces blood platelets and compromises vascular integrity. Aspirin and NSAIDs (like ibuprofen, naproxen, and diclofenac) inhibit platelet aggregation and cause gastric erosions, triggering catastrophic and potentially fatal internal hemorrhage.',
      },
      {
        question: 'Does papaya leaf extract or kiwi really cure dengue?',
        answer:
          'While small studies suggest papaya leaf extract may mildly support platelet synthesis, it is NOT an antiviral cure and does NOT treat plasma leakage. Adequate hydration and close clinical monitoring remain the only proven life-saving interventions.',
      },
      {
        question: 'Can you get dengue more than once in your life?',
        answer:
          'Yes, up to four times. Recovery from one dengue serotype provides lifelong immunity to that specific serotype, but only temporary cross-immunity to the other three. Subsequent infections carry a significantly higher risk of severe dengue.',
      },
    ],
    disclaimer:
      'This article provides general infectious disease education. Dengue warning signs during the critical phase require immediate inpatient hospital admission and intravenous fluid monitoring.',
  },

  {
    id: 'art-10',
    slug: 'thyroid-disorders',
    title: 'Thyroid Disorders: Hypothyroidism, Hyperthyroidism, and Hormonal Balance',
    category: "Women's Health",
    shortDescription:
      'Understand the thyroid gland, Hashimoto’s vs Graves’ disease, TSH interpretation, levothyroxine timing, and metabolic symptoms.',
    readTime: '7 min read',
    updatedAt: 'October 24, 2026',
    author: {
      name: 'Dr. Maya Patel',
      role: 'Family Medicine & Attending Physician',
      initials: 'MP',
      clinicId: 'sunrise',
    },
    reviewedBy: {
      name: 'Dr. Arvind Sharma',
      title: 'Consultant Endocrinologist, MD',
      date: 'October 20, 2026',
    },
    status: 'Published',
    featured: false,
    views: 1040,
    diagramType: 'thyroid_feedback_loop',
    commonSymptoms: ['Unexplained weight changes', 'Fatigue and sluggishness', 'Cold or heat intolerance', 'Hair thinning / Brittle nails', 'Mood changes'],
    preventionHighlights: [
      'Ensure adequate dietary iodine intake through iodized salt',
      'Take thyroid medications strictly on an empty stomach with water',
      'Regular TSH monitoring for women planning pregnancy or with family history',
    ],
    overview:
      'The thyroid is a butterfly-shaped endocrine gland located at the base of the anterior neck. It synthesizes and secretes triiodothyronine (T3) and thyroxine (T4), hormones that regulate basal metabolic rate, cardiac output, body temperature, bowel motility, and cellular protein synthesis throughout the body. Regulated by a negative feedback loop through pituitary Thyroid-Stimulating Hormone (TSH), thyroid dysfunction manifests primarily as either underactive hormone production (hypothyroidism) or overactive excess production (hyperthyroidism).',
    causes: [
      'Hashimoto’s Thyroiditis (most common cause of Hypothyroidism): Chronic autoimmune destruction of thyroid follicular cells mediated by anti-TPO and anti-thyroglobulin antibodies.',
      'Graves’ Disease (most common cause of Hyperthyroidism): Autoimmune synthesis of thyroid-stimulating immunoglobulin (TSI) that activates TSH receptors, causing autonomous hormone overproduction.',
      'Subacute / Postpartum Thyroiditis: Transient inflammatory disruption of follicles releasing pre-formed hormones, followed by temporary hypothyroidism.',
      'Dietary Iodine Imbalance: Severe iodine deficiency (endemic goiter) or sudden excessive iodine intake (Jod-Basedow phenomenon).',
      'Iatrogenic Causes: Post-radioactive iodine therapy, thyroid surgery, or medications such as Amiodarone and Lithium.',
    ],
    symptoms: {
      early: [
        'Hypothyroidism: Subtle lethargy, dry skin, feeling chilly when others are comfortable, and mild constipation.',
        'Hyperthyroidism: Mild unexplainable anxiety, fine finger tremors, and feeling overly warm in temperate rooms.',
      ],
      common: [
        'Hypothyroid Symptoms: Unexplained weight gain despite poor appetite, puffiness around eyes, coarse brittle hair, heavy irregular periods, brain fog, and hoarse voice.',
        'Hyperthyroid Symptoms: Unintentional rapid weight loss despite ravenous appetite, rapid resting heart rate (tachycardia) or palpitations, frequent loose bowel movements, sleep insomnia, and emotional irritability.',
      ],
      warningSigns: [
        'Thyroid Storm (Hyperthyroid Crisis): Extremely high fever, marked tachycardia (>140 bpm), atrial fibrillation, delirium, and heart failure.',
        'Myxedema Coma (Severe Hypothyroid Emergency): Profound hypothermia, severe bradycardia, respiratory depression, and coma.',
        'Rapidly enlarging, firm thyroid nodule causing dysphagia (difficulty swallowing) or stridor (breathing obstruction).',
      ],
    },
    riskFactors: [
      'Biological sex: women are 5 to 8 times more likely to develop thyroid disorders than men',
      'Personal or family history of other autoimmune conditions (Type 1 diabetes, celiac disease, vitiligo, rheumatoid arthritis)',
      'Recent pregnancy: postpartum thyroiditis affects approximately 5-7% of women in the first year after childbirth',
      'Age over 60 years (subclinical hypothyroidism is particularly prevalent in elderly adults)',
      'History of radiation therapy to the head, neck, or upper chest region',
    ],
    typesAndStages: [
      {
        title: 'Primary Hypothyroidism',
        description: 'Elevated TSH with low Free T4. The thyroid gland itself has failed to produce adequate hormone.',
      },
      {
        title: 'Subclinical Hypothyroidism',
        description: 'Elevated TSH with normal Free T4 levels. Frequently asymptomatic; treated when TSH >10 mIU/L, symptomatic, or in women planning pregnancy.',
      },
      {
        title: 'Primary Hyperthyroidism',
        description: 'Suppressed / undetectable TSH (<0.01 mIU/L) with elevated Free T4 and/or Free T3. Driven by Graves’ disease or toxic multinodular goiter.',
      },
      {
        title: 'Thyroid Nodules and Goiter',
        description: 'Discrete lumps or diffuse enlargement of the thyroid gland. Over 90% are benign; evaluated using ultrasound and fine-needle aspiration (FNA).',
      },
    ],
    diagnosis: [
      {
        testName: 'Serum Thyroid-Stimulating Hormone (TSH)',
        purpose: 'The single most sensitive first-line screening test. Normal reference range: approximately 0.4 to 4.0 mIU/L.',
      },
      {
        testName: 'Free Thyroxine (Free T4) & Free T3',
        purpose: 'Measures the circulating, biologically active unbound hormones confirming functional hypo- or hyperthyroidism.',
      },
      {
        testName: 'Anti-Thyroid Peroxidase (Anti-TPO) Antibodies',
        purpose: 'Elevated in >90% of Hashimoto’s thyroiditis and ~70% of Graves’ disease, confirming an autoimmune etiology.',
      },
      {
        testName: 'High-Resolution Thyroid Ultrasound',
        purpose: 'Evaluates gland vascularity, diffuseness, and characterizes nodules using the ACR TI-RADS scoring system.',
      },
    ],
    treatment: [
      {
        modality: 'Levothyroxine Sodium (T4 Replacement for Hypothyroidism)',
        details: 'Synthetic T4 identical to human hormone. Dosed precisely by weight and taken once daily in the early morning.',
      },
      {
        modality: 'Thionamides (Antithyroid Drugs for Hyperthyroidism)',
        details: 'Methimazole or Propylthiouracil (PTU): Inhibit thyroid peroxidase, blocking new hormone synthesis in Graves’ disease.',
      },
      {
        modality: 'Beta-Blockers (Propranolol, Atenolol)',
        details: 'Provide rapid symptomatic relief of tachycardia, tremors, and anxiety during acute hyperthyroid phases.',
      },
      {
        modality: 'Radioactive Iodine (RAI-131) Ablation & Surgery',
        details: 'Definitive therapy for toxic goiters or refractory Graves’ disease causing ablation of hyperactive follicular tissue.',
      },
    ],
    prevention: [
      'Use adequately iodized salt in daily cooking; avoid both severe deficiency and extreme mega-dose iodine supplements.',
      'Women planning pregnancy should have TSH checked, as maternal thyroid hormone is critical for fetal neurological development.',
      'Take Levothyroxine strictly with plain water at least 30-60 minutes before breakfast, or 3-4 hours after dinner.',
      'Separate thyroid medication by at least 4 hours from calcium carbonate, iron supplements, antacids, or multivitamins.',
      'Ensure adequate dietary intake of trace minerals essential for thyroid hormone deiodination: selenium and zinc.',
    ],
    dietAndLifestyle: [
      'Consume a balanced diet rich in selenium (Brazil nuts, sunflower seeds, fish) and zinc (pumpkin seeds, lentils).',
      'Moderate raw consumption of goitrogenic cruciferous vegetables (cabbage, kale) if iodine intake is marginal; cooking neutralizes goitrogens.',
      'Engage in gentle, regular exercise to combat metabolic sluggishness and preserve muscle mass.',
      'Maintain an open line with your physician regarding changes in energy, weight, or medication brands.',
    ],
    whenToConsult: [
      'Experiencing persistent unexplained weight changes despite no change in diet or physical activity.',
      'Heart feels like it is constantly racing, skipping beats, or pounding in your chest at rest.',
      'Feeling exhausted, freezing cold, or severely constipated for several consecutive weeks.',
      'Noticing a visible swelling, lump, or fullness at the base of your throat (goiter).',
    ],
    faqs: [
      {
        question: 'Why must levothyroxine be taken on an empty stomach with only water?',
        answer:
          'Levothyroxine absorption in the small intestine is extremely sensitive to interference. Coffee, calcium, iron, dietary fiber, and food can reduce absorption by up to 50%, causing erratic TSH fluctuations.',
      },
      {
        question: 'Can thyroid disease cause hair loss?',
        answer:
          'Yes. Both severe hypothyroidism and hyperthyroidism disrupt the hair growth cycle, causing telogen effluvium (diffuse hair thinning). Hair regrowth typically resumes 3 to 6 months after restoring normal hormonal balance.',
      },
      {
        question: 'Will I have to take thyroid medicine for the rest of my life?',
        answer:
          'For primary hypothyroidism caused by Hashimoto’s, the condition is usually permanent, requiring lifelong daily levothyroxine. In contrast, subacute thyroiditis or postpartum thyroiditis is often temporary and resolves within months.',
      },
    ],
    disclaimer:
      'This article provides general endocrine health education. Do not change thyroid medication doses without reviewing laboratory results with your physician.',
  },

  {
    id: 'art-11',
    slug: 'osteoarthritis',
    title: 'Osteoarthritis: Joint Cartilage Preservation, Exercise, and Pain Relief',
    category: 'Bone and Joint Diseases',
    shortDescription:
      'Understand degenerative joint disease, cartilage wear-and-tear, low-impact joint loading, physical therapy, and joint replacement.',
    readTime: '7 min read',
    updatedAt: 'October 23, 2026',
    author: {
      name: 'Dr. Emily Carter',
      role: 'Internal Medicine & Rheumatology',
      initials: 'EC',
      clinicId: 'metro',
    },
    reviewedBy: {
      name: 'Dr. Sarah Jenkins',
      title: 'Cardiologist & Clinical Specialist',
      date: 'October 19, 2026',
    },
    status: 'Published',
    featured: false,
    views: 920,
    diagramType: 'joint_degeneration',
    commonSymptoms: ['Joint pain with movement', 'Morning stiffness lasting <30 minutes', 'Crepitus (grinding/cracking)', 'Reduced joint mobility', 'Bony joint enlargement'],
    preventionHighlights: [
      'Maintain an optimal body mass index to reduce joint loading',
      'Engage in low-impact aerobic exercise (swimming, cycling)',
      'Perform regular quadriceps and gluteal strengthening exercises',
    ],
    overview:
      'Osteoarthritis (OA) is the most common chronic degenerative joint disorder worldwide, predominantly affecting the weight-bearing knees, hips, lumbar spine, and distal finger joints. Far from being simple mechanical "wear and tear," osteoarthritis is an active disease of the entire joint organ involving progressive fibrillation and erosion of articular cartilage, subchondral bone thickening and osteophyte (bone spur) formation, ligamentous laxity, and low-grade synovial inflammation.',
    causes: [
      'Biomechanically abnormal mechanical stress across normal articular cartilage (obesity, repetitive joint impact).',
      'Normal mechanical stress acting across intrinsically abnormal or injured cartilage (prior meniscus tear or ligamentous injury).',
      'Cellular senescence of chondrocytes: aging cartilage cells produce fewer proteoglycans and more matrix metalloproteinases (MMPs).',
      'Genetic predisposition affecting collagen type II synthesis and extracellular cartilage matrix architecture.',
    ],
    symptoms: {
      early: [
        'Aching joint discomfort occurring exclusively after prolonged walking, running, or stair climbing.',
        'Transient morning joint stiffness that loosens up and resolves within 15 to 30 minutes of waking.',
      ],
      common: [
        'Activity-related joint pain that intensifies toward the end of the day and improves with rest.',
        'Crepitus: a characteristic grinding, crunching, or grating sensation felt or heard during joint motion.',
        'Progressive loss of joint range of motion: difficulty fully bending or straightening the knee or hip.',
        'Bony enlargement: firm palpable knots around finger joints (Heberden’s nodes at DIP joints, Bouchard’s nodes at PIP joints).',
      ],
      warningSigns: [
        'Sudden, severe monoarticular joint swelling with erythema (redness) and warmth (rule out septic arthritis or crystalline gout).',
        'Sudden true mechanical "locking" of the knee joint where it cannot be extended, indicating a displaced bucket-handle meniscus tear.',
        'Severe nocturnal joint pain that wakes you from sound sleep, indicating advanced bone-on-bone disease.',
      ],
    },
    riskFactors: [
      'Body weight: every 1 lb of body weight lost removes 4 lbs of compressive pressure across knee joints during walking',
      'Advancing age: cartilage hydration decreases and chondrocyte regenerative capacity declines with age',
      'Female biological sex: significantly higher incidence in women over 50 years of age',
      'Previous joint trauma: sports injuries like ACL rupture or meniscus resection multiply future OA risk',
      'Repetitive occupational biomechanics: jobs requiring frequent heavy squatting, kneeling, or heavy lifting',
    ],
    typesAndStages: [
      {
        title: 'Primary (Idiopathic) Osteoarthritis',
        description: 'Most common form, developing gradually in aging joints without an identifiable prior underlying injury.',
      },
      {
        title: 'Secondary Osteoarthritis',
        description: 'Develops following a specific antecedent cause: past traumatic fracture, congenital hip dysplasia, or septic arthritis.',
      },
      {
        title: 'Kellgren-Lawrence Grading Scale',
        description: 'Grade 0: Normal; Grade 1: Doubtful joint narrowing; Grade 2: Definite osteophytes; Grade 3: Moderate narrowing; Grade 4: Severe bone-on-bone contact.',
      },
    ],
    diagnosis: [
      {
        testName: 'Weight-Bearing Plain Radiographs (X-Rays)',
        purpose: 'The clinical gold standard showing non-uniform joint space narrowing, subchondral bone sclerosis, osteophytes, and subchondral cysts.',
      },
      {
        testName: 'Comprehensive Musculoskeletal Physical Exam',
        purpose: 'Evaluates joint effusion, warmth, crepitus, gait abnormalities, and active vs passive range of motion.',
      },
      {
        testName: 'Arthrocentesis (Synovial Fluid Analysis)',
        purpose: 'Performed when joint effusion is present to rule out inflammatory arthritis (rheumatoid) or infection (septic arthritis).',
      },
    ],
    treatment: [
      {
        modality: 'Physical Therapy & Muscle Strengthening',
        details: 'Targeted strengthening of the quadriceps, hamstrings, and hip abductors relieves mechanical pressure from joint surfaces.',
      },
      {
        modality: 'Topical Non-Steroidal Anti-Inflammatories (NSAIDs)',
        details: 'Topical Diclofenac gel applied directly over superficial joints (knees, hands) provides pain relief with minimal systemic side effects.',
      },
      {
        modality: 'Intra-Articular Injections',
        details: 'Corticosteroid injections provide rapid temporary relief during acute flares. Hyaluronic acid viscosupplementation supports lubrication.',
      },
      {
        modality: 'Total Joint Arthroplasty (Joint Replacement)',
        details: 'Total knee or hip replacement for end-stage bone-on-bone disease, restoring mobility and eliminating chronic arthritic pain.',
      },
    ],
    prevention: [
      'Maintain an optimal body mass index (BMI); losing just 10% of body weight can cut joint pain by half.',
      'Choose low-impact cardiovascular activities (lap swimming, stationary cycling, water aerobics) over high-impact pavement running.',
      'Wear supportive footwear with cushioned soles and avoid walking barefoot on hard tile or hardwood floors.',
      'Protect joints during sports with proper warm-ups, athletic conditioning, and injury-prevention training.',
      'Avoid remaining in fixed seated positions for hours; stand up and move joints every 45 minutes.',
    ],
    dietAndLifestyle: [
      'Follow an anti-inflammatory dietary pattern rich in omega-3 fatty acids (salmon, chia seeds), berries, and leafy greens.',
      'Incorporate spices with natural anti-inflammatory properties, such as turmeric (curcumin) and ginger.',
      'Use assistive devices (walking poles, knee braces, ergonomic jar openers) without hesitation to unload painful joints.',
      'Apply moist heat packs for morning stiffness and cold ice packs for post-exercise joint swelling.',
    ],
    whenToConsult: [
      'Joint pain that restricts walking, climbing stairs, or performing everyday household activities.',
      'Joint swelling accompanied by visible redness, noticeable warmth, or high fever.',
      'Joint "gives way" or buckles unexpectedly, creating a fall risk.',
      'Over-the-counter pain relievers fail to provide adequate comfort for sleep.',
    ],
    faqs: [
      {
        question: 'How is osteoarthritis different from rheumatoid arthritis?',
        answer:
          'Osteoarthritis is a degenerative joint disorder affecting specific overloaded joints without systemic organ disease. Rheumatoid arthritis is a systemic autoimmune disease where the immune system attacks joint linings symmetrically, causing prolonged morning stiffness (>1 hour) and systemic fatigue.',
      },
      {
        question: 'Can cartilage grow back naturally once it has worn away?',
        answer:
          'Adult articular cartilage has no blood supply and cannot regrow on its own. However, strengthening surrounding muscles, reducing weight, and using supportive therapies can eliminate pain and prevent remaining cartilage from deteriorating further.',
      },
      {
        question: 'Should I completely stop exercising if my knee arthritis hurts?',
        answer:
          'No! Complete rest weakens supporting muscles and accelerates joint stiffness. The key is switching to low-impact exercise (such as swimming, elliptical training, or cycling) which nourishes cartilage through synovial fluid circulation without high-impact pounding.',
      },
    ],
    disclaimer:
      'This article provides general musculoskeletal education. Severe, hot, or red joint swelling requires prompt physician evaluation to rule out infectious joint emergencies.',
  },

  {
    id: 'art-12',
    slug: 'anemia',
    title: 'Anemia: Iron Deficiency, Vitamin B12, and Restoring Healthy Red Blood Cells',
    category: "Children's Health",
    shortDescription:
      'Understand hemoglobin, iron absorption dynamics, ferritin vs serum iron, megaloblastic anemia, and effective dietary and medical recovery.',
    readTime: '6 min read',
    updatedAt: 'October 25, 2026',
    author: {
      name: 'Dr. Maya Patel',
      role: 'Family Medicine & Attending Physician',
      initials: 'MP',
      clinicId: 'sunrise',
    },
    reviewedBy: {
      name: 'Dr. Michael Chen',
      title: 'Pulmonologist & Internal Medicine',
      date: 'October 22, 2026',
    },
    status: 'Published',
    featured: false,
    views: 1220,
    diagramType: 'erythrocyte_hemoglobin',
    commonSymptoms: ['Chronic fatigue and weakness', 'Pale skin and conjunctiva', 'Cold hands and feet', 'Dizziness or lightheadedness', 'Shortness of breath on exertion'],
    preventionHighlights: [
      'Consume iron-rich foods with Vitamin C to boost absorption',
      'Avoid drinking tea, coffee, or calcium pills with main meals',
      'Annual hemoglobin screening for menstruating women and young children',
    ],
    overview:
      'Anemia is a clinical condition characterized by a reduction in the total circulating red blood cell (erythrocyte) mass or a decline in hemoglobin concentration below physiological normal reference values (<12.0 g/dL in non-pregnant adult women, <13.0 g/dL in adult men). Because hemoglobin molecules within red blood cells bind and transport oxygen from the alveoli to peripheral organs and tissues, anemic individuals experience cellular hypoxia, compensatory tachycardia, and systemic exhaustion.',
    causes: [
      'Blood Loss: Heavy menstrual bleeding (menorrhagia), gastrointestinal bleeding (peptic ulcers, colon polyps, inflammatory bowel disease, hemorrhoids).',
      'Decreased Erythrocyte Production: Inadequate dietary iron, folate, or vitamin B12 intake; impaired intestinal absorption (celiac disease, bariatric surgery).',
      'Chronic Disease / Inflammation: Anemia of Chronic Disease (ACD) mediated by elevated hepcidin blocking iron release from macrophages.',
      'Bone Marrow Disorders: Aplastic anemia, myelodysplastic syndromes, and leukemia impairing hematopoiesis.',
      'Increased Erythrocyte Destruction (Hemolysis): Autoimmune hemolytic anemia, sickle cell disease, thalassemia, and G6PD deficiency.',
    ],
    symptoms: {
      early: [
        'Mild daytime sluggishness and needing more sleep than usual.',
        'Slightly reduced stamina during aerobic workouts or climbing flights of stairs.',
      ],
      common: [
        'Profound, unrelenting physical fatigue that does not resolve with rest.',
        'Marked pallor of the skin, nailbeds, gums, and lower palpebral conjunctiva (inside lower eyelids).',
        'Cold hands and feet due to peripheral vasoconstriction prioritizing oxygen to core organs.',
        'Dizziness, orthostatic lightheadedness, or feeling faint when standing up rapidly.',
        'Brittle, spoon-shaped fingernails (koilonychia) and smooth, sore red tongue (glossitis).',
      ],
      warningSigns: [
        'Exertional angina (chest pain) or cardiac palpitations in individuals with underlying heart disease.',
        'Syncope (complete fainting episode or loss of consciousness).',
        'Shortness of breath at complete rest or rapid shallow breathing.',
        'Black, tarry stools (melena) or frank rectal bleeding indicating acute gastrointestinal hemorrhage.',
      ],
    },
    riskFactors: [
      'Women of childbearing age with heavy or prolonged menstrual bleeding',
      'Pregnant women who experience a dramatic 50% expansion in plasma volume requiring surplus iron for fetal development',
      'Strict vegan or vegetarian diets without conscious iron, B12, and folate planning or supplementation',
      'Older adults with occult gastrointestinal lesions or chronic inflammatory kidney/liver disease',
      'Chronic regular consumption of NSAIDs or aspirin predisposing to gastric micro-bleeding',
    ],
    typesAndStages: [
      {
        title: 'Iron Deficiency Anemia (Microcytic, Hypochromic)',
        description: 'The most prevalent form worldwide (~50% of all cases). Small, pale erythrocytes caused by depleted iron stores (low serum ferritin).',
      },
      {
        title: 'Vitamin Deficiency / Megaloblastic Anemia (Macrocytic)',
        description: 'Large, abnormally shaped red blood cells resulting from Vitamin B12 (cobalamin) or Folate deficiency, impairing DNA synthesis.',
      },
      {
        title: 'Anemia of Chronic Disease',
        description: 'Driven by systemic inflammatory cytokines that upregulate hepcidin, trapping iron inside macrophages and starving developing erythrocytes.',
      },
      {
        title: 'Hemolytic Anemias',
        description: 'Premature destruction and lysis of red blood cells before their normal 120-day lifespan, leading to jaundice and elevated LDH.',
      },
    ],
    diagnosis: [
      {
        testName: 'Complete Blood Count (CBC) with RBC Indices',
        purpose: 'Measures Hemoglobin (Hb), Hematocrit (Hct), and Mean Corpuscular Volume (MCV: <80 fL microcytic, 80-100 normocytic, >100 macrocytic).',
      },
      {
        testName: 'Serum Ferritin',
        purpose: 'The single most accurate biomarker of total body iron stores. A ferritin level <30 ng/mL confirms iron deficiency even before overt anemia occurs.',
      },
      {
        testName: 'Total Iron-Binding Capacity (TIBC) & Transferrin Saturation',
        purpose: 'Elevated TIBC with transferrin saturation <20% confirms functional iron starvation for erythropoiesis.',
      },
      {
        testName: 'Serum Vitamin B12 and Red Blood Cell Folate',
        purpose: 'Differentiates between B12 deficiency (pernicious anemia, dietary) and folate deficiency in macrocytic anemias.',
      },
    ],
    treatment: [
      {
        modality: 'Oral Iron Salt Therapy',
        details: 'Ferrous sulfate, ferrous fumarate, or ferrous ascorbate taken on alternate days to maximize intestinal absorption and minimize constipation.',
      },
      {
        modality: 'Intravenous Iron Formulations',
        details: 'Ferric carboxymaltose, iron sucrose: Rapidly restores iron stores in patients with severe deficiency, inflammatory bowel disease, or oral intolerance.',
      },
      {
        modality: 'Vitamin B12 Injections / High-Dose Oral Therapy',
        details: 'Intramuscular cyanocobalamin injections to bypass gastric intrinsic factor deficiency in pernicious anemia.',
      },
      {
        modality: 'Investigating & Treating the Underlying Source',
        details: 'Upper endoscopy (EGD) and colonoscopy to identify and treat the source of chronic blood loss in adult men and postmenopausal women.',
      },
    ],
    prevention: [
      'Incorporate heme iron sources (lean poultry, fish, eggs) and non-heme iron sources (lentils, chickpeas, spinach, fortified grains).',
      'Always pair plant-based iron foods with Vitamin C (lemon juice, bell peppers, oranges) to convert ferric to soluble ferrous iron.',
      'Avoid drinking black tea, coffee, or milk during or immediately after meals; polyphenols and calcium inhibit iron absorption by up to 60%.',
      'Pregnant women should take prenatal vitamins containing recommended elemental iron and folic acid daily.',
      'Never take iron supplements without a confirmed blood test, as excess iron can cause tissue-toxic hemochromatosis.',
    ],
    dietAndLifestyle: [
      'Cook acidic foods (tomato sauces) in traditional cast-iron cookware to naturally leach beneficial dietary iron into meals.',
      'Soak, sprout, or ferment beans and whole grains to deactivate phytates that bind and block mineral absorption.',
      'Allow at least 8 to 12 weeks of consistent therapy for iron stores (ferritin) to fully replenish after hemoglobin normalizes.',
      'Take oral iron with a full glass of water or orange juice, ideally on an empty stomach unless gastrointestinal upset occurs.',
    ],
    whenToConsult: [
      'Feeling so exhausted that getting out of bed or walking short distances feels overwhelmingly difficult.',
      'Noticing pale or white conjunctiva when looking in the mirror.',
      'Experiencing shortness of breath, rapid heart rate, or dizziness during everyday tasks.',
      'Noticing black, tarry stools, coffee-ground vomiting, or unusually heavy menstrual cycles.',
    ],
    faqs: [
      {
        question: 'Why does drinking tea or coffee with meals make anemia worse?',
        answer:
          'Tea and coffee contain high levels of tannins, polyphenols, and phytates that bind tightly to non-heme iron in the stomach, creating insoluble complexes that your small intestine cannot absorb.',
      },
      {
        question: 'How long does it take for iron pills to cure anemia?',
        answer:
          'Energy levels often improve within 1 to 2 weeks, and hemoglobin levels typically normalize within 4 to 8 weeks. However, you must continue taking iron for an additional 3 to 6 months to completely refill your body’s bone marrow and liver ferritin stores.',
      },
      {
        question: 'Can anemia cause unusual cravings like chewing ice or dirt?',
        answer:
          'Yes! This clinical phenomenon is called "pica" (specifically pagophagia for ice cravings). It is a well-recognized neurochemical symptom of severe iron deficiency that resolves rapidly once iron levels are restored.',
      },
    ],
    disclaimer:
      'This educational material is not a substitute for diagnostic laboratory testing. Unexplained anemia in adults requires investigation to rule out hidden internal blood loss.',
  },
]

