# ClinicOS — Multi-Tenant Healthcare Clinic SaaS Platform

> **"Run Your Clinic Smarter. Spend Less Time on Paperwork."**  
> A commercially compelling, frontend-only healthcare SaaS prototype designed for clinic owners, doctors, potential customers, and investors.

---

## 1. Product Vision & Architecture Overview

**ClinicOS** is an end-to-end multi-tenant clinic operations and SaaS business administration platform built with React, TypeScript, and a unified blue-focused design system. It organizes the complete private healthcare clinic workflow into three connected experiences:

1. **SaaS Business Administration**: Tenant management, subscription plans, MRR analytics, support desk, and platform health telemetry.
2. **Clinic Operations**: Patient management, appointments with conflict-prevention guards, consultations with digital prescription composers, pharmacy inventory tracking with batch & expiry triage, and clinic accounting.
3. **Patient Self-Service**: Doctor discovery, consultation booking, verifiable digital prescriptions with QR authenticity checks, and online invoice settlement.

### Important Architectural Scope & Demo Boundaries
- **Frontend-Only Prototype**: Built with realistic synthetic data, client-side state, and browser-local demo persistence (`localStorage`).
- **Zero Backend / No Real Database**: No backend servers, databases, auth servers, or live payment/messaging APIs are invoked.
- **Exactly Four Application Roles**: Subscription plans, support tickets, inventory, and billing are functional modules within the clinic and platform workspaces, not separate user roles.
- **Demo Role Switcher**: The persistent top demo bar allows immediate 1-click persona switching for presentations and evaluations. It is a prototype navigation aid, not production authentication or authorization.
- **Deterministic Local Simulators**: Demonstrates simulated WhatsApp Meta Cloud API message dispatches, Razorpay payment settlements, and cryptographic QR prescription verification.

---

## 2. Technology Stack & Design System

- **Framework**: React 19 with Vite 8 development and build tool
- **Language**: TypeScript (`src/types/index.ts`)
- **Routing**: React Router DOM v7 (Route groups, nested layouts, parameter matching)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4 with healthcare SaaS design tokens
- **Visualizations**: Recharts (Responsive area charts for MRR, bar charts for capacity, donut charts for billing breakdown)
- **State Management**: Native React Context API (`AppContext.jsx`) with `localStorage` hydration and 1-click `Reset Demo`
- **Print Engine**: Dedicated print stylesheet targeting `@media print` for A4 prescriptions and receipts

### Blue-Focused Design Tokens

| Token | Hex Value | Usage |
|-------|-----------|-------|
| **Primary Blue** | `#2563EB` | Primary buttons, active navigation, key highlights, selected tabs |
| **Dark Blue** | `#1D4ED8` | Hover states, active links, prominent accents |
| **Deep Navy** | `#172554` | Typography headings, sidebar brand accents |
| **Light Blue Background** | `#EFF6FF` | Soft badge backgrounds, selected card highlights, notification tints |
| **Pale Blue Surface** | `#F8FAFF` | Alternate table rows, modal headers, preview cards |
| **Main Background** | `#F8FAFC` | Application body background, workspace canvas |
| **Card Background** | `#FFFFFF` | Rounded cards, dropdowns, dialogs |
| **Main Text** | `#1E293B` | Base body text, primary table text, form inputs |
| **Secondary Text** | `#64748B` | Labels, subtitles, timestamps, helper text |
| **Borders** | `#E2E8F0` | Dividers, card borders, table row borders |
| **Success** | `#16A34A` | Confirmed appointments, paid invoices, delivered items |
| **Warning** | `#D97706` | In-progress visits, low stock alerts, trial warnings |
| **Error** | `#DC2626` | Cancelled appointments, expired batches, negative stock blocks |

### Standard Readable Typography
- **Base Text**: `14px` (`text-sm`)
- **Secondary & Helper Text**: `12px` (`text-xs`)
- **Form Labels & Table Cells**: `13–14px`
- **Buttons**: `14px` (`text-sm`)
- **Card Titles**: `14–16px`
- **Section Headings**: `18–20px`
- **Page Headings**: `24–28px` (`text-2xl`)
- **Metric Values**: `24–30px`
- **Status Badges**: `11–12px`

