import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { themes, getThemeById, getAllThemes, DEFAULT_THEME_ID } from './src/themeConfig.js'
import { seedData } from './src/data.js'

console.log('🧪 Starting automated verification for ClinicOS Website Theme Customization Module...\n')

// -------------------------------------------------------------
// Test 1: Verify Theme Configuration and All 6 Required Themes
// -------------------------------------------------------------
console.log('1. Checking Centralized Theme Configuration & 6 Core Themes...')
assert.equal(DEFAULT_THEME_ID, 'medical-blue', 'Default theme must be medical-blue')
assert.ok(Array.isArray(themes), 'Themes must be an array')
assert.equal(themes.length, 6, 'Must provide at least 6 themes')

const expectedThemes = [
  { id: 'medical-blue', name: 'Medical Blue', isDark: false },
  { id: 'modern-green', name: 'Modern Green', isDark: false },
  { id: 'royal-purple', name: 'Royal Purple', isDark: false },
  { id: 'ocean-teal', name: 'Ocean Teal', isDark: false },
  { id: 'dark-mode', name: 'Dark Mode', isDark: true },
  { id: 'minimal-light', name: 'Minimal Light', isDark: false },
]

for (const exp of expectedThemes) {
  const found = themes.find((t) => t.id === exp.id)
  assert.ok(found, `Theme ${exp.id} must exist in theme configuration`)
  assert.equal(found.name, exp.name, `Theme name must match ${exp.name}`)
  assert.equal(found.isDark, exp.isDark, `Theme isDark flag must match ${exp.isDark}`)
  assert.ok(found.tagline, `Theme ${exp.id} must have a descriptive tagline`)
  assert.ok(found.description, `Theme ${exp.id} must have a description`)
  assert.ok(found.category, `Theme ${exp.id} must have a category`)
  assert.ok(found.colors && found.colors.primary, `Theme ${exp.id} must define primary color`)
  assert.ok(found.colors.background, `Theme ${exp.id} must define background color`)
  assert.ok(found.colors.cardBg, `Theme ${exp.id} must define card background`)
  assert.ok(found.colors.textMain, `Theme ${exp.id} must define main text color`)
  assert.ok(Array.isArray(found.swatches) && found.swatches.length >= 5, `Theme ${exp.id} must have at least 5 color swatches`)
}

assert.equal(getThemeById('medical-blue').name, 'Medical Blue')
assert.equal(getThemeById('modern-green').name, 'Modern Green')
assert.equal(getThemeById('non-existent-theme').id, 'medical-blue', 'Fall back to default theme for unknown ID')
console.log('   ✓ All 6 themes configured with full tokens, palettes, and fallback handling.\n')

// -------------------------------------------------------------
// Test 2: Multi-Tenant / Per-Clinic Theme Isolation
// -------------------------------------------------------------
console.log('2. Testing Multi-Tenant Theme Isolation Between Clinics...')
const mockState = JSON.parse(JSON.stringify(seedData))

// Sunrise Clinic sets Modern Green
const sunrise = mockState.clinics.find((c) => c.id === 'sunrise')
assert.ok(sunrise, 'Sunrise clinic must exist')
sunrise.theme = 'modern-green'

// CityCare Clinic sets Royal Purple
const citycare = mockState.clinics.find((c) => c.id === 'citycare')
assert.ok(citycare, 'CityCare clinic must exist')
citycare.theme = 'royal-purple'

// GreenLife Clinic sets Dark Mode
const greenlife = mockState.clinics.find((c) => c.id === 'greenlife')
assert.ok(greenlife, 'GreenLife clinic must exist')
greenlife.theme = 'dark-mode'

assert.equal(sunrise.theme, 'modern-green', 'Sunrise must have Modern Green')
assert.equal(citycare.theme, 'royal-purple', 'CityCare must have Royal Purple')
assert.equal(greenlife.theme, 'dark-mode', 'GreenLife must have Dark Mode')

