import type { Meta, StoryFn } from '@storybook/react';
import LMSModal from '@src/components/lms/LMSModal';
import { useState } from 'react';

const meta: Meta = {
  title: 'Example/LMSModal',
  component: LMSModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;

const Template: StoryFn<typeof LMSModal> = (args: any) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <button onClick={handleOpen}>Open modal</button>
      <LMSModal {...args} open={open} onClose={handleClose} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Modal Title',
  children: 'Modal Content',
  cancelAction: () => console.log('Cancelled'),
  validateAction: () => console.log('Validated')
};
