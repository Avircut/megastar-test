import type { Meta, StoryObj } from '@storybook/react';
import { OutlayRow } from './OutlayRow';

const meta = {
  title: 'entities/Outlay/OutlayRow',
  component: OutlayRow,
  tags: ['autodocs'],
} satisfies Meta<typeof OutlayRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    row: {
      rowName: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque, nam?',
      salary: 99999.9,
      equipmentCosts: 99999,
      overheads: 99999.9,
      estimatedProfit: 9999.9,
    },
  },
};
