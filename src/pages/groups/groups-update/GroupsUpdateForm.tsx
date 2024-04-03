import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { useAppSelector } from '@redux/hooks';
import LabelWithRequired from '@src/components/hook-form/LabelWithRequired';
import { StyledApplicantColumn, StyledApplicantRow } from '@src/pages/applicants/ApplicantsStyles';

export default function GroupsUpdateForm() {
  const { groupsUpdateLoading } = useAppSelector((state) => state.groups.groupsUpdate);

  if (groupsUpdateLoading) {
    return <ProfileSkeleton rows={1} cols={2} />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} px={2}>
      <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2}>
        <StyledApplicantColumn>
          <StyledApplicantRow>
            <RHFTextField
              name={'name'}
              label={<LabelWithRequired label={<Trans>Nom du groupe</Trans>} />}
            />
          </StyledApplicantRow>
        </StyledApplicantColumn>

        <StyledApplicantColumn>
          <StyledApplicantRow>
            <RHFTextField name={'description'} label={<Trans>Description</Trans>} />
          </StyledApplicantRow>
        </StyledApplicantColumn>
      </Box>
    </Box>
  );
}
