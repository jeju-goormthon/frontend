import { Button } from '@vapor-ui/core';
import { twMerge } from 'tailwind-merge';

interface NavButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function NavButton({
  onClick,
  label = '다음',
  className,
  disabled,
  variant = 'primary',
}: NavButtonProps) {
  return (
    <Button
      stretch
      className={twMerge('px-6', className)}
      disabled={disabled}
      size='xl'
      variant={variant === 'secondary' ? 'outlined' : 'filled'}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
