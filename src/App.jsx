import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout, DoctorProtectedRoute, PatientProtectedRoute, ReceptionistProtectedRoute, Toast } from './components'

const lazyPage = (loader, exportName) => lazy(() => loader().then((module) => ({ default: module[exportName] })))

// Public Pages
const LandingPage = lazyPage(() => import('./PublicPages'), 'LandingPage')
const FeaturesPage = lazyPage(() => import('./PublicPages'), 'FeaturesPage')
const PricingPage = lazyPage(() => import('./PublicPages'), 'PricingPage')
const LoginPage = lazyPage(() => import('./PublicPages'), 'LoginPage')
const RegisterPage = lazyPage(() => import('./PublicPages'), 'RegisterPage')
const PatientRegisterPage = lazyPage(() => import('./PublicPages'), 'PatientRegisterPage')
const ForgotPasswordPage = lazyPage(() => import('./PublicPages'), 'ForgotPasswordPage')

// Clinic Workspace Pages (Doctor Module)
const ClinicDashboard = lazyPage(() => import('./ClinicPages'), 'ClinicDashboard')
const PatientsPage = lazyPage(() => import('./ClinicPages'), 'PatientsPage')
const PatientDetailPage = lazyPage(() => import('./ClinicPages'), 'PatientDetailPage')
const AppointmentsPage = lazyPage(() => import('./ClinicPages'), 'AppointmentsPage')
const DoctorConsultationNotesPage = lazyPage(() => import('./ClinicPages'), 'DoctorConsultationNotesPage')
const DoctorAppointmentHistoryPage = lazyPage(() => import('./ClinicPages'), 'DoctorAppointmentHistoryPage')
const DoctorSchedulePage = lazyPage(() => import('./ClinicPages'), 'DoctorSchedulePage')
const DoctorNotificationsPage = lazyPage(() => import('./ClinicPages'), 'DoctorNotificationsPage')
const ClinicPharmacyPage = lazyPage(() => import('./ClinicPages'), 'ClinicPharmacyPage')
const StaffPage = lazyPage(() => import('./ClinicPages'), 'StaffPage')
const ServicesPage = lazyPage(() => import('./ClinicPages'), 'ServicesPage')
const ClinicToolsPage = lazyPage(() => import('./ClinicPages'), 'ClinicToolsPage')
const ClinicThemeSettingsPage = lazyPage(() => import('./ClinicPages'), 'ClinicThemeSettingsPage')

// Health Library & Disease Awareness Pages
const HealthLibraryPage = lazyPage(() => import('./HealthLibraryPages'), 'HealthLibraryPage')
const HealthArticleDetailPage = lazyPage(() => import('./HealthLibraryPages'), 'HealthArticleDetailPage')
const ClinicHealthBlogPage = lazyPage(() => import('./HealthLibraryPages'), 'ClinicHealthBlogPage')

// Super Admin Workspace Pages
const SuperDashboard = lazyPage(() => import('./SuperPages'), 'SuperDashboard')
const OrganizationsPage = lazyPage(() => import('./SuperPages'), 'OrganizationsPage')
const OrganizationDetailPage = lazyPage(() => import('./SuperPages'), 'OrganizationDetailPage')
const PlansPage = lazyPage(() => import('./SuperPages'), 'PlansPage')
const SubscriptionsPage = lazyPage(() => import('./SuperPages'), 'SubscriptionsPage')
const SuperToolsPage = lazyPage(() => import('./SuperPages'), 'SuperToolsPage')
const SuperEmailModulePage = lazyPage(() => import('./SuperPages'), 'SuperEmailModulePage')

