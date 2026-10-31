import React from 'react';
import { AppProvider as StoreProvider } from './Store';
// Health Library & Blog Pages (from my-work)
import { HealthLibraryPage, HealthArticleDetailPage, ClinicHealthBlogPage } from './HealthLibraryPages';
// Clinic Pages & Extensions (from my-work)
import {
  ClinicThemeSettingsPage,
  ClinicPharmacyPage,
  DoctorConsultationNotesPage,
  DoctorAppointmentHistoryPage,
  DoctorNotificationsPage
} from './ClinicPages';
import { ReceptionistWhatsAppPage } from './ReceptionistPages';
import { PatientWhatsAppPage, PatientMedicineStorePage } from './PatientPages';
import { DoctorProtectedRoute as MyWorkDoctorProtectedRoute } from './components';

// Patient Portal & Public Clinic Additions (from Abhishek changes)
import { PatientEmergencyPage } from './features/patient-portal/PatientEmergencyPage';
import { PatientHealthEducationPage } from './features/patient-portal/PatientHealthEducationPage';
import { PatientPharmacyPage } from './features/patient-portal/PatientPharmacyPage';
import { PatientFamilyPage } from './features/patient-portal/PatientFamilyPage';
import { PatientRemindersPage } from './features/patient-portal/PatientRemindersPage';
import { PatientPackagesPage } from './features/patient-portal/PatientPackagesPage';
import { PatientQueriesPage } from './features/patient-portal/PatientQueriesPage';
import { ClinicPatientRegisterPage } from './features/public-clinic/ClinicPatientRegisterPage';
import { ClinicPatientSignInPage } from './features/public-clinic/ClinicPatientSignInPage';

import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ReferralProvider } from './context/ReferralContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';
import { CommandPalette, useCommandPalette } from './components/ui/CommandPalette';
import { OfflineBanner } from './components/ui/OfflineBanner';
import { RoleProductTour } from './components/ui/RoleProductTour';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import {
  ReferralDashboardPage,
  AffiliatePartnersPage,
  ReferralCodesPage,
  ReferralTrackingPage,
  CommissionRulesPage,
  CommissionLedgerPage,
  PayoutManagementPage,
  ReferralReportsPage,
  AffiliatePortalPreviewPage
} from './features/super-admin/referrals';
import { ClinicReferralsPage } from './features/clinic-admin/ClinicReferralsPage';


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
import { FindDoctorPage } from './features/public-website/FindDoctorPage';
import { BookDoctorPage } from './features/public-website/BookDoctorPage';
import { ClinicDirectoryPage } from './features/clinic-directory/ClinicDirectoryPage';
import { ClinicDetailPage } from './features/clinic-directory/ClinicDetailPage';
import { GuestBookingPage } from './features/clinic-directory/GuestBookingPage';

// Verification
import { PrescriptionVerificationPage } from './features/qr-verification/PrescriptionVerificationPage';

// Clinic Website Builder & Public Clinic Site
import { WebsiteBuilderPage } from './features/website-builder/WebsiteBuilderPage';
import { PublicClinicLayout } from './features/public-clinic/PublicClinicLayout';
import { ClinicPublicHomePage } from './features/public-clinic/ClinicPublicHomePage';
import { ClinicPublicAboutPage } from './features/public-clinic/ClinicPublicAboutPage';
import { ClinicPublicDoctorsPage } from './features/public-clinic/ClinicPublicDoctorsPage';
import { ClinicPublicServicesPage } from './features/public-clinic/ClinicPublicServicesPage';
import { ClinicPublicBookingPage } from './features/public-clinic/ClinicPublicBookingPage';
import { ClinicPublicContactPage } from './features/public-clinic/ClinicPublicContactPage';

// Onboarding & Checkout
import { ClinicOnboardingWizard } from './features/onboarding/ClinicOnboardingWizard';
import { SubscriptionCheckoutPage } from './features/checkout/SubscriptionCheckoutPage';

// Authentication & Onboarding Suite (Section 3)
import { MainLoginPage } from './features/auth/MainLoginPage';
import { DoctorLoginPage } from './features/auth/DoctorLoginPage';
import { ReceptionistLoginPage } from './features/auth/ReceptionistLoginPage';
import { PatientLoginPage } from './features/auth/PatientLoginPage';
import { SignupPage } from './features/auth/SignupPage';
import { PatientRegisterPage } from './features/auth/PatientRegisterPage';
import { VerifyEmailPage } from './features/auth/VerifyEmailPage';
import { PatientOnboardingPage } from './features/auth/PatientOnboardingPage';
import { ForgotPasswordPage } from './features/auth/ForgotPasswordPage';
import { DemoAccessPage } from './features/auth/DemoAccessPage';
import { AccessDeniedPage } from './features/auth/AccessDeniedPage';
import { RegisterPage } from './features/authentication/RegisterPage';

