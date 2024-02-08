import Iconify from '@src/components/iconify/Iconify';
import SidebarGeneralList from '@src/components/layouts/sidebar/SidebarGeneralList';
import SidebarParametersList from '@src/components/layouts/sidebar/SidebarParametersList';
import SidebarUser from '@src/components/layouts/sidebar/SidebarUser';
import { Drawer, DrawerHeader, drawerWidth } from './styles';
import theme from '@theme';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// @todo - Need rework; Lot of UX pieces are missing
export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            width: drawerWidth,
            backgroundColor: theme.palette.grey[25],
            borderRightStyle: 'dashed'
          }
        }}
      >
        <DrawerHeader>
          <SidebarUser open={open} />
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{ position: 'absolute', top: 5, right: 20 }}
          >
            <Iconify icon={open ? 'mdi:chevron-left' : 'mdi:chevron-right'} width={24} />
          </IconButton>
        </DrawerHeader>

        <SidebarGeneralList open={open} />

        <SidebarParametersList open={open} />
      </Drawer>
    </Box>
  );
}
