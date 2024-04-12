import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import RHFTextFieldAdornement from '@src/components/hook-form/RHFTextFieldAdornement';
import { useState } from 'react';

const meta: Meta = {
  title: 'Example/RHFTextFieldAdornement',
  component: RHFTextFieldAdornement,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof RHFTextFieldAdornement>;

const RHFTextFieldAdornementTemplate: Story = {
  render: (args: any) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <form>
          <RHFTextFieldAdornement
            type={isPasswordVisible ? 'text' : 'password'}
            icon={isPasswordVisible ? 'eva:eye-fill' : 'eva:eye-off-fill'}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            {...args}
          />
        </form>
      </FormProvider>
    );
  }
};

export const Default = {
  ...RHFTextFieldAdornementTemplate,
  args: {
    name: 'Default',
    label: 'Default Field',
    defaultValue: ''
  }
};

export const WithPasswordShown = {
  ...RHFTextFieldAdornementTemplate,
  args: {
    name: 'pass',
    type: 'text',
    icon: 'eva:eye-fill',
    label: 'With password shown',
    defaultValue: 'qkdoaznd'
  }
};

export const WithPasswordHidden = {
  ...RHFTextFieldAdornementTemplate,
  args: {
    name: 'pass',
    label: 'With password hidden',
    defaultValue: 'qkdoaznd',
    icon: 'eva:eye-off-fill'
  }
};
