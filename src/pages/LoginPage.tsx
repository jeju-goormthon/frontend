import kakaoLogo from '@/assets/images/KakaoLogo.svg';
import smartphone from '@/assets/images/smartphone.svg';
import socialLoginMsgPng from '@/assets/images/social_login_message.png';
import socialLoginMsgWebp from '@/assets/images/social_login_message.webp';
import BackHeader from '@/components/BackHeader';

export default function LoginPage() {
    const handleKakaoLogin = () => {
    // 카카오 로그인 URL로 리다이렉트
    const kakaoLoginUrl = import.meta.env.VITE_KAKAO_URI || 'https://api-donghang.klr.kr/oauth2/authorization/kakao';
    window.location.href = kakaoLoginUrl;
  };

  const handleGeneralLogin = () => {
    // TODO: 일반 로그인 처리 (현재는 임시)
    console.log('일반 로그인 버튼 클릭');
  };


  return (
    <div className='min-h-screen bg-white'>
      {/* 헤더 */}
      <div className='sticky top-0 z-10 bg-white'>
        <BackHeader title='로그인' />
      </div>

      {/* 본문 */}
      <main className='mx-auto w-full max-w-sm px-5 py-32'>
        {/* 상단 여백 */}
        <div className='h-8' />

        {/* 타이틀 */}
        <h1 className='text-center text-[24px] leading-[1.3] font-bold tracking-[-0.3px] text-[#262626]'>
          동행이음과 함께
          <br />
          간편하게 이동해 보세요
        </h1>

        {/* 안내(툴바 느낌) - 이미지 그대로 사용 */}
        <div className='mt-5 flex justify-center'>
          <picture>
            <source srcSet={socialLoginMsgWebp} type='image/webp' />
            <img
              alt='3초 만에 빠른 회원가입'
              className='h-8 w-auto animate-bounce'
              draggable={false}
              src={socialLoginMsgPng}
            />
          </picture>
        </div>

        {/* 카카오로 시작하기 */}
        <button
          aria-label='카카오로 시작하기'
          className='w-full rounded-xl bg-[#FEE500] py-4 text-center text-[16px] font-medium text-[#3C1E1E] active:translate-y-[1px]'
          type='button'
onClick={handleKakaoLogin}
        >
          <img
            aria-hidden
            alt=''
            className='mr-2 inline-block h-5 w-5 align-[-4px]'
            draggable={false}
            src={kakaoLogo}
          />
          카카오로 시작하기
        </button>

        {/* 여백 */}
        <div className='h-3' />

        {/* 전화번호로 시작하기 (아웃라인 버튼) */}
        <button
          aria-label='전화번호로 시작하기'
          className='w-full rounded-xl border border-[#E5E5EA] bg-white py-4 text-[16px] font-medium text-[#1E293B] active:translate-y-[1px]'
          type='button'
onClick={handleGeneralLogin}
        >
          <img
            aria-hidden
            alt=''
            className='mr-2 inline-block h-[18px] w-[18px] align-[-3px]'
            draggable={false}
            src={smartphone}
          />
          전화번호로 시작하기
        </button>
      </main>
    </div>
  );
}
