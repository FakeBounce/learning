import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
import { toggleOrganisationsBlock } from '@redux/reducers/organisationsReducer';
import { changeOrganisationView } from '@redux/reducers/userReducer';
import { Organisation } from '@services/organisations/interfaces';
import { useNavigate } from 'react-router-dom';

interface OrganisationsListPopperContentProps {
  setAnchorEl: (value: HTMLElement | null) => void;
  setOrganisationSelected: (value: Organisation | null) => void;
  organisationSelected: Organisation | null;
}
export default function OrganisationsListPopperContent({
  setAnchorEl,
  setOrganisationSelected,
  organisationSelected
}: OrganisationsListPopperContentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChangeView = () => {
    if (organisationSelected !== null) {
      dispatch(
        changeOrganisationView({
          organisationId: organisationSelected.id
        })
      );
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
        setAnchorEl(null);
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
