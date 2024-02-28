import { Box, Stack, Avatar, ListItemButton, ListItemText, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LMSPopover from '@src/components/lms/LMSPopover';
import { Trans } from '@lingui/macro';
import { MouseEvent, useState } from 'react';
import { useAuthenticationContext } from '@src/auth/AuthenticationContext';
// ----------------------------------------------------------------------

export default function SidebarUser({ open }: { open: boolean }) {
  const theme = useTheme();
  const { logout } = useAuthenticationContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = () => (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

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
        onClick={handleClick()}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 2, mr: 2 }}>
          <Avatar alt="Avatar photo" src="/assets/shape_avatar.svg" />
        </Box>
        <Stack py={2} spacing={1}>
          <Box>Nom / Prénom</Box> <Box> Rôle</Box>
        </Stack>
        <LMSPopover
          id={id}
          anchorEl={anchorEl}
          popoverOpen={popoverOpen}
          onClose={handleClose}
        >
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => {
                handleClose();
                logout();
              }}
            >
              <ListItemText primary={<Trans>Déconnexion</Trans>} />
            </ListItemButton>
          </ListItem>
        </LMSPopover>
      </Box>
    </Stack>
  );
}
