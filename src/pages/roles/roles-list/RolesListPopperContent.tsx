import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Trans } from '@lingui/macro';
import { Role } from '@services/roles/interfaces';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH_ROLES } from '@utils/navigation/paths';
import { useAppDispatch } from '@redux/hooks';
import { setCurrentRole } from '@redux/reducers/rolesReducer';

interface RolesListPopperContentProps {
  roleSelected: Role | null;
  handleDelete: () => void;
}

export default function RolesListPopperContent({
  roleSelected,
  handleDelete
}: RolesListPopperContentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChangeView = (type: string) => () => {
    if (roleSelected !== null) {
      //@TODO: uncomment when pages is ready
      switch (type) {
        case 'update':
          dispatch(setCurrentRole(roleSelected));
          navigate(generatePath(PATH_ROLES.update, { roleId: roleSelected.id }));
          break;
        case 'manage':
          navigate(generatePath(PATH_ROLES.managePermission, { roleId: roleSelected.id }));
          break;
        default:
          break;
      }
    }
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={handleChangeView('update')}
        sx={{ '&:hover': { color: (theme) => theme.palette.secondary.main } }}
      >
        <ListItemText primary={<Trans>Modifier les utilisateurs</Trans>} />
      </ListItemButton>
      <ListItemButton
        onClick={handleChangeView('manage')}
        sx={{ '&:hover': { color: (theme) => theme.palette.secondary.main } }}
      >
        <ListItemText primary={<Trans>Gérer les permissions</Trans>} />
      </ListItemButton>
      {!roleSelected?.isClientAdmin && (
        <ListItemButton
          onClick={handleDelete}
          sx={{ '&:hover': { color: (theme) => theme.palette.secondary.main } }}
        >
          <ListItemText primary={<Trans>Supprimer</Trans>} />
        </ListItemButton>
      )}
    </ListItem>
  );
}
