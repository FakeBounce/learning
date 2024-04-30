import { PATH_USERS } from '@utils/navigation/paths';
import { Route } from 'react-router-dom';
import { UserBluk, UserEdit, UserProfile, Users } from '@src/routes/elements';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import ActionRestrictedRoute from '@utils/feature-flag/ActionRestrictedRoute';

const UsersRoutes = () => (
  <Route
    element={
      <FeatureFlagedRoute
        pageType={PermissionTypeEnum.USERS}
        permissionsAuthorized={pageRestrictionsList.users}
      />
    }
  >
    <Route path={PATH_USERS.root} element={<Users />} />
    <Route path={PATH_USERS.profile} element={<UserProfile />} />
    <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.UPDATE} />}>
      <Route path={PATH_USERS.update} element={<UserEdit />} />
    </Route>
    <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.CREATE_BULK} />}>
      <Route path={PATH_USERS.addBulk} element={<UserBluk />} />
    </Route>
  </Route>
);

export default UsersRoutes;
