import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';

const storybookDir = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...(config.resolve ?? {}),
        alias: {
          ...((typeof config.resolve === 'object' && config.resolve && 'alias' in config.resolve
            ? config.resolve.alias
            : {}) ?? {}),
          '@avenra/ui': path.resolve(storybookDir, '../../../packages/ui/src/index.ts'),
          '@avenra/utils': path.resolve(storybookDir, '../../../packages/utils/src/index.ts')
        }
      }
    };
  }
};

export default config;
