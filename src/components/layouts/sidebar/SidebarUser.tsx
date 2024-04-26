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
import { MouseEvent, useState } from 'react';
import { logout } from '@redux/actions/connectedUserActions';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
// ----------------------------------------------------------------------

export default function SidebarUser({ open }: { open: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.connectedUser);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  const popoverOpen = Boolean(anchorEl);
  const id = popoverOpen ? 'logout-popover' : undefined;

  if (!open) {
    return (
      <Stack
        sx={{
          py: 3,
          transition: 'padding 0.5s ease'
        }}
      >
        <Box
          sx={{
            height: '5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: (theme) => theme.shape.customBorderRadius.small,
            transition: 'background-color 0.5s ease'
          }}
        >
          {user !== undefined ? (
            <Avatar
              src={user.logo ?? undefined}
              sx={{
                background: (theme) => theme.palette.grey[400],
                color: (theme) => theme.palette.common.white,
                textTransform: 'uppercase'
              }}
            >
              {user.lastname.charAt(0)}
              {user.firstname.charAt(0)}
            </Avatar>
          ) : (
            <Skeleton variant="circular" width={40} height={40} />
          )}
        </Box>
      </Stack>
    );
  }
  return (
    <Stack
      sx={{
        p: 2,
        py: 3,
        transition: 'padding 0.5s ease'
      }}
    >
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.grey[300],
          borderRadius: (theme) => theme.shape.customBorderRadius.small,
          height: '5rem',
          display: 'flex',
          transition: 'background-color 0.5s ease',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 1 }}>
          {user !== undefined ? (
            <Avatar
              src={user.logo ?? undefined}
              sx={{
                background: (theme) => theme.palette.common.white,
                color: (theme) => theme.palette.grey[600],
                textTransform: 'uppercase'
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
            display: 'flex',
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
        <LMSPopover
          id={id}
          anchorEl={anchorEl}
          open={popoverOpen}
          onClose={() => setAnchorEl(null)}
        >
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary={<Trans>Déconnexion</Trans>} />
            </ListItemButton>
          </ListItem>
        </LMSPopover>
      </Box>
    </Stack>
  );
}
