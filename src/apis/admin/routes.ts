import axiosInstance from '../axiosInstance';
import type { ApiResponse, CreateRouteRequest, RouteResponse } from '../types';

// PUT /api/admin/routes/{routeId} - 노선 수정 (관리자)
export const updateRoute = async (routeId: number, data: CreateRouteRequest): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.put(`/api/admin/routes/${routeId}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '노선 수정에 실패했습니다.');
  }
};

// DELETE /api/admin/routes/{routeId} - 노선 삭제 (관리자)
export const deleteRoute = async (routeId: number): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.delete(`/api/admin/routes/${routeId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '노선 삭제에 실패했습니다.');
  }
};

// GET /api/admin/routes - 모든 노선 조회 (관리자)
export const getAllRoutes = async (): Promise<RouteResponse[]> => {
  try {
    const response = await axiosInstance.get('/api/admin/routes');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '모든 노선 조회에 실패했습니다.');
  }
};

// POST /api/admin/routes - 노선 생성 (관리자)
export const createRoute = async (data: CreateRouteRequest): Promise<RouteResponse> => {
  try {
    const response = await axiosInstance.post('/api/admin/routes', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '노선 생성에 실패했습니다.');
  }
};
