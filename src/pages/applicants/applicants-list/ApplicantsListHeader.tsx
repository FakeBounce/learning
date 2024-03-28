import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import ActionButton from '@src/components/lms/ActionButton';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';

export default function ApplicantsListHeader() {
  const navigate = useNavigate();
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canCreateApplicant = isAuthorizedByPermissionsTo(pageType, PermissionEnum.CREATE);

  return (
    <Box px={3} minHeight="10vh" display="flex" alignItems="center" position="sticky">
      <Typography variant="h5">
        <Trans>Étudiants</Trans>
      </Typography>
      {canCreateApplicant && (
        <ActionButton
          sx={{ textTransform: 'none', ml: 2 }}
          onClick={() => {
            navigate(PATH_APPLICANTS.add);
          }}
        >
          <Trans>Créer</Trans>
        </ActionButton>
      )}
    </Box>
  );
}
