import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { useAppSelector } from '@redux/hooks';
import { StyledFormColumn, StyledFormRow } from '@src/components/layouts/form/FormStyles';
import TableUsersList from '@src/components/table/TableUsersList';
import { GroupsUsersColumns } from '@src/pages/groups/groups-form/GroupsUsersColumns';
import { useFormContext } from 'react-hook-form';
import { GridRowSelectionModel } from '@mui/x-data-grid';

export default function GroupsForm({ isEditing = false }: { isEditing?: boolean }) {
  const { groupsUpdateLoading } = useAppSelector((state) => state.groups.groupsUpdate);
  const { currentGroupData } = useAppSelector((state) => state.groups.currentGroup);

  const { setValue } = useFormContext();

  const handleRowSelection = (rowsSelected: GridRowSelectionModel) => {
    setValue('usersId', rowsSelected, { shouldDirty: true });
  };

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

      <TableUsersList
        columns={GroupsUsersColumns({
          isEditing,
          currentGroup: currentGroupData
        })}
        onRowSelectionModelChange={handleRowSelection}
      />
    </Box>
  );
}
