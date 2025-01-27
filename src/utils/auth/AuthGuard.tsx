import { Skeleton } from '@mui/material';
import { memo, ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PATH_AUTH } from '@utils/navigation/paths';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getUser } from '@redux/actions/connectedUserActions';

function AuthGuard({ children }: { children: ReactNode }) {
  const {
    globalLoading,
    login: { loading, isAuthenticated }
  } = useAppSelector((state) => state.connectedUser);
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser());
    }
  }, [isAuthenticated]);

  if (loading || globalLoading) {
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
