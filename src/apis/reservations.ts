import axiosInstance from './axiosInstance';
import type { ApiResponse, CreateReservationRequest, ReservationResponse } from './types';

// GET /api/reservations - 내 예약 목록 조회
export const getMyReservations = async (): Promise<ReservationResponse[]> => {
  try {
    const response = await axiosInstance.get('/api/reservations');
    // API 응답이 래퍼 구조인지 확인
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data;
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '예약 목록 조회에 실패했습니다.');
  }
};

// POST /api/reservations - 예약 생성
export const createReservation = async (data: CreateReservationRequest): Promise<ReservationResponse> => {
  try {
    const response = await axiosInstance.post('/api/reservations', data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '예약 생성에 실패했습니다.');
  }
};

// POST /api/reservations/board - QR코드를 이용한 탑승 처리
export const boardReservation = async (qrCode: string): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post('/api/reservations/board', null, {
      params: { qrCode },
    });
    // API 응답이 래퍼 구조인지 확인
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data;
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '탑승 처리에 실패했습니다.');
  }
};

// GET /api/reservations/{reservationId} - 예약 상세 정보 조회
export const getReservationDetail = async (reservationId: number): Promise<ReservationResponse> => {
  try {
    const response = await axiosInstance.get(`/api/reservations/${reservationId}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '예약 상세 정보 조회에 실패했습니다.');
  }
};

// DELETE /api/reservations/{reservationId} - 예약 취소
export const cancelReservation = async (reservationId: number): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.delete(`/api/reservations/${reservationId}`);
    // API 응답이 래퍼 구조인지 확인
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data;
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '예약 취소에 실패했습니다.');
  }
};
