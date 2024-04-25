import { getEnvVariable } from '@utils/environnement';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponseMessage } from '@services/interfaces';
import { camelizeObject, snakizeObject } from '@utils/helpers/convertCasing';
import { handle401 } from '@utils/axios/handle401';
import { getSession, setSession } from '@utils/axios/session';

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
    //On vérifie s'il s'agit d'une requête de refresh ou une requête normale
    if (config.url === '/users/refresh') {
      const session = getSession();
      if (session) {
        //On remplace le token dans le header par le refresh token
        config.headers.Authorization = `Bearer ${session.refreshToken}`;
      }
    }
    return { ...config, data: snakizeObject(config.data) };
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
        try {
          //On refresh le token pour relancer la requête
          const newToken = await newInstance.post('/users/refresh');

          if (newToken.data.data) {
            //On met à jour le token dans le local storage
            setSession(newToken.data.data);
            //On applique le nouveau token à la requête
            error.config.headers.Authorization = `Bearer ${newToken.data.data.token}`;
            //On retransforme les données en objet car elles ont été transformées en string
            error.config.data = JSON.parse(error.config.data);

            //On relance la requête
            return newInstance(error.config);
          } else {
            //Dans le doute on déconnecte l'utilisateur si la requête est bien passée
            //mais que le retour n'est pas bon
            handle401();
          }
        } catch (e) {
          //Si le refresh token a échoué, on déconnecte l'utilisateur
          handle401();
        }
      }
      return Promise.reject(error);
    }
  );
  return newInstance;
})();

export default axiosInstance;
