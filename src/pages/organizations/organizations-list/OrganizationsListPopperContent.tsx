import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
<<<<<<< HEAD:src/pages/organizations/organizations-list/OrganizationsListPopperContent.tsx
import { toggleOrganizationsBlock } from '@redux/reducers/organizationsReducer';
import { changeOrganizationView } from '@redux/reducers/connectedUserReducer';
import { Organization } from '@services/organizations/interfaces';
=======
import { toggleOrganisationsBlock } from '@redux/reducers/organisationsReducer';
import { changeOrganisationView } from '@redux/reducers/connectedUserReducer';
import { Organisation } from '@services/organisations/interfaces';
>>>>>>> 409eb46 (Fixed theme and layouts. Added logout button for organizations and clean state on change view):src/pages/organisations/organisations-list/OrganisationsListPopperContent.tsx
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '@utils/navigation/paths';

interface OrganizationsListPopperContentProps {
  setAnchorEl: (value: HTMLElement | null) => void;
  setOrganizationSelected: (value: Organization | null) => void;
  organizationSelected: Organization | null;
}
export default function OrganizationsListPopperContent({
  setAnchorEl,
  setOrganizationSelected,
  organizationSelected
}: OrganizationsListPopperContentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChangeView = () => {
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
        setAnchorEl(null);
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
