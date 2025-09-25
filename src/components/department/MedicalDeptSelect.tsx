// src/features/booking/MedicalDeptSelect.tsx
import { Box, Flex, Radio, RadioGroup, Text } from '@vapor-ui/core';
import { useState } from 'react';

import type { MedicalDepartment } from '@/apis/types';
import eye from '@/assets/icons/eye.svg?url';
import heart from '@/assets/icons/heart.svg?url';
import more from '@/assets/icons/more.svg?url';
import wave from '@/assets/icons/wave.svg?url';

type DeptItem = {
  id: MedicalDepartment;
  title: string;
  desc: string;
  iconUrl: string;
};

const ITEMS: DeptItem[] = [
  { id: 'INTERNAL_MEDICINE', title: '내과', desc: '감기, 소화불량, 혈압 등', iconUrl: heart },
  { id: 'OPHTHALMOLOGY', title: '안과', desc: '시력검사, 안구건조증 등', iconUrl: eye },
  { id: 'REHABILITATION', title: '재활의학과', desc: '물리치료, 도수치료 등', iconUrl: wave },
  { id: 'ENT', title: '기타', desc: '위에 해당되지 않는 경우', iconUrl: more },
];

interface MedicalDeptSelectProps {
  name?: string;
  value?: MedicalDepartment;
  onChange?: (value: MedicalDepartment) => void;
}

export default function MedicalDeptSelect({ name = 'dept', value, onChange }: MedicalDeptSelectProps) {
  const [internalValue, setInternalValue] = useState<MedicalDepartment>(value || ITEMS[0].id);

  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: MedicalDepartment) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <RadioGroup.Root
      aria-label='진료과목 선택'
      className='gap-v-150'
      name={name}
      value={currentValue}
      onValueChange={(val) => handleChange(val as MedicalDepartment)}
    >
      {ITEMS.map((item) => (
        <DeptCard key={item.id} checked={currentValue === item.id} item={item} onSelect={() => handleChange(item.id)} />
      ))}
    </RadioGroup.Root>
  );
}

function DeptCard({ item, checked, onSelect }: { item: DeptItem; checked: boolean; onSelect: () => void }) {
  const shadow = checked
    ? '0 0 0 1px rgba(49,116,220,0.04), 0 8px 20px rgba(0,0,0,0.04)'
    : 'inset 0 0 0 1px rgba(0,0,0,0.02)';

  return (
    <Box
      className='focus:ring-2 focus:ring-[#3174DC]/40'
      paddingX='$250'
      paddingY='$200'
      role='button'
      style={{
        background: checked ? '#F1F7FF' : '#fff',
        border: '1.5px solid',
        borderColor: checked ? '#3174DC' : '#F0F0F0',
        borderRadius: 'var(--vapor-size-borderRadius-500)',
        boxShadow: shadow,
        cursor: 'pointer',
        outline: 'none',
      }}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
    >
      <Flex alignItems='center' gap='$200'>
        <Radio.Root value={item.id} />

        <Flex alignItems='center' justifyContent='between' style={{ flex: 1 }}>
          <Box display='flex' flexDirection='column' style={{ flex: 1, minWidth: 0 }}>
            <Text style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>{item.title}</Text>
            <Text
              style={{
                marginTop: 4,
                color: '#959595',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {item.desc}
            </Text>
          </Box>

          {/* 우측 아이콘 */}
          <Box
            aria-hidden
            className='inline-grid h-10 w-10 place-items-center'
            style={{
              borderRadius: 8,
              background: checked ? '#FFFFFF' : '#E7F0FF',
            }}
          >
            <img alt='' height={20} src={item.iconUrl} width={20} />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
