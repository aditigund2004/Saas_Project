import {
  EmailTemplate,
  EmailTrigger,
  EmailCampaign,
  EmailActivityLog,
  EmailSettings
} from '../types/email';

// Storage Keys
const STORAGE_KEYS = {
  TEMPLATES: 'clinipulse_email_templates',
  TRIGGERS: 'clinipulse_email_triggers',
  CAMPAIGNS: 'clinipulse_email_campaigns',
  LOGS: 'clinipulse_email_logs',
  SETTINGS: 'clinipulse_email_settings'
};

export const DEFAULT_DYNAMIC_VARIABLES = [
  { name: '{{hospital_name}}', desc: 'Hospital or specialty clinic business name', sample: 'CityCare Family Clinic' },
  { name: '{{admin_name}}', desc: 'Clinic administrator or medical director', sample: 'Dr. Aarav Mehta' },
  { name: '{{doctor_name}}', desc: 'Doctor or consulting specialist', sample: 'Dr. Rohan Deshmukh' },
  { name: '{{patient_name}}', desc: 'Patient full name', sample: 'Ananya Sharma' },
  { name: '{{plan_name}}', desc: 'Subscription tier name', sample: 'Professional Multi-Specialty' },
  { name: '{{subscription_start_date}}', desc: 'Subscription commencement date', sample: '2026-10-01' },
  { name: '{{subscription_end_date}}', desc: 'Next billing renewal or expiry', sample: '2027-10-01' },
  { name: '{{payment_amount}}', desc: 'Transaction billing amount with symbol', sample: '₹69,990' },
  { name: '{{transaction_id}}', desc: 'Unique payment authorization identifier', sample: 'TXN-98421-CP' },
  { name: '{{feature_name}}', desc: 'Announced SaaS feature or clinical capability', sample: 'Online Patient Self-Booking' },
  { name: '{{feature_description}}', desc: 'Overview of benefits and functionality', sample: 'Allows patients to book real-time OPD appointments through a verified mobile portal.' },
  { name: '{{release_date}}', desc: 'Feature deployment or availability date', sample: 'November 1, 2026' },
  { name: '{{action_url}}', desc: 'Clickable CTA link to platform cockpit', sample: 'https://clinicos.app/dashboard' },
  { name: '{{company_name}}', desc: 'Hospital SaaS platform corporate entity', sample: 'ClinicOS Healthcare Technologies' },
  { name: '{{support_email}}', desc: 'Customer support and concierge email', sample: 'support@clinicos.app' }
];

export const DEFAULT_EMAIL_SETTINGS: EmailSettings = {
  senderDisplayName: 'ClinicOS Platform Notifications',
  senderEmail: 'notifications@clinicos.app',
  replyToEmail: 'support@clinicos.app',
  companyName: 'ClinicOS Healthcare Technologies',
  supportEmail: 'support@clinicos.app',
  defaultFooter: 'This is an automated operational notification sent on behalf of ClinicOS. You are receiving this because your medical practice is registered with our healthcare SaaS platform.',
  testRecipientEmail: 'admin.tester@hospitaldemo.com',
  enableSimulatedFailures: false,
  defaultNotificationPreferences: {
    operationalRequired: true,
    promotionalOptIn: true
  }
};

// ==========================================
// 17 SEEDED PREBUILT TEMPLATES
// ==========================================
export const SEED_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tpl-hospital-welcome',
    key: 'hospital.welcome',
    name: 'Hospital Welcome Email',
    category: 'Onboarding & Activation',
    subject: 'Welcome to ClinicOS, {{hospital_name}}! Getting Started Guide',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'hospital.registered',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-10-20T14:30:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'company_name', 'action_url', 'support_email'],
    textBody: `Dear {{admin_name}},\n\nWelcome to {{company_name}}! We are delighted to partner with {{hospital_name}} to modernize your clinical operations, OPD scheduling, and patient EHR.\n\nYour 14-day full access trial is now active.\nAccess your workspace: {{action_url}}\n\nNeed assistance? Contact our clinical concierge at {{support_email}}.\n\nWarm regards,\nThe {{company_name}} Team`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; padding: 20px;">
  <div style="background-color: #2563eb; color: #ffffff; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">Welcome to ClinicOS!</h1>
    <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Modern Operating System for Healthcare Clinics</p>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>We are thrilled to welcome <strong>{{hospital_name}}</strong> to the ClinicOS network. Your 14-day full access trial has been provisioned.</p>
    <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 14px; margin: 20px 0; border-radius: 4px;">
      <h3 style="margin: 0 0 8px 0; font-size: 15px; color: #1e293b;">Next Steps for Your Practice:</h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
        <li>Add your doctor profiles and clinical specialties</li>
        <li>Set up front-desk receptionist staff accounts</li>
        <li>Configure WhatsApp appointment reminders</li>
      </ul>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{action_url}}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">Access Practice Cockpit</a>
    </div>
    <p style="font-size: 12px; color: #64748b;">Questions? Email clinical support at <a href="mailto:{{support_email}}" style="color: #2563eb;">{{support_email}}</a>.</p>
  </div>
