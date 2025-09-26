import axiosInstance from '../axiosInstance';
import type { ReservationResponse } from '../types';

// GET /api/admin/reservations - 모든 예약 조회 (관리자)
export const getAllReservations = async (): Promise<ReservationResponse[]> => {
  try {
    const response = await axiosInstance.get('/api/admin/reservations');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '모든 예약 조회에 실패했습니다.');
  }
};
