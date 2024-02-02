import { AnyAction } from 'redux';

// ----------------------------------------------------------------------

interface AuthenticationProps {
  isInitialized: boolean;
  isAuthenticated: boolean;
  userData: Record<string, any> | null; // @todo: Set correct type from api
}
const initialAuthenticationState: AuthenticationProps = {
  isInitialized: false,
  isAuthenticated: false,
  userData: null
};

const AuthenticationReducer = (state: AuthenticationProps, action: AnyAction) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated || false,
        userData: action.payload.userData || null
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload.userData
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        userData: null
      };
    default:
      return state;
  }
};

export { AuthenticationReducer, initialAuthenticationState };
