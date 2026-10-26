import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { WorkspaceLayout } from './components/layout/WorkspaceLayout';

// Public Pages
import { HomePage } from './features/public-website/HomePage';
import { FeaturesPage } from './features/public-website/FeaturesPage';
import { SolutionsPage } from './features/public-website/SolutionsPage';
import { PricingPage } from './features/public-website/PricingPage';
import { FAQPage } from './features/public-website/FAQPage';
import { AboutPage } from './features/public-website/AboutPage';
import { ContactPage } from './features/public-website/ContactPage';
import { PrivacyPage } from './features/public-website/PrivacyPage';
import { TermsPage } from './features/public-website/TermsPage';

// Clinic Directory & Booking
import { ClinicDirectoryPage } from './features/clinic-directory/ClinicDirectoryPage';
import { ClinicDetailPage } from './features/clinic-directory/ClinicDetailPage';
import { GuestBookingPage } from './features/clinic-directory/GuestBookingPage';

// Verification
import { PrescriptionVerificationPage } from './features/qr-verification/PrescriptionVerificationPage';

// Authentication & Onboarding Suite (Section 3)
import { MainLoginPage } from './features/auth/MainLoginPage';
import { DoctorLoginPage } from './features/auth/DoctorLoginPage';
import { ReceptionistLoginPage } from './features/auth/ReceptionistLoginPage';
import { SignupPage } from './features/auth/SignupPage';
import { PatientRegisterPage } from './features/auth/PatientRegisterPage';
import { VerifyEmailPage } from './features/auth/VerifyEmailPage';
import { PatientOnboardingPage } from './features/auth/PatientOnboardingPage';
import { ForgotPasswordPage } from './features/auth/ForgotPasswordPage';
import { DemoAccessPage } from './features/auth/DemoAccessPage';
import { AccessDeniedPage } from './features/auth/AccessDeniedPage';
import { RegisterPage } from './features/authentication/RegisterPage';

// Role 1: SaaS Superadmin
import { PlatformDashboardPage } from './features/super-admin/PlatformDashboardPage';
import { PlatformClinicsPage } from './features/super-admin/PlatformClinicsPage';
import { PlatformSubscriptionsPage } from './features/super-admin/PlatformSubscriptionsPage';
import { PlatformPlansPage } from './features/super-admin/PlatformPlansPage';
import { PlatformBillingPage } from './features/super-admin/PlatformBillingPage';
import { PlatformSupportPage } from './features/super-admin/PlatformSupportPage';
import { PlatformMonitoringPage } from './features/super-admin/PlatformMonitoringPage';
import { PlatformReportsPage } from './features/super-admin/PlatformReportsPage';
import { PlatformActivityPage } from './features/super-admin/PlatformActivityPage';
import { PlatformSettingsPage } from './features/super-admin/PlatformSettingsPage';
import { PlatformRoleMatrixPage } from './features/super-admin/PlatformRoleMatrixPage';
import { EmailManagementPage } from './features/super-admin/email/EmailManagementPage';

// SaaS Corporate Finance Suite (Superadmin Only)
import { SaaSFinanceOverviewPage } from './features/super-admin/finance/SaaSFinanceOverviewPage';
import { SaaSRevenuePage } from './features/super-admin/finance/SaaSRevenuePage';
import { SaaSInvoicesPage } from './features/super-admin/finance/SaaSInvoicesPage';
import { SaaSPaymentsPage } from './features/super-admin/finance/SaaSPaymentsPage';
import { SaaSRefundsPage } from './features/super-admin/finance/SaaSRefundsPage';
import { SaaSExpensesPage } from './features/super-admin/finance/SaaSExpensesPage';
import { SaaSReportsPage } from './features/super-admin/finance/SaaSReportsPage';

