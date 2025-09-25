import axiosInstance from './axiosInstance';
import type { ApiResponse, PaymentConfirmRequest, PaymentConfirmResponse, PaymentResponse } from './types';

// POST /api/payments/confirm - 결제 확인
export const confirmPayment = async (data: PaymentConfirmRequest): Promise<ApiResponse<PaymentConfirmResponse>> => {
  try {
    const response = await axiosInstance.post('/api/payments/confirm', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '결제 확인에 실패했습니다.');
  }
};

// GET /api/payments - 내 결제 내역 조회
export const getMyPayments = async (): Promise<PaymentResponse[]> => {
  try {
    const response = await axiosInstance.get('/api/payments');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '결제 내역 조회에 실패했습니다.');
  }
};

// GET /api/payments/{paymentId} - 결제 상세 정보 조회
export const getPaymentDetail = async (paymentId: number): Promise<PaymentResponse> => {
  try {
    const response = await axiosInstance.get(`/api/payments/${paymentId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '결제 상세 정보 조회에 실패했습니다.');
  }
};
