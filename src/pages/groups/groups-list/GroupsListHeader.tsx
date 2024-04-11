import { Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';
import ActionButton from '@src/components/lms/ActionButton';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';

export default function GroupsListHeader() {
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);

  const canCreateGroup = isAuthorizedByPermissionsTo(pageType, PermissionEnum.CREATE);

  return(
    <Box px={3} minHeight={"10vh"} display={"flex"} alignItems={"center"} boxSizing={"border-box"}>
      <Typography variant="h4" fontWeight={"normal"}>
        <Trans>Groupes</Trans>
      </Typography>
      {canCreateGroup && (
        <ActionButton
          sx={{ textTransform: 'none', ml: 2 }}
          onClick={() => {
            console.log('Ajouter');
          }}
        >
          <Trans>Ajouter</Trans>
        </ActionButton>
      )}
    </Box>
  );
}