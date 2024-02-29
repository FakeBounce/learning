import { getEnvVariable } from '@utils/environnement';
import axios, { AxiosInstance } from 'axios';

// Create axios instance with dynamic baseURL
const axiosInstance: AxiosInstance = (() => {
  const baseURL = getEnvVariable('VITE_HOST_API_KEY');

  if (!baseURL) {
    throw new Error('VITE_HOST_API_KEY environment variable not defined.');
  }

  return axios.create({ baseURL });
})();

export default axiosInstance;
