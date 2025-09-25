import { Outlet } from 'react-router-dom';

export default function RootFrame() {
  return (
    <div className='min-h-dvh'>
      <main className='mx-auto min-h-dvh max-w-md bg-white'>
        <Outlet />
      </main>
    </div>
  );
}