// Role 2: Clinic Doctor/Admin
import { ClinicDashboardPage } from './features/clinic-admin/ClinicDashboardPage';
import { ClinicQueuePage } from './features/clinic-admin/ClinicQueuePage';
import { ClinicAppointmentsPage } from './features/clinic-admin/ClinicAppointmentsPage';
import { ClinicPatientsPage } from './features/clinic-admin/ClinicPatientsPage';
import { ClinicPatientDetailPage } from './features/clinic-admin/ClinicPatientDetailPage';
import { ClinicDoctorsPage } from './features/clinic-admin/ClinicDoctorsPage';
import { ClinicStaffPage } from './features/clinic-admin/ClinicStaffPage';
import { ClinicReceptionistsPage } from './features/clinic-admin/ClinicReceptionistsPage';
import { ClinicFeedbackPage } from './features/clinic-admin/ClinicFeedbackPage';
import { ClinicServicesPage } from './features/clinic-admin/ClinicServicesPage';
import { ClinicPrescriptionsPage } from './features/clinic-admin/ClinicPrescriptionsPage';
import { ClinicPrescriptionNewPage } from './features/clinic-admin/ClinicPrescriptionNewPage';
import { ClinicPrescriptionDetailPage } from './features/clinic-admin/ClinicPrescriptionDetailPage';
import { ClinicBranchesPage } from './features/clinic-admin/ClinicBranchesPage';
import { ClinicBillingPage } from './features/clinic-admin/ClinicBillingPage';
import { ClinicExpensesPage } from './features/clinic-admin/ClinicExpensesPage';
import { ClinicInventoryPage } from './features/clinic-admin/ClinicInventoryPage';
import { ClinicSuppliersPage } from './features/clinic-admin/ClinicSuppliersPage';
import { ClinicReportsPage } from './features/clinic-admin/ClinicReportsPage';
import { ClinicSubscriptionPage } from './features/clinic-admin/ClinicSubscriptionPage';
import { ClinicSupportPage } from './features/clinic-admin/ClinicSupportPage';
import { ClinicSettingsPage } from './features/clinic-admin/ClinicSettingsPage';
import { DoctorConsultationPage } from './features/doctor/DoctorConsultationPage';
import { DoctorSchedulePage } from './features/doctor/DoctorSchedulePage';

// Clinic Operational Finance Suite (Doctor/Admin Only)
import { ClinicFinanceOverviewPage } from './features/clinic-admin/finance/ClinicFinanceOverviewPage';
import { ClinicInvoicesPage as ClinicFinanceInvoicesPage } from './features/clinic-admin/finance/ClinicInvoicesPage';
import { ClinicPaymentsPage as ClinicFinancePaymentsPage } from './features/clinic-admin/finance/ClinicPaymentsPage';
import { ClinicRefundsPage as ClinicFinanceRefundsPage } from './features/clinic-admin/finance/ClinicRefundsPage';
import { ClinicExpensesPage as ClinicFinanceExpensesPage } from './features/clinic-admin/finance/ClinicExpensesPage';
import { ClinicSuppliersFinancePage } from './features/clinic-admin/finance/ClinicSuppliersFinancePage';
import { ClinicReportsFinancePage } from './features/clinic-admin/finance/ClinicReportsFinancePage';

// Inventory & Billing Module Pages (integrated under Clinic Doctor/Admin & Receptionist)
import { InventoryCatalogPage } from './features/inventory/InventoryCatalogPage';
import { InventoryMovementsPage } from './features/inventory/InventoryMovementsPage';
import { InventoryExpiryPage } from './features/inventory/InventoryExpiryPage';
import { InventoryRequestsPage } from './features/inventory/InventoryRequestsPage';
import { InventorySuppliersPage } from './features/inventory/InventorySuppliersPage';
import { InventoryOrdersPage } from './features/inventory/InventoryOrdersPage';
import { AccountsInvoicesPage } from './features/accounts/AccountsInvoicesPage';
import { AccountsPaymentsPage } from './features/accounts/AccountsPaymentsPage';
import { AccountsExpensesPage } from './features/accounts/AccountsExpensesPage';
import { AccountsReportsPage } from './features/accounts/AccountsReportsPage';

