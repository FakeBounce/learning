import type { Meta, StoryObj } from '@storybook/react';
import LMSCard from '@src/components/lms/LMSCard';
import Typography from '@mui/material/Typography';
import * as CardFooterStories from '@src/stories/cards/CardFooter.stories';
import CardFooter from '@src/components/cards/CardFooter';
import LoginFooter from '@src/pages/login/LoginFooter';
import LoginHeader from '@src/pages/login/LoginHeader';
import CardHeader from '@src/components/cards/CardHeader';
import * as CardHeaderStories from '@src/stories/cards/CardHeader.stories';

const meta: Meta = {
  title: 'Example/LMSCard',
  component: LMSCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;

type Story = StoryObj<typeof LMSCard>;

export const Default: Story = {
  args: {
    children: <Typography>This is a default LMSCard without header or footer.</Typography>
  }
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: <LoginHeader />,
    footer: <LoginFooter isLoading={false} />,
    children: <Typography>This is an LMSCard with header and footer. (Login style)</Typography>
  }
};

export const PageCard: Story = {
  args: {
    isPageCard: true,
    header: <CardHeader {...CardHeaderStories.WithSingleAction.args} />,
    footer: <CardFooter {...CardFooterStories.Default.args} />,
    children: (
      <Typography>This is a page style LMSCard with header and footer. (Grid style)</Typography>
    )
  }
};
