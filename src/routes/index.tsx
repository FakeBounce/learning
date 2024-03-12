import GuestGuard from '@utils/auth/GuestGuard';
import AuthGuard from '@utils/auth/AuthGuard';
import {
  PATH_APPLICANTS,
  PATH_AUTH,
  PATH_DASHBOARD,
  PATH_ORGANIZATIONS,
  PATH_USERS
} from '@utils/navigation/paths';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  Page404,
  Organizations,
  OrganizationsCreate,
  OrganizationsUpdate,
  Users,
  UserProfile,
  UserEdit,
  Applicants
} from 'src/routes/elements';
import MainLayout from 'src/components/layouts/main-layout/MainLayout';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';

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
        <Route path={PATH_DASHBOARD.root} element={<>Dashboard content</>} />
        <Route element={<FeatureFlagedRoute pagePermissionType={PermissionTypeEnum.SUPER_ADMIN} />}>
          <Route path={PATH_ORGANIZATIONS.root} element={<Organizations />} />
          <Route path={PATH_ORGANIZATIONS.add} element={<OrganizationsCreate />} />
          <Route path={PATH_ORGANIZATIONS.update} element={<OrganizationsUpdate />} />
        </Route>
        <Route element={<FeatureFlagedRoute pagePermissionType={PermissionTypeEnum.USERS} />}>
          <Route path={PATH_USERS.root} element={<Users />} />
          <Route path={PATH_USERS.profile} element={<UserProfile />} />
          <Route path={PATH_USERS.edit} element={<UserEdit />} />
        </Route>
        <Route element={<FeatureFlagedRoute pagePermissionType={PermissionTypeEnum.SUPER_ADMIN} />}>
          <Route path={PATH_APPLICANTS.root} element={<Applicants />} />
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
