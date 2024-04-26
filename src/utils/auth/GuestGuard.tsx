import { PATH_DASHBOARD } from '@utils/navigation/paths';
import { memo, useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks';

function GuestGuard() {
  const { isAuthenticated } = useAppSelector((state) => state.connectedUser.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_DASHBOARD.root);
    }
  }, [isAuthenticated]);

  return <Outlet />;
}

export default memo(GuestGuard);
