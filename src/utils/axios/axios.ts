import axios, { AxiosInstance } from 'axios';

// Function to get environment variable
const getEnvVariable = (variableName: string): string | undefined => {
  return process.env[variableName];
};

// Create axios instance with dynamic baseURL
const axiosInstance: AxiosInstance = (() => {
  const baseURL = getEnvVariable('VITE_HOST_API_KEY');

  if (!baseURL) {
    throw new Error('VITE_HOST_API_KEY environment variable not defined.');
  }

  return axios.create({ baseURL });
})();

export default axiosInstance;
