import React from 'react';
import { ClickAwayListener, Paper, Popper, PopperPlacementType } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface LMSPopoverProps {
  id?: string;
  open: boolean;
  onClose?: () => void;
  anchorEl: HTMLElement | null;
  placement?: PopperPlacementType;
  children: React.ReactNode;
}
export default function LMSPopover({
  id,
  open = false,
  onClose = undefined,
  anchorEl,
  placement = 'top-end',
  children
}: LMSPopoverProps) {
  const theme = useTheme();

  return (
    <Popper id={id} open={open} anchorEl={anchorEl} placement={placement} sx={{ zIndex: 9 }}>
      <ClickAwayListener onClickAway={() => onClose && onClose()}>
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
    </Popper>
  );
}