</div>`
  },
  {
    id: 'tpl-hospital-activation',
    key: 'hospital.activated',
    name: 'Hospital Account Activation',
    category: 'Onboarding & Activation',
    subject: 'Account Verified: {{hospital_name}} is Live on ClinicOS',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'hospital.activated',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-02T11:00:00Z',
    updatedAt: '2026-10-21T09:15:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'action_url', 'company_name'],
    textBody: `Dear {{admin_name}},\n\nYour clinic account for {{hospital_name}} has completed compliance verification and is now officially active.\n\nLog in here: {{action_url}}\n\nBest,\n{{company_name}} Compliance Team`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #059669; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
    <h2 style="margin: 0;">Clinic Verified & Active</h2>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>Good news! Your healthcare facility <strong>{{hospital_name}}</strong> has passed platform verification. All doctor scheduling, digital Rx generation, and billing modules are now unlocked.</p>
    <p><a href="{{action_url}}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">Launch Practice Dashboard</a></p>
  </div>
</div>`
  },
  {
    id: 'tpl-sub-purchase',
    key: 'subscription.activated',
    name: 'Subscription Purchase Confirmation',
    category: 'Subscription & Billing',
    subject: 'Subscription Confirmed: {{plan_name}} for {{hospital_name}}',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'subscription.activated',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-05T12:00:00Z',
    updatedAt: '2026-10-22T10:00:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'plan_name', 'payment_amount', 'subscription_start_date', 'subscription_end_date', 'action_url', 'company_name'],
    textBody: `Dear {{admin_name}},\n\nThank you for subscribing to {{plan_name}} for {{hospital_name}}!\n\nBilling Summary:\n- Plan: {{plan_name}}\n- Amount: {{payment_amount}}\n- Coverage: {{subscription_start_date}} to {{subscription_end_date}}\n\nManage your subscription: {{action_url}}\n\nRegards,\n{{company_name}} Finance`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #1e3a8a; color: #ffffff; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
    <h2 style="margin: 0;">Subscription Confirmed</h2>
    <p style="margin: 4px 0 0 0; opacity: 0.9;">Tier: {{plan_name}}</p>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Hello <strong>{{admin_name}}</strong>,</p>
    <p>Your subscription for <strong>{{hospital_name}}</strong> is now active. Thank you for partnering with {{company_name}}.</p>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
      <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; color: #64748b;">Selected Tier</td><td style="padding: 8px 0; text-align: right; font-weight: bold;">{{plan_name}}</td></tr>
      <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; color: #64748b;">Amount Paid</td><td style="padding: 8px 0; text-align: right; font-weight: bold; color: #059669;">{{payment_amount}}</td></tr>
      <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 8px 0; color: #64748b;">Start Date</td><td style="padding: 8px 0; text-align: right;">{{subscription_start_date}}</td></tr>
      <tr><td style="padding: 8px 0; color: #64748b;">Next Renewal</td><td style="padding: 8px 0; text-align: right;">{{subscription_end_date}}</td></tr>
    </table>
    <div style="text-align: center; margin-top: 25px;">
      <a href="{{action_url}}" style="background-color: #1e3a8a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Billing & Invoices</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'tpl-payment-receipt',
    key: 'payment.succeeded',
    name: 'Payment Receipt',
    category: 'Subscription & Billing',
    subject: 'Receipt for {{payment_amount}} [{{transaction_id}}] - {{hospital_name}}',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'payment.succeeded',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-06T14:00:00Z',
    updatedAt: '2026-10-22T11:00:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'payment_amount', 'transaction_id', 'plan_name', 'action_url', 'company_name'],
    textBody: `Dear {{admin_name}},\n\nWe received payment of {{payment_amount}} for {{hospital_name}}.\nTransaction ID: {{transaction_id}}\nTier: {{plan_name}}\n\nDownload invoice: {{action_url}}\n\n{{company_name}} Billing Department`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #2563eb; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
    <h2 style="margin: 0; font-size: 20px;">Payment Receipt</h2>
    <p style="margin: 4px 0 0 0; font-size: 13px;">Ref: {{transaction_id}}</p>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>Payment has been processed successfully for <strong>{{hospital_name}}</strong>.</p>
    <div style="background-color: #f1f5f9; padding: 16px; border-radius: 6px; text-align: center; margin: 20px 0;">
      <span style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">Total Paid</span>
      <div style="font-size: 28px; font-weight: bold; color: #1e293b; margin-top: 4px;">{{payment_amount}}</div>
    </div>
    <p style="font-size: 13px; color: #64748b;">A copy of this GST-compliant itemized receipt has been archived in your corporate billing portal.</p>
    <p><a href="{{action_url}}" style="color: #2563eb; font-weight: bold;">Download PDF Receipt ➔</a></p>
  </div>
</div>`
  },
  {
    id: 'tpl-payment-failed',
    key: 'payment.failed',
    name: 'Payment Failure Notification',
    category: 'Subscription & Billing',
    subject: 'Urgent: Payment Failed for {{hospital_name}} ({{plan_name}})',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'payment.failed',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-08T15:00:00Z',
    updatedAt: '2026-10-23T08:00:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'payment_amount', 'transaction_id', 'plan_name', 'action_url', 'support_email'],
    textBody: `Dear {{admin_name}},\n\nWe could not process the payment of {{payment_amount}} for {{hospital_name}} (Transaction Ref: {{transaction_id}}).\n\nPlease update your payment method to ensure uninterrupted WhatsApp notifications and doctor calendars: {{action_url}}\n\nNeed help? Email {{support_email}}.\n\nClinicOS Accounts`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #dc2626; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
    <h2 style="margin: 0;">Payment Processing Notice</h2>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>Your recent recurring subscription charge of <strong>{{payment_amount}}</strong> for <strong>{{hospital_name}}</strong> could not be completed.</p>
    <div style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 14px; border-radius: 6px; margin: 20px 0; color: #991b1b; font-size: 13px;">
      <strong>Action Required:</strong> Please update your payment card or bank mandate within 3 business days to prevent disruption to your doctor rotas and prescription composer.
    </div>
    <div style="text-align: center; margin: 25px 0;">
      <a href="{{action_url}}" style="background-color: #dc2626; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Update Payment Method</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'tpl-sub-upgrade',
    key: 'subscription.upgraded',
    name: 'Subscription Upgrade Confirmation',
    category: 'Subscription & Billing',
    subject: 'Tier Upgraded! Welcome to {{plan_name}} - {{hospital_name}}',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'subscription.upgraded',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-10-23T11:00:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'plan_name', 'action_url', 'company_name'],
    textBody: `Dear {{admin_name}},\n\nCongratulations! {{hospital_name}} has upgraded to {{plan_name}}.\n\nYour new doctor seat limits, multi-branch switching, and priority support channels are active now.\n\nExplore upgraded features: {{action_url}}\n\nBest,\n{{company_name}} Team`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #4f46e5; color: #ffffff; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
    <h2 style="margin: 0;">Plan Upgraded Successfully</h2>
    <p style="margin: 4px 0 0 0; font-size: 14px;">Now on {{plan_name}}</p>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>We are excited to confirm that <strong>{{hospital_name}}</strong> has upgraded to <strong>{{plan_name}}</strong>. Your higher doctor thresholds and expanded clinical tools are ready for use immediately.</p>
    <div style="text-align: center; margin: 25px 0;">
      <a href="{{action_url}}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Open Practice Cockpit</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'tpl-sub-downgrade',
    key: 'subscription.downgraded',
    name: 'Subscription Downgrade Confirmation',
    category: 'Subscription & Billing',
    subject: 'Plan Change Scheduled: {{hospital_name}} ({{plan_name}})',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'subscription.downgraded',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-12T10:00:00Z',
    updatedAt: '2026-10-23T12:00:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'plan_name', 'subscription_end_date', 'action_url'],
    textBody: `Dear {{admin_name}},\n\nYour request to change {{hospital_name}} to {{plan_name}} has been scheduled.\n\nThis change will take effect at the end of your billing cycle on {{subscription_end_date}}.\n\nReview details: {{action_url}}`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #64748b; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
    <h3 style="margin: 0;">Subscription Tier Adjustment</h3>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>Your subscription for <strong>{{hospital_name}}</strong> will switch to <strong>{{plan_name}}</strong> on <strong>{{subscription_end_date}}</strong>.</p>
    <p>Until then, your existing quotas and features remain active with zero interruption.</p>
  </div>
</div>`
  },
  {
    id: 'tpl-sub-renewal',
    key: 'subscription.renewed',
    name: 'Subscription Renewal Reminder',
    category: 'Subscription & Billing',
    subject: 'Upcoming Renewal Reminder: {{hospital_name}} ({{plan_name}})',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'subscription.renewed',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-15T09:00:00Z',
    updatedAt: '2026-10-23T14:00:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'plan_name', 'payment_amount', 'subscription_end_date', 'action_url'],
    textBody: `Dear {{admin_name}},\n\nYour {{plan_name}} subscription for {{hospital_name}} will renew on {{subscription_end_date}} for {{payment_amount}}.\n\nNo action is needed if your billing method is up to date.\nManage settings: {{action_url}}`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #2563eb; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
    <h3 style="margin: 0;">Upcoming Subscription Renewal</h3>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>This is a friendly reminder that your subscription for <strong>{{hospital_name}}</strong> ({{plan_name}}) is scheduled for automatic renewal on <strong>{{subscription_end_date}}</strong>.</p>
    <p>Amount to be charged: <strong>{{payment_amount}}</strong>.</p>
    <p><a href="{{action_url}}" style="color: #2563eb; font-weight: bold;">Review Billing Details ➔</a></p>
  </div>
</div>`
  },
  {
    id: 'tpl-sub-expiration',
    key: 'subscription.expiring',
    name: 'Subscription Expiration Reminder',
    category: 'Subscription & Billing',
    subject: 'Action Needed: Your {{hospital_name}} Trial/Plan Expires in 3 Days',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'subscription.expiring',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-18T10:00:00Z',
    updatedAt: '2026-10-23T15:00:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'plan_name', 'subscription_end_date', 'action_url'],
    textBody: `Dear {{admin_name}},\n\nYour active period for {{hospital_name}} ends on {{subscription_end_date}}.\n\nTo keep doctor schedules, online bookings, and electronic health records active, please confirm your plan: {{action_url}}`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #d97706; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
    <h3 style="margin: 0;">Account Access Notice</h3>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>Your practice access for <strong>{{hospital_name}}</strong> is scheduled to expire on <strong>{{subscription_end_date}}</strong>.</p>
    <div style="text-align: center; margin: 25px 0;">
      <a href="{{action_url}}" style="background-color: #d97706; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Choose Your Plan Now</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'tpl-sub-cancel',
    key: 'subscription.cancelled',
    name: 'Subscription Cancellation Confirmation',
    category: 'Subscription & Billing',
    subject: 'Subscription Cancelled: {{hospital_name}}',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'subscription.cancelled',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-20T11:00:00Z',
    updatedAt: '2026-10-23T16:00:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'subscription_end_date', 'company_name', 'support_email'],
    textBody: `Dear {{admin_name}},\n\nYour subscription for {{hospital_name}} has been cancelled. You will retain read-only archival access until {{subscription_end_date}}.\n\nWe hope to serve your practice again in the future.\n\n{{company_name}} Team`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #475569; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
    <h3 style="margin: 0;">Subscription Cancellation Confirmed</h3>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>This confirms that the subscription for <strong>{{hospital_name}}</strong> has been cancelled. Your medical records and financial reports will remain downloadable through <strong>{{subscription_end_date}}</strong>.</p>
    <p>If you change your mind, your account can be reactivated at any time.</p>
  </div>
</div>`
  },
  {
    id: 'tpl-doctor-invite',
    key: 'doctor.invited',
    name: 'New Doctor Invitation',
    category: 'Clinical & Operations',
    subject: 'Invitation to Join {{hospital_name}} Medical Staff on ClinicOS',
    recipientType: 'doctor',
    associatedTriggerKey: 'doctor.invited',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-22T08:00:00Z',
    updatedAt: '2026-10-24T09:00:00Z',
    supportedVariables: ['hospital_name', 'doctor_name', 'admin_name', 'action_url', 'company_name'],
    textBody: `Dear Dr. {{doctor_name}},\n\n{{admin_name}} has invited you to join the medical team at {{hospital_name}} on ClinicOS.\n\nAccept your invitation and configure your consultation schedule: {{action_url}}\n\nWarm regards,\n{{company_name}}`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #0284c7; color: #ffffff; padding: 22px; border-radius: 8px 8px 0 0; text-align: center;">
    <h2 style="margin: 0;">Doctor Staff Invitation</h2>
    <p style="margin: 4px 0 0 0; font-size: 13px;">{{hospital_name}}</p>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>Dr. {{doctor_name}}</strong>,</p>
    <p><strong>{{admin_name}}</strong> has added you to the consulting panel at <strong>{{hospital_name}}</strong>.</p>
    <p>With ClinicOS, you can manage appointments, compose digital prescriptions with drug templates, and review patient medical histories from any device.</p>
    <div style="text-align: center; margin: 25px 0;">
      <a href="{{action_url}}" style="background-color: #0284c7; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Set Up Doctor Profile</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'tpl-staff-invite',
    key: 'staff.invited',
    name: 'Staff Account Invitation',
    category: 'Clinical & Operations',
    subject: 'You have been invited to {{hospital_name}} Front Desk Team',
    recipientType: 'staff',
    associatedTriggerKey: 'staff.invited',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-24T09:00:00Z',
    updatedAt: '2026-10-24T10:00:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'action_url', 'company_name'],
    textBody: `Hello,\n\nYou have been invited by {{admin_name}} to join the reception and administrative desk at {{hospital_name}}.\n\nActivate your login: {{action_url}}\n\n{{company_name}} Team`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #0d9488; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
    <h3 style="margin: 0;">Front Desk Staff Invitation</h3>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Hello,</p>
    <p><strong>{{admin_name}}</strong> has created a receptionist / operational account for you at <strong>{{hospital_name}}</strong>.</p>
    <p><a href="{{action_url}}" style="display: inline-block; background-color: #0d9488; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">Activate Account</a></p>
  </div>
</div>`
  },
  {
    id: 'tpl-password-reset',
    key: 'auth.password_reset',
    name: 'Password Reset Notification',
    category: 'System & Security',
    subject: 'Reset Your Password for ClinicOS ({{hospital_name}})',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'security.alert',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-25T11:00:00Z',
    updatedAt: '2026-10-24T11:00:00Z',
    supportedVariables: ['admin_name', 'action_url', 'support_email', 'company_name'],
    textBody: `Dear {{admin_name}},\n\nA password reset request was received for your ClinicOS account.\n\nReset your password here: {{action_url}}\n\nIf you did not request this, please contact {{support_email}} immediately.\n\n{{company_name}} Security`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #334155; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
    <h3 style="margin: 0;">Password Reset Request</h3>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Hello <strong>{{admin_name}}</strong>,</p>
    <p>We received a request to reset the password for your ClinicOS account. This link will expire in 60 minutes.</p>
    <p style="text-align: center; margin: 25px 0;">
      <a href="{{action_url}}" style="background-color: #334155; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
    </p>
    <p style="font-size: 12px; color: #64748b;">If you did not initiate this request, you can safely ignore this email.</p>
  </div>
</div>`
  },
  {
    id: 'tpl-onboarding-complete',
    key: 'onboarding.completed',
    name: 'Hospital Onboarding Completion',
    category: 'Onboarding & Activation',
    subject: '🎉 Congratulations! {{hospital_name}} Onboarding is Complete',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'onboarding.completed',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-27T10:00:00Z',
    updatedAt: '2026-10-24T12:00:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'plan_name', 'action_url', 'company_name'],
    textBody: `Dear {{admin_name}},\n\n{{hospital_name}} has completed all initial onboarding milestones!\n\nYour clinical services, doctor calendars, and reception queues are active.\nOpen your dashboard: {{action_url}}\n\n{{company_name}} Concierge`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #16a34a; color: #ffffff; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
    <h2 style="margin: 0;">Onboarding Complete!</h2>
    <p style="margin: 4px 0 0 0; font-size: 13px;">{{hospital_name}} is 100% Operational</p>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>Congratulations on completing the setup checklist for <strong>{{hospital_name}}</strong>. Your digital front desk is now live and accepting walk-ins and appointments.</p>
    <div style="text-align: center; margin: 25px 0;">
      <a href="{{action_url}}" style="background-color: #16a34a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Open Practice Cockpit</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'tpl-feature-announcement',
    key: 'feature.published',
    name: 'New Feature Announcement',
    category: 'Feature Announcements',
    subject: 'Introducing {{feature_name}} for {{hospital_name}}',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'feature.published',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-28T14:00:00Z',
    updatedAt: '2026-10-25T10:00:00Z',
    supportedVariables: ['hospital_name', 'admin_name', 'feature_name', 'feature_description', 'release_date', 'action_url', 'company_name'],
    textBody: `Dear {{admin_name}},\n\nWe are pleased to introduce {{feature_name}} to our hospital management platform.\n\n{{feature_description}}\n\nThis feature is designed to help your team improve workflows and provide a more convenient experience for patients.\n\nAvailable from: {{release_date}}\nExplore the feature: {{action_url}}\n\nBest regards,\n{{company_name}} Product Team`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: #ffffff; padding: 28px; border-radius: 8px 8px 0 0; text-align: center;">
    <span style="background-color: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; text-transform: uppercase;">New Feature Release</span>
    <h2 style="margin: 10px 0 0 0; font-size: 22px;">{{feature_name}}</h2>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>We are delighted to bring <strong>{{feature_name}}</strong> to your clinical cockpit at <strong>{{hospital_name}}</strong>.</p>
    <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; color: #1e3a8a; font-size: 14px; line-height: 1.6;">{{feature_description}}</p>
    </div>
    <p style="font-size: 13px; color: #475569;"><strong>Available From:</strong> {{release_date}}</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{action_url}}" style="background-color: #2563eb; color: #ffffff; padding: 12px 26px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">Try New Feature Now</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'tpl-maintenance',
    key: 'maintenance.scheduled',
    name: 'Scheduled Maintenance Notification',
    category: 'System & Security',
    subject: 'Scheduled Infrastructure Maintenance: ClinicOS Services',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'maintenance.scheduled',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-29T10:00:00Z',
    updatedAt: '2026-10-25T11:00:00Z',
    supportedVariables: ['admin_name', 'hospital_name', 'release_date', 'company_name', 'support_email'],
    textBody: `Dear {{admin_name}},\n\nPlease be advised that {{company_name}} will undergo scheduled cloud database maintenance on {{release_date}} from 02:00 to 03:00 IST.\n\nEmergency offline modes remain fully functional.\nQuestions? Contact {{support_email}}.`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #d97706; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
    <h3 style="margin: 0;">Scheduled Platform Maintenance</h3>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>To ensure high availability and HIPAA-grade encryption compliance, our cloud infrastructure team has scheduled regular database optimization on <strong>{{release_date}}</strong>.</p>
    <p>Clinical data will be safeguarded with zero data loss.</p>
  </div>
