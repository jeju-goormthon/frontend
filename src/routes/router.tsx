import { createBrowserRouter } from 'react-router-dom';

import RootFrame from '@/layouts/RootFrame';
import HomePage from '@/pages/HomePage';
import KakaoCallbackPage from '@/pages/KakaoCallbackPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import PaymentFailPage from '@/pages/PaymentFailPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import ReservationResultPage from '@/pages/ReservationResultPage';
import RouteConfirmPage from '@/pages/RouteConfirmPage';
import RoutePage from '@/pages/RoutePage';
import SeasonTicketPage from '@/pages/SeasonTicketPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootFrame />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/route', element: <RoutePage /> },
      { path: '/route/confirm', element: <RouteConfirmPage /> },
      { path: '/season-ticket', element: <SeasonTicketPage /> },
      { path: '/reservation-result', element: <ReservationResultPage /> },
      { path: '/payment/success', element: <PaymentSuccessPage /> },
      { path: '/payment/fail', element: <PaymentFailPage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: '/oauth/callback', element: <KakaoCallbackPage /> },
    ],
  },
]);
