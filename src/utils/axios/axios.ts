import { getEnvVariable } from '@utils/environnement';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponseMessage } from '@services/interfaces';
import { camelizeObject, snakizeObject } from '@utils/helpers/convertCasing';
import { handle401 } from '@utils/axios/handle401';
import { getSession } from '@utils/axios/session';

interface AxiosDefaultResponse {
  success: boolean;
  message: ApiResponseMessage;
  data: any;
}
// Create axios instance with dynamic baseURL
const axiosInstance: AxiosInstance = (() => {
  const baseURL = getEnvVariable('VITE_HOST_API_KEY');

  if (!baseURL) {
    throw new Error('VITE_HOST_API_KEY environment variable not defined.');
  }

  const newInstance = axios.create({ baseURL, timeout: 1000 });
  const session = getSession();
  if (session) {
    newInstance.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;
  }

  newInstance.interceptors.request.use((config) => {
    const axiosDelay = parseInt(getEnvVariable('VITE_HOST_AXIOS_DELAY') ?? '300', 10);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Modify the request data to use snake_case keys
        config = { ...config, data: snakizeObject(config.data) };
        resolve(config);
      }, axiosDelay); // Delay each request by 300 milliseconds to give elastic search time to index the data
    });
  });

  newInstance.interceptors.response.use(
    (response: AxiosResponse<AxiosDefaultResponse>) => {
      return {
        ...response,
        data: {
          success: response.data.success,
          message: response.data.message,
          data: camelizeObject(response.data.data)
        }
      };
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        const newRequest = await handle401(error);

        if (newRequest) {
          return newInstance.request(newRequest);
        }
      }
      return Promise.reject(error);
    }
  );
  return newInstance;
})();

export default axiosInstance;
