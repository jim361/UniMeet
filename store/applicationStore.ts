import { create } from 'zustand';
import { myApplications as initialApplications, leaderApplications as initialLeaderApplications } from '@/data/mock';
import { Application } from '@/types';

type ApplicationState = {
  myApplications: Application[];
  leaderApplications: Application[];
  hasApplied: (clubId: string) => boolean;
  submitApplication: (application: Application) => void;
  decideApplication: (applicationId: string, status: 'ACCEPTED' | 'REJECTED') => void;
};

export const useApplicationStore = create<ApplicationState>((set, get) => ({
  myApplications: initialApplications,
  leaderApplications: initialLeaderApplications,
  hasApplied: (clubId: string) => {
    return get().myApplications.some((app) => app.clubId === clubId);
  },
  submitApplication: (application: Application) => {
    set((state) => ({
      myApplications: [application, ...state.myApplications],
    }));
  },
  decideApplication: (applicationId: string, status: 'ACCEPTED' | 'REJECTED') => {
    set((state) => ({
      leaderApplications: state.leaderApplications.map((app) =>
        app.id === applicationId ? { ...app, status } : app,
      ),
      myApplications: state.myApplications.map((app) =>
        app.id === applicationId ? { ...app, status } : app,
      ),
    }));
  },
}));
