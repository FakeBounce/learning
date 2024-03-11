import { Skeleton } from '@mui/material';
import { memo, ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PATH_AUTH } from '@utils/navigation/paths';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getSession } from '@utils/axios/session';
import { getUser, refresh } from '@redux/actions/connectedUserActions';
import { getRolePermissions } from '@redux/actions/rolesActions';

// ----------------------------------------------------------------------

function AuthGuard({ children }: { children: ReactNode }) {
  const {
    globalLoading,
    user: { id, roles },
    login: { loading, isAuthenticated },
    permissions
  } = useAppSelector((state) => state.connectedUser);
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated && id) {
      const storageToken = getSession();
      if (storageToken !== null && storageToken.refresh_token !== null) {
        dispatch(refresh()).then(() => {
          dispatch(getRolePermissions({ roleId: roles[0].id }));
        });
      }
    } else if (isAuthenticated && !id) {
      dispatch(getUser());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && id && roles && roles[0].id && Object.keys(permissions).length === 0) {
      dispatch(getRolePermissions({ roleId: roles[0].id }));
    }
  }, [isAuthenticated, id]);

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
