import { Trans } from '@lingui/macro';
import ListItemText from '@mui/material/ListItemText';
import Iconify from '@src/components/iconify/Iconify';
import { generalNavigationConfig } from '@utils/navigation/configNavigation';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { NavLink, useLocation } from 'react-router-dom';

export default function SidebarGeneralList({ open }: { open: boolean }) {
  const { pathname } = useLocation();

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
            <Box component={NavLink} to={navItem.path}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  display: 'flex',
                  px: open ? 0.5 : 0,
                  mx: open ? 2 : 1,
                  transition: 'all 0.3s ease',
                  borderRadius: (theme) => theme.shape.customBorderRadius.small,
                  backgroundColor: (theme) =>
                    pathname === navItem.path && open ? theme.palette.grey[300] : 'transparent'
                }}
              >
                <ListItemIcon
                  data-testid={`icon-${navItem.path}`}
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : 'auto',
                    justifyContent: 'center',
                    padding: 1,
                    maxWidth: !open ? '100%' : 48,
                    borderRadius: (theme) => theme.shape.customBorderRadius.small,
                    transition: 'all 0.3s ease',
                    backgroundColor: (theme) =>
                      pathname === navItem.path && !open ? theme.palette.grey[300] : 'transparent'
                  }}
                >
                  <Iconify icon={navItem.icon} width={24} />
                </ListItemIcon>

                <ListItemText
                  primary={navItem.title}
                  sx={{
                    opacity: open ? 1 : 0
                  }}
                />
              </ListItemButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
