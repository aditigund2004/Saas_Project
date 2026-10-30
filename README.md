# ClinicOS Healthcare SaaS

A modern multi-tenant clinic management, doctor clinical consultation, receptionist front-desk, and patient portal SaaS built with React, Vite, React Router, Tailwind CSS, Lucide Icons, and Recharts.

All platform, clinic, receptionist, and patient data is managed via state and browser `localStorage`. Interactive changes persist under the `clinicflow-demo-v1` key, and user sessions persist under `clinicos-user-session-v1`.

## Quick Start & Local Run

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Run production build
npm run build
npm run preview

# 4. Run automated test suites
node test-whatsapp-integration.mjs
node test-guest-booking-workflow.mjs
node test-doctor-admin-workflow.mjs
node test-receptionist-module.mjs
node test-patient-module.mjs
```

---

## 4 Core Workspaces & Demo Credentials

In ClinicOS, **Doctor and Clinic Admin are the same persona**: the physician owner of the practice creates the clinic, manages clinic operations (staff, services, settings), and conducts consultations to attend patients.

The unified login page (`/login`) provides 4 dedicated demo workspace cards as well as a production-style email/password authentication form:

| Workspace | Demo User | Role | Default Email | Portal Destination & Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | Alex Morgan | `super_admin` | `admin@clinicos.demo` | `/super-admin/dashboard` · Platform MRR, clinics, subscription plans |
| **Doctor (Clinic Admin)** | Dr. Maya Patel | `clinic_admin` | `maya@sunrisefamily.com` | `/clinic/dashboard` · Create clinic, manage staff & attend patients |
| **Receptionist** | Ava Robinson | `receptionist` | `ava@sunrisefamily.com` | `/receptionist/dashboard` · Patient intake, live queue, appointments & billing |
| **Patient** | Emma Wilson | `patient` | `emma.wilson@email.com` | `/patient/dashboard` · Personal visits, prescriptions, records & invoices |

> In demo mode, any password will sign in to the corresponding account. In production mode, password verification, session tokens, and multi-factor authentication are enforced.

---

## Workspace Portals & Routes

### 1. Public, Authentication & Guest Booking
- `/` — Public marketing and platform landing page featuring **Instant Guest Appointment Booking**:
  - **No Account Required**: Patients can schedule consultations directly without registering, logging in, or setting passwords.
  - **Hero & Nav CTAs**: Prominent "Book Appointment" buttons in the header nav, hero section, and dedicated "Instant Online Booking" showcase.
  - **6-Step Interactive Wizard (`GuestAppointmentBookingModal`)**:
    1. **Clinic Selection**: Explore partner practices with search by clinic name, address, or service, viewing doctor counts and clinic contact details.
    2. **Doctor Selection**: View doctors affiliated with the selected clinic, their specialties, consultation fees, experience, and bios.
    3. **Schedule & Mode**: Choose between **In-Person Consultation** (at clinic address) or **Video Telehealth Consultation** (secure online room), pick a date (past dates disabled), and pick an available time slot with automatic conflict/double-booking detection.
    4. **Patient Information**: Collect Full Legal Name, Mobile Phone Number, optional Email (for confirmation receipt), Reason for Visit, and clinical notes.
    5. **Review & Confirm**: Itemized summary of clinic, doctor, schedule, consultation type, patient details, and consultation fee with one-click confirmation.
    6. **Booking Confirmation**: Instant confirmation screen with unique reference code (`CONF-XXXXXX`), copy button, printable summary (`window.print()`), and arrival instructions tailored to consultation mode.
  - **Clinic & Front-Desk Integration**: Appointments immediately reflect on `/clinic/appointments`, `/receptionist/appointments`, and `/receptionist/queue` for seamless check-in.
- `/features`, `/pricing` — Platform features and subscription tiers
- `/login` — Unified login page with 4 workspace options and email/password sign-in
- `/register` — Doctor & clinic owner onboarding: create clinic workspace and begin attending patients
- `/patient/register` — Self-service patient registration with clinical chart linking
- `/forgot-password` — Password recovery flow

### 2. Clinic Workspace (`portal="clinic"`) — Doctor & Clinic Admin
- `/clinic/dashboard` — Overview of daily appointments with one-click **"Attend Patient"** consultation actions, practice snapshot, revenue metrics, and patient volume.
- **Attend Patient (Clinical Consultation Modal)**:
  - Vitals pre-check (BP, Heart Rate, Temperature, SpO2, Weight)
  - Examination notes and primary clinical diagnosis
  - Interactive medication prescriber (medicine name, dosage, form, frequency, duration, instructions)
  - Follow-up timeline and care advice
  - One-click authorization granting the patient instant access to their consultation summary and prescription in the Patient Portal
  - Automatic status transition to `Completed` with notifications to the patient and front desk
- `/clinic/patients` — Patient directory, clinical profiles, past medical consultation records, active prescriptions, and direct consultation launch.
- `/clinic/patients/:patientId` — Detailed patient chart with documented diagnoses and past prescriptions.
- `/clinic/appointments` — Calendar views (Day, Week, Month, List) with inline **"Attend Patient"** buttons.
- `/clinic/staff` — Care team directory, provider credentials, and clinic owner designation.
- `/clinic/services` — Service catalog, consultation pricing, and durations.
- `/clinic/billing`, `/clinic/reports`, `/clinic/subscription`, `/clinic/settings`.

### 3. Dedicated Receptionist Portal (`portal="receptionist"`)
Protected routes requiring receptionist or administrative authentication (`/login?portal=receptionist` redirect):
- `/receptionist/dashboard` — Front-desk command center with 6 live operational metrics, today's schedule, waiting queue snapshot, recent registrations, quick action buttons, and clinic operational status.
- `/receptionist/patients` — Patient directory for the active clinic with real-time search, filters (All, Registered Accounts, Unlinked Charts), demographic inspection, and edit modal.
- `/receptionist/patients/new` — Walk-in and new patient registration form with full demographic, emergency contact, insurance details, and duplicate detection (flags matching email or phone).
- `/receptionist/appointments` — Front-desk appointment list and calendar scheduling tool with status filters (All, Scheduled, Checked-in, In Progress, Completed, Cancelled), room assignment, and cancellation modals.
- `/receptionist/book-appointment` — Front-desk booking wizard with patient auto-fill, doctor selection, date/time slot picker, consultation type, and strict real-time conflict / double-booking prevention.
- `/receptionist/queue` — Real-time clinic check-in and waiting room queue manager. Move patients through the care pipeline: `Checked in` → `In Progress` → `Completed`, assign exam rooms, and record no-shows.
- `/receptionist/doctors` — Provider availability calendar and daily shift overview showing active rooms, specializations, walk-in availability, and direct appointment booking shortcuts.
- `/receptionist/billing` — Front-desk invoicing and in-person payment terminal. Create new itemized patient invoices, collect Cash/Card/UPI/Cheque payments, and generate official printable receipts with references (`REC-...`).
- `/receptionist/notifications` — Receptionist alert feed for patient arrivals, new appointment bookings, settled invoices, and doctor schedule updates with unread badge counter.
- `/receptionist/profile` — Receptionist staff profile, shift hours, counter workstation, extension number, and emergency contact settings.

### 4. Dedicated Patient Portal (`portal="patient"`)
Protected routes requiring patient authentication (`/login?portal=patient` redirect):
- `/patient/dashboard` — Personal care overview with greeting, upcoming visit summary, active prescriptions, balance due, and quick actions.
- `/patient/appointments` — Upcoming, history, and cancelled visits with rescheduling, cancellation, and clinic directions.
- `/patient/book-appointment` — Doctor search across published providers, specialty filter, in-clinic/telehealth/home visit options, and interactive slot picker with double-booking prevention.
- `/patient/prescriptions` — Doctor-issued medications, dosage instructions, and official printable Rx pad.
- `/patient/medical-records` — Authorized clinical summaries, vitals history, documented allergies, and immunizations.
- `/patient/billing` — Itemized medical bills, online payment authorization simulation, and official receipt downloads.
- `/patient/notifications` — Notification center for appointment confirmations, prescription releases, and billing receipts.
- `/patient/profile` — Contact information, demographics, emergency contact, and care preferences.

### 5. Super Admin Portal (`portal="super"`)
- `/super-admin/dashboard` — Platform MRR, tenant health, plan distribution.
- `/super-admin/organizations` — Tenant directory, subscription status, activate/suspend clinics.
- `/super-admin/plans` — Subscription tier management.
- `/super-admin/subscriptions`, `/super-admin/billing`, `/super-admin/reports`, `/super-admin/notifications`, `/super-admin/settings`.

---

## WhatsApp Messaging & Appointment Notifications

ClinicOS integrates official WhatsApp click-to-chat messaging across the patient journey, receptionist coordination, and schedule adjustments:

### 1. Features Implemented in the Frontend Demo
- **Home Page Guest Booking Confirmation**: On booking confirmation, patients can click **"Confirm via WhatsApp"** to open WhatsApp/WhatsApp Web with a pre-formatted, verified confirmation message including their unique reference code (`CONF-XXXXXX`), clinic details, doctor, consultation mode, date, and time.
- **Receptionist Appointment Reminders**: From `/receptionist/appointments` (and dashboard), receptionists can click **"Send WhatsApp Reminder"**, review the patient's phone number and the pre-filled template, and launch WhatsApp in one click.
- **Appointment Cancellation Notifications**: When a receptionist cancels an appointment, the cancellation is saved first. A confirmation modal then allows sending a cancellation notice via WhatsApp with the documented reason and clinic rebooking contact.
- **Appointment Rescheduling Notifications**: When an appointment is rescheduled, the system calendar updates first. A confirmation modal then lets staff open WhatsApp with the updated date, time, and reference code.
- **On-Demand Patient Notifications**: Staff can click **"Notify Patient"** to send custom direct care notes to any scheduled patient.
- **Official Click-to-Chat Specification**: Uses `https://wa.me/PHONE_NUMBER?text=ENCODED_MESSAGE` with E.164 phone sanitization (digits only, no `+`, dashes, or spaces) and `encodeURIComponent` encoding.
- **Clear User Transparency**: Prompts and helper badges explicitly clarify that clicking opens WhatsApp with pre-filled text to be reviewed and sent directly. No false claims of automated background delivery are made.

### 2. Production WhatsApp Business API & Backend Requirements
For full enterprise automated delivery in a production environment:
- **Meta WhatsApp Business Platform (Cloud API)**: Register a Meta Business Account and System User Access Token.
- **Secure Backend Secrets**: API credentials and webhook tokens must reside exclusively in backend environment variables (`WHATSAPP_API_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`), never exposed to frontend client code.
- **Pre-Approved Template Messages (HSMs)**: Outbound automated notifications initiated outside a 24-hour customer care window require Meta-approved templates with dynamic parameters `{{1}}`, `{{2}}`.
- **Two-Way Webhook Handling**: A secure HTTPS webhook endpoint (Node.js/Express or Cloud Functions) to process message delivery statuses (`sent`, `delivered`, `read`, `failed`) and inbound patient replies.
- **Consent & Opt-in Management**: Maintain audit logs of patient consent before automated transactional broadcasts.
