import type { Meta, StoryObj } from '@storybook/react';
import StatusChip from '@src/components/lms/StatusChip';
import { Typography } from '@mui/material';

const meta: Meta = {
  title: 'Example/StatusChip',
  component: StatusChip,
  parameters: {
    layout: 'centered',
    waitForSVG: true
  }
};

export default meta;

type Story = StoryObj<typeof StatusChip>;

export const Active: Story = {
  args: {
    isActive: true,
    activatedText: 'Active',
    handleClick: () => alert('Clicked!')
  }
};

export const Inactive: Story = {
  args: {
    isActive: false,
    activatedText: 'Inactive',
    handleClick: () => alert('Clicked!')
  }
};

export const CustomText: Story = {
  args: {
    isActive: true,
    activatedText: <Typography variant="body1">Custom Text</Typography>,
    handleClick: () => alert('Clicked!')
  }
};
