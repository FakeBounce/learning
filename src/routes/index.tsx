import GuestGuard from '@src/auth/GuestGuard';
import AuthGuard from '@src/auth/AuthGuard';
import { PATH_DASHBOARD, PATH_ORGANISATIONS, PATH_PARAMETERS, PATH_USERS } from '@utils/navigation/paths';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  Page404,
  Organisations,
  OrganisationsCreate,
  OrganisationsUpdate,
  Users,
  UserProfile,
  UserEdit
} from 'src/routes/elements';
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
        <Route path={PATH_DASHBOARD.root} element={<>Dashboard content</>} />
        <Route path={PATH_PARAMETERS.organisations} element={<Organisations />} />
        <Route path={PATH_ORGANISATIONS.add} element={<OrganisationsCreate />} />
        <Route path={PATH_ORGANISATIONS.update} element={<OrganisationsUpdate />} />
        <Route path={PATH_PARAMETERS.users} element={<Users />} />
        <Route path={PATH_USERS.profile} element={<UserProfile />} />
        <Route path={PATH_USERS.edit} element={<UserEdit />} />
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
