import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import RHFAvatar from '@src/components/hook-form/RHFAvatar';
import { useState } from 'react';

const meta: Meta = {
  title: 'Example/RHFAvatar',
  component: RHFAvatar,
  parameters: {
    backgrounds: {
      default: 'dark'
    },
    layout: 'centered'
  }
};

export default meta;

type Story = StoryObj<typeof RHFAvatar>;

const RHFAvatarTemplate: Story = {
  render: (args: any) => {
    const [image, setImage] = useState<string | File>('');
    const methods = useForm();

    return (
      <FormProvider {...methods}>
        <form>
          <RHFAvatar image={image} setImage={setImage} {...args} />
        </form>
      </FormProvider>
    );
  }
};

export const Default = {
  ...RHFAvatarTemplate,
  args: {
    name: 'default',
    label: 'Default Avatar',
    size: 'medium'
  }
};

export const WithImage = {
  ...RHFAvatarTemplate,
  args: {
    name: 'withImage',
    label: 'With Image Avatar',
    size: 'medium',
    image: 'avatar.jpg'
  }
};

export const Required = {
  ...RHFAvatarTemplate,
  args: {
    name: 'required',
    label: 'Required Avatar',
    size: 'medium',
    required: true
  }
};