</div>`
  },
  {
    id: 'tpl-security-alert',
    key: 'security.alert',
    name: 'Security Notification',
    category: 'System & Security',
    subject: 'Security Alert: New Sign-In Detected for {{hospital_name}}',
    recipientType: 'hospital_admin',
    associatedTriggerKey: 'security.alert',
    status: 'active',
    isPrebuilt: true,
    createdAt: '2026-09-30T10:00:00Z',
    updatedAt: '2026-10-25T12:00:00Z',
    supportedVariables: ['admin_name', 'hospital_name', 'action_url', 'support_email'],
    textBody: `Dear {{admin_name}},\n\nA new administrator login to {{hospital_name}} was detected.\n\nIf this was you, no action is required.\nIf unauthorized, secure your account immediately: {{action_url}}`,
    htmlBody: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #991b1b; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
    <h3 style="margin: 0;">Security Verification Alert</h3>
  </div>
  <div style="background-color: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <p>Dear <strong>{{admin_name}}</strong>,</p>
    <p>A new administrative session was authenticated for <strong>{{hospital_name}}</strong>.</p>
    <p>If you did not authorize this access, review active tokens immediately:</p>
    <p><a href="{{action_url}}" style="color: #dc2626; font-weight: bold;">Review Account Security ➔</a></p>
  </div>
</div>`
  }
];

