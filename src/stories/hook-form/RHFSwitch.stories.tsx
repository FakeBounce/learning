import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import RHFSwitch from '@src/components/hook-form/RHFSwitch';

const meta: Meta = {
  title: 'Example/RHFSwitch',
  component: RHFSwitch,
  parameters: {
    layout: 'centered'
  }
};

export default meta;

type Story = StoryObj<typeof RHFSwitch>;

const RHFSwitchTemplate: Story = {
  render: (args: any) => {
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <form>
          <RHFSwitch {...args} />
        </form>
      </FormProvider>
    );
  }
};

export const Default = {
  ...RHFSwitchTemplate,
  args: {
    name: 'default',
    label: 'Default Switch',
    required: false
  }
};

export const Required = {
  ...RHFSwitchTemplate,
  args: {
    name: 'required',
    label: 'Required',
    required: true
  }
};

export const Checked = {
  ...RHFSwitchTemplate,
  args: {
    name: 'checked',
    label: 'Checked Switch',
    required: false,
    defaultValue: true
  }
};
