import { createBrowserRouter } from 'react-router-dom';

import RootFrame from '@/layouts/RootFrame';
import HomePage from '@/pages/HomePage';
import KakaoCallbackPage from '@/pages/KakaoCallbackPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ReservationResultPage from '@/pages/ReservationResultPage';
import RouteConfirmPage from '@/pages/RouteConfirmPage';
import RoutePage from '@/pages/RoutePage';
import SeasonTicketPage from '@/pages/SeasonTicketPage';
import Test from '@/pages/Test';

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
      { path: '*', element: <NotFoundPage /> },
      { path: '/oauth/callback', element: <KakaoCallbackPage /> },
      { path: '/test', element: <Test /> },
    ],
  },
]);
