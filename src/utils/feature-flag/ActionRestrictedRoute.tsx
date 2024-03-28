import { memo, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_ERRORS } from '@utils/navigation/paths';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { Outlet, useOutletContext } from 'react-router';
import { Skeleton } from '@mui/material';
import { useAppSelector } from '@redux/hooks';

interface OutletContextType {
  pageType: PermissionTypeEnum; // Add more properties if needed
}

function ActionRestrictedRoute({ actionNeededType }: { actionNeededType: PermissionEnum }) {
  const [showLoading, setShowLoading] = useState(true);
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);
  const { pageType }: OutletContextType = useOutletContext();
  const { globalLoading } = useAppSelector((state) => state.connectedUser);

  useEffect(() => {
    if (!globalLoading) {
      setShowLoading(false);
    }
  }, [globalLoading]);

  if (showLoading) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (!isAuthorizedByPermissionsTo(pageType, actionNeededType)) {
    return <Navigate to={PATH_ERRORS.root} />;
  }

  return <Outlet context={{ pageType }} />;
}

export default memo(ActionRestrictedRoute);