// Role 3: Clinic Receptionist/Manager
import { ReceptionDashboardPage } from './features/receptionist/ReceptionDashboardPage';
import { ReceptionRequestsPage } from './features/receptionist/ReceptionRequestsPage';
import { ReceptionQueuePage } from './features/receptionist/ReceptionQueuePage';
import { ReceptionAppointmentsPage } from './features/receptionist/ReceptionAppointmentsPage';
import { ReceptionNewAppointmentPage } from './features/receptionist/ReceptionNewAppointmentPage';
import { ReceptionPatientsPage } from './features/receptionist/ReceptionPatientsPage';
import { ReceptionNewPatientPage } from './features/receptionist/ReceptionNewPatientPage';
import { ReceptionWalkInsPage } from './features/receptionist/ReceptionWalkInsPage';
import { ReceptionFollowUpsPage } from './features/receptionist/ReceptionFollowUpsPage';
import { ReceptionFeedbackPage } from './features/receptionist/ReceptionFeedbackPage';
import { ReceptionTasksPage } from './features/receptionist/ReceptionTasksPage';
import { ReceptionInventoryPage } from './features/receptionist/ReceptionInventoryPage';
import { ReceptionReportsPage } from './features/receptionist/ReceptionReportsPage';

// Role 4: Patient Portal
import { PatientDashboardPage } from './features/patient-portal/PatientDashboardPage';
import { PatientClinicsPage } from './features/patient-portal/PatientClinicsPage';
import { PatientClinicDetailPage } from './features/patient-portal/PatientClinicDetailPage';
import { PatientDoctorsPage } from './features/patient-portal/PatientDoctorsPage';
import { PatientDoctorDetailPage } from './features/patient-portal/PatientDoctorDetailPage';
import { PatientAppointmentsPage } from './features/patient-portal/PatientAppointmentsPage';
import { PatientRequestsPage } from './features/patient-portal/PatientRequestsPage';
import { PatientAppointmentDetailPage } from './features/patient-portal/PatientAppointmentDetailPage';
import { PatientBookPage } from './features/patient-portal/PatientBookPage';
import { PatientRecordsPage } from './features/patient-portal/PatientRecordsPage';
import { PatientPrescriptionsPage } from './features/patient-portal/PatientPrescriptionsPage';
import { PatientBillingPage } from './features/patient-portal/PatientBillingPage';
import { PatientNotificationsPage } from './features/patient-portal/PatientNotificationsPage';
import { PatientFeedbackPage } from './features/patient-portal/PatientFeedbackPage';
import { PatientProfilePage } from './features/patient-portal/PatientProfilePage';

