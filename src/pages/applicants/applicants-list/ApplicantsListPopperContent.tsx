import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
import { toggleApplicantBlock } from '@redux/actions/applicantsActions';
import { useNavigate } from 'react-router-dom';
import { Applicant } from '@services/applicants/interfaces';
import { PATH_APPLICANTS } from '@utils/navigation/paths';

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

  const goToApplicantProfile = () => {
    if (applicantSelected !== null) {
      navigate(`${PATH_APPLICANTS.root}/${applicantSelected.id}`);
    }
  };

  const goToApplicantUpdate = () => {
    if (applicantSelected !== null) {
      navigate(`${PATH_APPLICANTS.root}/update/${applicantSelected.id}`);
    }
  };

  const toggleBlock = () => {
    if (applicantSelected !== null) {
      dispatch(
        toggleApplicantBlock({
          setActive: !applicantSelected.is_active,
          applicantId: applicantSelected.id
        })
      ).then(() => {
        // Reset the popper
        setAnchorEl(null);
        setApplicantSelected(null);
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, minWidth: 160 }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={goToApplicantProfile}>
          <ListItemText primary={<Trans>Profil</Trans>} />
        </ListItemButton>
        <ListItemButton onClick={toggleBlock}>
          <ListItemText
            primary={
              applicantSelected?.is_active ? <Trans>Bloquer</Trans> : <Trans>Débloquer</Trans>
            }
          />
        </ListItemButton>
        <ListItemButton onClick={goToApplicantUpdate}>
          <ListItemText primary={<Trans>Mettre à jour</Trans>} />
        </ListItemButton>
      </ListItem>
    </Paper>
  );
}
