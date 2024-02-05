// i18n / Translations
import './locales/i18n';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AxiosConfiguration from 'src/utils/axios/axiosConfiguration';
import Router from './routes';
import SnackbarProvider from './components/snackbar/SnackbarProvider';
import { store, persistor } from './redux/store';
import { AuthenticationProvider } from './auth/AuthenticationContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <BrowserRouter>
      <AxiosConfiguration>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthenticationProvider>
              <SnackbarProvider>
                <Router />
              </SnackbarProvider>
            </AuthenticationProvider>
          </PersistGate>
        </ReduxProvider>
      </AxiosConfiguration>
    </BrowserRouter>
  );
}
