import { getEnvVariable } from '@utils/environnement';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { handle401Error } from '@utils/axios/handle401';
import { ApiResponseMessage } from '@services/interfaces';
import { pascalizeObject, snakizeObject } from '@utils/helpers/convertCasing';

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

  newInstance.interceptors.request.use((config) => {
    return { ...config, data: snakizeObject(config.data) };
  });

  newInstance.interceptors.response.use(
    (response: AxiosResponse<AxiosDefaultResponse>) => {
      return {
        ...response,
        data: {
          success: response.data.success,
          message: response.data.message,
          data: pascalizeObject(response.data.data)
        }
      };
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
