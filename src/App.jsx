<<<<<<< HEAD
import React from 'react';
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
=======
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
>>>>>>> origin/feature/my-work
}

export default function App() {
  return (
<<<<<<< HEAD
    <ErrorBoundary>
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
            </Route>

            {/* Authentication & Onboarding Routes */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/login/doctor" element={<DoctorLoginPage />} />
            <Route path="/login/receptionist" element={<ReceptionistLoginPage />} />
            <Route path="/login/patient" element={<PatientLoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/onboarding" element={<ClinicOnboardingWizard />} />
            <Route path="/checkout" element={<SubscriptionCheckoutPage />} />
            <Route path="/register/patient" element={<PatientRegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/onboarding/patient" element={<PatientOnboardingPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            <Route path="/demo-access" element={<DemoAccessPage />} />

            {/* Role 1: SaaS Superadmin Login Route */}
            <Route path="/superadmin" element={<SuperAdminLoginPage />} />

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
  </ErrorBoundary>
  );
}
 
=======
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
>>>>>>> origin/feature/my-work
