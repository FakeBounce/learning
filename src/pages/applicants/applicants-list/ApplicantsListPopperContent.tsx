import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { generatePath, useNavigate } from 'react-router-dom';
import { Applicant } from '@services/applicants/interfaces';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { startEditingApplicant } from '@redux/reducers/applicantsReducer';
import { useAppDispatch } from '@redux/hooks';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';

interface ApplicantsListPopperContentProps {
  handleToggleBlock: () => void;
  applicantSelected: Applicant | null;
}
export default function ApplicantsListPopperContent({
  handleToggleBlock,
  applicantSelected
}: ApplicantsListPopperContentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canBlockUnblockApplicant = isAuthorizedByPermissionsTo(
    pageType,
    PermissionEnum.BLOCK_UNBLOCK
  );
  const canUpdateApplicant = isAuthorizedByPermissionsTo(pageType, PermissionEnum.UPDATE);

  const goToApplicantProfile = () => {
    if (applicantSelected !== null) {
      navigate(
        generatePath(PATH_APPLICANTS.profile, { applicantId: String(applicantSelected.id) })
      );
    }
  };

  const goToApplicantUpdate = () => {
    if (applicantSelected !== null) {
      dispatch(startEditingApplicant());
      navigate(
        generatePath(PATH_APPLICANTS.profile, { applicantId: String(applicantSelected.id) })
      );
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, minWidth: 160 }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={goToApplicantProfile}>
          <ListItemText primary={<Trans>Profil</Trans>} />
        </ListItemButton>
        {canBlockUnblockApplicant && (
          <ListItemButton onClick={handleToggleBlock}>
            <ListItemText
              primary={
                applicantSelected?.isActive ? <Trans>Bloquer</Trans> : <Trans>Débloquer</Trans>
              }
            />
          </ListItemButton>
        )}
        {canUpdateApplicant && (
          <ListItemButton onClick={goToApplicantUpdate}>
            <ListItemText primary={<Trans>Mettre à jour</Trans>} />
          </ListItemButton>
        )}
      </ListItem>
    </Paper>
  );
}
