import { Meta, StoryObj } from '@storybook/react';
import CardHeader from '@src/components/cards/CardHeader';
import { fn } from '@storybook/test';
import palette from '@src/theme/palette';

const meta: Meta = {
  title: 'Example/CardHeader',
  component: CardHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof CardHeader>;

const CardHeaderTemplate: Story = {
  render: (args: any) => {
    return <CardHeader {...args} />;
  }
};

export const Default = {
  ...CardHeaderTemplate,
  args: {
    headerText: 'Header'
  }
};

export const ColoredHeader = {
  ...CardHeaderTemplate,
  args: {
    headerText: 'Colored header',
    headerColor: palette().secondary.main
  }
};

export const WithSingleAction = {
  ...CardHeaderTemplate,
  args: {
    headerText: 'Header with single action',
    actions: [
      {
        actionText: 'Action',
        action: fn(() => console.log('Action clicked'))
      }
    ]
  }
};

export const WithMultipleAction = {
  ...CardHeaderTemplate,
  args: {
    headerText: 'Header with multiple action',
    actions: [
      {
        actionText: 'Action 1',
        action: fn(() => console.log('Action 1 clicked'))
      },
      {
        actionText: 'Action 2',
        actionType: 'update',
        action: fn(() => console.log('Action 2 clicked'))
      }
    ]
  }
};