// Patient Workspace Pages
const PatientDashboard = lazyPage(() => import('./PatientPages'), 'PatientDashboard')
const PatientAppointmentsPage = lazyPage(() => import('./PatientPages'), 'PatientAppointmentsPage')
const PatientBookAppointmentPage = lazyPage(() => import('./PatientPages'), 'PatientBookAppointmentPage')
const PatientPrescriptionsPage = lazyPage(() => import('./PatientPages'), 'PatientPrescriptionsPage')
const PatientMedicalRecordsPage = lazyPage(() => import('./PatientPages'), 'PatientMedicalRecordsPage')
const PatientMedicineStorePage = lazyPage(() => import('./PatientPages'), 'PatientMedicineStorePage')
const PatientWhatsAppPage = lazyPage(() => import('./PatientPages'), 'PatientWhatsAppPage')
const PatientBillingPage = lazyPage(() => import('./PatientPages'), 'PatientBillingPage')
const PatientNotificationsPage = lazyPage(() => import('./PatientPages'), 'PatientNotificationsPage')
const PatientProfilePage = lazyPage(() => import('./PatientPages'), 'PatientProfilePage')

// Receptionist Workspace Pages
const ReceptionistDashboard = lazyPage(() => import('./ReceptionistPages'), 'ReceptionistDashboard')
const ReceptionistPatientsPage = lazyPage(() => import('./ReceptionistPages'), 'ReceptionistPatientsPage')
const ReceptionistNewPatientPage = lazyPage(() => import('./ReceptionistPages'), 'ReceptionistNewPatientPage')
const ReceptionistAppointmentsPage = lazyPage(() => import('./ReceptionistPages'), 'ReceptionistAppointmentsPage')
const ReceptionistBookAppointmentPage = lazyPage(() => import('./ReceptionistPages'), 'ReceptionistBookAppointmentPage')
const ReceptionistQueuePage = lazyPage(() => import('./ReceptionistPages'), 'ReceptionistQueuePage')
const ReceptionistDoctorsPage = lazyPage(() => import('./ReceptionistPages'), 'ReceptionistDoctorsPage')
const ReceptionistWhatsAppPage = lazyPage(() => import('./ReceptionistPages'), 'ReceptionistWhatsAppPage')
const ReceptionistBillingPage = lazyPage(() => import('./ReceptionistPages'), 'ReceptionistBillingPage')
const ReceptionistNotificationsPage = lazyPage(() => import('./ReceptionistPages'), 'ReceptionistNotificationsPage')
const ReceptionistProfilePage = lazyPage(() => import('./ReceptionistPages'), 'ReceptionistProfilePage')

function ShellRoute({ portal, children }) {
  return <AppLayout portal={portal}>{children}</AppLayout>
}

