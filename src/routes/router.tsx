import { createBrowserRouter } from 'react-router-dom';

import { AuthGuard } from '@/components/AuthGuard';
import RootFrame from '@/layouts/RootFrame';
import DepartmentSelectPage from '@/pages/DepartmentSelectPage';
import HomePage from '@/pages/HomePage';
import KakaoCallbackPage from '@/pages/KakaoCallbackPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ReservationResultPage from '@/pages/ReservationResultPage';
import ReservationsPage from '@/pages/ReservationsPage';
import ReservationTicketPage from '@/pages/ReservationTicketPage';
import RouteConfirmPage from '@/pages/RouteConfirmPage';
import RoutePage from '@/pages/RoutePage';
import SeasonTicketCheckoutSuccessPage from '@/pages/SeasonTicketCheckoutSuccessPage';
import SeasonTicketPage from '@/pages/SeasonTicketPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootFrame />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/oauth/callback', element: <KakaoCallbackPage /> },
      { path: '/department', element: <DepartmentSelectPage /> },
      { path: '*', element: <NotFoundPage /> },
      // 인증이 필요한 라우트들
      {
        path: '/route',
        element: (
          <AuthGuard>
            <RoutePage />
          </AuthGuard>
        ),
      },
      {
        path: '/route/confirm',
        element: (
          <AuthGuard>
            <RouteConfirmPage />
          </AuthGuard>
        ),
      },
      {
        path: '/season-ticket',
        element: (
          <AuthGuard>
            <SeasonTicketPage />
          </AuthGuard>
        ),
      },
      {
        path: '/reservation-result',
        element: (
          <AuthGuard>
            <ReservationResultPage />
          </AuthGuard>
        ),
      },
      {
        path: '/reservations',
        element: (
          <AuthGuard>
            <ReservationsPage />
          </AuthGuard>
        ),
      },
      {
        path: '/success-payment',
        element: (
          <AuthGuard>
            <SeasonTicketCheckoutSuccessPage />
          </AuthGuard>
        ),
      },
      {
        path: '/reservations/:reservationId/ticket',
        element: (
          <AuthGuard>
            <ReservationTicketPage />
          </AuthGuard>
        ),
      },
    ],
  },
]);