// ==========================================
// 16 SEEDED AUTOMATED TRIGGERS
// ==========================================
export const SEED_EMAIL_TRIGGERS: EmailTrigger[] = [
  {
    id: 'trg-hosp-reg',
    eventKey: 'hospital.registered',
    name: 'Hospital Registration',
    description: 'Triggered immediately when a new hospital or clinic submits the registration form.',
    selectedTemplateId: 'tpl-hospital-welcome',
    recipientType: 'hospital_admin',
    conditionDescription: 'Always fire upon clinic self-service or superadmin provisioning',
    enabled: true,
    lastTriggeredAt: '2026-10-25T14:20:00Z',
    totalTriggeredCount: 18
  },
  {
    id: 'trg-hosp-act',
    eventKey: 'hospital.activated',
    name: 'Hospital Account Activated',
    description: 'Triggered when Superadmin approves clinic credentials and verification status.',
    selectedTemplateId: 'tpl-hospital-activation',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires when clinic status changes from Pending/Trial to Active',
    enabled: true,
    lastTriggeredAt: '2026-10-24T16:45:00Z',
    totalTriggeredCount: 14
  },
  {
    id: 'trg-sub-act',
    eventKey: 'subscription.activated',
    name: 'Subscription Activated',
    description: 'Triggered upon successful checkout or initial paid plan activation.',
    selectedTemplateId: 'tpl-sub-purchase',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires when subscription payment confirmation is registered',
    enabled: true,
    lastTriggeredAt: '2026-10-26T09:12:00Z',
    totalTriggeredCount: 32
  },
  {
    id: 'trg-sub-upg',
    eventKey: 'subscription.upgraded',
    name: 'Subscription Upgraded',
    description: 'Triggered when a clinic upgrades from Starter/Growth to higher tiers.',
    selectedTemplateId: 'tpl-sub-upgrade',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires immediately when tier upgrade transaction succeeds',
    enabled: true,
    lastTriggeredAt: '2026-10-25T11:30:00Z',
    totalTriggeredCount: 9
  },
  {
    id: 'trg-sub-dwn',
    eventKey: 'subscription.downgraded',
    name: 'Subscription Downgraded',
    description: 'Triggered when a clinic requests a tier downgrade at next cycle end.',
    selectedTemplateId: 'tpl-sub-downgrade',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires upon downgrade confirmation in billing portal',
    enabled: true,
    lastTriggeredAt: '2026-10-20T10:15:00Z',
    totalTriggeredCount: 3
  },
  {
    id: 'trg-sub-ren',
    eventKey: 'subscription.renewed',
    name: 'Subscription Renewal Notice',
    description: 'Triggered 7 days prior to recurring monthly or annual billing charge.',
    selectedTemplateId: 'tpl-sub-renewal',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires automatically T-7 days before currentPeriodEnd',
    enabled: true,
    lastTriggeredAt: '2026-10-25T08:00:00Z',
    totalTriggeredCount: 27
  },
  {
    id: 'trg-sub-exp',
    eventKey: 'subscription.expiring',
    name: 'Trial / Plan Expiration Warning',
    description: 'Triggered 3 days before a 14-day trial or grace period lapses.',
    selectedTemplateId: 'tpl-sub-expiration',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires when trialDaysRemaining <= 3',
    enabled: true,
    lastTriggeredAt: '2026-10-24T18:00:00Z',
    totalTriggeredCount: 11
  },
  {
    id: 'trg-sub-can',
    eventKey: 'subscription.cancelled',
    name: 'Subscription Cancellation',
    description: 'Triggered when an account cancellation is confirmed.',
    selectedTemplateId: 'tpl-sub-cancel',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires upon subscription cancellation request',
    enabled: true,
    lastTriggeredAt: '2026-10-18T16:00:00Z',
    totalTriggeredCount: 2
  },
  {
    id: 'trg-pay-suc',
    eventKey: 'payment.succeeded',
    name: 'Payment Succeeded',
    description: 'Triggered when a recurring or one-off SaaS invoice is paid successfully.',
    selectedTemplateId: 'tpl-payment-receipt',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires on successful webhook or manual payment capture',
    enabled: true,
    lastTriggeredAt: '2026-10-26T08:45:00Z',
    totalTriggeredCount: 46
  },
  {
    id: 'trg-pay-fai',
    eventKey: 'payment.failed',
    name: 'Payment Failed',
    description: 'Triggered when recurring card/mandate deduction fails.',
    selectedTemplateId: 'tpl-payment-failed',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires when payment gateway returns decline status',
    enabled: true,
    lastTriggeredAt: '2026-10-23T14:10:00Z',
    totalTriggeredCount: 4
  },
  {
    id: 'trg-doc-inv',
    eventKey: 'doctor.invited',
    name: 'Doctor Staff Invited',
    description: 'Triggered when clinic admin adds a new doctor profile with portal access.',
    selectedTemplateId: 'tpl-doctor-invite',
    recipientType: 'doctor',
    conditionDescription: 'Fires when a new doctor credential is generated',
    enabled: true,
    lastTriggeredAt: '2026-10-26T07:30:00Z',
    totalTriggeredCount: 19
  },
  {
    id: 'trg-stf-inv',
    eventKey: 'staff.invited',
    name: 'Reception / Staff Invited',
    description: 'Triggered when front desk staff members are provisioned.',
    selectedTemplateId: 'tpl-staff-invite',
    recipientType: 'staff',
    conditionDescription: 'Fires upon receptionist onboarding',
    enabled: true,
    lastTriggeredAt: '2026-10-24T11:20:00Z',
    totalTriggeredCount: 15
  },
  {
    id: 'trg-onb-com',
    eventKey: 'onboarding.completed',
    name: 'Onboarding Checklist Completed',
    description: 'Triggered when clinic finishes all basic profile and rota steps.',
    selectedTemplateId: 'tpl-onboarding-complete',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires when onboarding checklist progress reaches 100%',
    enabled: true,
    lastTriggeredAt: '2026-10-25T16:00:00Z',
    totalTriggeredCount: 12
  },
  {
    id: 'trg-fea-pub',
    eventKey: 'feature.published',
    name: 'Platform Feature Published',
    description: 'Triggered by Superadmin to announce new clinical features to target audience.',
    selectedTemplateId: 'tpl-feature-announcement',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires on campaign execution or feature rollout',
    enabled: true,
    lastTriggeredAt: '2026-10-22T10:00:00Z',
    totalTriggeredCount: 35
  },
  {
    id: 'trg-mai-sch',
    eventKey: 'maintenance.scheduled',
    name: 'System Maintenance Window',
    description: 'Triggered 24 hours before planned database/infrastructure updates.',
    selectedTemplateId: 'tpl-maintenance',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires when superadmin posts maintenance event',
    enabled: true,
    lastTriggeredAt: '2026-10-15T09:00:00Z',
    totalTriggeredCount: 22
  },
  {
    id: 'trg-sec-alt',
    eventKey: 'security.alert',
    name: 'Account Security Alert',
    description: 'Triggered on suspicious IP login, multiple failed attempts, or password resets.',
    selectedTemplateId: 'tpl-security-alert',
    recipientType: 'hospital_admin',
    conditionDescription: 'Fires on high-risk authentication events',
    enabled: true,
    lastTriggeredAt: '2026-10-24T22:15:00Z',
    totalTriggeredCount: 8
  }
];

