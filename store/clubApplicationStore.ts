// store/clubApplicationStore.ts
import { create } from "zustand";
import { ClubApplication, ApplicationStatus } from "@/types/clubApplication";
import { useNotificationStore } from "@/store/notificationStore";

interface ClubApplicationState {
  applications: ClubApplication[];

  submitApplication: (
    payload: Omit
      ClubApplication,
      "id" | "appliedAt" | "status" | "reviewedAt" | "reviewedBy"
    >
  ) => ClubApplication;

  getApplicationsByClub: (clubId: string) => ClubApplication[];
  approveApplication: (applicationId: string, adminId: string) => void;
  rejectApplication: (applicationId: string, adminId: string) => void;
  getMyApplications: (userId: string) => ClubApplication[];
  hasApplied: (userId: string, clubId: string) => boolean;
}

export const useClubApplicationStore = create<ClubApplicationState>(
  (set, get) => ({
    applications: [],

    submitApplication: (payload) => {
      const newApp: ClubApplication = {
        ...payload,
        id: `app_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        status: "pending",
        appliedAt: new Date().toISOString(),
      };

      set((state) => ({
        applications: [newApp, ...state.applications],
      }));

      // 관리자에게 알림 전송
      useNotificationStore.getState().addNotification({
        userId: `admin_${payload.clubId}`,
        type: "NEW_APPLICATION",
        title: "새 가입 신청",
        message: `${payload.applicantName}님이 ${payload.clubName}에 가입 신청하였습니다.`,
        clubId: payload.clubId,
        clubName: payload.clubName,
        applicationId: newApp.id,
      });

      return newApp;
    },

    getApplicationsByClub: (clubId) => {
      return get().applications.filter((a) => a.clubId === clubId);
    },

    approveApplication: (applicationId, adminId) => {
      const app = get().applications.find((a) => a.id === applicationId);
      if (!app || app.status !== "pending") return;

      set((state) => ({
        applications: state.applications.map((a) =>
          a.id === applicationId
            ? {
                ...a,
                status: "approved" as ApplicationStatus,
                reviewedAt: new Date().toISOString(),
                reviewedBy: adminId,
              }
            : a
        ),
      }));

      // ✅ 승인 알림
      useNotificationStore.getState().addNotification({
        userId: app.applicantId,
        type: "APPLICATION_APPROVED",
        title: "동아리 가입 승인",
        message: `축하합니다. ${app.clubName} 가입 완료되었습니다. 🎉`,
        clubId: app.clubId,
        clubName: app.clubName,
        applicationId: app.id,
      });
    },

    rejectApplication: (applicationId, adminId) => {
      const app = get().applications.find((a) => a.id === applicationId);
      if (!app || app.status !== "pending") return;

      set((state) => ({
        applications: state.applications.map((a) =>
          a.id === applicationId
            ? {
                ...a,
                status: "rejected" as ApplicationStatus,
                reviewedAt: new Date().toISOString(),
                reviewedBy: adminId,
              }
            : a
        ),
      }));

      // ❌ 거절 알림
      useNotificationStore.getState().addNotification({
        userId: app.applicantId,
        type: "APPLICATION_REJECTED",
        title: "동아리 가입 결과",
        message: `${app.clubName}에 지원해주셔서 감사합니다. 아쉽지만 다음 기회에 도전해주세요.`,
        clubId: app.clubId,
        clubName: app.clubName,
        applicationId: app.id,
      });
    },

    getMyApplications: (userId) => {
      return get().applications.filter((a) => a.applicantId === userId);
    },

    hasApplied: (userId, clubId) => {
      return get().applications.some(
        (a) => a.applicantId === userId && a.clubId === clubId
      );
    },
  })
);
