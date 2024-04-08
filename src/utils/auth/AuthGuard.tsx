import { Skeleton } from '@mui/material';
import { memo, ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PATH_AUTH } from '@utils/navigation/paths';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getSession } from '@utils/axios/session';
import { getUser, refresh } from '@redux/actions/connectedUserActions';

function AuthGuard({ children }: { children: ReactNode }) {
  const {
    globalLoading,
    user: { id },
    login: { loading, isAuthenticated }
  } = useAppSelector((state) => state.connectedUser);
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (id) {
        const storageToken = getSession();
        if (storageToken !== null && storageToken.refreshToken !== null) {
          dispatch(refresh()).then(() => {
            dispatch(getUser());
          });
        }
      } else {
        dispatch(getUser());
      }
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