// Role 1: SaaS Superadmin
import { SuperAdminLoginPage } from './features/super-admin/SuperAdminLoginPage';
import { SuperAdminLayout } from './layouts/SuperAdminLayout';
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
import { MyWebsiteHubPage } from './features/clinic-admin/MyWebsiteHubPage';
import { CertificatesPage } from './features/clinic-admin/CertificatesPage';
import { VirtualConsultingPage } from './features/clinic-admin/VirtualConsultingPage';
import { TelemedicinePage } from './features/clinic-admin/TelemedicinePage';
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
import { PatientVirtualConsultingPage } from './features/patient-portal/PatientVirtualConsultingPage';
import { PatientRequestsPage } from './features/patient-portal/PatientRequestsPage';
import { PatientAppointmentDetailPage } from './features/patient-portal/PatientAppointmentDetailPage';
import { PatientBookPage } from './features/patient-portal/PatientBookPage';
import { PatientRecordsPage } from './features/patient-portal/PatientRecordsPage';
import { PatientPrescriptionsPage } from './features/patient-portal/PatientPrescriptionsPage';
import { PatientBillingPage } from './features/patient-portal/PatientBillingPage';
import { PatientReceiptsPage } from './features/patient-portal/PatientReceiptsPage';
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

function GlobalCommandPalette() {
  const { isOpen, close } = useCommandPalette();
  return <CommandPalette isOpen={isOpen} onClose={close} />;
}


