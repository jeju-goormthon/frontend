import { twMerge } from 'tailwind-merge';

export default function DottedLineIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-3', className)}
      fill='none'
      viewBox='0 0 12 12'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <line
        stroke='currentColor'
        strokeDasharray='3 3'
        strokeLinecap='round'
        strokeWidth='1.5'
        x1='6.75'
        x2='6.75'
        y1='0.75'
        y2='11.25'
      />
    </svg>
  );
}

DottedLineIcon.displayName = 'DottedLineIcon';
