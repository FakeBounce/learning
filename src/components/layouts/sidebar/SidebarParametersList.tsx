import { Trans } from '@lingui/macro';
import { Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import { parametersNavigationConfig } from '@utils/navigation/configNavigation';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

export default function SidebarParametersList({ open }: { open: boolean }) {
  const [parametersOpen, setParametersOpen] = useState(true);

  const { canSeePage } = useContext(FeatureFlagContext);
  const navigate = useNavigate();

  const generateAvailablePages = () => {
    return parametersNavigationConfig.map((navItem) => {
      if (navItem.restrictedTo && !canSeePage(navItem.restrictedTo)) {
        return null;
      }
      return (
        <ListItem key={`navItem-${navItem.path}`} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              py: 0.5
            }}
            onClick={() => {
              navigate(navItem.path);
            }}
          >
            <ListItemText primary={navItem.title} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  if (!open) {
    return (
      <Box mt={6} px={2} position="relative">
        <Box display="flex" flexDirection={'row'} height={48} borderRadius={2} alignItems="center">
          <IconButton
            onClick={() => {
              // Navigate somewhere
            }}
            sx={{ padding: 0.5, transition: 'background-color 0.5s ease' }}
          >
            <Iconify icon="mdi:cog" width={24} />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <Box mt={6} px={2} position="relative">
      <Box
        display="flex"
        flexDirection={'row'}
        bgcolor={(theme) => theme.palette.grey[200]}
        height={48}
        borderRadius={2}
        alignItems="center"
        px={2}
        sx={{
          transition: 'all 0.5s ease'
        }}
      >
        <Iconify icon="mdi:cog" width={24} />
        <Typography ml={1}>
          <Trans>Paramètres</Trans>
        </Typography>
      </Box>
      <IconButton
        onClick={() => setParametersOpen(!parametersOpen)}
        sx={{ maxWidth: 50, position: 'absolute', top: 4, right: 20 }}
      >
        <Iconify icon={parametersOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} width={24} />
      </IconButton>
      <List>{generateAvailablePages()}</List>
    </Box>
  );
}
