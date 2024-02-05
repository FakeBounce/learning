import { ReactNode, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// utils
import { useRefreshToken } from './useRefreshToken';
import axiosInstance from './axios';
import { configure } from 'axios-hooks';
import { setSession } from './session';
import localStorageAvailable from '../localStorageAvailable';
// paths
import { PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function AxiosConfiguration({ children }: { children: ReactNode }) {
  const refreshState = useRef(null);
  const setRefreshState = (element: any) => {
    refreshState.current = element;
  };

  const navigate = useNavigate();
  const storageAvailable = localStorageAvailable();

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.constructor.name === 'Cancel') {
        return new Promise(() => {});
      }

      const config = error.config;

      if (error.response && error.response.status === 401 && !config.headers.skiprefetch) {
        const userTokenData = storageAvailable
          ? JSON.parse(localStorage.getItem('userTokenData') || '')
          : '';
        if (!userTokenData) {
          navigate(PATH_AUTH.login);
        }
        const { refresh_token: refresh_token_to_use } = userTokenData;

        if (userTokenData && !config._retry && !config.refresh) {
          config._retry = true;
          const tokens = await useRefreshToken({
            axiosInstance,
            refreshState,
            setRefreshState,
            refresh: refresh_token_to_use
          });

          const { token, expires_at, refresh_token } = tokens.data.data;
          const userTokenData = { token, expires_at, refresh_token };
          setSession(userTokenData);

          config.headers.Authorization = `Bearer ${token}`;

          return axiosInstance(config);
        }

        setSession(null);
        navigate(PATH_AUTH.login);

        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );

  configure({ axios: axiosInstance });

  return children;
}
