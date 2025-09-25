import { Button } from '@vapor-ui/core';
import { twMerge } from 'tailwind-merge';

interface NavButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export default function NavButton({ onClick, label = '다음', className, disabled }: NavButtonProps) {
  return (
    <Button
      stretch
      className={twMerge('rounded-xl px-6 py-7', className)}
      disabled={disabled}
      size='xl'
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
