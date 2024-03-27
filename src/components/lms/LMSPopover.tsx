import { ClickAwayListener, Paper, Popper, PopperPlacementType, PopperProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface LMSPopoverProps extends PopperProps {
  id?: string;
  open: boolean;
  onClose?: () => void;
  anchorEl: HTMLElement | null;
  placement?: PopperPlacementType;
  children: ReactNode;
}

export default function LMSPopover({
  id,
  open = false,
  onClose = undefined,
  anchorEl,
  placement = 'top-end',
  children,
  ...other
}: LMSPopoverProps) {
  const theme = useTheme();

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      sx={{ zIndex: 1200 }} // We shouldn't do 1200 but something is set to 1199
      {...other}
    >
      <ClickAwayListener onClickAway={() => onClose && onClose()}>
        <Paper
          elevation={10}
          sx={{
            borderRadius: theme.shape.customBorderRadius.small,
            minWidth: 160,
          }}
        >
          {children}
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
}
