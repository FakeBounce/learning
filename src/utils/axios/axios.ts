import axios, { AxiosInstance } from 'axios';
// ----------------------------------------------------------------------

const axiosInstance: AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_HOST_API_KEY });

export default axiosInstance;
