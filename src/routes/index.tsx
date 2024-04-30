import GuestGuard from '@utils/auth/GuestGuard';
import AuthGuard from '@utils/auth/AuthGuard';
import { PATH_AUTH, PATH_DASHBOARD } from '@utils/navigation/paths';
import { ForgotPasswordPage, LoginPage, Page404 } from 'src/routes/elements';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from 'src/components/layouts/main-layout/MainLayout';
import ApplicantsRoutes from '@src/routes/functions/ApplicantsRoutes';
import OrganizationsRoutes from '@src/routes/functions/OrganizationsRoutes';
import UsersRoutes from '@src/routes/functions/UsersRoutes';
import ExternalTestersRoutes from '@src/routes/functions/ExternalTestersRoutes';
import GroupsRoutes from '@src/routes/functions/GroupsRoutes';
import ModulesRoutes from '@src/routes/functions/ModulesRoutes';
import RolesRoutes from '@src/routes/functions/RolesRoutes';

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
        <Route path={PATH_DASHBOARD.root} element={<>Dashboard content</>} />
        {OrganizationsRoutes()}
        {UsersRoutes()}
        {ApplicantsRoutes()}
        {ExternalTestersRoutes()}
        {GroupsRoutes()}
        {ModulesRoutes()}
        {RolesRoutes()}
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>

      <Route element={<GuestGuard />}>
        <Route path={PATH_AUTH.login} element={<LoginPage />} />
        <Route path={PATH_AUTH.forgotPassword} element={<ForgotPasswordPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
