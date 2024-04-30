import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import SnackbarProvider from '@src/components/snackbar';
import { dynamicActivate } from '@src/i18n';
import ThemeProvider from '@src/theme';
import React, { ReactNode } from 'react';
import { RenderOptions, render as rtlRender, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/rootReducer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

jest.mock('@mui/x-data-grid', () => ({
  ...jest.requireActual('@mui/x-data-grid'),
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  DataGrid: require('@src/tests/mocks/MockFullTable').default
}));

// Potentially need to find another way to mock the components
// If we use MenuItem another way
jest.mock('@mui/material/MenuItem', () => {
  // eslint-disable-next-line react/display-name
  return ({ value, children, ...props }: { value: string; children: ReactNode }) => (
    <option value={value} {...props}>
      {children}
    </option>
  );
});

jest.mock('@src/components/hook-form/RHFSelect');
jest.mock('@src/components/hook-form/RHFAvatar');
jest.mock('@src/components/hook-form/RHFTimer');
jest.mock('@src/components/lms/LMSSwitch');
jest.mock('@src/components/lms/LMSModal');
jest.mock('@src/components/lms/ActionButton');
jest.mock('@src/components/lms/CSVUploadBox');
jest.mock('@src/components/iconify/Iconify');

// Notifications mock
jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  enqueueSnackbar: jest.fn()
}));

function customRender(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    customHistory = ['/'],
    ...renderOptions
  }: {
    preloadedState?: any;
    store?: any;
    customHistory?: string[];
  } & RenderOptions = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MemoryRouter initialEntries={customHistory}>
          <Provider store={store}>
            <AppWrapper>{children}</AppWrapper>
          </Provider>
        </MemoryRouter>
      </LocalizationProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const AppWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: never) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  });

  act(() => {
    dynamicActivate('fr');
  });

  return (
    <ThemeProvider>
      <SnackbarProvider>
        <I18nProvider i18n={i18n}>{children}</I18nProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export * from '@testing-library/react';
export { customRender as render };
