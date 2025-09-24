import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

// 전역적으로 사용할 수 있도록 QueryClient 인스턴스를 export
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 데이터가 5분간 fresh 상태 유지
      staleTime: 5 * 60 * 1000,
      // 캐시에서 10분 후 제거
      gcTime: 10 * 60 * 1000,
      // 실패 시 1번만 재시도
      retry: 1,
    },
  },
});

export default function QueryProvider({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
