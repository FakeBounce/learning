import { Skeleton } from '@mui/material';
import { PATH_DASHBOARD } from '@utils/navigation/paths.ts';
import { memo, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticationContext } from './AuthenticationContext';
// ----------------------------------------------------------------------

function GuestGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitialized } = useAuthenticationContext();

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  if (!isInitialized) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  return <> {children} </>;
}

export default memo(GuestGuard);
