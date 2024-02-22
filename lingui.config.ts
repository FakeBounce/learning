import { formatter } from '@lingui/format-json';

export default {
  locales: ['en', 'fr'],
  sourceLocale: 'fr',
  format: formatter({ style: 'lingui', origins: false }),
  compileNamespace: 'ts',
  catalogs: [
    {
      path: 'src/locales/{name}/{locale}',
      include: ['src/components/{name}', 'src/pages/{name}', 'src/utils/navigation'],
      exclude: ['**/node_modules/**', 'src/components/**', 'src/pages/index.ts', 'src/utils/**']
    },
    {
      path: 'src/locales/{locale}',
      include: ['src/pages/**'],
      exclude: ['**/node_modules/**', 'src/redux/**']
    }
  ],
  runtimeConfigModule: ['@lingui/core', 'i18n'],
  orderBy: 'messageId'
};
