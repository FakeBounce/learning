import type { Meta, StoryFn } from '@storybook/react';
import LMSPopover from '@src/components/lms/LMSPopover';
import { MouseEvent, useState } from 'react';

const meta: Meta = {
  title: 'Example/LMSPopover',
  component: LMSPopover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
};

export default meta;

const Template: StoryFn<typeof LMSPopover> = (args: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <button onClick={handleClick}>Toggle Popover</button>
      <LMSPopover
        {...args}
        id={id}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        Popover Content
      </LMSPopover>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  placement: 'top-end'
};
