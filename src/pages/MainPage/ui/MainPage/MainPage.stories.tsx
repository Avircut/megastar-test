import type { Meta, StoryObj } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { rest } from 'msw';
import MainPage from './MainPage';

const meta = {
  title: 'pages/MainPage',
  component: MainPage,
  tags: ['autodocs'],
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
  decorators: [
    StoreDecorator({}),
  ],
};
export const Loading: Story = {
  args: {
  },
  parameters: {
    msw: {
      handlers: {
        outlay: rest.get(`${__API__}/list`, (req, res, ctx) => {
          return res(ctx.delay('infinite'));
        }),
      },
    },
  },
  decorators: [
    StoreDecorator({ }),
  ],
};

export const Error: Story = {
  args: {
  },
  parameters: {
    msw: {
      handlers: {
        outlay: rest.get(`${__API__}/list`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      },
    },
  },
  decorators: [
    StoreDecorator({ }),
  ],
};
