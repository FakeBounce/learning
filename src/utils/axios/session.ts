// utils
import axios from './axios';
import { LoginInformations } from '@services/connected-user/interfaces';
import localStorageAvailable from '@utils/localStorageAvailable';

// ----------------------------------------------------------------------

export const setSession = (tokenDatas: LoginInformations | null) => {
  const hasLocalStorage = localStorageAvailable();
  if (tokenDatas) {
    if (hasLocalStorage) {
      localStorage.setItem('LMS_TOKEN', JSON.stringify(tokenDatas));
    }
    axios.defaults.headers.common.Authorization = `Bearer ${tokenDatas.token}`;
  } else {
    if (hasLocalStorage) {
      localStorage.removeItem('LMS_TOKEN');
    }
    delete axios.defaults.headers.common.Authorization;
  }
};

export const getSession = () => {
  const hasLocalStorage = localStorageAvailable();
  if (hasLocalStorage) {
    const storageItem = localStorage.getItem('LMS_TOKEN');
    if (storageItem) {
      const tokenDatas = JSON.parse(storageItem);
      if (tokenDatas && tokenDatas.refreshToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${tokenDatas.refreshToken}`;
        return tokenDatas;
      }
    }
  }
  return null;
};