// ==========================================
// SEEDED NOTIFICATION CAMPAIGNS
// ==========================================
export const SEED_EMAIL_CAMPAIGNS: EmailCampaign[] = [
  {
    id: 'cmp-online-booking',
    name: 'Online Appointment Booking Rollout',
    featureName: 'Online Patient Self-Booking Portal',
    featureDescription: 'Empower your patients to book OPD consultations 24/7 directly through your custom clinic webpage, with instant automated WhatsApp confirmations.',
    keyBenefits: [
      'Eliminates receptionist phone queues',
      'Instant SMS & WhatsApp appointment receipts',
      'Syncs in real-time with doctor consultation rotas'
    ],
    releaseDate: 'November 1, 2026',
    actionUrl: 'https://clinicos.app/features/booking',
    selectedTemplateId: 'tpl-feature-announcement',
    targetAudience: {
      type: 'plans',
      planIds: ['growth', 'professional', 'enterprise'],
      clinicIds: [],
      roles: ['hospital_admin']
    },
    status: 'completed',
    scheduledAt: '2026-10-20T10:00:00Z',
    completedAt: '2026-10-20T10:05:00Z',
    createdAt: '2026-10-19T14:30:00Z',
    simulatedRecipientCount: 5,
    totalSimulatedDelivered: 5
  },
  {
    id: 'cmp-whatsapp-webhook',
    name: 'WhatsApp Dedicated Webhook Upgrade',
    featureName: 'WhatsApp Business API Dedicated Webhook',
    featureDescription: 'Enterprise high-throughput message pipeline enabling two-way appointment rescheduling and instant PDF prescription downloads.',
    keyBenefits: [
      'Zero delivery lag for digital Rx PDFs',
      'Dedicated Meta Cloud API Webhook',
      'Compliant two-way patient chat history'
    ],
    releaseDate: 'November 15, 2026',
    actionUrl: 'https://clinicos.app/features/whatsapp',
    selectedTemplateId: 'tpl-feature-announcement',
    targetAudience: {
      type: 'plans',
      planIds: ['professional', 'enterprise'],
      clinicIds: [],
      roles: ['hospital_admin']
    },
    status: 'draft',
    createdAt: '2026-10-24T16:00:00Z',
    simulatedRecipientCount: 3,
    totalSimulatedDelivered: 0
  }
];

