import { detect, fromNavigator, fromStorage, fromUrl } from '@lingui/detect-locale';

import { i18n } from '@lingui/core';
// @Todo get the locales from the server
export const locales: { [key: string]: string } = {
  fr: 'fr',
  en: 'en'
};

export const defaultLocale = 'fr';

const LOCAL_STORAGE_KEY = 'lang';

i18n.load(defaultLocale, {});
i18n.activate(defaultLocale);

// checks that detected locale is available
const isLocaleValid = (locale: string | null) => `${locale}` in locales;

// returns locale
export function getLocale(): string {
  const detectedLocale = detect(
    fromUrl('lang'),
    fromStorage(LOCAL_STORAGE_KEY),
    fromNavigator(), // from system settings
    () => defaultLocale
  );
  const shortLocale = detectedLocale?.substring(0, 2) || defaultLocale;
  return isLocaleValid(shortLocale) ? shortLocale : defaultLocale;
}

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
  const { messages } = await import(`./locales/compiled/fr`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
