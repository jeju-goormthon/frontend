import type { InternalAxiosRequestConfig } from 'axios';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://api-donghang.klr.kr';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 로컬스토리지에서 토큰 가져오기
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 토큰이 만료되거나 유효하지 않은 경우
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // 로그인 페이지로 리다이렉트 (필요시)
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
