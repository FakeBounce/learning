import { Skeleton } from '@mui/material';
import { useAuthenticationContext } from '@src/auth/AuthenticationContext';
import { memo, ReactNode, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PATH_AUTH } from '@utils/navigation/paths.ts';

// ----------------------------------------------------------------------

function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitialized } = useAuthenticationContext();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isInitialized) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={PATH_AUTH.login} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}

export default memo(AuthGuard);
