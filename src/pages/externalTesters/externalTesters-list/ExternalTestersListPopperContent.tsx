import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Applicant } from '@services/applicants/interfaces';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { startEditingApplicant } from '@redux/reducers/applicantsReducer';
import { useAppDispatch } from '@redux/hooks';

interface ExternalTestersListPopperContentProps {
  handleToggleBlock: () => void;
  applicantSelected: Applicant | null;
}
export default function ExternalTestersListPopperContent({
  handleToggleBlock,
  applicantSelected
}: ExternalTestersListPopperContentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const goToApplicantProfile = () => {
    if (applicantSelected !== null) {
      navigate(PATH_EXTERNAL_TESTERS.profile.replace(':applicantId', String(applicantSelected.id)));
    }
  };

  const goToApplicantUpdate = () => {
    if (applicantSelected !== null) {
      dispatch(startEditingApplicant());
      navigate(PATH_EXTERNAL_TESTERS.profile.replace(':applicantId', String(applicantSelected.id)));
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, minWidth: 160 }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={goToApplicantProfile}>
          <ListItemText primary={<Trans>Profil</Trans>} />
        </ListItemButton>
        <ListItemButton onClick={handleToggleBlock}>
          <ListItemText
            primary={
              applicantSelected?.isActive ? <Trans>Bloquer</Trans> : <Trans>Débloquer</Trans>
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
