import './App.css';
import { dynamicActivate, getLocale } from '@src/i18n';
import ThemeProvider from '@src/theme';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Router from './routes';
import SnackbarProvider from './components/snackbar/SnackbarProvider';
import { store, persistor } from '@redux/store';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { FeatureFlagProvider } from '@utils/feature-flag/FeatureFlagProvider';

// ----------------------------------------------------------------------

export default function App() {
  useEffect(() => {
    dynamicActivate(getLocale());
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <SnackbarProvider>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <FeatureFlagProvider>
                <I18nProvider i18n={i18n}>
                  <Router />
                </I18nProvider>
              </FeatureFlagProvider>
            </PersistGate>
          </ReduxProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
