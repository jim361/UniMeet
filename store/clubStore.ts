import { create } from 'zustand';
import { clubs as initialClubs } from '@/data/mock';
import { Club } from '@/types';

type ClubState = {
  clubs: Club[];
  addClub: (club: Club) => void;
};

export const useClubStore = create<ClubState>((set) => ({
  clubs: initialClubs,
  addClub: (club: Club) => {
    set((state) => ({
      clubs: [club, ...state.clubs],
    }));
  },
}));
