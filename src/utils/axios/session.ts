// utils
import axios from './axios';

// ----------------------------------------------------------------------

export const setSession = (userTokenData: Record<string, any> | null) => {
  if (userTokenData) {
    const serializedData = JSON.stringify(userTokenData);
    localStorage.setItem('userTokenData', serializedData);

    axios.defaults.headers.common.Authorization = `Bearer ${userTokenData.token}`;
  } else {
    localStorage.removeItem('userTokenData');

    delete axios.defaults.headers.common.Authorization;
  }
};
