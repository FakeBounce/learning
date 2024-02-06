import './App.css';
import { dynamicActivate, getLocale } from '@src/i18n.ts';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AxiosConfiguration from 'src/utils/axios/axiosConfiguration';
import Router from './routes';
import SnackbarProvider from './components/snackbar/SnackbarProvider';
import { store, persistor } from './redux/store';
import { AuthenticationProvider } from './auth/AuthenticationContext';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

// ----------------------------------------------------------------------

export default function App() {
  useEffect(() => {
    dynamicActivate(getLocale());
  }, []);

  return (
    <BrowserRouter>
      <AxiosConfiguration>
        <AuthenticationProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <I18nProvider i18n={i18n}>
                <SnackbarProvider>
                  <Router />
                </SnackbarProvider>
              </I18nProvider>
            </PersistGate>
          </ReduxProvider>
        </AuthenticationProvider>
      </AxiosConfiguration>
    </BrowserRouter>
  );
}
