import { t, Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { toggleOrganizationsBlock } from '@redux/actions/organizationsActions';
import { changeOrganizationView } from '@redux/reducers/connectedUserReducer';
import { Organization } from '@services/organizations/interfaces';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '@utils/navigation/paths';
import { useSnackbar } from 'notistack';

interface OrganizationsListPopperContentProps {
  onClose: () => void;
  setOrganizationSelected: (value: Organization | null) => void;
  organizationSelected: Organization | null;
}
export default function OrganizationsListPopperContent({
  onClose,
  setOrganizationSelected,
  organizationSelected
}: OrganizationsListPopperContentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { organizationId } = useAppSelector((state) => state.connectedUser.user);

  const handleChangeView = () => {
    if (organizationId === organizationSelected?.id) {
      onClose();
      enqueueSnackbar(t`Vous êtes déjà connecté à cette organisation`, { variant: 'info' });
      return;
    }

    if (organizationSelected !== null) {
      dispatch(
        changeOrganizationView({
          organizationId: organizationSelected.id
        })
      );
      navigate(PATH_DASHBOARD.root);
    }
  };

  const goToUpdateOrganization = () => {
    if (organizationSelected !== null) {
      navigate(`/organizations/update/${organizationSelected.id}`);
    }
  };

  const toggleBlock = () => {
    if (organizationSelected !== null) {
      dispatch(
        toggleOrganizationsBlock({
          setActive: !organizationSelected.is_active,
          organizationId: organizationSelected.id
        })
      ).then(() => {
        // Reset the popper
        onClose();
        setOrganizationSelected(null);
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, minWidth: 160 }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={handleChangeView}>
          <ListItemText primary={<Trans>Se connecter</Trans>} />
        </ListItemButton>
        <ListItemButton onClick={goToUpdateOrganization}>
          <ListItemText primary={<Trans>Modifier</Trans>} />
        </ListItemButton>
        <ListItemButton onClick={toggleBlock}>
          <ListItemText
            primary={
              organizationSelected?.is_active ? <Trans>Bloquer</Trans> : <Trans>Débloquer</Trans>
            }
          />
        </ListItemButton>
      </ListItem>
    </Paper>
  );
}