// ==========================================
// SEEDED RECENT ACTIVITY LOGS
// ==========================================
export const SEED_EMAIL_LOGS: EmailActivityLog[] = [
  {
    id: 'log-101',
    subject: 'Receipt for ₹69,990 [TXN-88321] - HeartWell Cardiology Centre',
    recipientName: 'Dr. Rohan Deshmukh',
    recipientEmail: 'appointments@heartwell.demo',
    clinicName: 'HeartWell Cardiology Centre',
    clinicId: 'clinic-heartwell',
    eventKey: 'payment.succeeded',
    templateId: 'tpl-payment-receipt',
    templateName: 'Payment Receipt',
    source: 'automation',
    timestamp: '2026-10-26T09:42:10Z',
    status: 'delivered',
    retryCount: 0
  },
  {
    id: 'log-102',
    subject: 'Subscription Confirmed: Professional Multi-Specialty for CityCare Family Clinic',
    recipientName: 'Dr. Aarav Mehta',
    recipientEmail: 'care@citycare.demo',
    clinicName: 'CityCare Family Clinic',
    clinicId: 'clinic-citycare',
    eventKey: 'subscription.activated',
    templateId: 'tpl-sub-purchase',
    templateName: 'Subscription Purchase Confirmation',
    source: 'automation',
    timestamp: '2026-10-26T08:15:30Z',
    status: 'delivered',
    retryCount: 0
  },
  {
    id: 'log-103',
    subject: 'Invitation to Join BrightSmile Dental Studio Medical Staff on ClinicOS',
    recipientName: 'Dr. Isha Shah',
    recipientEmail: 'care@brightsmile.demo',
    clinicName: 'BrightSmile Dental Studio',
    clinicId: 'clinic-brightsmile',
    eventKey: 'doctor.invited',
    templateId: 'tpl-doctor-invite',
    templateName: 'New Doctor Invitation',
    source: 'automation',
    timestamp: '2026-10-25T16:30:15Z',
    status: 'delivered',
    retryCount: 0
  },
  {
    id: 'log-104',
    subject: 'Introducing Online Patient Self-Booking Portal for SkinSpring Dermatology',
    recipientName: 'Dr. Ananya Rao',
    recipientEmail: 'contact@skinspring.demo',
    clinicName: 'SkinSpring Dermatology Clinic',
    clinicId: 'clinic-skinspring',
    eventKey: 'feature.published',
    templateId: 'tpl-feature-announcement',
    templateName: 'New Feature Announcement',
    source: 'campaign',
    timestamp: '2026-10-25T14:10:00Z',
    status: 'delivered',
    retryCount: 0
  },
  {
    id: 'log-105',
    subject: 'Urgent: Payment Failed for MoveWell Orthopedic (₹44,990)',
    recipientName: 'Dr. Vikram Patil',
    recipientEmail: 'reception@movewell.demo',
    clinicName: 'MoveWell Orthopedic and Physiotherapy Centre',
    clinicId: 'clinic-movewell',
    eventKey: 'payment.failed',
    templateId: 'tpl-payment-failed',
    templateName: 'Payment Failure Notification',
    source: 'automation',
    timestamp: '2026-10-25T11:05:40Z',
    status: 'failed',
    errorReason: 'Simulated Gateway Response: Insufficient balance on corporate debit card.',
    retryCount: 1
  },
  {
    id: 'log-106',
    subject: 'Scheduled Infrastructure Maintenance: ClinicOS Services',
    recipientName: 'Dr. Aarav Mehta',
    recipientEmail: 'care@citycare.demo',
    clinicName: 'CityCare Family Clinic',
    clinicId: 'clinic-citycare',
    eventKey: 'maintenance.scheduled',
    templateId: 'tpl-maintenance',
    templateName: 'Scheduled Maintenance Notification',
    source: 'test_simulation',
    timestamp: '2026-10-24T18:22:10Z',
    status: 'delivered',
    retryCount: 0
  },
  {
    id: 'log-107',
    subject: 'Security Alert: New Sign-In Detected for HeartWell Cardiology Centre',
    recipientName: 'Dr. Rohan Deshmukh',
    recipientEmail: 'appointments@heartwell.demo',
    clinicName: 'HeartWell Cardiology Centre',
    clinicId: 'clinic-heartwell',
    eventKey: 'security.alert',
    templateId: 'tpl-security-alert',
    templateName: 'Security Notification',
    source: 'automation',
    timestamp: '2026-10-24T09:12:00Z',
    status: 'delivered',
    retryCount: 0
  },
  {
    id: 'log-108',
    subject: 'Upcoming Renewal Reminder: BrightSmile Dental Studio (Growth Practice)',
    recipientName: 'Dr. Isha Shah',
    recipientEmail: 'care@brightsmile.demo',
    clinicName: 'BrightSmile Dental Studio',
    clinicId: 'clinic-brightsmile',
    eventKey: 'subscription.renewed',
    templateId: 'tpl-sub-renewal',
    templateName: 'Subscription Renewal Reminder',
    source: 'automation',
    timestamp: '2026-10-23T15:45:00Z',
    status: 'skipped',
    errorReason: 'Simulation Skipped: Trigger was temporarily disabled by Superadmin.',
    retryCount: 0
  }
];

