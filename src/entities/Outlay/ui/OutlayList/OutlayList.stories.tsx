import type { Meta, StoryObj } from '@storybook/react';
import { mockData } from 'shared/config/jest/mockData';
import { OutlayList } from './OutlayList';

const meta = {
  title: 'entities/Outlay/OutlayList',
  component: OutlayList,
  tags: ['autodocs'],
} satisfies Meta<typeof OutlayList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: mockData,
  },
};
