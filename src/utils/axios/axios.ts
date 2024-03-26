import { getEnvVariable } from '@utils/environnement';
import axios, { AxiosInstance } from 'axios';
import { handle401Error } from '@utils/axios/handle401';

// Create axios instance with dynamic baseURL
const axiosInstance: AxiosInstance = (() => {
  const baseURL = getEnvVariable('VITE_HOST_API_KEY');

  if (!baseURL) {
    throw new Error('VITE_HOST_API_KEY environment variable not defined.');
  }

  const newInstance = axios.create({ baseURL, timeout: 1000 });

  newInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        // Handle 401 error
        handle401Error();
      }
      return Promise.reject(error);
    }
  );
  return newInstance;
})();

export default axiosInstance;
