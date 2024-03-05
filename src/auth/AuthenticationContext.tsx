import { useDeleteQuery, useGetQuery, usePostQuery } from '@utils/axios';
import { setSession } from '@utils/axios/session';
import { AuthenticationReducer, initialAuthenticationState } from './AuthenticationReducer';
import {
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  createContext,
  ReactNode,
  useContext,
  Context
} from 'react';
import localStorageAvailable from '@utils/localStorageAvailable';
// ----------------------------------------------------------------------

const AuthenticationContext: Context<{
  isInitialized: boolean;
  isAuthenticated: any;
  userData: any;
  method: string;
  login: (login: string, password: string, organization_uuid: string) => Promise<void>;
  logout: () => Promise<void>;
}> = createContext(null as any);

const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);

  if (!context) throw new Error('AuthenticationContext context must be use inside AuthProvider');

  return context;
};

/*
 * AuthenticationProvider
 * This provider is used to manage the authentication state of the application
 * Never move in Reducer store due to javascript security
 */
function AuthenticationProvider({ children }: { children: ReactNode }) {
  const [, fetchUser] = useGetQuery({
    endpoint: '/user',
    options: {
      manual: true
    }
  });

  const [, postLogin] = usePostQuery({
    endpoint: '/users/login',
    options: {
      manual: true
    }
  });

  const [, deleteLogout] = useDeleteQuery({
    endpoint: '/users/logout',
    options: {
      manual: true
    }
  });

  try {
    const [state, dispatch] = useReducer(AuthenticationReducer, initialAuthenticationState);
    useEffect(() => {
      initialize();
    }, []);

    const storageAvailable = localStorageAvailable();

    const initialize = useCallback(async () => {
      try {
        const userTokenData = storageAvailable ? localStorage.getItem('userTokenData') : null;

        if (userTokenData) {
          setSession(JSON.parse(userTokenData));

          const response = await fetchUser();

          const { userData } = response.data.data;

          dispatch({
            type: 'INITIAL',
            payload: {
              isAuthenticated: true,
              userData
            }
          });
        } else {
          dispatch({
            type: 'INITIAL',
            payload: {}
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: 'INITIAL', payload: {} });
      }
    }, [storageAvailable]);

    // LOGIN
    const login = useCallback(
      async (login: string, password: string, organization_uuid: string) => {
        const response = await postLogin({
          data: {
            login,
            password,
            organization_uuid
          }
        });

        const { token, expires_at, refresh_token } = response.data.data;
        const userTokenData = { token, expires_at, refresh_token };
        setSession(userTokenData);

        const user = await fetchUser();
        const { userData } = user.data.data;

        dispatch({
          type: 'LOGIN',
          payload: {
            userData
          }
        });
      },
      []
    );

    // LOGOUT
    const logout = useCallback(async () => {
      await deleteLogout();
      setSession(null);
      dispatch({
        type: 'LOGOUT'
      });
    }, []);

    const memoizedValue = useMemo(
      () => ({
        isInitialized: state.isInitialized,
        isAuthenticated: state.isAuthenticated,
        userData: state.userData,
        method: 'basic', // If we have multiple ways to log in
        login,
        logout
      }),
      [state.isAuthenticated, state.isInitialized, state.userData, login, logout]
    );

    return (
      <AuthenticationContext.Provider value={memoizedValue}>
        {children}
      </AuthenticationContext.Provider>
    );
  } catch (e) {
    console.log(e);
    return <p>Authentication Error</p>;
  }
}

export { AuthenticationProvider, useAuthenticationContext };
