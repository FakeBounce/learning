import { formatter } from '@lingui/format-json';

export default {
  locales: ['en', 'fr'],
  sourceLocale: 'fr',
  format: formatter({ style: 'lingui', origins: false }),
  compileNamespace: 'ts',
  catalogs: [
    {
      path: 'src/locales/{name}/{locale}',
      include: ['src/components/{name}', 'src/pages/{name}'],
      exclude: ['**/node_modules/**', 'src/components/**', 'src/pages/index.ts']
    },
    {
      path: 'src/locales/{locale}',
      include: ['src/pages/**'],
      exclude: ['**/node_modules/**', 'src/redux/**', 'src/utils/**']
    }
  ],
  runtimeConfigModule: ['@lingui/core', 'i18n'],
  orderBy: 'messageId'
};
