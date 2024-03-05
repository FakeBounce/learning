import React from 'react';
import { ClickAwayListener, Paper, Popover } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LMSPopoverProps {
  id?: string;
  popoverOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
}
export default function LMSPopover({
  id,
  popoverOpen,
  onClose,
  anchorEl,
  children
}: LMSPopoverProps) {
  const theme = useTheme();

  return (
    <Popover
      id={id}
      open={popoverOpen}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 15,
        horizontal: 'center'
      }}
    >
      <ClickAwayListener onClickAway={onClose}>
        <Paper
          elevation={10}
          sx={{
            borderRadius: theme.shape.customBorderRadius.small,
            minWidth: 160,
            '&:hover': { color: theme.palette.secondary.main }
          }}
        >
          {children}
        </Paper>
      </ClickAwayListener>
    </Popover>
  );
}