// Route protection compatibility alias: DoctorProtectedRoute
const DoctorProtectedRoute = MyWorkDoctorProtectedRoute;
export default function App() {
  return (
    <ErrorBoundary>
    <StoreProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <ReferralProvider>
              <ToastProvider>
                <LanguageProvider>
                  <BrowserRouter>
                    <OfflineBanner />
                    <GlobalCommandPalette />
                    <RoleProductTour />
                    <Routes>
            {/* Public Marketing & Guest Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/clinics" element={<ClinicDirectoryPage />} />
              <Route path="/clinics/:clinicSlug" element={<ClinicDetailPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/health-library" element={<HealthLibraryPage />} />
              <Route path="/health-library/:slug" element={<HealthArticleDetailPage />} />
              <Route path="/blog" element={<Navigate to="/health-library" replace />} />
              <Route path="/blog/:slug" element={<HealthArticleDetailPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/doctors" element={<FindDoctorPage />} />
              <Route path="/book-doctor/:doctorId" element={<BookDoctorPage />} />
              <Route path="/book-appointment" element={<GuestBookingPage />} />
              <Route path="/verify-prescription/:verificationId" element={<PrescriptionVerificationPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/register" element={<Navigate to="/onboarding" replace />} />
              <Route path="/register/clinic" element={<RegisterPage />} />
            </Route>

            {/* Public Clinic Multi-Page Website */}
            <Route path="/clinic/:clinicSlug" element={<PublicClinicLayout />}>
              <Route index element={<ClinicPublicHomePage />} />
              <Route path="about" element={<ClinicPublicAboutPage />} />
              <Route path="doctors" element={<ClinicPublicDoctorsPage />} />
              <Route path="services" element={<ClinicPublicServicesPage />} />
              <Route path="book-appointment" element={<ClinicPublicBookingPage />} />
              <Route path="contact" element={<ClinicPublicContactPage />} />
              <Route path="register" element={<ClinicPatientRegisterPage />} />
              <Route path="login" element={<ClinicPatientSignInPage />} />
            </Route>

            {/* Authentication & Onboarding Routes */}
            <Route path="/login" element={<MainLoginPage />} />
            <Route path="/login/doctor" element={<DoctorLoginPage />} />
            <Route path="/login/receptionist" element={<ReceptionistLoginPage />} />
            <Route path="/login/patient" element={<PatientLoginPage />} />
            <Route path="/login/superadmin" element={<SuperAdminLoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/onboarding" element={<ClinicOnboardingWizard />} />
            <Route path="/checkout" element={<SubscriptionCheckoutPage />} />
            <Route path="/register/patient" element={<PatientRegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/onboarding/patient" element={<PatientOnboardingPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            <Route path="/demo-access" element={<DemoAccessPage />} />
            <Route path="/demo" element={<Navigate to="/demo-access" replace />} />
            <Route path="/demo-accounts" element={<Navigate to="/demo-access" replace />} />

            {/* Role 1: SaaS Superadmin Login Route */}
            <Route path="/superadmin" element={<SuperAdminLoginPage />} />

            {/* Backward compatibility redirects for /super-admin/* */}
            <Route path="/super-admin" element={<Navigate to="/superadmin/dashboard" replace />} />
            <Route path="/super-admin/dashboard" element={<Navigate to="/superadmin/dashboard" replace />} />
            <Route path="/super-admin/*" element={<Navigate to="/superadmin/dashboard" replace />} />

            {/* Role 1: SaaS Superadmin Workspace Routes (Protected by ProtectedRoute using SuperAdminLayout) */}
            <Route
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'super_admin']}>
                  <SuperAdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/superadmin/dashboard" element={<PlatformDashboardPage />} />
              <Route path="/superadmin/clinics" element={<PlatformClinicsPage />} />
              <Route path="/superadmin/clinics/:clinicId" element={<PlatformClinicsPage />} />
              <Route path="/superadmin/subscriptions" element={<PlatformSubscriptionsPage />} />
              <Route path="/superadmin/plans" element={<PlatformPlansPage />} />
              <Route path="/superadmin/users" element={<PlatformRoleMatrixPage />} />
              <Route path="/superadmin/analytics" element={<PlatformReportsPage />} />
              <Route path="/superadmin/settings" element={<PlatformSettingsPage />} />
              <Route path="/superadmin/billing" element={<PlatformBillingPage />} />
              <Route path="/superadmin/revenue" element={<PlatformReportsPage />} />
              {/* SaaS Corporate Finance Suite */}
              <Route path="/superadmin/finance" element={<Navigate to="/superadmin/finance/overview" replace />} />
              <Route path="/superadmin/finance/overview" element={<SaaSFinanceOverviewPage />} />
              <Route path="/superadmin/finance/revenue" element={<SaaSRevenuePage />} />
              <Route path="/superadmin/finance/invoices" element={<SaaSInvoicesPage />} />
              <Route path="/superadmin/finance/payments" element={<SaaSPaymentsPage />} />
              <Route path="/superadmin/finance/refunds" element={<SaaSRefundsPage />} />
              <Route path="/superadmin/finance/expenses" element={<SaaSExpensesPage />} />
              <Route path="/superadmin/finance/reports" element={<SaaSReportsPage />} />
              <Route path="/superadmin/support" element={<PlatformSupportPage />} />
              <Route path="/superadmin/payments" element={<SaaSPaymentsPage />} />
              <Route path="/superadmin/role-matrix" element={<PlatformRoleMatrixPage />} />
              <Route path="/superadmin/email" element={<EmailManagementPage />} />
              <Route path="/superadmin/email/:tab" element={<EmailManagementPage />} />
              <Route path="/superadmin/platform" element={<PlatformMonitoringPage />} />
              <Route path="/superadmin/activity" element={<PlatformActivityPage />} />
              {/* Referral & Affiliates Suite */}
              <Route path="/superadmin/referrals" element={<Navigate to="/superadmin/referrals/dashboard" replace />} />
              <Route path="/superadmin/referrals/dashboard" element={<ReferralDashboardPage />} />
              <Route path="/superadmin/referrals/partners" element={<AffiliatePartnersPage />} />
              <Route path="/superadmin/referrals/codes" element={<ReferralCodesPage />} />
              <Route path="/superadmin/referrals/tracking" element={<ReferralTrackingPage />} />
              <Route path="/superadmin/referrals/rules" element={<CommissionRulesPage />} />
              <Route path="/superadmin/referrals/ledger" element={<CommissionLedgerPage />} />
              <Route path="/superadmin/referrals/payouts" element={<PayoutManagementPage />} />
              <Route path="/superadmin/referrals/reports" element={<ReferralReportsPage />} />
              <Route path="/superadmin/referrals/preview" element={<AffiliatePortalPreviewPage />} />

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
              <Route path="appearance" element={<ClinicThemeSettingsPage />} />
              <Route path="theme" element={<Navigate to="/clinic/appearance" replace />} />
              <Route path="pharmacy" element={<ClinicPharmacyPage />} />
              <Route path="notes" element={<DoctorConsultationNotesPage />} />
              <Route path="history" element={<DoctorAppointmentHistoryPage />} />
              <Route path="notifications" element={<DoctorNotificationsPage />} />
              <Route path="blog" element={<ClinicHealthBlogPage />} />
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
              <Route path="referrals" element={<ClinicReferralsPage />} />
              <Route path="certificates" element={<CertificatesPage />} />
              <Route path="virtual-consulting" element={<VirtualConsultingPage />} />
              <Route path="telemedicine" element={<Navigate to="/clinic/virtual-consulting" replace />} />
              <Route path="my-website" element={<MyWebsiteHubPage />} />
              <Route path="website" element={<MyWebsiteHubPage />} />
              <Route path="whatsapp" element={<Navigate to="/clinic/virtual-consulting" replace />} />
              <Route path="prescriptions" element={<ClinicPrescriptionsPage />} />
              <Route path="feedback" element={<ClinicFeedbackPage />} />
              <Route path="website-builder" element={<WebsiteBuilderPage />} />
              <Route path="website-preview" element={<WebsiteBuilderPage />} />
              <Route path="website-settings" element={<ClinicSettingsPage />} />
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
              <Route path="whatsapp" element={<ReceptionistWhatsAppPage />} />
              <Route path="stock-requests" element={<InventoryRequestsPage />} />
              <Route path="billing" element={<AccountsInvoicesPage />} />
              <Route path="support" element={<ClinicSupportPage />} />
              <Route path="feedback" element={<ReceptionFeedbackPage />} />
              <Route path="tasks" element={<ReceptionTasksPage />} />
              <Route path="inventory" element={<ReceptionInventoryPage />} />
              <Route path="reports" element={<ReceptionReportsPage />} />
            </Route>

            {/* Role 2 & 3: Standard /app Unified Workspace Routes */}
            <Route
              path="/app/frontdesk"
              element={
                <ProtectedRoute allowedRoles={['receptionist_manager', 'receptionist', 'clinic_admin', 'doctor_admin']}>
                  <WorkspaceLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/app/frontdesk/dashboard" replace />} />
              <Route path="dashboard" element={<ReceptionDashboardPage />} />
              <Route path="registration" element={<ReceptionNewPatientPage />} />
              <Route path="appointments" element={<ReceptionAppointmentsPage />} />
              <Route path="patients" element={<ReceptionPatientsPage />} />
              <Route path="calendar" element={<DoctorSchedulePage />} />
              <Route path="check-in" element={<ReceptionQueuePage />} />
              <Route path="invoices" element={<AccountsInvoicesPage />} />
              <Route path="payments" element={<AccountsInvoicesPage />} />
              <Route path="billing" element={<AccountsInvoicesPage />} />
            </Route>

            <Route
              path="/app"
              element={
                <ProtectedRoute allowedRoles={['doctor_admin', 'clinic_admin']}>
                  <WorkspaceLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<ClinicDashboardPage />} />
              <Route path="appointments" element={<ClinicAppointmentsPage />} />
              <Route path="patients" element={<ClinicPatientsPage />} />
              <Route path="patients/:patientId" element={<ClinicPatientDetailPage />} />
              <Route path="consultations" element={<DoctorConsultationPage />} />
              <Route path="consultations/:appointmentId" element={<DoctorConsultationPage />} />
              <Route path="doctors" element={<ClinicDoctorsPage />} />
              <Route path="services" element={<ClinicServicesPage />} />
              <Route path="schedule" element={<DoctorSchedulePage />} />
              <Route path="schedules" element={<DoctorSchedulePage />} />
              <Route path="prescriptions" element={<ClinicPrescriptionsPage />} />
              <Route path="prescriptions/new" element={<ClinicPrescriptionNewPage />} />
              <Route path="prescriptions/:prescriptionId" element={<ClinicPrescriptionDetailPage />} />
              <Route path="invoices" element={<ClinicFinanceInvoicesPage />} />
              <Route path="invoices/:invoiceId" element={<ClinicFinanceInvoicesPage />} />
              <Route path="receipts" element={<ClinicFinanceInvoicesPage />} />
              <Route path="certificates" element={<CertificatesPage />} />
              <Route path="virtual-consulting" element={<VirtualConsultingPage />} />
              <Route path="telemedicine" element={<Navigate to="/app/virtual-consulting" replace />} />
              <Route path="my-website" element={<MyWebsiteHubPage />} />
              <Route path="website" element={<MyWebsiteHubPage />} />
              <Route path="feedback" element={<ClinicFeedbackPage />} />
              <Route path="website-builder" element={<WebsiteBuilderPage />} />
              <Route path="website-preview" element={<WebsiteBuilderPage />} />
              <Route path="website-settings" element={<ClinicSettingsPage />} />
              <Route path="staff" element={<ClinicStaffPage />} />
              <Route path="billing" element={<ClinicFinanceInvoicesPage />} />
              <Route path="subscription" element={<ClinicSubscriptionPage />} />
              <Route path="reports" element={<ClinicReportsPage />} />
              <Route path="settings" element={<ClinicSettingsPage />} />
            </Route>

            
            {/* Direct Integration Routes (Full-path matching for tests & direct deep-links) */}
            <Route path="/clinic/blog" element={<ProtectedRoute allowedRoles={['doctor_admin', 'clinic_admin']}><WorkspaceLayout><ClinicHealthBlogPage /></WorkspaceLayout></ProtectedRoute>} />
            <Route path="/clinic/appearance" element={<ProtectedRoute allowedRoles={['doctor_admin', 'clinic_admin']}><WorkspaceLayout><ClinicThemeSettingsPage /></WorkspaceLayout></ProtectedRoute>} />
            <Route path="/clinic/pharmacy" element={<ProtectedRoute allowedRoles={['doctor_admin', 'clinic_admin']}><WorkspaceLayout><ClinicPharmacyPage /></WorkspaceLayout></ProtectedRoute>} />
            <Route path="/clinic/notes" element={<ProtectedRoute allowedRoles={['doctor_admin', 'clinic_admin']}><WorkspaceLayout><DoctorConsultationNotesPage /></WorkspaceLayout></ProtectedRoute>} />
            <Route path="/clinic/history" element={<ProtectedRoute allowedRoles={['doctor_admin', 'clinic_admin']}><WorkspaceLayout><DoctorAppointmentHistoryPage /></WorkspaceLayout></ProtectedRoute>} />
            <Route path="/clinic/schedule" element={<ProtectedRoute allowedRoles={['doctor_admin', 'clinic_admin']}><WorkspaceLayout><DoctorSchedulePage /></WorkspaceLayout></ProtectedRoute>} />
            <Route path="/clinic/notifications" element={<ProtectedRoute allowedRoles={['doctor_admin', 'clinic_admin']}><WorkspaceLayout><DoctorNotificationsPage /></WorkspaceLayout></ProtectedRoute>} />
            <Route path="/receptionist/whatsapp" element={<ProtectedRoute allowedRoles={['receptionist', 'reception']}><WorkspaceLayout><ReceptionistWhatsAppPage /></WorkspaceLayout></ProtectedRoute>} />
            <Route path="/patient/whatsapp" element={<ProtectedRoute allowedRoles={['patient']}><WorkspaceLayout><PatientWhatsAppPage /></WorkspaceLayout></ProtectedRoute>} />
            <Route path="/patient/medicine-store" element={<ProtectedRoute allowedRoles={['patient']}><WorkspaceLayout><PatientMedicineStorePage /></WorkspaceLayout></ProtectedRoute>} />

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
              <Route path="overview" element={<Navigate to="/patient/dashboard" replace />} />
              <Route path="dashboard" element={<PatientDashboardPage />} />
              <Route path="virtual-consulting" element={<PatientVirtualConsultingPage />} />
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
              <Route path="invoices" element={<PatientBillingPage />} />
              <Route path="receipts" element={<PatientReceiptsPage />} />
              <Route path="bills" element={<PatientBillingPage />} />
              <Route path="billing" element={<PatientBillingPage />} />
              <Route path="notifications" element={<PatientNotificationsPage />} />
              <Route path="feedback" element={<PatientFeedbackPage />} />
              <Route path="profile" element={<PatientProfilePage />} />
              <Route path="emergency" element={<PatientEmergencyPage />} />
              <Route path="health-education" element={<PatientHealthEducationPage />} />
              <Route path="pharmacy" element={<PatientPharmacyPage />} />
              <Route path="medicine-store" element={<PatientMedicineStorePage />} />
              <Route path="family" element={<PatientFamilyPage />} />
              <Route path="reminders" element={<PatientRemindersPage />} />
              <Route path="packages" element={<PatientPackagesPage />} />
              <Route path="queries" element={<PatientQueriesPage />} />
              <Route path="whatsapp" element={<PatientWhatsAppPage />} />
            </Route>

            {/* Fallback Route */}
            <Route element={<PublicLayout />}>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
              </LanguageProvider>
            </ToastProvider>
          </ReferralProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
    </StoreProvider>
  </ErrorBoundary>
  );
}
 