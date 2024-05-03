import { PATH_ROLES } from '@utils/navigation/paths';
import { Roles, RolesCreate, RolesUpdate } from 'src/routes/elements';
import { Route } from 'react-router-dom';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import ActionRestrictedRoute from '@utils/feature-flag/ActionRestrictedRoute';

const Router = () => {
  return (
    <Route
      element={
        <FeatureFlagedRoute
          pageType={PermissionTypeEnum.ROLES}
          permissionsAuthorized={pageRestrictionsList.roles}
        />
      }
    >
      <Route path={PATH_ROLES.root} element={<Roles />} />
      <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.CREATE} />}>
        <Route path={PATH_ROLES.add} element={<RolesCreate />} />
      </Route>
      <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.UPDATE} />}>
        <Route path={PATH_ROLES.update} element={<RolesUpdate />} />
      </Route>
    </Route>
  );
};

export default Router;
