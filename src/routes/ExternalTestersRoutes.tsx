import { ExternalTestersUpdate, ExternalTestersCreate, ExternalTesters } from 'src/routes/elements';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { Route } from 'react-router-dom';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';
import { PermissionTypeEnum } from '@services/permissions/interfaces';

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
      <Route path={PATH_EXTERNAL_TESTERS.add} element={<ExternalTestersCreate />} />
    </Route>
  );
};

export default ExternalTestersRoutes;
