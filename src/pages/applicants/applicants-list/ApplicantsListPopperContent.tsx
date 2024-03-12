import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
// import { toggleOrganizationsBlock } from '@redux/reducers/organizationsReducer';
// import { changeOrganizationView } from '@redux/actions/connectedUserActions';
import { useNavigate } from 'react-router-dom';
import { Applicant } from '@services/applicants/interfaces';

interface OrganizationsListPopperContentProps {
  setAnchorEl: (value: HTMLElement | null) => void;
  setApplicantSelected: (value: Applicant | null) => void;
  applicantSelected: Applicant | null;
}
export default function OrganizationsListPopperContent({
  setAnchorEl,
  setApplicantSelected,
  applicantSelected
}: OrganizationsListPopperContentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChangeView = () => {
    // if (organizationSelected !== null) {
    //   dispatch(
    //     changeOrganizationView({
    //       organizationId: organizationSelected.id
    //     })
    //   );
    //   navigate(PATH_DASHBOARD.root);
    // }
  };

  const goToUpdateApplicant = () => {
    // if (organizationSelected !== null) {
    //   navigate(`/applicants/update/${organizationSelected.id}`);
    // }
  };

  const toggleBlock = () => {
    // if (organizationSelected !== null) {
    //   dispatch(
    //     toggleOrganizationsBlock({
    //       setActive: !organizationSelected.is_active,
    //       organizationId: organizationSelected.id
    //     })
    //   ).then(() => {
    //     // Reset the popper
    //     setAnchorEl(null);
    //     setOrganizationSelected(null);
    //   });
    // }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, minWidth: 160 }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={handleChangeView}>
          <ListItemText primary={<Trans>Profil</Trans>} />
        </ListItemButton>
        <ListItemButton onClick={toggleBlock}>
          <ListItemText
            primary={
              applicantSelected?.is_active ? <Trans>Bloquer</Trans> : <Trans>Débloquer</Trans>
            }
          />
        </ListItemButton>
        <ListItemButton onClick={goToUpdateApplicant}>
          <ListItemText primary={<Trans>Mettre à jour</Trans>} />
        </ListItemButton>
      </ListItem>
    </Paper>
  );
}
