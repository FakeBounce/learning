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
      <MemoryRouter initialEntries={customHistory}>
        <Provider store={store}>
          <AppWrapper>{children}</AppWrapper>
        </Provider>
      </MemoryRouter>
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
