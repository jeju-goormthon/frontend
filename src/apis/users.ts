import axiosInstance from './axiosInstance';
import type {
  ApiResponse,
  SendVerificationRequest,
  TokenResponse,
  UpdateMedicalDepartmentRequest,
  UpdatePhoneNumberRequest,
  UserResponse,
  VerifyCodeRequest,
} from './types';

// POST /api/auth/login - 전화번호 로그인
export const sendVerificationCode = async (data: SendVerificationRequest): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post('/api/auth/login', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '인증코드 발송에 실패했습니다.');
  }
};

// POST /api/auth/login/verify - 인증코드 확인 및 로그인
export const verifyLogin = async (data: VerifyCodeRequest): Promise<TokenResponse> => {
  try {
    const response = await axiosInstance.post('/api/auth/login/verify', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
  }
};

// PATCH /api/auth/phone-number - 전화번호 변경
export const updatePhoneNumber = async (data: UpdatePhoneNumberRequest): Promise<TokenResponse> => {
  try {
    const response = await axiosInstance.patch('/api/auth/phone-number', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '전화번호 변경에 실패했습니다.');
  }
};

// PATCH /api/auth/medical-department - 진료과목 변경
export const updateMedicalDepartment = async (data: UpdateMedicalDepartmentRequest): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.patch('/api/auth/medical-department', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '진료과목 변경에 실패했습니다.');
  }
};

// GET /api/auth/me - 내 정보 조회
export const getMyInfo = async (): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.get('/api/auth/me');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '사용자 정보 조회에 실패했습니다.');
  }
};
