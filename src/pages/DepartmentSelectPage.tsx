import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { MedicalDepartment } from '@/apis/types';
import BackHeader from '@/components/BackHeader';
import DeptSelectMsg from '@/components/department/DeptSelectMsg';
import MedicalDeptSelect from '@/components/department/MedicalDeptSelect';
import NavButton from '@/components/NavButton';
import { useMedicalDepartmentUpdate } from '@/hooks/useMedicalDepartment';
import { useAuthStore } from '@/stores/authStore';

export default function DepartmentSelectPage() {
  const navigate = useNavigate();
  const { medicalDepartment } = useAuthStore();

  const [selectedDepartment, setSelectedDepartment] = useState<MedicalDepartment>(
    medicalDepartment || 'INTERNAL_MEDICINE',
  );

  const updateDepartmentMutation = useMedicalDepartmentUpdate();

  const handleSave = async () => {
    try {
      await updateDepartmentMutation.mutateAsync(selectedDepartment);
      navigate('/');
    } catch (error) {
      console.error('진료과목 저장 실패:', error);
      alert('진료과목 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='sticky top-0 z-60'>
        <BackHeader title='진료과목 선택' />
      </div>

      <div className='flex-1 overflow-y-auto p-6'>
        <DeptSelectMsg />
        <MedicalDeptSelect value={selectedDepartment} onChange={setSelectedDepartment} />
      </div>
      <div className='sticky bottom-0 z-50 bg-white px-6 pt-3 pb-3 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)]'>
        <NavButton
          disabled={updateDepartmentMutation.isPending}
          label={updateDepartmentMutation.isPending ? '저장 중...' : '저장'}
          onClick={handleSave}
        />
      </div>
    </div>
  );
}