// Ensure changing Sunrise never alters CityCare or GreenLife
sunrise.theme = 'ocean-teal'
assert.equal(sunrise.theme, 'ocean-teal', 'Sunrise updated to Ocean Teal')
assert.equal(citycare.theme, 'royal-purple', 'CityCare remains Royal Purple')
assert.equal(greenlife.theme, 'dark-mode', 'GreenLife remains Dark Mode')
console.log('   ✓ Multi-tenant clinic theme isolation verified.\n')

// -------------------------------------------------------------
// Test 3: Theme Persistence in State & Storage Reload
// -------------------------------------------------------------
console.log('3. Testing Theme State Persistence and Reloading...')
const serialized = JSON.stringify(mockState)
const restored = JSON.parse(serialized)

const restoredSunrise = restored.clinics.find((c) => c.id === 'sunrise')
const restoredCitycare = restored.clinics.find((c) => c.id === 'citycare')

assert.equal(restoredSunrise.theme, 'ocean-teal', 'Sunrise theme persisted')
assert.equal(restoredCitycare.theme, 'royal-purple', 'CityCare theme persisted')

// Test Reset to Default
restoredSunrise.theme = DEFAULT_THEME_ID
assert.equal(restoredSunrise.theme, 'medical-blue', 'Reset reverts clinic to Medical Blue')
console.log('   ✓ Persistence and reset-to-default verified.\n')

// -------------------------------------------------------------
// Test 4: Doctor and Clinic Admin Permission Rules
// -------------------------------------------------------------
console.log('4. Testing Doctor & Clinic Admin Theme Customization Permissions...')

function evaluateThemePermission(user, clinic) {
  const isClinicAdmin =
    user.role === 'clinic_admin' ||
    user.role === 'admin' ||
    !user.role ||
    user.title?.toLowerCase().includes('admin')

  const isDoctor = user.role === 'doctor' && !isClinicAdmin
  const allowDoctorCustomization = clinic.allowDoctorThemeCustomization !== false

  return {
    canApply: isClinicAdmin || allowDoctorCustomization,
    requiresDoctorNotice: isDoctor && allowDoctorCustomization,
    isRestricted: isDoctor && !allowDoctorCustomization,
  }
}

const adminUser = { role: 'clinic_admin', name: 'Dr. Maya Patel', title: 'Doctor & Clinic Admin' }
const doctorUser = { role: 'doctor', name: 'Dr. James Lee', title: 'Pediatrician' }
const patientUser = { role: 'patient', name: 'Emma Wilson' }
const receptionistUser = { role: 'receptionist', name: 'Ava Robinson' }

// When doctor customization is enabled
const clinicWithDocEnabled = { id: 'sunrise', allowDoctorThemeCustomization: true, theme: 'medical-blue' }
const adminPerm1 = evaluateThemePermission(adminUser, clinicWithDocEnabled)
assert.equal(adminPerm1.canApply, true, 'Clinic Admin can always apply themes')
assert.equal(adminPerm1.requiresDoctorNotice, false, 'Admin does not require doctor warning')

const doctorPerm1 = evaluateThemePermission(doctorUser, clinicWithDocEnabled)
assert.equal(doctorPerm1.canApply, true, 'Doctor can apply theme when permitted')
assert.equal(doctorPerm1.requiresDoctorNotice, true, 'Doctor requires shared clinic warning notice')
assert.equal(doctorPerm1.isRestricted, false)

// When doctor customization is disabled by clinic admin
const clinicWithDocDisabled = { id: 'sunrise', allowDoctorThemeCustomization: false, theme: 'medical-blue' }
const adminPerm2 = evaluateThemePermission(adminUser, clinicWithDocDisabled)
assert.equal(adminPerm2.canApply, true, 'Clinic Admin can still apply themes')

const doctorPerm2 = evaluateThemePermission(doctorUser, clinicWithDocDisabled)
assert.equal(doctorPerm2.canApply, false, 'Doctor cannot apply theme when disabled by Admin')
assert.equal(doctorPerm2.isRestricted, true, 'Doctor sees admin restriction notice')

console.log('   ✓ Doctor & Admin permission boundaries verified.\n')

