import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MedicalDepartment } from '@/apis/types';
import { updateMedicalDepartment } from '@/apis/users';
import { useAuthStore } from '@/stores/authStore';

export const useMedicalDepartmentUpdate = () => {
  const queryClient = useQueryClient();
  const { setMedicalDepartment, setUser } = useAuthStore();

  return useMutation({
    mutationFn: (medicalDepartment: MedicalDepartment) => updateMedicalDepartment({ medicalDepartment }),
    onSuccess: (_, medicalDepartment) => {
      // Zustand 스토어 업데이트
      setMedicalDepartment(medicalDepartment);

      // React Query 캐시 업데이트
      queryClient.setQueryData(['auth', 'me'], (oldData: any) => {
        if (oldData) {
          const updatedUser = { ...oldData, medicalDepartment };
          setUser(updatedUser);
          return updatedUser;
        }
        return oldData;
      });

      // 캐시 무효화하여 최신 데이터 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
    onError: (error: any) => {
      console.error('의료과목 업데이트 실패:', error);
    },
  });
};
