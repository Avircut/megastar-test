import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator/StoreDecorator';
import { EditableOutlayRow } from './EditableOutlayRow';

const meta = {
  title: 'entities/Outlay/EditableOutlayRow',
  component: EditableOutlayRow,
  tags: ['autodocs'],
  decorators: [
    StoreDecorator({}),
  ],
} satisfies Meta<typeof EditableOutlayRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};
