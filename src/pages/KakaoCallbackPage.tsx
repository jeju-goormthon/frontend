import LoaderIcon from '@/assets/icons/LoaderIcon';
// import { useKakaoOAuth } from '@hooks/useKakaoOAuth';

export default function KakaoCallback() {
  // const { error } = useKakaoOAuth();

  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='flex flex-1 items-center justify-center'>
        <LoaderIcon aria-hidden className='size-40 animate-spin' />
      </div>
      {/* {error && <p className="sr-only">로그인 실패: {String(error)}</p>} */}
    </div>
  );
}
