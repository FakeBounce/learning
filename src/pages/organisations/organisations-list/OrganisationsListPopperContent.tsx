import { t, Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { toggleOrganisationsBlock } from '@redux/actions/organisationsActions';
import { changeOrganisationView } from '@redux/reducers/connectedUserReducer';
import { Organisation } from '@services/organisations/interfaces';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '@utils/navigation/paths';
import { useSnackbar } from 'notistack';

interface OrganisationsListPopperContentProps {
  onClose: () => void;
  setOrganisationSelected: (value: Organisation | null) => void;
  organisationSelected: Organisation | null;
}
export default function OrganisationsListPopperContent({
  onClose,
  setOrganisationSelected,
  organisationSelected
}: OrganisationsListPopperContentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { organisationId } = useAppSelector((state) => state.connectedUser);

  const handleChangeView = () => {
    if (organisationId === organisationSelected?.id) {
      onClose();
      enqueueSnackbar(t`Vous êtes déjà connecté à cette organisation`, { variant: 'info' });
      return;
    }

    if (organisationSelected !== null) {
      dispatch(
        changeOrganisationView({
          organisationId: organisationSelected.id
        })
      );
      navigate(PATH_DASHBOARD.root);
    }
  };

  const goToUpdateOrganisation = () => {
    if (organisationSelected !== null) {
      navigate(`/organisations/update/${organisationSelected.id}`);
    }
  };

  const toggleBlock = () => {
    if (organisationSelected !== null) {
      dispatch(
        toggleOrganisationsBlock({
          setActive: !organisationSelected.is_active,
          organisationId: organisationSelected.id
        })
      ).then(() => {
        // Reset the popper
        onClose();
        setOrganisationSelected(null);
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, minWidth: 160 }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={handleChangeView}>
          <ListItemText primary={<Trans>Se connecter</Trans>} />
        </ListItemButton>
        <ListItemButton onClick={goToUpdateOrganisation}>
          <ListItemText primary={<Trans>Modifier</Trans>} />
        </ListItemButton>
        <ListItemButton onClick={toggleBlock}>
          <ListItemText
            primary={
              organisationSelected?.is_active ? <Trans>Bloquer</Trans> : <Trans>Débloquer</Trans>
            }
          />
        </ListItemButton>
      </ListItem>
    </Paper>
  );
}
