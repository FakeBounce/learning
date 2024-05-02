import { Groups, GroupsCreate, GroupsUpdate } from '@src/routes/elements';
import { PATH_GROUPS } from '@utils/navigation/paths';
import { Route } from 'react-router-dom';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import ActionRestrictedRoute from '@utils/feature-flag/ActionRestrictedRoute';

const GroupsRoutes = () => {
  return (
    <Route
      element={
        <FeatureFlagedRoute
          pageType={PermissionTypeEnum.GROUPS}
          permissionsAuthorized={pageRestrictionsList.groups}
        />
      }
    >
      <Route path={PATH_GROUPS.root} element={<Groups />} />
      <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.CREATE} />}>
        <Route path={PATH_GROUPS.add} element={<GroupsCreate />} />
      </Route>
      <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.UPDATE} />}>
        <Route path={PATH_GROUPS.update} element={<GroupsUpdate />} />
      </Route>
    </Route>
  );
};

export default GroupsRoutes;
