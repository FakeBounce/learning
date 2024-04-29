import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { useAppSelector } from '@redux/hooks';
import { StyledFormColumn, StyledFormRow } from '@src/components/layouts/form/FormStyles';
import GroupsUsersList from '@src/pages/groups/GroupsUsersList';

export default function GroupsForm({ isEditing = false }: { isEditing?: boolean }) {
  const { groupsUpdateLoading } = useAppSelector((state) => state.groups.groupsUpdate);

  if (groupsUpdateLoading) {
    return <ProfileSkeleton rows={1} cols={2} />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2} px={4}>
        <StyledFormColumn>
          <StyledFormRow>
            <RHFTextField name={'name'} label={<Trans>Nom du groupe</Trans>} required />
          </StyledFormRow>
        </StyledFormColumn>

        <StyledFormColumn>
          <StyledFormRow>
            <RHFTextField name={'description'} label={<Trans>Description</Trans>} />
          </StyledFormRow>
        </StyledFormColumn>
      </Box>

      <GroupsUsersList isEditing={isEditing} />
    </Box>
  );
}
