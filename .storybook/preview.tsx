import type { Preview } from '@storybook/react';
import ThemeProvider from '@src/theme';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useEffect } from 'react';
import { dynamicActivate, getLocale } from '../src/i18n';
import { BrowserRouter } from 'react-router-dom';
import '../src/App.css';

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        dynamicActivate(getLocale());
      }, []);

      return (
        <BrowserRouter>
          <ThemeProvider>
            <I18nProvider i18n={i18n}>{Story()}</I18nProvider>
          </ThemeProvider>
        </BrowserRouter>
      );
    }
  ]
};

export default preview;
