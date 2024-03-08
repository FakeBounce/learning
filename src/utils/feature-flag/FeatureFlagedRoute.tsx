import { memo, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_ERRORS } from '@utils/navigation/paths';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { Outlet } from 'react-router';
// ----------------------------------------------------------------------

function FeatureFlagedRoute({ pagePermissionType }: { pagePermissionType: PermissionTypeEnum }) {
  const { canSeePage } = useContext(FeatureFlagContext);

  const shouldDisplayPage = canSeePage(pagePermissionType);

  if (!shouldDisplayPage) {
    return <Navigate to={PATH_ERRORS.root} />;
  }

  return <Outlet context={{ pagePermissionType }} />;
}

export default memo(FeatureFlagedRoute);
