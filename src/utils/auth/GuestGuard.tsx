import { PATH_DASHBOARD } from '@utils/navigation/paths';
import { memo, useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getUser } from '@redux/actions/connectedUserActions';
// ----------------------------------------------------------------------

function GuestGuard() {
  const { isAuthenticated } = useAppSelector((state) => state.connectedUser.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser());
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
