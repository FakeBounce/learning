import type { Meta, StoryFn } from '@storybook/react';
import LMSSwitch from '@src/components/lms/LMSSwitch';
import { ChangeEvent, useState } from 'react';

const meta: Meta = {
  title: 'Example/LMSSwitch',
  component: LMSSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;

const Template: StoryFn<typeof LMSSwitch> = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return <LMSSwitch {...args} checked={checked} handleChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {};

export const Checked = Template.bind({});
Checked.args = {
  checked: true
};
