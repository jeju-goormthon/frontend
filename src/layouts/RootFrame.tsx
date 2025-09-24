import { Outlet } from 'react-router-dom';

export default function RootFrame() {
  return (
    <div className='bg-v-gray-200 min-h-dvh'>
      <main className='border-v-gray-300 mx-auto min-h-dvh max-w-md border-x bg-white'>
        <Outlet />
      </main>
    </div>
  );
}