// ==========================================
// SERVICE IMPLEMENTATION
// ==========================================
class EmailNotificationService {
  // Get Templates with LocalStorage persistence
  getTemplates(): EmailTemplate[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read email templates from storage', e);
    }
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(SEED_EMAIL_TEMPLATES));
    return SEED_EMAIL_TEMPLATES;
  }

  saveTemplate(template: EmailTemplate): EmailTemplate {
    const templates = this.getTemplates();
    const index = templates.findIndex((t) => t.id === template.id);
    let updated: EmailTemplate[];

    const preparedTemplate: EmailTemplate = {
      ...template,
      updatedAt: new Date().toISOString()
    };

    if (index >= 0) {
      updated = [...templates];
      updated[index] = preparedTemplate;
    } else {
      updated = [preparedTemplate, ...templates];
    }

    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(updated));
    return preparedTemplate;
  }

  deleteTemplate(templateId: string): boolean {
    const templates = this.getTemplates();
    const target = templates.find((t) => t.id === templateId);
    if (!target) return false;

    const filtered = templates.filter((t) => t.id !== templateId);
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(filtered));
    return true;
  }

  duplicateTemplate(templateId: string): EmailTemplate | null {
    const templates = this.getTemplates();
    const src = templates.find((t) => t.id === templateId);
    if (!src) return null;

    const copy: EmailTemplate = {
      ...src,
      id: `tpl-${Date.now().toString().slice(-6)}`,
      key: `${src.key}.copy_${Date.now().toString().slice(-4)}`,
      name: `${src.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPrebuilt: false
    };

    this.saveTemplate(copy);
    return copy;
  }

  // Get Triggers
  getTriggers(): EmailTrigger[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRIGGERS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read email triggers from storage', e);
    }
    localStorage.setItem(STORAGE_KEYS.TRIGGERS, JSON.stringify(SEED_EMAIL_TRIGGERS));
    return SEED_EMAIL_TRIGGERS;
  }

  saveTrigger(trigger: EmailTrigger): EmailTrigger {
    const triggers = this.getTriggers();
    const index = triggers.findIndex((tr) => tr.id === trigger.id);
    let updated: EmailTrigger[];

    if (index >= 0) {
      updated = [...triggers];
      updated[index] = trigger;
    } else {
      updated = [trigger, ...triggers];
    }

    localStorage.setItem(STORAGE_KEYS.TRIGGERS, JSON.stringify(updated));
    return trigger;
  }

  toggleTrigger(triggerId: string): EmailTrigger | null {
    const triggers = this.getTriggers();
    const trg = triggers.find((t) => t.id === triggerId);
    if (!trg) return null;

    const updated = { ...trg, enabled: !trg.enabled };
    this.saveTrigger(updated);
    return updated;
  }

  // Get Campaigns
  getCampaigns(): EmailCampaign[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read email campaigns from storage', e);
    }
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(SEED_EMAIL_CAMPAIGNS));
    return SEED_EMAIL_CAMPAIGNS;
  }

  saveCampaign(campaign: EmailCampaign): EmailCampaign {
    const campaigns = this.getCampaigns();
    const index = campaigns.findIndex((c) => c.id === campaign.id);
    let updated: EmailCampaign[];

    if (index >= 0) {
      updated = [...campaigns];
      updated[index] = campaign;
    } else {
      updated = [campaign, ...campaigns];
    }

    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(updated));
    return campaign;
  }

  // Get Activity Logs
  getActivityLogs(): EmailActivityLog[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LOGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read email logs from storage', e);
    }
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(SEED_EMAIL_LOGS));
    return SEED_EMAIL_LOGS;
  }

  addActivityLog(log: Omit<EmailActivityLog, 'id' | 'timestamp'>): EmailActivityLog {
    const logs = this.getActivityLogs();
    const newLog: EmailActivityLog = {
      ...log,
      id: `log-${Date.now().toString().slice(-6)}`,
      timestamp: new Date().toISOString(),
      retryCount: 0
    };

    const updated = [newLog, ...logs];
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
    return newLog;
  }

  retryActivityLog(logId: string): { success: boolean; log: EmailActivityLog | null; message: string } {
    const logs = this.getActivityLogs();
    const index = logs.findIndex((l) => l.id === logId);
    if (index === -1) return { success: false, log: null, message: 'Log record not found' };

    const target = logs[index];
    const settings = this.getSettings();

    // Check if simulation failure toggle is forced
    const willFail = settings.enableSimulatedFailures && Math.random() < 0.5;

    const updatedLog: EmailActivityLog = {
      ...target,
      status: willFail ? 'failed' : 'delivered',
      errorReason: willFail ? 'Simulated SMTP Timeout: Mail server busy. Try again.' : undefined,
      retryCount: (target.retryCount || 0) + 1,
      timestamp: new Date().toISOString()
    };

    const updatedList = [...logs];
    updatedList[index] = updatedLog;
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updatedList));

    return {
      success: !willFail,
      log: updatedLog,
      message: willFail ? 'Retry simulation failed.' : 'Retry simulation delivered successfully!'
    };
  }

  // Get Settings
  getSettings(): EmailSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read email settings from storage', e);
    }
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_EMAIL_SETTINGS));
    return DEFAULT_EMAIL_SETTINGS;
  }

  saveSettings(settings: EmailSettings): EmailSettings {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return settings;
  }

  // Reset to initial demo data
  resetAllDemoData(): void {
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(SEED_EMAIL_TEMPLATES));
    localStorage.setItem(STORAGE_KEYS.TRIGGERS, JSON.stringify(SEED_EMAIL_TRIGGERS));
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(SEED_EMAIL_CAMPAIGNS));
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(SEED_EMAIL_LOGS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_EMAIL_SETTINGS));
  }

  // Render template with variable dictionary
  renderContent(
    template: { subject: string; htmlBody: string; textBody: string },
    data: Record<string, string> = {}
  ): { subject: string; html: string; text: string } {
    const settings = this.getSettings();

    const mergedDict: Record<string, string> = {
      hospital_name: 'CityCare Family Clinic',
      admin_name: 'Dr. Aarav Mehta',
      doctor_name: 'Dr. Rohan Deshmukh',
      patient_name: 'Ananya Sharma',
      plan_name: 'Professional Multi-Specialty',
      subscription_start_date: '2026-10-01',
      subscription_end_date: '2027-10-01',
      payment_amount: '₹69,990',
      transaction_id: `TXN-${Math.floor(10000 + Math.random() * 90000)}-CP`,
      feature_name: 'Online Patient Self-Booking Portal',
      feature_description: 'Allows patients to book real-time OPD appointments through a verified mobile portal with instant WhatsApp confirmations.',
      release_date: 'November 1, 2026',
      action_url: 'https://clinicos.app/dashboard',
      company_name: settings.companyName,
      support_email: settings.supportEmail,
      ...data
    };

    let subject = template.subject || '';
    let html = template.htmlBody || '';
    let text = template.textBody || '';

    Object.entries(mergedDict).forEach(([key, val]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      subject = subject.replace(regex, val);
      html = html.replace(regex, val);
      text = text.replace(regex, val);
    });

    return { subject, html, text };
  }

  // Event-Based Trigger Simulation Engine
  simulateEventTrigger(
    eventKey: string,
    eventPayload: {
      clinicName?: string;
      clinicId?: string;
      recipientName?: string;
      recipientEmail?: string;
      planName?: string;
      amount?: string;
      transactionId?: string;
      customVariables?: Record<string, string>;
<<<<<<< HEAD
      themeId?: string;
      themeName?: string;
=======
>>>>>>> origin/main
    } = {}
  ): {
    success: boolean;
    status: 'delivered' | 'skipped' | 'failed';
    message: string;
    log?: EmailActivityLog;
  } {
    const triggers = this.getTriggers();
    const trigger = triggers.find((t) => t.eventKey === eventKey);

    if (!trigger) {
      return {
        success: false,
        status: 'skipped',
        message: `No trigger configured for event "${eventKey}".`
      };
    }

    if (!trigger.enabled) {
      const skippedLog = this.addActivityLog({
        subject: `[Skipped] Event ${eventKey}`,
        recipientName: eventPayload.recipientName || 'Clinic Admin',
        recipientEmail: eventPayload.recipientEmail || 'admin@clinic.demo',
        clinicName: eventPayload.clinicName || 'CityCare Family Clinic',
        clinicId: eventPayload.clinicId,
        eventKey,
        templateName: 'Trigger Disabled',
        source: 'automation',
        status: 'skipped',
        errorReason: `Automation Trigger "${trigger.name}" is currently disabled.`
      });

      return {
        success: false,
        status: 'skipped',
        message: `Trigger "${trigger.name}" is disabled. Simulated email was skipped.`,
        log: skippedLog
      };
    }

    const templates = this.getTemplates();
    const template = templates.find((t) => t.id === trigger.selectedTemplateId);

    if (!template) {
      return {
        success: false,
        status: 'failed',
        message: `Configured template for "${trigger.name}" was deleted or missing.`
      };
    }

    if (template.status !== 'active') {
      const skippedLog = this.addActivityLog({
        subject: `[Blocked] ${template.name}`,
        recipientName: eventPayload.recipientName || 'Clinic Admin',
        recipientEmail: eventPayload.recipientEmail || 'admin@clinic.demo',
        clinicName: eventPayload.clinicName || 'CityCare Family Clinic',
        clinicId: eventPayload.clinicId,
        eventKey,
        templateId: template.id,
        templateName: template.name,
        source: 'automation',
        status: 'skipped',
        errorReason: `Associated email template "${template.name}" is marked Inactive.`
      });

      return {
        success: false,
        status: 'skipped',
        message: `Template "${template.name}" is Inactive. Simulated email was not sent.`,
        log: skippedLog
      };
    }

    // Render Template
    const rendered = this.renderContent(template, {
      hospital_name: eventPayload.clinicName || 'CityCare Family Clinic',
      admin_name: eventPayload.recipientName || 'Dr. Aarav Mehta',
      plan_name: eventPayload.planName || 'Professional Multi-Specialty',
      payment_amount: eventPayload.amount || '₹69,990',
      transaction_id: eventPayload.transactionId || `TXN-${Math.floor(10000 + Math.random() * 90000)}-CP`,
      ...eventPayload.customVariables
    });

    // Check simulated failure settings
    const settings = this.getSettings();
    const isSimulatedFailure = settings.enableSimulatedFailures && Math.random() < 0.2;

    const log = this.addActivityLog({
      subject: rendered.subject,
      recipientName: eventPayload.recipientName || 'Dr. Aarav Mehta',
      recipientEmail: eventPayload.recipientEmail || 'care@citycare.demo',
      clinicName: eventPayload.clinicName || 'CityCare Family Clinic',
      clinicId: eventPayload.clinicId || 'clinic-citycare',
      eventKey,
      templateId: template.id,
      templateName: template.name,
      source: 'automation',
      status: isSimulatedFailure ? 'failed' : 'delivered',
      errorReason: isSimulatedFailure ? 'Simulated Delivery Failure: Transient mail server timeout' : undefined,
      renderedHtml: rendered.html,
<<<<<<< HEAD
      renderedText: rendered.text,
      themeId: eventPayload.themeId,
      themeName: eventPayload.themeName
=======
      renderedText: rendered.text
>>>>>>> origin/main
    });

    // Update trigger metrics
    trigger.lastTriggeredAt = new Date().toISOString();
    trigger.totalTriggeredCount = (trigger.totalTriggeredCount || 0) + 1;
    this.saveTrigger(trigger);

<<<<<<< HEAD
    const themeSuffix = eventPayload.themeName ? ` using ${eventPayload.themeName} theme` : '';

=======
>>>>>>> origin/main
    return {
      success: !isSimulatedFailure,
      status: isSimulatedFailure ? 'failed' : 'delivered',
      message: isSimulatedFailure
        ? `Simulated email failure recorded for event "${eventKey}".`
<<<<<<< HEAD
        : `Simulated email "${rendered.subject}" dispatched successfully to ${log.recipientEmail}${themeSuffix}!`,
=======
        : `Simulated email "${rendered.subject}" dispatched successfully to ${log.recipientEmail}!`,
>>>>>>> origin/main
      log
    };
  }

  // Execute Campaign Simulation
  executeCampaignSimulation(
    campaignId: string,
    targetClinics: Array<{ id: string; name: string; email: string; ownerName: string; planId?: string }>
  ): { success: boolean; count: number; message: string } {
    const campaigns = this.getCampaigns();
    const campaign = campaigns.find((c) => c.id === campaignId);
    if (!campaign) return { success: false, count: 0, message: 'Campaign not found' };

    const templates = this.getTemplates();
    const template = templates.find((t) => t.id === campaign.selectedTemplateId) || templates[0];

    // Filter target audience
    let eligible = targetClinics;
    if (campaign.targetAudience.type === 'plans' && campaign.targetAudience.planIds.length > 0) {
      eligible = targetClinics.filter((c) => campaign.targetAudience.planIds.includes(c.planId || 'starter'));
    } else if (campaign.targetAudience.type === 'clinics' && campaign.targetAudience.clinicIds.length > 0) {
      eligible = targetClinics.filter((c) => campaign.targetAudience.clinicIds.includes(c.id));
    }

    if (eligible.length === 0) {
      return { success: false, count: 0, message: 'No eligible clinics matched the campaign audience criteria.' };
    }

    // Generate simulated logs for each recipient
    let deliveredCount = 0;
    eligible.forEach((clinic) => {
      const rendered = this.renderContent(template, {
        hospital_name: clinic.name,
        admin_name: clinic.ownerName || 'Medical Director',
        feature_name: campaign.featureName,
        feature_description: campaign.featureDescription,
        release_date: campaign.releaseDate,
        action_url: campaign.actionUrl
      });

      this.addActivityLog({
        subject: rendered.subject,
        recipientName: clinic.ownerName || 'Medical Director',
        recipientEmail: clinic.email || 'admin@clinic.demo',
        clinicName: clinic.name,
        clinicId: clinic.id,
        eventKey: 'feature.published',
        templateId: template.id,
        templateName: template.name,
        source: 'campaign',
        status: 'delivered',
        renderedHtml: rendered.html,
        renderedText: rendered.text
      });
      deliveredCount++;
    });

    // Update campaign state
    campaign.status = 'completed';
    campaign.completedAt = new Date().toISOString();
    campaign.simulatedRecipientCount = eligible.length;
    campaign.totalSimulatedDelivered = deliveredCount;
    this.saveCampaign(campaign);

    return {
      success: true,
      count: deliveredCount,
      message: `Campaign simulated successfully for ${deliveredCount} clinic recipient(s)!`
    };
  }
}

export const emailService = new EmailNotificationService();

