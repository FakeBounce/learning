import GuestGuard from '@utils/auth/GuestGuard';
import AuthGuard from '@utils/auth/AuthGuard';
import {
<<<<<<< HEAD
  ForgotPasswordPage,
  LoginPage,
  Page404,
  Roles,
  Groups
=======
  ExternalTestersUpdate,
  Groups,
  GroupsCreate,
  LoginPage,
  Page404,
  Roles
>>>>>>> f91ab0a (WIP - Group creation)
} from 'src/routes/elements';
import {
  PATH_AUTH,
  PATH_DASHBOARD,
<<<<<<< HEAD
  PATH_ROLES,
  PATH_GROUPS
=======
  PATH_EXTERNAL_TESTERS,
  PATH_GROUPS,
  PATH_ROLES
>>>>>>> f91ab0a (WIP - Group creation)
} from '@utils/navigation/paths';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from 'src/components/layouts/main-layout/MainLayout';
import ApplicantsRoutes from '@src/routes/ApplicantsRoutes';
import OrganizationsRoutes from '@src/routes/OrganizationsRoutes';
import UsersRoutes from '@src/routes/UsersRoutes';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import ExternalTestersRoutes from '@src/routes/ExternalTestersRoutes';

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
          <Route path={PATH_GROUPS.add} element={<GroupsCreate />} />
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
