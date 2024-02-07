import GuestGuard from '@src/auth/GuestGuard';
import AuthGuard from '@src/auth/AuthGuard';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, Page404 } from 'src/routes/elements';
import MainLayout from 'src/components/layouts/main-layout/MainLayout';

// ----------------------------------------------------------------------

const Router = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }
      >
        <Route path="/" element={<>Dashboard content</>} />
      </Route>

      <Route element={<GuestGuard />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Router;
