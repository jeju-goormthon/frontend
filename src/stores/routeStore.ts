import { create } from 'zustand';

import type { RouteResponse } from '@/apis/types';

interface RouteState {
  selectedRoute: RouteResponse | null;
  selectedDate: string | null;
  setSelectedRoute: (route: RouteResponse | null) => void;
  setSelectedDate: (date: string | null) => void;
  clearRoute: () => void;
}

export const useRouteStore = create<RouteState>((set) => ({
  selectedRoute: null,
  selectedDate: null,

  setSelectedRoute: (route) => set({ selectedRoute: route }),
  setSelectedDate: (date) => set({ selectedDate: date }),

  clearRoute: () =>
    set({
      selectedRoute: null,
      selectedDate: null,
    }),
}));
