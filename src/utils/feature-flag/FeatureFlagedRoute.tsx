import { memo, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_ERRORS } from '@utils/navigation/paths';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { Outlet } from 'react-router';
import { Skeleton } from '@mui/material';
import { useAppSelector } from '@redux/hooks';
// ----------------------------------------------------------------------

function FeatureFlagedRoute({ pagePermissionType }: { pagePermissionType: PermissionTypeEnum[] }) {
  const [showLoading, setShowLoading] = useState(true);
  const { canSeePage } = useContext(FeatureFlagContext);
  const { globalLoading } = useAppSelector((state) => state.connectedUser);

  useEffect(() => {
    if (!globalLoading) {
      setShowLoading(false);
    }
  }, [globalLoading]);

  if (showLoading) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (!canSeePage(pagePermissionType)) {
    return <Navigate to={PATH_ERRORS.root} />;
  }

  return <Outlet context={{ pagePermissionType }} />;
}

export default memo(FeatureFlagedRoute);
