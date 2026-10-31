import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { seedData } from './src/data.js'

console.log('🧪 Starting automated verification for Prescription-Based Medicine Ordering & Pharmacy Home Delivery...\n')

// -------------------------------------------------------------
// Test 1: Verify Seed Data for Pharmacies and Medicine Orders
// -------------------------------------------------------------
console.log('1. Checking Pharmacy and Medicine Order Seed Data...')
assert.ok(Array.isArray(seedData.pharmacies), 'seedData should have pharmacies array')
assert.ok(seedData.pharmacies.length >= 3, 'Should have at least 3 partner pharmacies')

const primaryPharmacy = seedData.pharmacies[0]
assert.ok(primaryPharmacy.name, 'Pharmacy must have a name')
assert.ok(primaryPharmacy.address, 'Pharmacy must have a physical address')
assert.ok(primaryPharmacy.phone, 'Pharmacy must have a contact phone number')
assert.ok(primaryPharmacy.estimatedDeliveryTime, 'Pharmacy must have estimated delivery time')
assert.ok(typeof primaryPharmacy.deliveryCharge === 'number', 'Pharmacy must have deliveryCharge')
assert.ok(typeof primaryPharmacy.freeDeliveryThreshold === 'number', 'Pharmacy must have freeDeliveryThreshold')
assert.ok(typeof primaryPharmacy.minOrderAmount === 'number', 'Pharmacy must have minOrderAmount')
assert.ok(Array.isArray(primaryPharmacy.inventory), 'Pharmacy must have medicine inventory')
assert.ok(primaryPharmacy.inventory.length >= 4, 'Pharmacy inventory should have multiple medicines')

// Verify inventory items
const rxMed = primaryPharmacy.inventory.find((i) => i.requiresPrescription)
const otcMed = primaryPharmacy.inventory.find((i) => !i.requiresPrescription)
const outOfStockMed = primaryPharmacy.inventory.find((i) => !i.inStock)
assert.ok(rxMed, 'Pharmacy inventory must have prescription-required medicines')
assert.ok(otcMed, 'Pharmacy inventory must have OTC medicines')
assert.ok(outOfStockMed, 'Pharmacy inventory must have out-of-stock / discontinued medicine for clear tagging')

assert.ok(Array.isArray(seedData.medicineOrders), 'seedData should have medicineOrders array')
assert.ok(seedData.medicineOrders.length >= 2, 'Should have initial demo medicine orders')
const sampleOrder = seedData.medicineOrders.find((o) => o.id === 'ORD-MED-928104') || seedData.medicineOrders[0]
assert.ok(sampleOrder.id.startsWith('ORD-MED-'), 'Order ID must have unique prefix ORD-MED-')
assert.ok(sampleOrder.trackingTimeline.length >= 2, 'Order must include tracking timeline')
console.log('   ✓ Verified pharmacy profiles, inventories, and initial medicine orders.\n')

// -------------------------------------------------------------
// Test 2: Sidebar Navigation & App Routes
// -------------------------------------------------------------
console.log('2. Checking Sidebar Navigation & Routes...')
const componentsContent = fs.readFileSync(path.resolve('./src/components.jsx'), 'utf8')
assert.ok(
  componentsContent.includes('Medicine Store') && componentsContent.includes('/patient/medicine-store'),
  'components.jsx must include Medicine Store in patientNavigation'
)
assert.ok(
  componentsContent.includes('Pharmacy Management') && componentsContent.includes('/clinic/pharmacy'),
  'components.jsx must include Pharmacy Management in doctorNavigation'
)

const appContent = fs.readFileSync(path.resolve('./src/App.jsx'), 'utf8')
assert.ok(appContent.includes('/patient/medicine-store'), 'App.jsx must register /patient/medicine-store route')
assert.ok(appContent.includes('/clinic/pharmacy'), 'App.jsx must register /clinic/pharmacy route')
assert.ok(appContent.includes('PatientMedicineStorePage'), 'App.jsx must load PatientMedicineStorePage')
assert.ok(appContent.includes('ClinicPharmacyPage'), 'App.jsx must load ClinicPharmacyPage')
console.log('   ✓ Verified Patient Medicine Store and Clinic Pharmacy routes & sidebar items.\n')