---

## 3. Exactly Four Application Roles & Routes

The application features **strictly four roles**, each with a dedicated navigation structure and functional screens:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLINICOS APPLICATION SHELL                       │
├───────────────────┬───────────────────┬───────────────────┬────────────┤
│ 1. SaaS Superadmin│ 2. Clinic Doctor  │ 3. Receptionist/  │ 4. Patient │
│    /superadmin/*  │    / Admin        │    Manager        │  /patient/*│
│                   │    /clinic/*      │    /reception/*   │            │
└───────────────────┴───────────────────┴───────────────────┴────────────┘
```

### Role 1: SaaS Superadmin
The platform owner manages the SaaS business, revenue, tenants, and infrastructure.

- `/superadmin/dashboard`: SaaS Monthly Recurring Revenue (MRR: ₹1,53,978), ARR, tenant count, trial conversions, and plan distribution charts.
- `/superadmin/clinics`: Searchable clinic tenant directory with filters, branch counts, and simulated account suspension/reactivation.
- `/superadmin/clinics/:id`: Detailed clinic operational and subscription metadata.
- `/superadmin/plans`: Subscription Tier Architect (Starter, Growth, Professional, Enterprise) with editable pricing, doctor quotas, and branch limits.
- `/superadmin/subscriptions`: Active tenant subscriptions with next renewal dates and upgrade/downgrade simulation modals.
- `/superadmin/billing`: B2B SaaS platform invoices and simulated payment statuses.
- `/superadmin/revenue`: Recurring revenue trends and exportable demo financial reports.
- `/superadmin/support`: Multi-tenant customer support ticket desk with priority filters, private internal notes, and status transitions.
- `/superadmin/platform`: Synthetic platform uptime (99.98%), API response times (38ms), cron worker status, and third-party integration health.
- `/superadmin/activity`: Immutable administrative audit trail tracking logins, tier changes, and security events.
- `/superadmin/settings`: Global SaaS configuration, currency formatting, and platform defaults.

### Role 2: Clinic Doctor/Admin
The primary clinic administrator and clinical owner manages both clinic operations and clinical care.

- `/clinic/dashboard`: Clinic command center (appointments today, queue waiting, revenue collected, low-stock warnings, and follow-ups).
- `/clinic/appointments`: Real-time appointment schedule with conflict-prevention warnings (day, week, month, list views).
- `/clinic/queue`: Live patient waiting lounge queue with token numbers and "Call Patient In" controls.
- `/clinic/patients`: Searchable patient panel with allergy warnings and past visits.
- `/clinic/patients/:id`: Comprehensive patient profile and medical record timeline.
- `/clinic/consultations`: Clinical consultation workspace (vitals, complaints, clinical findings, ICD-style diagnosis, treatment plan, drug composer with presets, Save Draft vs Finalize Demonstration Record, and QR verification hash).
- `/clinic/prescriptions`: Digital prescriptions issued with A4 print preview and QR verification tokens.
- `/clinic/doctors`: Doctor roster, specialties, consultation fees, and schedule assignments.
- `/clinic/staff`: Staff invitation modal, role assignments, and granular permission controls.
- `/clinic/schedules`: Clinician working hours and chair allocation calendar.
- `/clinic/inventory`: Pharmacy catalog, stock adjustment with reason logging, batch number tracking, expiry monitoring (< 60d), and supplier purchase orders.
- `/clinic/billing`: Patient invoicing, multi-item services, tax (GST), payment recording (UPI/Card/Cash), and clinic expenses.
- `/clinic/feedback`: Patient satisfaction inbox with rating filters and confidential staff notes.
- `/clinic/reports`: Clinic operational reports, doctor utilization, and revenue breakdown.
- `/clinic/subscription`: Clinic SaaS tier status, trial countdown, and upgrade requests.
- `/clinic/support`: Clinic-side helpdesk for submitting support tickets to SaaS Superadmin.
- `/clinic/settings`: Clinic profile, multi-branch addresses, operating hours, and booking policy.

### Role 3: Clinic Receptionist/Manager
Front-desk staff and operational managers manage registrations, appointments, and daily lounge throughput.

- `/reception/dashboard`: Front-desk cockpit (waiting patients, doctors on duty, pending check-ins, and walk-in counter).
- `/reception/appointments`: Schedule calendar, appointment booking, rescheduling, cancellation, and check-in workflows.
- `/reception/walk-ins`: Rapid express registration issuing thermal queue tokens (`#W-104`) in under 30 seconds.
- `/reception/queue`: Live patient queue monitor with real-time status transitions.
- `/reception/patients`: Patient directory search and new patient registration.
- `/reception/schedule`: Doctor availability and duty rosters.
- `/reception/communication`: Patient follow-up queue with simulated WhatsApp appointment confirmations and reminders.
- `/reception/stock-requests`: Submit front-desk consumable and stationery refill requests.
- `/reception/billing`: Authorized front-desk invoice collection and instant receipt issuance.
- `/reception/support`: Submit operational tickets to SaaS support.

### Role 4: Patient
Mobile-first patient self-service portal for appointments, clinical summaries, prescriptions, and billing.

- `/patient/dashboard`: Personal health dashboard showing upcoming appointment, active prescriptions, and outstanding bills.
- `/patient/doctors`: Discover clinic doctors, specialties, consultation fees, and sample ratings.
- `/patient/doctors/:id`: Clinician profile and clinic branch location details.
- `/patient/appointments`: View upcoming and past appointments with rescheduling and cancellation actions.
- `/patient/appointments/book`: Direct online booking with real-time slot conflict guards.
- `/patient/records`: Authorized clinical visit summaries, recorded vitals, and diagnoses strictly isolated to the logged-in patient.
- `/patient/prescriptions`: Digital prescriptions with dosage instructions and plain-English AI explanations.
- `/patient/bills`: Itemized invoices, tax receipts for insurance claims, and simulated "Pay Now" checkout.
- `/patient/notifications`: Follow-up reminders, WhatsApp dispatch copies, and communication channel preferences.
- `/patient/feedback`: Submit 5-star feedback across categories (Doctor Care, Waiting Time, Cleanliness, Staff).
- `/patient/profile`: Personal profile, emergency contact, and documented drug allergies.

---

## 4. Shared Workflows & Data Models

### A. Centralized Appointment System & Conflict Prevention
- **Shared Model**: The same appointment data model is shared across Receptionist, Doctor, Clinic Admin, and Patient workspaces.
- **Double-Booking Prevention**: Time slot selection detects if a doctor is already reserved at that date and time, visually disabling the slot with `(Booked / Unavailable)` and preventing overlapping reservations.
- **Synchronized Status Updates**: Checking in a patient updates the live queue; cancelling updates counters in real-time.

### B. Clinical Consultation & Digital Prescriptions
- **Complete Encounter Composer**: Records presenting complaints, multi-vital telemetry (BP, Pulse, Temp, SpO2, Weight), clinical findings, diagnosis, and treatment plan.
- **Prescription Fields**: Medication name, strength, dosage, route, frequency, duration, quantity, and instructions with quick 1-click presets (Paracetamol 650mg, Pantoprazole 40mg).
- **Save Draft vs. Finalize**: Distinguishes work-in-progress drafts from finalized demonstration records.
- **Tamper-Evident QR Verification**: Finalized prescriptions generate an opaque verification token linked to `/verify-prescription/:verificationId`.

### C. Pharmacy Inventory & Expiry Triage
- **Negative Stock Guard**: Stock adjustment dialogs strictly prevent reducing stock below zero and log every adjustment to an immutable movement audit ledger with required reasons.
- **Batch & Expiry Triage**: Dedicated expiry monitor triages batches expiring within 60 days to prevent clinical waste.

### D. Segregated Billing Systems
- **Clinic Patient Billing**: Service tariffs, itemized patient invoices, tax calculation, partial payments, payment modes (UPI QR, Card, Cash), and clinic operational overheads.
- **SaaS Platform Billing**: B2B clinic subscription invoices, recurring MRR/ARR metrics, renewal dates, and tier upgrades.

---

## 5. Directory Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── DemoRoleBar.jsx          # Top bar with exactly 4 roles, active tenant, and reset action
│   │   ├── WorkspaceSidebar.jsx     # Navigation customized for the 4 roles with blue active states
│   │   ├── WorkspaceHeader.jsx      # Dynamic breadcrumbs, branch switcher, and notification drawer
│   │   ├── WorkspaceLayout.jsx      # Authenticated app shell with embedded AI Preview Assistant
│   │   ├── PublicHeader.jsx         # Marketing header with blue branding and free trial CTA
│   │   ├── PublicFooter.jsx         # SaaS marketing and legal footer
│   │   ├── WhatsAppModal.jsx        # Simulated Meta Cloud API WhatsApp notification preview
│   │   └── PrescriptionModal.jsx    # Print-ready A4 digital prescription preview
│   └── ui/
│       ├── AIPreviewAssistant.jsx   # Collapsible deterministic AI preview widget
│       ├── Badge.jsx                # Color-coded badges for status workflows
│       ├── Button.jsx               # Primary blue, outline, danger, success variants
│       ├── Card.jsx                 # Rounded SaaS card container
│       ├── StatCard.jsx             # Metric card with trends and subtitles
│       ├── Modal.jsx                # Accessible modal dialog with backdrop & focus management
│       ├── QRCodeBadge.jsx          # SVG QR representation linking to verification portal
│       └── DemoNotice.jsx           # Synthetic demonstration data notice
│
├── context/
│   └── AppContext.jsx               # Single source of truth: unified state, persistence & mutations
│
├── demo-data/
│   └── index.ts                     # Rich synthetic domain data (4 personas, clinics, inventory, tickets)
│
├── features/
│   ├── public-website/              # Home, Features, Solutions, Pricing, About, Contact, FAQ
│   ├── authentication/              # Login launchpad (4 personas) & Register (4-step clinic onboarding)
│   ├── clinic-directory/            # Public clinic profiles and guest appointment booking
│   ├── super-admin/                 # Platform Dashboard, Clinics, Subscriptions, Plans, Activity, Support
│   ├── clinic-admin/                # Clinic Dashboard, Appointments, Patients, Staff, Consultations, Billing
│   ├── receptionist/                # Reception Dashboard, Queue, Appointments, Express Walk-Ins, Tasks
│   ├── patient-portal/              # Patient Dashboard, Doctors, Book, Records, Prescriptions, Bills, Alerts
│   └── qr-verification/             # /verify-prescription/:verificationId public authenticity check
│
├── services/                        # Typed service modules ready for REST / GraphQL backend adapters
├── types/                           # TypeScript interfaces for the 4 roles, entities & tiers
├── index.css                        # Blue design tokens, typography, and print CSS
├── App.jsx                          # Comprehensive route map for all 4 workspaces
└── main.jsx                         # Application entrypoint
```

---

## 6. Setup, Build & Static Deployment Instructions

### Prerequisites
- **Node.js**: v18+ or v20+
- **npm** or **pnpm**

### Development Mode
```bash
# 1. Navigate to project root
cd hospital

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local Vite development server
npm run dev
# (On Windows PowerShell if script execution is restricted: cmd /c npm run dev)
```

The application will be accessible at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
The output will be built into the `dist/` directory.

### Static Deployment Guide
ClinicOS is completely client-side and optimized for static hosting:

- **Vercel**: Deploy the repository directly. Set build command to `npm run build` and output directory to `dist`. Add SPA rewrite rule in `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **Netlify**: Set build command to `npm run build`, publish directory to `dist`. Add `public/_redirects`:
  ```text
  /*    /index.html   200
  ```
- **Cloudflare Pages**: Set framework preset to **Vite**, build command to `npm run build`, and output folder to `dist`.
