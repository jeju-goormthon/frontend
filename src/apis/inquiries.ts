import axiosInstance from './axiosInstance';
import type { AnswerInquiryRequest, ApiResponse, CreateInquiryRequest, InquiryResponse } from './types';

// GET /api/inquiries - 내 문의 목록 조회
export const getMyInquiries = async (): Promise<InquiryResponse[]> => {
  try {
    const response = await axiosInstance.get('/api/inquiries');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '문의 목록 조회에 실패했습니다.');
  }
};

// POST /api/inquiries - 문의 생성
export const createInquiry = async (data: CreateInquiryRequest): Promise<InquiryResponse> => {
  try {
    const response = await axiosInstance.post('/api/inquiries', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '문의 생성에 실패했습니다.');
  }
};

// POST /api/inquiries/{inquiryId}/answer - 문의 답변 등록 (관리자)
export const answerInquiry = async (inquiryId: number, data: AnswerInquiryRequest): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post(`/api/inquiries/${inquiryId}/answer`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '문의 답변 등록에 실패했습니다.');
  }
};

// GET /api/inquiries/{inquiryId} - 문의 상세 정보 조회
export const getInquiryDetail = async (inquiryId: number): Promise<InquiryResponse> => {
  try {
    const response = await axiosInstance.get(`/api/inquiries/${inquiryId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '문의 상세 정보 조회에 실패했습니다.');
  }
};

// GET /api/inquiries/admin/all - 모든 문의 조회 (관리자)
export const getAllInquiries = async (): Promise<InquiryResponse[]> => {
  try {
    const response = await axiosInstance.get('/api/inquiries/admin/all');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '모든 문의 조회에 실패했습니다.');
  }
};
