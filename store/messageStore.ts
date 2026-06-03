import { create } from 'zustand';

export interface Message {
  id: string;
  clubId: string;
  clubName: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  type: 'ACCEPTED' | 'REJECTED';
}

type MessageState = {
  messages: Message[];
  unreadCount: () => number;
  addMessage: (msg: Omit<Message, 'id' | 'isRead' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteMessage: (id: string) => void;
};

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],

  unreadCount: () => get().messages.filter((m) => !m.isRead).length,

  addMessage: (msg) => {
    set((state) => ({
      messages: [
        {
          ...msg,
          id: `msg-${Date.now()}`,
          isRead: false,
          createdAt: new Date().toLocaleDateString('ko-KR'),
        },
        ...state.messages,
      ],
    }));
  },

  markAsRead: (id) =>
    set((state) => ({
      messages: state.messages.map((m) => (m.id === id ? { ...m, isRead: true } : m)),
    })),

  markAllAsRead: () =>
    set((state) => ({
      messages: state.messages.map((m) => ({ ...m, isRead: true })),
    })),

  deleteMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== id),
    })),
}));
