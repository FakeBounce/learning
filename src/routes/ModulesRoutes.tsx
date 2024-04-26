import { ModulesCreate } from 'src/routes/elements';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Route } from 'react-router-dom';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import ActionRestrictedRoute from '@utils/feature-flag/ActionRestrictedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';

const ModulesRoutes = () => {
  return (
    <Route
      element={
        <FeatureFlagedRoute
          pageType={PermissionTypeEnum.MODULES}
          permissionsAuthorized={pageRestrictionsList.modules}
        />
      }
    >
      <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.CREATE} />}>
        <Route path={PATH_MODULES.add} element={<ModulesCreate />} />
      </Route>
    </Route>
  );
};

export default ModulesRoutes;
