// utils
import { LoginInformations } from '@services/connected-user/interfaces';
import localStorageAvailable from '@utils/localStorageAvailable';

// ----------------------------------------------------------------------

export const setSession = (tokenDatas: LoginInformations | null) => {
  const hasLocalStorage = localStorageAvailable();
  if (tokenDatas) {
    if (hasLocalStorage) {
      localStorage.setItem('LMS_TOKEN', JSON.stringify(tokenDatas));
    }
  } else {
    if (hasLocalStorage) {
      localStorage.removeItem('LMS_TOKEN');
    }
  }
};

export const getSession = () => {
  const hasLocalStorage = localStorageAvailable();
  if (hasLocalStorage) {
    const storageItem = localStorage.getItem('LMS_TOKEN');
    if (storageItem) {
      const tokenDatas = JSON.parse(storageItem);
      if (tokenDatas && tokenDatas.refreshToken) {
        return tokenDatas;
      }
    }
  }
  return null;
};
