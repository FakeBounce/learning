import GuestGuard from '@utils/auth/GuestGuard';
import AuthGuard from '@utils/auth/AuthGuard';
import { PATH_AUTH, PATH_DASHBOARD, PATH_ROLES } from '@utils/navigation/paths';
import { ForgotPasswordPage, LoginPage, Page404, Roles } from 'src/routes/elements';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from 'src/components/layouts/main-layout/MainLayout';
import ApplicantsRoutes from '@src/routes/ApplicantsRoutes';
import OrganizationsRoutes from '@src/routes/OrganizationsRoutes';
import UsersRoutes from '@src/routes/UsersRoutes';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import ExternalTestersRoutes from '@src/routes/ExternalTestersRoutes';
import GroupsRoutes from '@src/routes/GroupsRoutes';
import ModulesRoutes from '@src/routes/ModulesRoutes';

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
        <Route
          element={
            <FeatureFlagedRoute
              pageType={PermissionTypeEnum.ROLES}
              permissionsAuthorized={pageRestrictionsList.roles}
            />
          }
        >
          <Route path={PATH_ROLES.root} element={<Roles />} />
        </Route>
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
