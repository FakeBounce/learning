import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import RHFTextField from '@src/components/hook-form/RHFTextField';

const meta: Meta = {
  title: 'Example/RHFTextField',
  component: RHFTextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof RHFTextField>;

const RHFTextFieldTemplate: Story = {
  render: (args: any) => {
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <form>
          <RHFTextField {...args} />
        </form>
      </FormProvider>
    );
  }
};

export const Default = {
  ...RHFTextFieldTemplate,
  args: {
    name: 'example',
    label: 'Example Field',
    defaultValue: '',
    helperText: 'This is a helper text.'
  }
};

export const Medium = {
  ...RHFTextFieldTemplate,
  args: {
    name: 'medium',
    label: 'Medium Field',
    defaultValue: '',
    size: 'medium'
  }
};

export const Error = {
  ...RHFTextFieldTemplate,
  args: {
    name: 'small',
    label: 'Small Field',
    defaultValue: '',
    size: 'small',
    helperText: 'An error happened',
    error: {
      message: 'This is an error message.'
    }
  }
};

export const Disabled = {
  ...RHFTextFieldTemplate,
  args: {
    name: 'disabled',
    label: 'Disabled Field',
    defaultValue: '',
    disabled: true
  }
};

export const Required = {
  ...RHFTextFieldTemplate,
  args: {
    name: 'required',
    label: 'Required Field',
    defaultValue: '',
    required: true
  }
};