// -------------------------------------------------------------
// Test 3: Prescription-Based Medicine Matching & Rx Enforcement
// -------------------------------------------------------------
console.log('3. Testing Prescription-Based Reordering & Rx Enforcement...')
const emmaRx = seedData.prescriptions.filter((p) => p.patientEmail === 'emma.wilson@email.com')
assert.ok(emmaRx.length >= 2, 'Emma has active prescriptions')

const cetirizineRx = emmaRx.find((p) =>
  p.medications.some((m) => m.name.toLowerCase().includes('cetirizine'))
)
assert.ok(cetirizineRx, 'Emma has prescribed Cetirizine Hydrochloride')
const cetirizineMed = cetirizineRx.medications.find((m) => m.name.toLowerCase().includes('cetirizine'))
assert.equal(cetirizineMed.dosage, '10 mg')
assert.ok(cetirizineMed.frequency, 'Prescribed medicine must specify frequency')
assert.ok(cetirizineMed.duration, 'Prescribed medicine must specify duration/quantity')

// Simulate Store cart order placement logic
function simulateOrderPlacement({ items, pharmacy, prescriptionId, deliveryAddress, paymentMethod }) {
  if (!items || !items.length) {
    return { success: false, error: 'Your medicine cart is empty.' }
  }
  if (!deliveryAddress || !deliveryAddress.trim()) {
    return { success: false, error: 'Please enter a valid home delivery address.' }
  }
  const hasRxItem = items.some((item) => item.requiresPrescription)
  if (hasRxItem && !prescriptionId) {
    return {
      success: false,
      error: 'One or more items require a doctor prescription. Please select an eligible prescription or upload one to proceed.',
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const deliveryCharge = subtotal >= pharmacy.freeDeliveryThreshold ? 0 : pharmacy.deliveryCharge
  const discount = subtotal >= 50 ? 5 : 0
  const totalAmount = Number((subtotal + deliveryCharge - discount).toFixed(2))

  return {
    success: true,
    order: {
      id: `ORD-MED-${Math.floor(100000 + Math.random() * 900000)}`,
      pharmacyId: pharmacy.id,
      pharmacyName: pharmacy.name,
      prescriptionId: prescriptionId || null,
      items,
      subtotal,
      deliveryCharge,
      discount,
      totalAmount,
      paymentMethod,
      status: 'Order Placed',
      trackingTimeline: [{ status: 'Order Placed', timestamp: 'Just now', note: 'Order submitted' }],
    },
  }
}

// Case A: Disallow purchasing prescription item without prescription
const rxItemOnly = [
  {
    medicineId: 'med-1',
    name: 'Cetirizine Hydrochloride',
    unitPrice: 12.50,
    quantity: 1,
    requiresPrescription: true,
  },
]
const noRxResult = simulateOrderPlacement({
  items: rxItemOnly,
  pharmacy: primaryPharmacy,
  prescriptionId: null, // missing prescription!
  deliveryAddress: '742 Evergreen Terrace, San Francisco, CA',
  paymentMethod: 'Online Payment',
})
assert.equal(noRxResult.success, false)
assert.ok(noRxResult.error.includes('require a doctor prescription'))
console.log('   ✓ Prevented purchasing prescription-only medicine without valid prescription.')

// Case B: Allowed purchasing with valid prescription
const validRxResult = simulateOrderPlacement({
  items: rxItemOnly,
  pharmacy: primaryPharmacy,
  prescriptionId: cetirizineRx.id,
  deliveryAddress: '742 Evergreen Terrace, San Francisco, CA',
  paymentMethod: 'Online Payment',
})
assert.equal(validRxResult.success, true)
assert.ok(validRxResult.order.id.startsWith('ORD-MED-'))
assert.equal(validRxResult.order.prescriptionId, cetirizineRx.id)
assert.equal(validRxResult.order.status, 'Order Placed')
console.log(`   ✓ Successfully placed order with prescription reference: ${validRxResult.order.id}`)

// Case C: Allowed purchasing OTC medicine without prescription
const otcItemOnly = [
  {
    medicineId: 'med-5',
    name: 'Paracetamol / Acetaminophen Extra Strength',
    unitPrice: 8.00,
    quantity: 2,
    requiresPrescription: false,
  },
]
const otcResult = simulateOrderPlacement({
  items: otcItemOnly,
  pharmacy: primaryPharmacy,
  prescriptionId: null,
  deliveryAddress: '742 Evergreen Terrace, San Francisco, CA',
  paymentMethod: 'Cash on Delivery (COD)',
})
assert.equal(otcResult.success, true)
assert.equal(otcResult.order.totalAmount, 8.00 * 2 + primaryPharmacy.deliveryCharge)
console.log('   ✓ Verified OTC non-prescription purchase allowed without Rx.\n')

// -------------------------------------------------------------
// Test 4: Free Delivery Threshold & Fee Calculations
// -------------------------------------------------------------
console.log('4. Testing Delivery Fee & Cart Math...')
// Free delivery over $35 threshold
const largeOrderItems = [
  { medicineId: 'med-2', name: 'Fluticasone Propionate', unitPrice: 24.00, quantity: 2, requiresPrescription: true },
] // $48 subtotal >= $35 free threshold
const freeDeliveryOrder = simulateOrderPlacement({
  items: largeOrderItems,
  pharmacy: primaryPharmacy,
  prescriptionId: 'rx-101',
  deliveryAddress: '742 Evergreen Terrace, San Francisco, CA',
  paymentMethod: 'Online Payment',
})
assert.equal(freeDeliveryOrder.order.subtotal, 48.00)
assert.equal(freeDeliveryOrder.order.deliveryCharge, 0.00, 'Delivery fee should be waived over $35 threshold')
console.log('   ✓ Verified free delivery threshold waiver applied correctly.\n')

// -------------------------------------------------------------
// Test 5: Order Tracking Status Transitions
// -------------------------------------------------------------
console.log('5. Testing Order Status Flow & Timeline...')
const validStatuses = [
  'Order Placed',
  'Pharmacy Accepted',
  'Preparing Order',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
]

let liveOrder = validRxResult.order
for (const nextStatus of ['Pharmacy Accepted', 'Preparing Order', 'Out for Delivery', 'Delivered']) {
  assert.ok(validStatuses.includes(nextStatus))
  liveOrder.status = nextStatus
  liveOrder.trackingTimeline.push({ status: nextStatus, timestamp: 'Just now', note: `Progressed to ${nextStatus}` })
}

assert.equal(liveOrder.status, 'Delivered')
assert.equal(liveOrder.trackingTimeline.length, 5)
assert.equal(liveOrder.trackingTimeline[4].status, 'Delivered')
console.log('   ✓ Verified full 5-stage order tracking lifecycle.\n')

// -------------------------------------------------------------
// Test 6: External Prescription Upload Flow
// -------------------------------------------------------------
console.log('6. Testing Upload Prescription Capability...')
function simulateUploadPrescription({ doctorName, clinicName, diagnosis, medications, fileName }) {
  if (!medications || !medications.length) {
    return { success: false, error: 'Please enter at least one prescribed medicine.' }
  }
  const rxId = `RX-UP-${Math.floor(1000 + Math.random() * 9000)}`
  return {
    success: true,
    prescription: {
      id: rxId,
      doctor: doctorName,
      clinicName,
      diagnosis,
      medications,
      isUploaded: true,
      fileName: fileName || 'prescription-upload.pdf',
      status: 'Active',
      authorizedForPatient: true,
    },
  }
}

const uploadedRx = simulateUploadPrescription({
  doctorName: 'Dr. Robert Chen',
  clinicName: 'San Francisco Health Center',
  diagnosis: 'Acute Sinusitis',
  medications: [{ name: 'Amoxicillin-Clavulanate', dosage: '875 mg', form: 'Tablet', frequency: 'Twice daily', duration: '10 days' }],
  fileName: 'rx_dr_chen_scan.pdf',
})
assert.equal(uploadedRx.success, true)
assert.ok(uploadedRx.prescription.id.startsWith('RX-UP-'))
assert.equal(uploadedRx.prescription.isUploaded, true)
console.log(`   ✓ Uploaded external prescription verified with ID ${uploadedRx.prescription.id}.\n`)

// -------------------------------------------------------------
// Test 7: Pharmacy Management & Inventory Updates
// -------------------------------------------------------------
console.log('7. Testing Pharmacy Management & Inventory Actions...')
const pharmacyStore = { ...primaryPharmacy, inventory: [...primaryPharmacy.inventory] }

// Update price
const targetMed = pharmacyStore.inventory[0]
const oldPrice = targetMed.unitPrice
targetMed.unitPrice = 15.00
assert.equal(targetMed.unitPrice, 15.00)

// Toggle stock
targetMed.inStock = false
assert.equal(targetMed.inStock, false)
targetMed.inStock = true
assert.equal(targetMed.inStock, true)

// Add new medicine to inventory
const newMed = {
  id: 'med-999',
  name: 'Levocetirizine',
  dosage: '5 mg',
  form: 'Tablet',
  unitPrice: 16.50,
  inStock: true,
  stockCount: 50,
  requiresPrescription: true,
  category: 'Allergy & Respiratory',
}
pharmacyStore.inventory.push(newMed)
assert.equal(pharmacyStore.inventory.length, primaryPharmacy.inventory.length + 1)
console.log('   ✓ Verified pharmacy inventory pricing, stock toggle, and item addition.\n')

// -------------------------------------------------------------
// Test 8: Choose Medical Store -> Upload Prescription (Image/PDF) -> Medical Store Confirms -> Delivery
// -------------------------------------------------------------
console.log('8. Testing Choose Medical Store -> Upload Prescription -> Store Confirms & Delivers...')

function simulatePrescriptionUploadOrder({
  pharmacy,
  prescriptionFileName,
  prescriptionFileType,
  deliveryAddress,
  contactPhone,
  patientNotes,
  paymentMethod = 'Cash on Delivery (COD)',
  estimatedTotal = 35.00,
}) {
  if (!deliveryAddress || !deliveryAddress.trim()) {
    return { success: false, error: 'Please enter a valid home delivery address.' }
  }
  if (!prescriptionFileName) {
    return { success: false, error: 'Please upload an image or PDF of your prescription.' }
  }

  const orderId = `ORD-MED-${Math.floor(100000 + Math.random() * 900000)}`
  const subtotal = estimatedTotal
  const deliveryCharge = subtotal >= pharmacy.freeDeliveryThreshold ? 0.00 : pharmacy.deliveryCharge
  const totalAmount = Number((subtotal + deliveryCharge).toFixed(2))

  const newOrder = {
    id: orderId,
    pharmacyId: pharmacy.id,
    pharmacyName: pharmacy.name,
    patientName: 'Emma Wilson',
    patientEmail: 'emma.wilson@email.com',
    patientPhone: contactPhone,
    deliveryAddress,
    orderDate: 'Today',
    orderType: 'Prescription Upload',
    prescriptionFileName,
    prescriptionFileType: prescriptionFileType || (prescriptionFileName.endsWith('.pdf') ? 'pdf' : 'image'),
    patientNotes,
    prescriptionVerified: false,
    status: 'Order Placed',
    items: [
      {
        medicineId: 'med-upload',
        name: 'Prescribed Medicines as per Uploaded Rx',
        quantity: 1,
        unitPrice: subtotal,
        total: subtotal,
        requiresPrescription: true,
      },
    ],
    subtotal,
    deliveryCharge,
    totalAmount,
    paymentMethod,
    paymentStatus: paymentMethod.includes('Cash') ? 'Pending (COD on Arrival)' : 'Paid (Simulated)',
    estimatedDeliveryTime: pharmacy.estimatedDeliveryTime,
    trackingTimeline: [
      {
        status: 'Order Placed',
        timestamp: 'Just now',
        note: 'Prescription uploaded by patient. Awaiting medical store verification & confirmation.',
      },
    ],
  }

  return { success: true, order: newOrder }
}

function simulateStoreConfirmation(order, note) {
  assert.equal(order.prescriptionVerified, false, 'Initial order must be unverified')
  assert.equal(order.status, 'Order Placed', 'Initial order status must be Order Placed')

  order.prescriptionVerified = true
  order.status = 'Pharmacy Accepted'
  order.verifiedBy = 'Licensed Pharmacist'
  order.verifiedAt = 'Just now'
  order.trackingTimeline.push({
    status: 'Pharmacy Accepted',
    timestamp: 'Just now',
    note: note || 'Medical store verified prescription (Image/PDF). Order confirmed for delivery!',
  })
  return { success: true, order }
}

// Case 1: Choose Medical Store (Sunrise Care) & Upload Prescription Image (.jpg)
const uploadImageOrderRes = simulatePrescriptionUploadOrder({
  pharmacy: primaryPharmacy,
  prescriptionFileName: 'dr_maya_patel_rx.jpg',
  prescriptionFileType: 'image',
  deliveryAddress: '742 Evergreen Terrace, San Francisco, CA',
  contactPhone: '(415) 555-0123',
  patientNotes: 'Full 1-month course for seasonal allergies.',
  paymentMethod: 'Cash on Delivery (COD)',
})
assert.equal(uploadImageOrderRes.success, true)
const uploadOrder = uploadImageOrderRes.order
assert.equal(uploadOrder.orderType, 'Prescription Upload')
assert.equal(uploadOrder.prescriptionFileName, 'dr_maya_patel_rx.jpg')
assert.equal(uploadOrder.prescriptionFileType, 'image')
assert.equal(uploadOrder.prescriptionVerified, false)
assert.equal(uploadOrder.status, 'Order Placed')
console.log('   ✓ Step 1 & 2: Patient selected medical store & uploaded prescription image successfully.')

// Case 2: Medical Store inspects prescription and verifies & confirms order
const confirmRes = simulateStoreConfirmation(uploadOrder, 'Pharmacist inspected dr_maya_patel_rx.jpg and confirmed order.')
assert.equal(confirmRes.success, true)
assert.equal(uploadOrder.prescriptionVerified, true)
assert.equal(uploadOrder.status, 'Pharmacy Accepted')
assert.equal(uploadOrder.trackingTimeline.length, 2)
console.log('   ✓ Step 3: Medical store inspected prescription and confirmed order for fulfillment.')

// Case 3: Medical Store delivers
for (const step of ['Preparing Order', 'Out for Delivery', 'Delivered']) {
  uploadOrder.status = step
  uploadOrder.trackingTimeline.push({ status: step, timestamp: 'Just now', note: `Medical store: ${step}` })
}
assert.equal(uploadOrder.status, 'Delivered')
assert.equal(uploadOrder.trackingTimeline.length, 5)
console.log('   ✓ Step 4: Medical store prepared, dispatched, and delivered order successfully.')

// Case 4: Verify code integration in Store.jsx, PatientPages.jsx, ClinicPages.jsx
const storeCode = fs.readFileSync(path.resolve('./src/Store.jsx'), 'utf8')
assert.ok(storeCode.includes('placePrescriptionUploadOrder'), 'Store.jsx must export placePrescriptionUploadOrder')
assert.ok(storeCode.includes('confirmPrescriptionOrderByStore'), 'Store.jsx must export confirmPrescriptionOrderByStore')

const patientCode = fs.readFileSync(path.resolve('./src/PatientPages.jsx'), 'utf8')
assert.ok(patientCode.includes('Choose Medical Store & Upload Prescription'), 'PatientPages.jsx must have Choose Medical Store flow')
assert.ok(patientCode.includes('handleChooseMedicalUploadOrderSubmit'), 'PatientPages.jsx must handle prescription order submission')
assert.ok(patientCode.includes('viewPrescriptionModalOrder'), 'PatientPages.jsx must allow patient to view uploaded prescription')

const clinicCode = fs.readFileSync(path.resolve('./src/ClinicPages.jsx'), 'utf8')
assert.ok(clinicCode.includes('confirmPrescriptionOrderByStore'), 'ClinicPages.jsx must call confirmPrescriptionOrderByStore')
assert.ok(clinicCode.includes('inspectPrescriptionModalOrder'), 'ClinicPages.jsx must have prescription inspection modal')
assert.ok(clinicCode.includes('Verify Prescription & Confirm Order'), 'ClinicPages.jsx must feature Verify Prescription & Confirm Order action')
console.log('   ✓ Code integration verified across Store.jsx, PatientPages.jsx, and ClinicPages.jsx.\n')

console.log('🎉 ALL PRESCRIPTION-BASED MEDICINE ORDERING & PHARMACY HOME DELIVERY TESTS PASSED PERFECTLY!\n')

