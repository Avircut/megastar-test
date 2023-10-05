/* eslint-disable max-len */
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { darkTheme } from 'app/providers/theme/theme';
import { StyleDecorator } from '../../src/shared/config/storybook/decorators/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/decorators/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/decorators/RouterDecorator/RouterDecorator';
import { msw } from './mockHandlers';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator/StoreDecorator';

initialize({ onUnhandledRequest: 'bypass' });

const preview: Preview = {
  decorators: [
    RouterDecorator, StyleDecorator, ThemeDecorator(darkTheme), StoreDecorator({}),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw,
  },
  loaders: [mswLoader],
};

export default preview;
