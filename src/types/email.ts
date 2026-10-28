export type EmailRecipientType = 
  | 'hospital_admin' 
  | 'doctor' 
  | 'staff' 
  | 'patient' 
  | 'platform_admin' 
  | 'custom';

export type EmailTemplateCategory = 
  | 'Onboarding & Activation'
  | 'Subscription & Billing'
  | 'Clinical & Operations'
  | 'System & Security'
  | 'Feature Announcements';

export type EmailDeliveryStatus = 
  | 'delivered' 
  | 'sent' 
  | 'queued' 
  | 'failed' 
  | 'skipped';

export type EmailSourceType = 
  | 'automation' 
  | 'campaign' 
  | 'test_simulation';

export interface EmailTemplate {
  id: string;
  key: string;
  name: string;
  category: EmailTemplateCategory;
  subject: string;
  htmlBody: string;
  textBody: string;
  recipientType: EmailRecipientType;
  associatedTriggerKey?: string;
  status: 'active' | 'inactive';
  supportedVariables: string[];
  createdAt: string;
  updatedAt: string;
  isPrebuilt?: boolean;
}

export interface EmailTrigger {
  id: string;
  eventKey: string;
  name: string;
  description: string;
  selectedTemplateId: string;
  recipientType: EmailRecipientType;
  conditionDescription: string;
  enabled: boolean;
  lastTriggeredAt?: string;
  totalTriggeredCount: number;
}

export interface EmailCampaign {
  id: string;
  name: string;
  featureName: string;
  featureDescription: string;
  keyBenefits: string[];
  releaseDate: string;
  actionUrl: string;
  selectedTemplateId: string;
  targetAudience: {
    type: 'all' | 'plans' | 'clinics' | 'roles';
    planIds: string[];
    clinicIds: string[];
    roles: string[];
  };
  status: 'draft' | 'scheduled' | 'processing' | 'completed' | 'failed' | 'cancelled';
  scheduledAt?: string;
  completedAt?: string;
  createdAt: string;
  simulatedRecipientCount: number;
  totalSimulatedDelivered: number;
}

export interface EmailActivityLog {
  id: string;
  subject: string;
  recipientName: string;
  recipientEmail: string;
  clinicName: string;
  clinicId?: string;
  eventKey: string;
  templateId?: string;
  templateName: string;
  source: EmailSourceType;
  timestamp: string;
  status: EmailDeliveryStatus;
  errorReason?: string;
  renderedHtml?: string;
  renderedText?: string;
  retryCount?: number;
  themeId?: string;
  themeName?: string;

}

export interface EmailSettings {
  senderDisplayName: string;
  senderEmail: string;
  replyToEmail: string;
  companyName: string;
  supportEmail: string;
  defaultFooter: string;
  testRecipientEmail: string;
  enableSimulatedFailures: boolean;
  defaultNotificationPreferences: {
    operationalRequired: boolean;
    promotionalOptIn: boolean;
  };
}

