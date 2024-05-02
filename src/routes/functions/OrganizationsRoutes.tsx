import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';
import { Route } from 'react-router-dom';
import { Organizations, OrganizationsCreate, OrganizationsUpdate } from '@src/routes/elements';
import FeatureFlagedRoute from '@utils/feature-flag/FeatureFlagedRoute';
import { pageRestrictionsList } from '@utils/feature-flag/RestrictionsList';
import { PermissionTypeEnum } from '@services/permissions/interfaces';

// ----------------------------------------------------------------------

const OrganizationsRoutes = () => (
  <Route
    element={
      <FeatureFlagedRoute
        pageType={PermissionTypeEnum.SUPER_ADMIN}
        permissionsAuthorized={pageRestrictionsList.organizations}
      />
    }
  >
    <Route path={PATH_ORGANIZATIONS.root} element={<Organizations />} />
    <Route path={PATH_ORGANIZATIONS.add} element={<OrganizationsCreate />} />
    <Route path={PATH_ORGANIZATIONS.update} element={<OrganizationsUpdate />} />
  </Route>
);

export default OrganizationsRoutes;