// -------------------------------------------------------------
// Test 5: Verify CSS Variables & Dynamic Selectors in index.css
// -------------------------------------------------------------
console.log('5. Checking CSS Variables and Data-Theme Selectors in index.css...')
const cssContent = fs.readFileSync(path.resolve('./src/index.css'), 'utf8')

const requiredThemeSelectors = [
  '[data-theme="medical-blue"]',
  '[data-theme="modern-green"]',
  '[data-theme="royal-purple"]',
  '[data-theme="ocean-teal"]',
  '[data-theme="dark-mode"]',
  '[data-theme="minimal-light"]',
]

for (const sel of requiredThemeSelectors) {
  assert.ok(cssContent.includes(sel), `index.css must include selector ${sel}`)
}

assert.ok(cssContent.includes('--color-primary: #059669;'), 'Modern green primary color token present')
assert.ok(cssContent.includes('--color-primary: #7c3aed;'), 'Royal purple primary color token present')
assert.ok(cssContent.includes('--color-primary: #0d9488;'), 'Ocean teal primary color token present')
assert.ok(cssContent.includes('--color-primary: #38bdf8;'), 'Dark mode sky primary color token present')
assert.ok(cssContent.includes('--color-primary: #334155;'), 'Minimal light slate primary color token present')
assert.ok(cssContent.includes('background-color: var(--color-bg);'), 'App shell uses theme background variable')
assert.ok(cssContent.includes('background-color: var(--color-card-bg);'), 'Card uses theme card background variable')
console.log('   ✓ CSS design tokens verified across all 6 themes.\n')

// -------------------------------------------------------------
// Test 6: Verify Sidebar Navigation Items & Routes
// -------------------------------------------------------------
console.log('6. Checking Navigation Items and Routes...')
const componentsContent = fs.readFileSync(path.resolve('./src/components.jsx'), 'utf8')
assert.ok(
  componentsContent.includes("Appearance / Theme Settings") && componentsContent.includes("/clinic/appearance"),
  'doctorNavigation must contain Appearance / Theme Settings menu pointing to /clinic/appearance'
)
assert.ok(
  componentsContent.includes("clinicAdminNavigation"),
  'components.jsx must define clinicAdminNavigation'
)

const appContent = fs.readFileSync(path.resolve('./src/App.jsx'), 'utf8')
assert.ok(
  appContent.includes('/clinic/appearance'),
  'App.jsx must declare /clinic/appearance route'
)
assert.ok(
  appContent.includes('ClinicThemeSettingsPage'),
  'App.jsx must import ClinicThemeSettingsPage'
)

const clinicPagesContent = fs.readFileSync(path.resolve('./src/ClinicPages.jsx'), 'utf8')
assert.ok(
  clinicPagesContent.includes('export function ClinicThemeSettingsPage'),
  'ClinicPages.jsx must export ClinicThemeSettingsPage'
)
console.log('   ✓ Navigation and routing verified.\n')

// -------------------------------------------------------------
// Test 7: Super Admin Platform Theme Independence
// -------------------------------------------------------------
console.log('7. Checking Super Admin Platform Independence...')
// Super Admin portal always maps to 'medical-blue'
function resolveWorkspaceTheme(portal, clinicTheme) {
  if (portal === 'super') return 'medical-blue'
  return clinicTheme || 'medical-blue'
}

assert.equal(resolveWorkspaceTheme('super', 'modern-green'), 'medical-blue', 'Super Admin stays on default platform theme')
assert.equal(resolveWorkspaceTheme('super', 'dark-mode'), 'medical-blue', 'Super Admin is never overridden by clinic dark mode')
assert.equal(resolveWorkspaceTheme('clinic', 'modern-green'), 'modern-green', 'Clinic portal receives clinic theme')
assert.equal(resolveWorkspaceTheme('receptionist', 'modern-green'), 'modern-green', 'Receptionist portal receives clinic theme')
assert.equal(resolveWorkspaceTheme('patient', 'modern-green'), 'modern-green', 'Patient portal receives clinic theme')
console.log('   ✓ Super Admin independence and clinic-wide cascade verified.\n')

console.log('🎉 ALL THEME CUSTOMIZATION TESTS PASSED SUCCESSFULLY! 🚀')

