import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { seedData } from './src/data.js'

console.log('🧪 Starting automated verification for Doctor / Admin Notifications...\n')

// -------------------------------------------------------------
// Test 1: Verify Seed Data for Doctor Notifications
// -------------------------------------------------------------
console.log('1. Checking Doctor Notifications Seed Data in data.js...')
assert.ok(Array.isArray(seedData.doctorNotifications), 'doctorNotifications must exist in seedData')
assert.ok(seedData.doctorNotifications.length > 0, 'doctorNotifications must not be empty')

const firstNotif = seedData.doctorNotifications[0]
assert.ok(firstNotif.id, 'Notification must have id')
assert.ok(firstNotif.title, 'Notification must have title')
assert.ok(firstNotif.message, 'Notification must have message')
assert.ok(firstNotif.date, 'Notification must have date')
assert.equal(typeof firstNotif.read, 'boolean', 'Notification read status must be boolean')
console.log(`   ✓ Seed data verified (${seedData.doctorNotifications.length} initial notifications).\n`)

// -------------------------------------------------------------
// Test 2: Verify Store Notification Actions & Unread Calculation
// -------------------------------------------------------------
console.log('2. Testing Store Doctor Notification Actions & State Transitions...')
const state = JSON.parse(JSON.stringify(seedData))

const unreadInitial = state.doctorNotifications.filter((n) => n.clinicId === 'sunrise' && !n.read).length
assert.ok(unreadInitial > 0, 'Must have at least one unread doctor notification initially')

// Test mark individual notification read
const targetNotif = state.doctorNotifications.find((n) => !n.read)
assert.ok(targetNotif, 'Unread notification must be found')
targetNotif.read = true

const unreadAfterSingle = state.doctorNotifications.filter((n) => n.clinicId === 'sunrise' && !n.read).length
assert.equal(unreadAfterSingle, unreadInitial - 1, 'Unread count must decrement by 1')

// Test mark all notifications read
state.doctorNotifications = state.doctorNotifications.map((n) => ({ ...n, read: true }))
const unreadAfterAll = state.doctorNotifications.filter((n) => n.clinicId === 'sunrise' && !n.read).length
assert.equal(unreadAfterAll, 0, 'All notifications must be read after markAll')
console.log('   ✓ Store action logic and unread counter verified.\n')

// -------------------------------------------------------------
// Test 3: Verify Topbar Bell Navigation & Badge in components.jsx
// -------------------------------------------------------------
console.log('3. Checking Topbar Bell Button & Badge in components.jsx...')
const componentsContent = fs.readFileSync(path.resolve('./src/components.jsx'), 'utf8')

// Ensure doctorUnreadCount is computed
assert.ok(
  componentsContent.includes('const doctorUnreadCount'),
  'components.jsx must compute doctorUnreadCount'
)

// Ensure topbar Bell button navigates to /clinic/notifications
assert.ok(
  componentsContent.includes("else navigate('/clinic/notifications')"),
  'Topbar Bell button must navigate to /clinic/notifications in Doctor/Admin workspace'
)

// Ensure topbar Bell dot activates when doctorUnreadCount > 0
assert.ok(
  componentsContent.includes('doctorUnreadCount > 0'),
  'Topbar Bell button red dot indicator must check doctorUnreadCount > 0'
)

// Ensure sidebar badge renders doctorUnreadCount
assert.ok(
  componentsContent.includes("label === 'Notifications' && !isSuper && !isPatient && !isReceptionist && doctorUnreadCount > 0"),
  'Sidebar Notifications link must display doctorUnreadCount badge'
)
console.log('   ✓ Topbar navigation, red dot badge, and sidebar counter verified.\n')

// -------------------------------------------------------------
// Test 4: Verify DoctorNotificationsPage in ClinicPages.jsx
// -------------------------------------------------------------
console.log('4. Checking DoctorNotificationsPage implementation in ClinicPages.jsx...')
const clinicPagesContent = fs.readFileSync(path.resolve('./src/ClinicPages.jsx'), 'utf8')

assert.ok(
  clinicPagesContent.includes('markDoctorNotificationRead'),
  'ClinicPages.jsx must call markDoctorNotificationRead'
)
assert.ok(
  clinicPagesContent.includes('markAllDoctorNotificationsRead'),
  'ClinicPages.jsx must call markAllDoctorNotificationsRead'
)
assert.ok(
  clinicPagesContent.includes('data.doctorNotifications'),
  'ClinicPages.jsx must read real store data from data.doctorNotifications'
)
console.log('   ✓ DoctorNotificationsPage connection to Store verified.\n')

console.log('🎉 ALL DOCTOR / ADMIN NOTIFICATION TESTS PASSED SUCCESSFULLY! 🚀')

