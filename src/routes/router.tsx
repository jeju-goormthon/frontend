import { createBrowserRouter } from 'react-router-dom';

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
      { path: '/route', element: <RoutePage /> },
      { path: '/route/confirm', element: <RouteConfirmPage /> },
      { path: '/season-ticket', element: <SeasonTicketPage /> },
      { path: '/reservation-result', element: <ReservationResultPage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: '/oauth/callback', element: <KakaoCallbackPage /> },
      { path: '/department', element: <DepartmentSelectPage /> },
      { path: '/reservations', element: <ReservationsPage /> },
      { path: '/success-payment', element: <SeasonTicketCheckoutSuccessPage /> },
      { path: '/reservations/:reservationId/ticket', element: <ReservationTicketPage /> },
    ],
  },
]);
