import {
  Box,
  Stack,
  Avatar,
  ListItemButton,
  ListItemText,
  ListItem,
  Skeleton
} from '@mui/material';
import LMSPopover from '@src/components/lms/LMSPopover';
import { Trans } from '@lingui/macro';
import { MouseEvent, useEffect, useState } from 'react';
import { logout } from '@redux/actions/connectedUserActions';
import { useAppDispatch, useAppSelector } from '@redux/hooks';

export default function SidebarUser({ open }: { open: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.connectedUser);

  useEffect(() => {
    if (!open) {
      setAnchorEl(null);
    }
  }, [open]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'logout-popover' : undefined;

  return (
    <Stack
      sx={{
        p: open ? 2 : 0,
        py: 3,
        transition: 'padding 0.5s ease'
      }}
    >
      <Box
        sx={{
          bgcolor: (theme) => (open ? theme.palette.grey[300] : 'transparent'),
          borderRadius: (theme) => theme.shape.customBorderRadius.small,
          height: '5rem',
          display: 'flex',
          transition: 'background-color 0.3s ease',
          cursor: 'pointer',
          gap: 1
        }}
        onClick={handleClick}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 1 }}>
          {user !== undefined ? (
            <Avatar
              src={user.logo ?? undefined}
              sx={{
                background: (theme) =>
                  open ? theme.palette.common.white : theme.palette.grey[400],
                color: (theme) => (open ? theme.palette.grey[600] : theme.palette.common.white),
                textTransform: 'uppercase',
                transition: 'background-color 0.3s ease'
              }}
            >
              {user.lastname.charAt(0)}
              {user.firstname.charAt(0)}
            </Avatar>
          ) : (
            <Skeleton variant="circular" width={40} height={40} />
          )}
        </Box>
        <Box
          px={1}
          sx={{
            display: open ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            textWrap: 'wrap'
          }}
        >
          <Box sx={{ fontSize: (theme) => theme.typography.body1.fontSize }}>
            {user.lastname} {user.firstname}
          </Box>
          <Box sx={{ fontSize: (theme) => theme.typography.caption.fontSize }}>
            {user.isSuperAdmin ? (
              <Trans>Super Admin</Trans>
            ) : user.isClientAdmin ? (
              <Trans>Client Admin</Trans>
            ) : null}
          </Box>
        </Box>
      </Box>
      <LMSPopover id={id} anchorEl={anchorEl} open={popoverOpen} onClose={() => setAnchorEl(null)}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary={<Trans>Déconnexion</Trans>} />
          </ListItemButton>
        </ListItem>
      </LMSPopover>
    </Stack>
  );
}
