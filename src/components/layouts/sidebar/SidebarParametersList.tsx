import { Trans } from '@lingui/macro';
import { Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import { parametersNavigationConfig } from '@utils/navigation/configNavigation';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

export default function SidebarParametersList({ open }: { open: boolean }) {
  const { canSeePage } = useContext(FeatureFlagContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const generateAvailablePages = () => {
    return parametersNavigationConfig.map((navItem) => {
      if (navItem.restrictedTo && !canSeePage(navItem.restrictedTo)) {
        return null;
      }
      const isOnPath = pathname.includes(navItem.path);
      return (
        <ListItem key={`navItem-${navItem.path}`} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              py: 0.5,
              backgroundColor: (theme) =>
                isOnPath && open ? theme.palette.grey[200] : 'transparent'
            }}
            onClick={() => {
              navigate(navItem.path);
            }}
          >
            <ListItemText
              primary={navItem.title}
              sx={{
                opacity: open ? 1 : 0,
                color: (theme) => (isOnPath && open ? theme.palette.secondary.main : 'initial')
              }}
            />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <Box mt={6} px={2} position="relative">
      <Box
        display="flex"
        flexDirection={'row'}
        bgcolor={(theme) => (open ? theme.palette.grey[200] : 'transparent')}
        height={48}
        borderRadius={2}
        alignItems="center"
        px={open ? 2 : 0}
        sx={{
          transition: 'all 0.2s ease'
        }}
      >
        <Iconify
          icon="mdi:cog"
          width={24}
          sx={{
            transition: 'background-color 0.5s ease',
            minWidth: 24
          }}
        />
        {open && (
          <Typography ml={1}>
            <Trans>Paramètres</Trans>
          </Typography>
        )}
      </Box>
      <List
        sx={{
          opacity: open ? 1 : 0,
          transition: 'all 0.5s ease'
        }}
      >
        {generateAvailablePages()}
      </List>
    </Box>
  );
}
