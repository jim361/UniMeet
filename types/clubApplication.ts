// types/clubApplication.ts

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface ClubApplication {
  id: string;
  clubId: string;
  clubName: string;
  clubImageUrl?: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  motivation: string;
  experience?: string;
  availability?: string;
  status: ApplicationStatus;
  appliedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export type NotificationType =
  | "APPLICATION_APPROVED"
  | "APPLICATION_REJECTED"
  | "NEW_APPLICATION";

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  clubId?: string;
  clubName?: string;
  applicationId?: string;
  isRead: boolean;
  createdAt: string;
}
