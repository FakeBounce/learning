import GuestGuard from '@src/auth/GuestGuard';
import AuthGuard from '@src/auth/AuthGuard';
import { Navigate, useRoutes } from 'react-router-dom';
import { LoginPage, Page404 } from 'src/routes/elements';
import MainLayout from 'src/components/layouts/main-layout/MainLayout';

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
          <MainLayout >
            <>Contenu</>
          </MainLayout>
        </AuthGuard>
      )
    },

    // Errors
    {
      path: '404',
      element: <Page404 />
    },
    {
      path: '*',
      element: (
        <GuestGuard>
          <Navigate to="/404" replace />
        </GuestGuard>
      )
    }
  ]);
};

export default Router;
