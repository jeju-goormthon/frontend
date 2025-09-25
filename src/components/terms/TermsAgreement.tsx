// src/features/terms/TermsAgreement.tsx
import { Checkbox, Text } from '@vapor-ui/core';
import { ChevronRightOutlineIcon } from '@vapor-ui/icons';
import { useMemo, useState } from 'react';

type TermsKey = 'personal' | 'thirdParty' | 'payment';

type Props = {
  onChange?: (result: { allAgreed: boolean; agreedKeys: TermsKey[] }) => void;
};

export default function TermsAgreement({ onChange }: Props) {
  const [items, setItems] = useState<Record<TermsKey, boolean>>({
    personal: false,
    thirdParty: false,
    payment: false,
  });

  const allChecked = useMemo(() => Object.values(items).every(Boolean), [items]);

  const setAll = (checked: boolean) => {
    const next = {
      personal: checked,
      thirdParty: checked,
      payment: checked,
    };
    setItems(next);
    onChange?.({
      allAgreed: checked,
      agreedKeys: checked ? (Object.keys(next) as TermsKey[]) : [],
    });
  };

  const setOne = (key: TermsKey, checked: boolean) => {
    const next = { ...items, [key]: checked };
    setItems(next);
    onChange?.({
      allAgreed: Object.values(next).every(Boolean),
      agreedKeys: Object.entries(next)
        .filter(([, v]) => v)
        .map(([k]) => k) as TermsKey[],
    });
  };

  const openDetail = (label: string) => {
    // 임시 상세보기
    alert(`'${label}' 약관 내용(임시)`);
  };

  // 라벨 사전 (필수 표기 포함)
  const LABELS: Record<TermsKey, string> = {
    personal: '(필수) 개인정보 수집 · 이용 동의',
    thirdParty: '(필수) 개인정보 제3자 정보 제공 동의',
    payment: '(필수) 결제대행 서비스 이용약관 동의',
  };

  return (
    <div className='py-v-250 px-v-300'>
      {/* 전체 동의 */}
      <Text className='flex items-center gap-3 font-semibold' render={<label />} typography='subtitle1'>
        <Checkbox.Root
          checked={allChecked}
          className='flex items-center gap-3'
          onCheckedChange={(checked) => setAll(Boolean(checked))}
        />
        약관에 동의합니다
      </Text>

      {/* 개별 항목 */}
      <ul className='pt-v-200'>
        {(Object.keys(LABELS) as TermsKey[]).map((key) => {
          const checked = items[key];
          return (
            <li key={key}>
              <div className='flex h-6 items-center justify-between rounded-lg' role='group'>
                <Text className='flex cursor-pointer items-center gap-2.5' render={<label />} typography='subtitle2'>
                  {/* 체크박스 (아이콘 크기 느낌을 위해 살짝 축소) */}
                  <Checkbox.Root
                    checked={checked}
                    className='flex scale-[0.95] items-center gap-3'
                    onCheckedChange={(v) => setOne(key, Boolean(v))}
                  />

                  <span className={`${checked ? 'text-gray-900' : 'text-gray-500'}`}>{LABELS[key]}</span>
                </Text>

                {/* 우측 chevron - 임시 상세보기 */}
                <button
                  aria-label='자세히 보기'
                  className='-mr-1 shrink-0 p-2'
                  type='button'
                  onClick={() => openDetail(LABELS[key])}
                >
                  <ChevronRightOutlineIcon className='h-5 w-5 text-gray-400' />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
