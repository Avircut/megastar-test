import type { Meta, StoryObj } from '@storybook/react';
import { MainPageSidebar } from './MainPageSidebar';

const meta = {
  title: 'pages/MainPage/Sidebar',
  component: MainPageSidebar,
  tags: ['autodocs'],
} satisfies Meta<typeof MainPageSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};
