import { Skeleton } from '@mui/material';
import { memo, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
// routes
import { PATH_AFTER_LOGIN } from '../config-global';
//
import { useAuthenticationContext } from './AuthenticationContext';

// ----------------------------------------------------------------------

function GuestGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitialized } = useAuthenticationContext();

  if (isAuthenticated) {
    return <Navigate to={PATH_AFTER_LOGIN} />;
  }

  if (!isInitialized) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  return <> {children} </>;
}

export default memo(GuestGuard);
