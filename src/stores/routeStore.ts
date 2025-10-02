import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { PaymentMethod, RouteResponse } from '@/apis/types';

interface RouteSelectionState {
  // Route selection state
  selectedDate: Date | null;
  selectedRoute: RouteResponse | null;
  sortBy: string;

  // Payment state
  paymentMethod: 'ticket' | 'general';
  paymentService: 'kakao' | 'toss';
  hasTicket: boolean;

  // Reservation state
  reservationData: {
    routeId?: number;
    reservationId?: number;
    reservationDate?: string;
    paymentMethod?: PaymentMethod;
    amount?: number;
  } | null;

  // Actions
  setSelectedDate: (date: Date | null) => void;
  setSelectedRoute: (route: RouteResponse | null) => void;
  setSortBy: (sortBy: string) => void;
  setPaymentMethod: (method: 'ticket' | 'general') => void;
  setPaymentService: (service: 'kakao' | 'toss') => void;
  setHasTicket: (hasTicket: boolean) => void;
  setReservationData: (data: RouteSelectionState['reservationData']) => void;

  // Reset functions
  resetRouteSelection: () => void;
  resetPaymentState: () => void;
  clearAll: () => void;
}

export const useRouteStore = create<RouteSelectionState>()(
  persist(
    (set) => ({
      // Initial state
      selectedDate: new Date(),
      selectedRoute: null,
      sortBy: 'default',
      paymentMethod: 'general',
      paymentService: 'kakao',
      hasTicket: false,
      reservationData: null,

      // Route selection actions
      setSelectedDate: (date) => set({ selectedDate: date }),
      setSelectedRoute: (route) => set({ selectedRoute: route }),
      setSortBy: (sortBy) => set({ sortBy }),

      // Payment actions
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setPaymentService: (service) => set({ paymentService: service }),
      setHasTicket: (hasTicket) => set({ hasTicket }),

      // Reservation actions
      setReservationData: (data) => set({ reservationData: data }),

      // Reset functions
      resetRouteSelection: () =>
        set({
          selectedRoute: null,
          sortBy: 'default',
        }),
      resetPaymentState: () =>
        set({
          paymentMethod: 'general',
          paymentService: 'kakao',
        }),
      clearAll: () =>
        set({
          selectedDate: new Date(),
          selectedRoute: null,
          sortBy: 'default',
          paymentMethod: 'general',
          paymentService: 'kakao',
          hasTicket: false,
          reservationData: null,
        }),
    }),
    {
      name: 'route-selection-storage',
      partialize: (state) => ({
        selectedDate: state.selectedDate,
        selectedRoute: state.selectedRoute,
        paymentMethod: state.paymentMethod,
        paymentService: state.paymentService,
        hasTicket: state.hasTicket,
        reservationData: state.reservationData,
      }),
    },
  ),
);
