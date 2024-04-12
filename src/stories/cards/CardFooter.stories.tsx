import { Meta, StoryObj } from '@storybook/react';
import CardFooter from '@src/components/cards/CardFooter';
import { fn } from '@storybook/test';

const meta: Meta = {
  title: 'Example/CardFooter',
  component: CardFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof CardFooter>;

const CardFooterTemplate: Story = {
  render: (args: any) => {
    return <CardFooter {...args} />;
  }
};

export const Default = {
  ...CardFooterTemplate,
  args: {
    isLoading: false,
    cancelAction: fn(() => console.log('Cancel'))
  }
};

export const Loading = {
  ...CardFooterTemplate,
  args: {
    isLoading: true,
    cancelAction: fn(() => console.log('Cancel'))
  }
};
