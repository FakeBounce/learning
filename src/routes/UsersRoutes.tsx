import { PATH_USERS } from '@utils/navigation/paths';
import { Route } from 'react-router-dom';
import { UserEdit, UserProfile, Users } from 'src/routes/elements';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';
import { PermissionTypeEnum } from '@services/permissions/interfaces';

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
    <Route path={PATH_USERS.edit} element={<UserEdit />} />
  </Route>
);

export default UsersRoutes;
