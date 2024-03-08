import { PATH_DASHBOARD } from '@utils/navigation/paths';
import { memo, useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getSession } from '@utils/axios/session';
import { refresh } from '@redux/actions/connectedUserActions';
// ----------------------------------------------------------------------

function GuestGuard() {
  const { isAuthenticated } = useAppSelector((state) => state.connectedUser.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      const storageToken = getSession();
      if (storageToken !== null && storageToken.refresh_token !== null) {
        dispatch(refresh());
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_DASHBOARD.root);
    }
  }, [isAuthenticated]);

  return <Outlet />;
}

export default memo(GuestGuard);
