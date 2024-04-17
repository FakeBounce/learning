import { Box, Stack, Avatar, ListItemButton, ListItemText, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LMSPopover from '@src/components/lms/LMSPopover';
import { Trans } from '@lingui/macro';
import { MouseEvent, useState } from 'react';
import { logout } from '@redux/actions/connectedUserActions';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
// ----------------------------------------------------------------------

export default function SidebarUser({ open }: { open: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
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
            borderRadius: 2,
            transition: 'background-color 0.5s ease'
          }}
        >
          <Avatar alt="Avatar photo" src="/assets/shape_avatar.svg" />
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
          bgcolor: theme.palette.grey[300],
          borderRadius: 2,
          height: '5rem',
          display: 'flex',
          transition: 'background-color 0.5s ease',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 1 }}>
          <Avatar sx={{ background: 'white', color: 'grey' }}>
            {user.lastname.charAt(0)}
            {user.firstname.charAt(0)}
          </Avatar>
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
          <Box sx={{ fontSize: 15 }}>
            {user.lastname} {user.firstname}
          </Box>
          <Box sx={{ fontSize: 12 }}>
            {user.isSuperAdmin ? 'SuperAdmin' : user.isClientAdmin ? 'ClientAdmin' : ''}
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
