import { ModulesCreate } from 'src/routes/elements';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Route } from 'react-router-dom';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import ActionRestrictedRoute from '@utils/feature-flag/ActionRestrictedRoute';

const ModulesRoutes = () => {
  return (
    <Route element={<FeatureFlagedRoute pageType={PermissionTypeEnum.MODULES} />}>
      <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.CREATE} />}>
        <Route path={PATH_MODULES.add} element={<ModulesCreate />} />
      </Route>
    </Route>
  );
};

export default ModulesRoutes;
