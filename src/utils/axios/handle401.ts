import { resetApp } from '@redux/actions/globalActions';
import { getSession } from '@utils/axios/session';
import { refresh } from '@redux/actions/connectedUserActions';
import { AxiosRequestConfig } from 'axios';

export const disconnectUser = () => {
  // Dynamically import store to avoid circular dependency
  import('@redux/store')
    .then(({ store }) => {
      store.dispatch(resetApp());
    })
    .catch((error) => {
      console.error('Error importing store:', error);
    });
};

export const handle401 = (error: any): Promise<AxiosRequestConfig<any>> | void => {
  try {
    // Dynamically import store to avoid circular dependency
    return import('@redux/store')
      .then(async ({ store }) => {
        await store.dispatch(refresh());

        const session = getSession();

        if (session) {
          //On applique le nouveau token à la requête
          error.config.headers.Authorization = `Bearer ${session.token}`;

          //On retransforme les données en objet car elles ont été transformées en string
          error.config.data = JSON.parse(error.config.data);

          //On relance la requête
          return error.config;
        }
        disconnectUser();
        throw new Error('No session found');
      })
      .catch(() => {
        disconnectUser();
        throw new Error('Error importing store or parsing datas');
      });
  } catch (e) {
    //Si le refresh token a échoué, on déconnecte l'utilisateur
    disconnectUser();
  }
};
