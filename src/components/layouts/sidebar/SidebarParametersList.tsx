import { Trans } from '@lingui/macro';
import { Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import { parametersNavigationConfig } from '@utils/navigation/configNavigation';
import { useState } from 'react';
import theme from '@theme';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

export default function SidebarParametersList({ open }: { open: boolean }) {
  const [parametersOpen, setParametersOpen] = useState(true);

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
        bgcolor={theme.palette.grey[200]}
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
      <List>
        {parametersNavigationConfig.map((navItem) => (
          <ListItem key={`navItem-${navItem.path}`} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                py: 0.5
              }}
            >
              <ListItemText primary={navItem.title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
