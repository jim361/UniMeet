export type GlobalRole =
  | 'MEMBER'
  | 'OPERATOR_PENDING'
  | 'OPERATOR'
  | 'SUPER_ADMIN_PENDING'
  | 'SUPER_ADMIN';

export type ClubLanguage = 'ko' | 'en' | 'both';
export type ApplicationStatus = 'PENDING' | 'REVIEWING' | 'ACCEPTED' | 'REJECTED';
export type FieldType =
  | 'SHORT_TEXT'
  | 'LONG_TEXT'
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'FILE';

export type User = {
  id: string;
  email: string;
  name: string;
  studentId: string;
  department: string;
  nationality: string;
  language: 'ko' | 'en';
  globalRole: GlobalRole;
};

export type Club = {
  id: string;
  name: string;
  englishName: string;
  category: string;
  description: string;
  descriptionTranslations: Partial<Record<'en' | 'ja' | 'zh' | 'vi', string>>;
  tagline: string;
  taglineTranslations: Partial<Record<'en' | 'ja' | 'zh' | 'vi', string>>;
  tags: string[];
  language: ClubLanguage;
  isRecruiting: boolean;
  safetyBadgeStatus: 'NONE' | 'PENDING_REVIEW' | 'VERIFIED';
  members: number;
  imageUrl: string;
  meetingInfo: string;
  meetingInfoTranslations: Partial<Record<'en' | 'ja' | 'zh' | 'vi', string>>;
  recruitInfo: string;
  recruitInfoTranslations: Partial<Record<'en' | 'ja' | 'zh' | 'vi', string>>;
  recentActivities: string[];
  recentActivityTranslations: Partial<Record<'en' | 'ja' | 'zh' | 'vi', string[]>>;
};

export type ApplicationField = {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  order: number;
  options?: string[];
};

export type Application = {
  id: string;
  clubId: string;
  applicantName: string;
  applicantStudentId: string;
  status: ApplicationStatus;
  submittedAt: string;
  formSnapshot: ApplicationField[];
};

export type Notification = {
  id: string;
  type: 'APPLICATION_STATUS' | 'ADMIN_APPROVAL' | 'NOTICE' | 'SYSTEM';
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
};
