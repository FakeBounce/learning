import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { Route } from 'react-router-dom';
import {
  Applicants,
  ApplicantsBulk,
  ApplicantsCreate,
  ApplicantsUpdate
} from 'src/routes/elements';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';
import ActionRestrictedRoute from '@utils/feature-flag/ActionRestrictedRoute';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';

function ApplicantsRoutes() {
  return (
    <Route
      element={
        <FeatureFlagedRoute
          pageType={PermissionTypeEnum.APPLICANTS}
          permissionsAuthorized={pageRestrictionsList.applicants}
        />
      }
    >
      <Route path={PATH_APPLICANTS.root} element={<Applicants />} />
      <Route path={PATH_APPLICANTS.profile} element={<ApplicantsUpdate />} />
      <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.CREATE} />}>
        <Route path={PATH_APPLICANTS.add} element={<ApplicantsCreate />} />
      </Route>

      <Route element={<ActionRestrictedRoute actionNeededType={PermissionEnum.CREATE_BULK} />}>
        <Route path={PATH_APPLICANTS.addBulk} element={<ApplicantsBulk />} />
      </Route>
    </Route>
  );
}

export default ApplicantsRoutes;
