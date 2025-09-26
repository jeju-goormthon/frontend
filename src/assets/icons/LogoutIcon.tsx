import { twMerge } from 'tailwind-merge';

export default function LogoutIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={twMerge('size-4', className)}
      fill='none'
      viewBox='0 0 18 18'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M14.2807 9.00022H7.49697M12.8526 11.1424L14.9948 9.00022L12.8526 6.85798M9.28216 5.42983V4.71575C9.28216 4.33698 9.1317 3.97373 8.86387 3.70589C8.59604 3.43806 8.23278 3.2876 7.85401 3.2876H4.28362C3.90485 3.2876 3.5416 3.43806 3.27377 3.70589C3.00593 3.97373 2.85547 4.33698 2.85547 4.71575V13.2847C2.85547 13.6634 3.00593 14.0267 3.27377 14.2945C3.5416 14.5624 3.90485 14.7128 4.28362 14.7128H7.85401C8.23278 14.7128 8.59604 14.5624 8.86387 14.2945C9.1317 14.0267 9.28216 13.6634 9.28216 13.2847V12.5706'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.6'
      />
    </svg>
  );
}

LogoutIcon.displayName = 'LogoutIcon';
