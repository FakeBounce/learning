import SidebarGeneralList from '@src/components/layouts/sidebar/SidebarGeneralList';
import SidebarParametersList from '@src/components/layouts/sidebar/SidebarParametersList';
import SidebarUser from '@src/components/layouts/sidebar/SidebarUser';
import { Drawer, DrawerHeader, drawerWidth } from './styles';
import Box from '@mui/material/Box';

interface SidebarProps {
  open: boolean;
  setOpen: (_: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <Box sx={{ display: 'flex', maxWidth: drawerWidth }}>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: drawerWidth,
            backgroundColor: (theme) => theme.palette.grey[100],
            borderRightStyle: 'dashed',
            position: 'fixed'
          }
        }}
      >
        <DrawerHeader>
          <SidebarUser open={open} />
        </DrawerHeader>

        <SidebarGeneralList open={open} />

        <SidebarParametersList open={open} />
      </Drawer>
    </Box>
  );
}
