import { create } from 'zustand';
import { notifications as initialNotifications } from '@/data/mock';
import { Notification } from '@/types';

type NotificationState = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  sendApplicationResult: (clubName: string, status: 'ACCEPTED' | 'REJECTED') => void;
  addNotification: (payload: {
    userId: string;
    type: string;
    title: string;
    message: string;
    clubId: string;
    clubName: string;
    applicationId: string;
  }) => void;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: initialNotifications,
  get unreadCount() {
    return get().notifications.filter((n) => !n.isRead).length;
  },
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),
  deleteNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  sendApplicationResult: (clubName: string, status: 'ACCEPTED' | 'REJECTED') => {
    const isAccepted = status === 'ACCEPTED';
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      type: 'APPLICATION_STATUS',
      title: isAccepted ? '동아리 가입 완료' : '동아리 지원 결과',
      body: isAccepted
        ? `축하합니다. ${clubName} 가입 완료되었습니다.`
        : `${clubName}에 지원해주셔서 감사합니다. 아쉽지만 다음 기회에 도전해주세요.`,
      detail: isAccepted
        ? `${clubName} 동아리에 정식 가입되었습니다.`
        : `${clubName} 지원 결과, 이번에는 함께하지 못하게 되었습니다.`,
      actionLabel: '지원내역 확인',
      actionHref: '/(tabs)/applications',
      createdAt: new Date().toLocaleDateString('ko-KR'),
      isRead: false,
    };
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));
  },
  addNotification: (payload) => {
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      type: payload.type,
      title: payload.title,
      body: payload.message,
      detail: payload.message,
      actionLabel: '지원내역 확인',
      actionHref: '/(tabs)/applications',
      createdAt: new Date().toLocaleDateString('ko-KR'),
      isRead: false,
    };
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));
  },
}));
