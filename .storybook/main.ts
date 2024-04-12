import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(mjs|ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-coverage'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  features: {
    emotionAlias: false
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../public'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop: any) => {
        return prop.parent
          ? prop.parent.name !== 'DOMAttributes' &&
              prop.parent.name !== 'HTMLAttributes' &&
              prop.parent.name !== 'AriaAttributes'
          : true;
      }
    }
  },
  webpackFinal: async (config: any) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    return config;
  }
};
export default config;
