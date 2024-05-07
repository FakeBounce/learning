import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import { generatePath, useNavigate } from 'react-router-dom';
import { Applicant } from '@services/applicants/interfaces';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { startEditingApplicant } from '@redux/reducers/applicantsReducer';
import { useAppDispatch } from '@redux/hooks';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

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
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canBlockUnblockExternalTester = isAuthorizedByPermissionsTo(
    pageType,
    PermissionEnum.BLOCK_UNBLOCK
  );
  const canUpdateExternalTester = isAuthorizedByPermissionsTo(pageType, PermissionEnum.UPDATE);

  const goToExternalTesterProfile = () => {
    if (applicantSelected !== null) {
      navigate(
        generatePath(PATH_EXTERNAL_TESTERS.profile, { applicantId: String(applicantSelected.id) })
      );
    }
  };

  const goToExternalTesterUpdate = () => {
    if (applicantSelected !== null) {
      dispatch(startEditingApplicant());
      navigate(
        generatePath(PATH_EXTERNAL_TESTERS.profile, { applicantId: String(applicantSelected.id) })
      );
    }
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, minWidth: 160 }}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton onClick={goToExternalTesterProfile}>
          <ListItemText primary={<Trans>Profil</Trans>} />
        </ListItemButton>

        {canBlockUnblockExternalTester && (
          <ListItemButton onClick={handleToggleBlock}>
            <ListItemText
              primary={
                applicantSelected?.isActive ? <Trans>Bloquer</Trans> : <Trans>Débloquer</Trans>
              }
            />
          </ListItemButton>
        )}

        {canUpdateExternalTester && (
          <ListItemButton onClick={goToExternalTesterUpdate}>
            <ListItemText primary={<Trans>Mettre à jour</Trans>} />
          </ListItemButton>
        )}
      </ListItem>
    </Paper>
  );
}
