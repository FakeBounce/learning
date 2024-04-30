import {
  ExternalTestersUpdate,
  ExternalTestersCreate,
  ExternalTesters,
  ExternalTestersBulk
} from '@src/routes/elements';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { Route } from 'react-router-dom';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import ActionRestrictedRoute from '@utils/feature-flag/ActionRestrictedRoute';

const ExternalTestersRoutes = () => {
  return (
    <Route
      element={
        <FeatureFlagedRoute
          pageType={PermissionTypeEnum.TESTERS}
          permissionsAuthorized={pageRestrictionsList.externalTesters}
        />
      }
    >
      <Route path={PATH_EXTERNAL_TESTERS.root} element={<ExternalTesters />} />
      <Route path={PATH_EXTERNAL_TESTERS.profile} element={<ExternalTestersUpdate />} />
      <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.CREATE} />}>
        <Route path={PATH_EXTERNAL_TESTERS.add} element={<ExternalTestersCreate />} />
      </Route>
      <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.CREATE_BULK} />}>
        <Route path={PATH_EXTERNAL_TESTERS.addBulk} element={<ExternalTestersBulk />} />
      </Route>
    </Route>
  );
};

export default ExternalTestersRoutes;
