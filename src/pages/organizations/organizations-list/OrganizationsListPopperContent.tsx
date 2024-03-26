import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
import { changeOrganizationView } from '@redux/actions/connectedUserActions';
import { Organization } from '@services/organizations/interfaces';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD, PATH_ORGANIZATIONS } from '@utils/navigation/paths';

interface OrganizationsListPopperContentProps {
  handleToggleBlock: () => void;
  organizationSelected: Organization | null;
}
export default function OrganizationsListPopperContent({
  handleToggleBlock,
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
      navigate(
        PATH_ORGANIZATIONS.update.replace(':organizationId', String(organizationSelected.id))
      );
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
        <ListItemButton onClick={handleToggleBlock}>
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
