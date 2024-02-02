// i18n
import './locales/i18n';

// ----------------------------------------------------------------------

import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AxiosConfiguration from 'src/utils/axios/axiosConfiguration';
// routes
import Router from './routes';
// components
// import SnackbarProvider from 'minimal-ui/components/snackbar';
import { store, persistor } from './redux/store';
import { AuthenticationProvider } from './auth/AuthenticationContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <BrowserRouter>
      <AxiosConfiguration>
        <AuthenticationProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {/*  <SnackbarProvider>*/}
              <Router />
              {/*</SnackbarProvider>*/}
            </PersistGate>
          </ReduxProvider>
        </AuthenticationProvider>
      </AxiosConfiguration>
    </BrowserRouter>
  );
}
