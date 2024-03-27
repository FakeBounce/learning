import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Trans } from '@lingui/macro';
import { Role } from '@services/roles/interfaces';
import { useTheme } from '@mui/material/styles';

interface RolesListPopperContentProps {
  roleSelected: Role | null;
  handleDelete: () => void;
}

export default function RolesListPopperContent({ roleSelected, handleDelete }: RolesListPopperContentProps) {
  const theme = useTheme();

  const handleChangeView = () => {
    if (roleSelected !== null) {
      //todo: navigate to the right page
    }
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton onClick={handleChangeView} sx={{'&:hover': { color: theme.palette.secondary.main }}}>
        <ListItemText primary={<Trans>Modifier les utilisateurs</Trans>}/>
      </ListItemButton>
      <ListItemButton onClick={handleChangeView} sx={{'&:hover': { color: theme.palette.secondary.main }}}>
        <ListItemText primary={<Trans>Gérer les permissions</Trans>} />
      </ListItemButton>
      { !roleSelected?.isClientAdmin &&
        <ListItemButton onClick={handleDelete} sx={{'&:hover': { color: theme.palette.secondary.main }}}>
          <ListItemText primary={<Trans>Supprimer</Trans>} />
        </ListItemButton>
      }
    </ListItem>
  );
}