import axiosInstance from './axiosInstance';
import type { RouteResponse } from './types';

// GET /api/routes/list - 노선 목록 조회
export const getRoutes = async (sortBy: string = 'default'): Promise<RouteResponse[]> => {
  try {
    const response = await axiosInstance.get('/api/routes/list', {
      params: { sortBy },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '노선 목록 조회에 실패했습니다.');
  }
};

// GET /api/routes/{routeId} - 노선 상세 정보 조회
export const getRouteDetail = async (routeId: number): Promise<RouteResponse> => {
  try {
    const response = await axiosInstance.get(`/api/routes/${routeId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '노선 상세 정보 조회에 실패했습니다.');
  }
};
