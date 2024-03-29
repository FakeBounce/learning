import GuestGuard from '@utils/auth/GuestGuard';
import AuthGuard from '@utils/auth/AuthGuard';
import { ExternalTestersUpdate, Groups, LoginPage, Page404, Roles } from 'src/routes/elements';
import {
  PATH_AUTH,
  PATH_DASHBOARD,
  PATH_EXTERNAL_TESTERS, PATH_GROUPS,
  PATH_ROLES
} from '@utils/navigation/paths';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from 'src/components/layouts/main-layout/MainLayout';
import ApplicantsRoutes from '@src/routes/ApplicantsRoutes';
import OrganizationsRoutes from '@src/routes/OrganizationsRoutes';
import UsersRoutes from '@src/routes/UsersRoutes';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';
import { PermissionTypeEnum } from '@services/permissions/interfaces';

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
        <Route
          element={
            <FeatureFlagedRoute
              pageType={PermissionTypeEnum.TESTERS}
              permissionsAuthorized={pageRestrictionsList.externalTesters}
            />
          }
        >
          <Route path={PATH_EXTERNAL_TESTERS.profile} element={<ExternalTestersUpdate />} />
        </Route>
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
        <Route
          element={
            <FeatureFlagedRoute
              pageType={PermissionTypeEnum.GROUPS}
              permissionsAuthorized={pageRestrictionsList.groups}
            />
          }
        >
          <Route path={PATH_GROUPS.root} element={<Groups />} />
        </Route>
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>

      <Route element={<GuestGuard />}>
        <Route path={PATH_AUTH.login} element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
