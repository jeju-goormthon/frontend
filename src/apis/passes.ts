import axiosInstance from './axiosInstance';
import type { ApiResponse, PassResponse, PurchasePassRequest } from './types';

// POST /api/passes/purchase - 정기권 구매
export const purchasePass = async (data: PurchasePassRequest): Promise<PassResponse> => {
  try {
    const response = await axiosInstance.post('/api/passes/purchase', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '정기권 구매에 실패했습니다.');
  }
};

// GET /api/passes - 내 정기권 목록 조회
export const getMyPasses = async (): Promise<PassResponse[]> => {
  try {
    const response = await axiosInstance.get('/api/passes');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '정기권 목록 조회에 실패했습니다.');
  }
};

// GET /api/passes/check - 정기권 보유 여부 확인
export const checkActivePass = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get('/api/passes/check');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '정기권 보유 여부 확인에 실패했습니다.');
  }
};

// GET /api/passes/active - 활성 정기권 조회
export const getActivePass = async (): Promise<PassResponse> => {
  try {
    const response = await axiosInstance.get('/api/passes/active');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '활성 정기권 조회에 실패했습니다.');
  }
};

// DELETE /api/passes/{passId} - 정기권 취소
export const cancelPass = async (passId: number): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.delete(`/api/passes/${passId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '정기권 취소에 실패했습니다.');
  }
};
