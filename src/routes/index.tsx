import GuestGuard from '@src/auth/GuestGuard';
import AuthGuard from '@src/auth/AuthGuard';
import { Navigate, useRoutes } from 'react-router-dom';
import { LoginPage, Page404 } from '@src/routes/elements';

// ----------------------------------------------------------------------

const Router = () => {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          )
        }
      ]
    },

    // Dashboard
    {
      path: 'dashboard/',
      element: (
        <AuthGuard>
          <>Bienvenue sur le dashboard</>
        </AuthGuard>
      )
    },

    // Errors
    {
      path: '404',
      element: <Page404 />
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
};

export default Router;
