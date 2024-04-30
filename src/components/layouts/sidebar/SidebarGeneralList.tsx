import { Trans } from '@lingui/macro';
import ListItemText from '@mui/material/ListItemText';
import Iconify from '@src/components/iconify/Iconify';
import { generalNavigationConfig } from '@utils/navigation/configNavigation';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function SidebarGeneralList({ open }: { open: boolean }) {
  return (
    <Box
      sx={{
        mt: 3
      }}
    >
      <Box
        sx={{
          mb: 1,
          px: 2.5,
          visibility: open ? 'true' : 'hidden',
          textTransform: 'uppercase'
        }}
      >
        <Trans>General</Trans>
      </Box>
      <List>
        {generalNavigationConfig.map((navItem) => (
          <ListItem key={`navItem-${navItem.path}`} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                data-testid={`icon-${navItem.path}`}
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <Iconify icon={navItem.icon} width={24} />
              </ListItemIcon>

              <ListItemText primary={navItem.title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
