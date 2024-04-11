import type { Meta, StoryObj } from '@storybook/react';
import CircledAvatar from '@src/components/lms/CircledAvatar';

const meta = {
  title: 'Example/CircledAvatar',
  component: CircledAvatar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark'
    }
  },
  tags: ['autodocs'],
  args: {
    children: 'Avatar content'
  }
} as Meta<typeof CircledAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