export default function App() {
  return (
    <>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-xs text-slate-400">Loading workspace…</div>}>
        <Routes>
          {/* Public & Authentication */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/patient/register" element={<PatientRegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/health-library" element={<HealthLibraryPage />} />
          <Route path="/health-library/:slug" element={<HealthArticleDetailPage />} />
          <Route path="/blog" element={<Navigate to="/health-library" replace />} />
          <Route path="/blog/:slug" element={<HealthArticleDetailPage />} />

          {/* Super Admin Workspace */}
          <Route path="/super-admin" element={<Navigate to="/super-admin/dashboard" replace />} />
          <Route path="/super-admin/dashboard" element={<ShellRoute portal="super"><SuperDashboard /></ShellRoute>} />
          <Route path="/super-admin/organizations" element={<ShellRoute portal="super"><OrganizationsPage /></ShellRoute>} />
          <Route path="/super-admin/organizations/:organizationId" element={<ShellRoute portal="super"><OrganizationDetailPage /></ShellRoute>} />
          <Route path="/super-admin/plans" element={<ShellRoute portal="super"><PlansPage /></ShellRoute>} />
          <Route path="/super-admin/subscriptions" element={<ShellRoute portal="super"><SubscriptionsPage /></ShellRoute>} />
          <Route path="/super-admin/emails" element={<ShellRoute portal="super"><SuperEmailModulePage /></ShellRoute>} />
          <Route path="/super-admin/billing" element={<ShellRoute portal="super"><SuperToolsPage page="billing" /></ShellRoute>} />
          <Route path="/super-admin/reports" element={<ShellRoute portal="super"><SuperToolsPage page="reports" /></ShellRoute>} />
          <Route path="/super-admin/notifications" element={<ShellRoute portal="super"><SuperToolsPage page="notifications" /></ShellRoute>} />
          <Route path="/super-admin/settings" element={<ShellRoute portal="super"><SuperToolsPage page="settings" /></ShellRoute>} />

          {/* Clinic Admin / Doctor Workspace */}
          <Route path="/clinic" element={<Navigate to="/clinic/dashboard" replace />} />
          <Route path="/clinic/dashboard" element={<DoctorProtectedRoute><ShellRoute><ClinicDashboard /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/appointments" element={<DoctorProtectedRoute><ShellRoute><AppointmentsPage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/patients" element={<DoctorProtectedRoute><ShellRoute><PatientsPage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/patients/:patientId" element={<DoctorProtectedRoute><ShellRoute><PatientDetailPage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/notes" element={<DoctorProtectedRoute><ShellRoute><DoctorConsultationNotesPage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/history" element={<DoctorProtectedRoute><ShellRoute><DoctorAppointmentHistoryPage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/schedule" element={<DoctorProtectedRoute><ShellRoute><DoctorSchedulePage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/blog" element={<DoctorProtectedRoute><ShellRoute><ClinicHealthBlogPage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/notifications" element={<DoctorProtectedRoute><ShellRoute><DoctorNotificationsPage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/pharmacy" element={<DoctorProtectedRoute><ShellRoute><ClinicPharmacyPage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/staff" element={<DoctorProtectedRoute><ShellRoute><StaffPage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/services" element={<DoctorProtectedRoute><ShellRoute><ServicesPage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/billing" element={<DoctorProtectedRoute><ShellRoute><ClinicToolsPage page="billing" /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/reports" element={<DoctorProtectedRoute><ShellRoute><ClinicToolsPage page="reports" /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/subscription" element={<DoctorProtectedRoute><ShellRoute><ClinicToolsPage page="subscription" /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/appearance" element={<DoctorProtectedRoute><ShellRoute><ClinicThemeSettingsPage /></ShellRoute></DoctorProtectedRoute>} />
          <Route path="/clinic/theme" element={<Navigate to="/clinic/appearance" replace />} />
          <Route path="/clinic/settings" element={<DoctorProtectedRoute><ShellRoute><ClinicToolsPage page="settings" /></ShellRoute></DoctorProtectedRoute>} />

          {/* Dedicated Patient Portal */}
          <Route path="/patient" element={<Navigate to="/patient/dashboard" replace />} />
          <Route
            path="/patient/dashboard"
            element={
              <PatientProtectedRoute>
                <ShellRoute portal="patient">
                  <PatientDashboard />
                </ShellRoute>
              </PatientProtectedRoute>
            }
          />
          <Route
            path="/patient/appointments"
            element={
              <PatientProtectedRoute>
                <ShellRoute portal="patient">
                  <PatientAppointmentsPage />
                </ShellRoute>
              </PatientProtectedRoute>
            }
          />
          <Route
            path="/patient/book-appointment"
            element={
              <PatientProtectedRoute>
                <ShellRoute portal="patient">
                  <PatientBookAppointmentPage />
                </ShellRoute>
              </PatientProtectedRoute>
            }
          />
          <Route
            path="/patient/prescriptions"
            element={
              <PatientProtectedRoute>
                <ShellRoute portal="patient">
                  <PatientPrescriptionsPage />
                </ShellRoute>
              </PatientProtectedRoute>
            }
          />
          <Route
            path="/patient/medicine-store"
            element={
              <PatientProtectedRoute>
                <ShellRoute portal="patient">
                  <PatientMedicineStorePage />
                </ShellRoute>
              </PatientProtectedRoute>
            }
          />
          <Route
            path="/patient/orders"
            element={
              <PatientProtectedRoute>
                <ShellRoute portal="patient">
                  <PatientMedicineStorePage defaultTab="orders" />
                </ShellRoute>
              </PatientProtectedRoute>
            }
          />
          <Route
            path="/patient/medical-records"
            element={
              <PatientProtectedRoute>
                <ShellRoute portal="patient">
                  <PatientMedicalRecordsPage />
                </ShellRoute>
              </PatientProtectedRoute>
            }
          />
          <Route
            path="/patient/whatsapp"
            element={
              <PatientProtectedRoute>
                <ShellRoute portal="patient">
                  <PatientWhatsAppPage />
                </ShellRoute>
              </PatientProtectedRoute>
            }
          />
          <Route
            path="/patient/billing"
            element={
              <PatientProtectedRoute>
                <ShellRoute portal="patient">
                  <PatientBillingPage />
                </ShellRoute>
              </PatientProtectedRoute>
            }
          />
          <Route
            path="/patient/notifications"
            element={
              <PatientProtectedRoute>
                <ShellRoute portal="patient">
                  <PatientNotificationsPage />
                </ShellRoute>
              </PatientProtectedRoute>
            }
          />
          <Route
            path="/patient/profile"
            element={
              <PatientProtectedRoute>
                <ShellRoute portal="patient">
                  <PatientProfilePage />
                </ShellRoute>
              </PatientProtectedRoute>
            }
          />

          {/* Dedicated Receptionist Portal */}
          <Route path="/receptionist" element={<Navigate to="/receptionist/dashboard" replace />} />
          <Route
            path="/receptionist/dashboard"
            element={
              <ReceptionistProtectedRoute>
                <ShellRoute portal="receptionist">
                  <ReceptionistDashboard />
                </ShellRoute>
              </ReceptionistProtectedRoute>
            }
          />
          <Route
            path="/receptionist/patients"
            element={
              <ReceptionistProtectedRoute>
                <ShellRoute portal="receptionist">
                  <ReceptionistPatientsPage />
                </ShellRoute>
              </ReceptionistProtectedRoute>
            }
          />
          <Route
            path="/receptionist/patients/new"
            element={
              <ReceptionistProtectedRoute>
                <ShellRoute portal="receptionist">
                  <ReceptionistNewPatientPage />
                </ShellRoute>
              </ReceptionistProtectedRoute>
            }
          />
          <Route
            path="/receptionist/appointments"
            element={
              <ReceptionistProtectedRoute>
                <ShellRoute portal="receptionist">
                  <ReceptionistAppointmentsPage />
                </ShellRoute>
              </ReceptionistProtectedRoute>
            }
          />
          <Route
            path="/receptionist/book-appointment"
            element={
              <ReceptionistProtectedRoute>
                <ShellRoute portal="receptionist">
                  <ReceptionistBookAppointmentPage />
                </ShellRoute>
              </ReceptionistProtectedRoute>
            }
          />
          <Route
            path="/receptionist/queue"
            element={
              <ReceptionistProtectedRoute>
                <ShellRoute portal="receptionist">
                  <ReceptionistQueuePage />
                </ShellRoute>
              </ReceptionistProtectedRoute>
            }
          />
          <Route
            path="/receptionist/doctors"
            element={
              <ReceptionistProtectedRoute>
                <ShellRoute portal="receptionist">
                  <ReceptionistDoctorsPage />
                </ShellRoute>
              </ReceptionistProtectedRoute>
            }
          />
          <Route
            path="/receptionist/whatsapp"
            element={
              <ReceptionistProtectedRoute>
                <ShellRoute portal="receptionist">
                  <ReceptionistWhatsAppPage />
                </ShellRoute>
              </ReceptionistProtectedRoute>
            }
          />
          <Route
            path="/receptionist/billing"
            element={
              <ReceptionistProtectedRoute>
                <ShellRoute portal="receptionist">
                  <ReceptionistBillingPage />
                </ShellRoute>
              </ReceptionistProtectedRoute>
            }
          />
          <Route
            path="/receptionist/notifications"
            element={
              <ReceptionistProtectedRoute>
                <ShellRoute portal="receptionist">
                  <ReceptionistNotificationsPage />
                </ShellRoute>
              </ReceptionistProtectedRoute>
            }
          />
          <Route
            path="/receptionist/profile"
            element={
              <ReceptionistProtectedRoute>
                <ShellRoute portal="receptionist">
                  <ReceptionistProfilePage />
                </ShellRoute>
              </ReceptionistProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toast />
    </>
  )
}
