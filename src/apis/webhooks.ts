import axiosInstance from './axiosInstance';
import type { ApiResponse, KakaoWebhookPayload, TossWebhookPayload } from './types';

// POST /webhook/payments/toss - Toss 결제 웹훅
// 주의: 이 함수는 실제로 프론트엔드에서 호출되지 않으며, Toss 시스템에서 백엔드로 직접 호출됩니다.
// 여기서는 타입 참조 및 문서화 목적으로만 정의합니다.
export const tossWebhook = async (data: TossWebhookPayload): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post('/webhook/payments/toss', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Toss 웹훅 처리에 실패했습니다.');
  }
};

// POST /webhook/payments/kakao - 카카오페이 결제 웹훅
// 주의: 이 함수는 실제로 프론트엔드에서 호출되지 않으며, 카카오페이 시스템에서 백엔드로 직접 호출됩니다.
// 여기서는 타입 참조 및 문서화 목적으로만 정의합니다.
export const kakaoWebhook = async (data: KakaoWebhookPayload): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post('/webhook/payments/kakao', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '카카오페이 웹훅 처리에 실패했습니다.');
  }
};
