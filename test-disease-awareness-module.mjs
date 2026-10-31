import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'

console.log('🧪 Starting automated verification for Disease Awareness Blog Module...')

// 1. Verify Sample Disease Articles & Categories Data
console.log('\n1. Checking 12 Sample Disease Articles & 15 Categories in healthArticlesData.js...')
import { diseaseCategories, initialDiseaseArticles } from './src/healthArticlesData.js'

assert.ok(Array.isArray(diseaseCategories), 'diseaseCategories should be an array')
assert.ok(diseaseCategories.length >= 15, `Expected at least 15 categories, found ${diseaseCategories.length}`)

const expectedCategories = [
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

expectedCategories.forEach((cat) => {
  assert.ok(
    diseaseCategories.some((c) => c.toLowerCase() === cat.toLowerCase()),
    `Missing required category: ${cat}`
  )
})
console.log(`   ✓ All ${expectedCategories.length} required medical categories verified.`)

// Verify 12 Required Diseases
const expectedDiseases = [
  { slug: 'diabetes-mellitus', name: 'Diabetes Mellitus' },
  { slug: 'hypertension-high-blood-pressure', name: 'Hypertension' },
  { slug: 'coronary-artery-disease', name: 'Coronary Artery Disease' },
  { slug: 'asthma', name: 'Asthma' },
  { slug: 'pneumonia', name: 'Pneumonia' },
  { slug: 'migraine', name: 'Migraine' },
  { slug: 'chronic-kidney-disease', name: 'Chronic Kidney Disease' },
  { slug: 'fatty-liver-disease', name: 'Fatty Liver Disease' },
  { slug: 'dengue-fever', name: 'Dengue Fever' },
  { slug: 'thyroid-disorders', name: 'Thyroid Disorders' },
  { slug: 'osteoarthritis', name: 'Osteoarthritis' },
  { slug: 'anemia', name: 'Anemia' },
]

assert.ok(
  initialDiseaseArticles.length >= 12,
  `Expected at least 12 articles, found ${initialDiseaseArticles.length}`
)

expectedDiseases.forEach((d) => {
  const found = initialDiseaseArticles.find(
    (a) => a.slug === d.slug || a.title.toLowerCase().includes(d.name.toLowerCase())
  )
  assert.ok(found, `Required disease article missing: ${d.name} (${d.slug})`)

  // Verify all 12 sections are present and populated
  assert.ok(found.overview && found.overview.length > 50, `${d.name}: Overview must be detailed`)
  assert.ok(Array.isArray(found.causes) && found.causes.length > 0, `${d.name}: Causes missing`)
  assert.ok(found.symptoms && found.symptoms.early && found.symptoms.common, `${d.name}: Symptoms missing`)
  assert.ok(Array.isArray(found.riskFactors) && found.riskFactors.length > 0, `${d.name}: Risk factors missing`)
  assert.ok(Array.isArray(found.typesAndStages) && found.typesAndStages.length > 0, `${d.name}: Types & stages missing`)
  assert.ok(Array.isArray(found.diagnosis) && found.diagnosis.length > 0, `${d.name}: Diagnosis missing`)
  assert.ok(Array.isArray(found.treatment) && found.treatment.length > 0, `${d.name}: Treatment missing`)
  assert.ok(Array.isArray(found.prevention) && found.prevention.length > 0, `${d.name}: Prevention missing`)
  assert.ok(Array.isArray(found.dietAndLifestyle) && found.dietAndLifestyle.length > 0, `${d.name}: Diet & lifestyle missing`)
  assert.ok(Array.isArray(found.whenToConsult) && found.whenToConsult.length > 0, `${d.name}: When to consult missing`)
  assert.ok(Array.isArray(found.faqs) && found.faqs.length > 0, `${d.name}: FAQs missing`)
  assert.ok(found.disclaimer && found.disclaimer.length > 20, `${d.name}: Medical disclaimer missing`)

  // Check card metadata
  assert.ok(found.category, `${d.name}: Category missing`)
  assert.ok(found.readTime, `${d.name}: Read time missing`)
  assert.ok(found.updatedAt, `${d.name}: Updated date missing`)
  assert.ok(found.author?.name, `${d.name}: Author name missing`)
  assert.ok(Array.isArray(found.commonSymptoms) && found.commonSymptoms.length > 0, `${d.name}: Card common symptoms missing`)
  assert.ok(Array.isArray(found.preventionHighlights) && found.preventionHighlights.length > 0, `${d.name}: Prevention highlights missing`)
})
console.log(`   ✓ All 12 required sample disease articles verified with full 12-section medical educational depth!`)

// 2. Verify Home Page Section & Navigation
console.log('\n2. Checking Home Page section and header navigation in PublicPages.jsx...')
const publicPagesCode = fs.readFileSync(path.join(process.cwd(), 'src', 'PublicPages.jsx'), 'utf-8')

assert.ok(
  publicPagesCode.includes('HealthLibrarySection'),
  'PublicPages.jsx should import and render HealthLibrarySection'
)
assert.ok(
  publicPagesCode.includes('<HealthLibrarySection'),
  'LandingPage should render <HealthLibrarySection />'
)
assert.ok(
  publicPagesCode.includes('Health Library'),
  'Navigation should contain Health Library links'
)
console.log('   ✓ Home page Health Library section and navigation integration verified.')

// 3. Verify Public Routes in App.jsx
console.log('\n3. Checking Public and Clinic Routes in App.jsx...')
const appJsxCode = fs.readFileSync(path.join(process.cwd(), 'src', 'App.jsx'), 'utf-8')

assert.ok(appJsxCode.includes('/health-library'), 'App.jsx should have /health-library route')
assert.ok(appJsxCode.includes('/health-library/:slug'), 'App.jsx should have /health-library/:slug route')
assert.ok(appJsxCode.includes('/clinic/blog'), 'App.jsx should have /clinic/blog route')
assert.ok(appJsxCode.includes('HealthLibraryPage'), 'App.jsx should lazy load HealthLibraryPage')
assert.ok(appJsxCode.includes('HealthArticleDetailPage'), 'App.jsx should lazy load HealthArticleDetailPage')
assert.ok(appJsxCode.includes('ClinicHealthBlogPage'), 'App.jsx should lazy load ClinicHealthBlogPage')
console.log('   ✓ Public routes (/health-library, /health-library/:slug) and Clinic Admin route (/clinic/blog) verified.')

// 4. Verify Sidebar Navigation in components.jsx
console.log('\n4. Checking Clinic Admin and Doctor Navigation in components.jsx...')
const componentsCode = fs.readFileSync(path.join(process.cwd(), 'src', 'components.jsx'), 'utf-8')

assert.ok(
  componentsCode.includes("label: 'Health Blog Management', to: '/clinic/blog'"),
  'clinicAdminNavigation should contain "Health Blog Management"'
)
assert.ok(
  componentsCode.includes("label: 'Health Articles', to: '/clinic/blog'"),
  'doctorNavigation should contain "Health Articles"'
)
assert.ok(
  componentsCode.includes('BookOpen'),
  'components.jsx should import BookOpen icon'
)
console.log('   ✓ Clinic Admin and Doctor sidebar menu items verified.')

// 5. Verify Store Actions & State Management
console.log('\n5. Checking Health Article Store Actions & State in Store.jsx...')
const storeCode = fs.readFileSync(path.join(process.cwd(), 'src', 'Store.jsx'), 'utf-8')

assert.ok(storeCode.includes('addArticle'), 'Store should export addArticle')
assert.ok(storeCode.includes('updateArticle'), 'Store should export updateArticle')
assert.ok(storeCode.includes('deleteArticle'), 'Store should export deleteArticle')
assert.ok(storeCode.includes('archiveArticle'), 'Store should export archiveArticle')
assert.ok(storeCode.includes('approveArticle'), 'Store should export approveArticle')
assert.ok(storeCode.includes('rejectArticle'), 'Store should export rejectArticle')
assert.ok(storeCode.includes('addDiseaseCategory'), 'Store should export addDiseaseCategory')
assert.ok(storeCode.includes('incrementArticleViews'), 'Store should export incrementArticleViews')
console.log('   ✓ Store action methods (create, edit, delete, archive, approve, reject, category, views) verified.')

// 6. Verify Detailed Article Structure and Components in HealthLibraryPages.jsx
console.log('\n6. Checking Detailed Article Page and Admin Console in HealthLibraryPages.jsx...')
const healthPagesCode = fs.readFileSync(path.join(process.cwd(), 'src', 'HealthLibraryPages.jsx'), 'utf-8')

assert.ok(healthPagesCode.includes('HealthBlogCard'), 'HealthBlogCard component missing')
assert.ok(healthPagesCode.includes('HealthLibrarySection'), 'HealthLibrarySection component missing')
assert.ok(healthPagesCode.includes('HealthLibraryPage'), 'HealthLibraryPage directory component missing')
assert.ok(healthPagesCode.includes('HealthArticleDetailPage'), 'HealthArticleDetailPage component missing')
assert.ok(healthPagesCode.includes('ClinicHealthBlogPage'), 'ClinicHealthBlogPage component missing')
assert.ok(healthPagesCode.includes('MedicalDiagramViewer'), 'MedicalDiagramViewer integration missing')

// Check 12 Sections rendered in detailed page
const requiredSections = [
  'Overview',
  'What Causes the Disease',
  'Clinical Symptoms',
  'Risk Factors',
  'Types & Clinical Stages',
  'Clinical Diagnosis',
  'Treatment Options',
  'Prevention',
  'Diet & Lifestyle Guidance',
  'When to Consult a Doctor',
  'Frequently Asked Questions',
  'Medical Disclaimer',
]

requiredSections.forEach((sec) => {
  assert.ok(
    healthPagesCode.includes(sec),
    `HealthArticleDetailPage should render section: "${sec}"`
  )
})
console.log('   ✓ All 12 clinical educational sections rendered in detailed article page.')

// Check CTAs
assert.ok(
  healthPagesCode.includes('Book Appointment') || healthPagesCode.includes('Consult a Doctor'),
  'HealthArticleDetailPage should include Book Appointment / Consult Doctor CTAs'
)
assert.ok(
  healthPagesCode.includes('Related Disease Guides'),
  'HealthArticleDetailPage should display related disease guides'
)
console.log('   ✓ Clinical appointment booking CTAs and related disease guides verified.')

console.log('\n🎉 ALL DISEASE AWARENESS BLOG MODULE TESTS PASSED SUCCESSFULLY! 🚀')