// 404
import { ArrowRight, Activity } from 'lucide-react';
import { Button } from './components/ui/Button';

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-2xl shadow-sm">
        <Activity className="w-8 h-8" />
      </div>
      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">404 · Page Not Found</span>
      <h1 className="text-3xl font-extrabold text-slate-900">This clinical route does not exist</h1>
      <p className="text-xs text-slate-500 max-w-sm">
        The link you followed may be broken or the workspace view may have been moved.
      </p>
      <div className="pt-2">
        <Link to="/">
          <Button variant="primary" size="md">
            Return to Homepage <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Marketing & Guest Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/clinics" element={<ClinicDirectoryPage />} />
              <Route path="/clinics/:clinicSlug" element={<ClinicDetailPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/book-appointment" element={<GuestBookingPage />} />
              <Route path="/verify-prescription/:verificationId" element={<PrescriptionVerificationPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/register" element={<Navigate to="/signup" replace />} />
              <Route path="/register/clinic" element={<RegisterPage />} />
            </Route>

            {/* Authentication & Onboarding Routes (Section 3) */}
            <Route path="/login" element={<MainLoginPage />} />
            <Route path="/login/doctor" element={<DoctorLoginPage />} />
            <Route path="/login/receptionist" element={<ReceptionistLoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/register/patient" element={<PatientRegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/onboarding/patient" element={<PatientOnboardingPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            <Route path="/demo-access" element={<DemoAccessPage />} />

            {/* Role 1: SaaS Superadmin Workspace Routes (Protected) */}
            <Route
              path="/superadmin"
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'super_admin']}>
                  <WorkspaceLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/superadmin/dashboard" replace />} />
              <Route path="dashboard" element={<PlatformDashboardPage />} />
              <Route path="clinics" element={<PlatformClinicsPage />} />
              <Route path="clinics/:clinicId" element={<PlatformClinicsPage />} />
              <Route path="plans" element={<PlatformPlansPage />} />
              <Route path="subscriptions" element={<PlatformSubscriptionsPage />} />
              <Route path="billing" element={<PlatformBillingPage />} />
              <Route path="revenue" element={<PlatformReportsPage />} />
              {/* SaaS Corporate Finance Suite (Section 7.1) */}
              <Route path="finance" element={<Navigate to="/superadmin/finance/overview" replace />} />
              <Route path="finance/overview" element={<SaaSFinanceOverviewPage />} />
              <Route path="finance/revenue" element={<SaaSRevenuePage />} />
              <Route path="finance/invoices" element={<SaaSInvoicesPage />} />
              <Route path="finance/payments" element={<SaaSPaymentsPage />} />
              <Route path="finance/refunds" element={<SaaSRefundsPage />} />
              <Route path="finance/expenses" element={<SaaSExpensesPage />} />
              <Route path="finance/reports" element={<SaaSReportsPage />} />
              <Route path="support" element={<PlatformSupportPage />} />
              <Route path="role-matrix" element={<PlatformRoleMatrixPage />} />
              <Route path="email" element={<EmailManagementPage />} />
              <Route path="email/:tab" element={<EmailManagementPage />} />
              <Route path="platform" element={<PlatformMonitoringPage />} />
              <Route path="activity" element={<PlatformActivityPage />} />
              <Route path="settings" element={<PlatformSettingsPage />} />
            </Route>

            {/* Backward compatibility redirects for /platform/* */}
            <Route path="/platform" element={<Navigate to="/superadmin/dashboard" replace />} />
            <Route path="/platform/*" element={<Navigate to="/superadmin/dashboard" replace />} />

            {/* Role 2: Clinic Doctor/Admin Workspace Routes (Protected) */}
            <Route
              path="/clinic"
              element={
                <ProtectedRoute allowedRoles={['doctor_admin', 'clinic_admin']}>
                  <WorkspaceLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/clinic/dashboard" replace />} />
              <Route path="dashboard" element={<ClinicDashboardPage />} />
              <Route path="appointments" element={<ClinicAppointmentsPage />} />
              <Route path="queue" element={<ClinicQueuePage />} />
              <Route path="patients" element={<ClinicPatientsPage />} />
              <Route path="patients/:patientId" element={<ClinicPatientDetailPage />} />
              <Route path="consultations" element={<DoctorConsultationPage />} />
              <Route path="consultations/:appointmentId" element={<DoctorConsultationPage />} />
              <Route path="prescriptions" element={<ClinicPrescriptionsPage />} />
              <Route path="prescriptions/new" element={<ClinicPrescriptionNewPage />} />
              <Route path="prescriptions/:prescriptionId" element={<ClinicPrescriptionDetailPage />} />
              <Route path="doctors" element={<ClinicDoctorsPage />} />
              <Route path="staff" element={<ClinicStaffPage />} />
              <Route path="receptionists" element={<ClinicReceptionistsPage />} />
              <Route path="schedules" element={<DoctorSchedulePage />} />
              <Route path="inventory" element={<InventoryCatalogPage />} />
              <Route path="inventory/movements" element={<InventoryMovementsPage />} />
              <Route path="inventory/expiry" element={<InventoryExpiryPage />} />
              <Route path="inventory/requests" element={<InventoryRequestsPage />} />
              <Route path="inventory/suppliers" element={<InventorySuppliersPage />} />
              {/* Clinic Operational Finance Suite (Section 7.2) */}
              <Route path="finance" element={<Navigate to="/clinic/finance/overview" replace />} />
              <Route path="finance/overview" element={<ClinicFinanceOverviewPage />} />
              <Route path="finance/invoices" element={<ClinicFinanceInvoicesPage />} />
              <Route path="finance/payments" element={<ClinicFinancePaymentsPage />} />
              <Route path="finance/refunds" element={<ClinicFinanceRefundsPage />} />
              <Route path="finance/expenses" element={<ClinicFinanceExpensesPage />} />
              <Route path="finance/suppliers" element={<ClinicSuppliersFinancePage />} />
              <Route path="finance/reports" element={<ClinicReportsFinancePage />} />
              {/* Clinic Billing Aliases */}
              <Route path="billing" element={<ClinicFinanceInvoicesPage />} />
              <Route path="billing/invoices" element={<ClinicFinanceInvoicesPage />} />
              <Route path="billing/payments" element={<ClinicFinancePaymentsPage />} />
              <Route path="billing/expenses" element={<ClinicFinanceExpensesPage />} />
              <Route path="services" element={<ClinicServicesPage />} />
              <Route path="branches" element={<ClinicBranchesPage />} />
              <Route path="feedback" element={<ClinicFeedbackPage />} />
              <Route path="reports" element={<ClinicReportsPage />} />
              <Route path="subscription" element={<ClinicSubscriptionPage />} />
              <Route path="support" element={<ClinicSupportPage />} />
              <Route path="settings" element={<ClinicSettingsPage />} />
            </Route>

            {/* Backward compatibility redirects for /doctor/* */}
            <Route path="/doctor" element={<Navigate to="/clinic/consultations" replace />} />
            <Route path="/doctor/*" element={<Navigate to="/clinic/consultations" replace />} />

            {/* Role 3: Clinic Receptionist/Manager Workspace Routes (Protected) */}
            <Route
              path="/reception"
              element={
                <ProtectedRoute allowedRoles={['receptionist_manager', 'receptionist']}>
                  <WorkspaceLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/reception/dashboard" replace />} />
              <Route path="dashboard" element={<ReceptionDashboardPage />} />
              <Route path="requests" element={<ReceptionRequestsPage />} />
              <Route path="appointments" element={<ReceptionAppointmentsPage />} />
              <Route path="appointments/new" element={<ReceptionNewAppointmentPage />} />
              <Route path="walk-ins" element={<ReceptionWalkInsPage />} />
              <Route path="queue" element={<ReceptionQueuePage />} />
              <Route path="patients" element={<ReceptionPatientsPage />} />
              <Route path="patients/new" element={<ReceptionNewPatientPage />} />
              <Route path="schedule" element={<DoctorSchedulePage />} />
              <Route path="calendar" element={<DoctorSchedulePage />} />
              <Route path="communication" element={<ReceptionFollowUpsPage />} />
              <Route path="follow-ups" element={<ReceptionFollowUpsPage />} />
              <Route path="stock-requests" element={<InventoryRequestsPage />} />
              <Route path="billing" element={<AccountsInvoicesPage />} />
              <Route path="support" element={<ClinicSupportPage />} />
              <Route path="feedback" element={<ReceptionFeedbackPage />} />
              <Route path="tasks" element={<ReceptionTasksPage />} />
              <Route path="inventory" element={<ReceptionInventoryPage />} />
              <Route path="reports" element={<ReceptionReportsPage />} />
            </Route>

            {/* Backward compatibility redirects for /inventory/* and /accounts/* */}
            <Route path="/inventory" element={<Navigate to="/clinic/inventory" replace />} />
            <Route path="/inventory/*" element={<Navigate to="/clinic/inventory" replace />} />
            <Route path="/accounts" element={<Navigate to="/clinic/billing" replace />} />
            <Route path="/accounts/*" element={<Navigate to="/clinic/billing" replace />} />

            {/* Role 4: Patient Portal Workspace Routes (Protected) */}
            <Route
              path="/patient"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <WorkspaceLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/patient/dashboard" replace />} />
              <Route path="dashboard" element={<PatientDashboardPage />} />
              <Route path="clinics" element={<PatientClinicsPage />} />
              <Route path="clinics/:clinicId" element={<PatientClinicDetailPage />} />
              <Route path="doctors" element={<PatientDoctorsPage />} />
              <Route path="doctors/:doctorId" element={<PatientDoctorDetailPage />} />
              <Route path="appointments" element={<PatientAppointmentsPage />} />
              <Route path="appointments/requests" element={<PatientRequestsPage />} />
              <Route path="appointments/book" element={<PatientBookPage />} />
              <Route path="appointments/:appointmentId" element={<PatientAppointmentDetailPage />} />
              <Route path="records" element={<PatientRecordsPage />} />
              <Route path="prescriptions" element={<PatientPrescriptionsPage />} />
              <Route path="bills" element={<PatientBillingPage />} />
              <Route path="billing" element={<PatientBillingPage />} />
              <Route path="notifications" element={<PatientNotificationsPage />} />
              <Route path="feedback" element={<PatientFeedbackPage />} />
              <Route path="profile" element={<PatientProfilePage />} />
            </Route>

            {/* Fallback Route */}
            <Route element={<PublicLayout />}>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
 