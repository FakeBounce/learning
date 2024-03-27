import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { useAppSelector } from '@redux/hooks';
import { ApplicantProfileState } from '@services/applicants/interfaces';
import LabelWithRequired from '@src/components/hook-form/LabelWithRequired';
import { StyledApplicantColumn, StyledApplicantRow } from '@src/pages/applicants/ApplicantsStyles';

export default function ExternalTestersUpdateForm() {
  const { applicantProfileLoading }: ApplicantProfileState = useAppSelector(
    (state) => state.applicants.applicantProfile
  );

  if (applicantProfileLoading) {
    return <ProfileSkeleton rows={1} cols={2} />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} px={2}>
      <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2}>
        <StyledApplicantColumn>
          <StyledApplicantRow>
            <RHFTextField
              name={'lastname'}
              label={<LabelWithRequired label={<Trans>Nom</Trans>} />}
            />
          </StyledApplicantRow>
          <StyledApplicantRow>
            <RHFTextField
              name={'firstname'}
              label={<LabelWithRequired label={<Trans>Prénom</Trans>} />}
            />
          </StyledApplicantRow>

          <StyledApplicantRow>
            <RHFTextField
              name={'email'}
              label={<LabelWithRequired label={<Trans>Email</Trans>} />}
            />
          </StyledApplicantRow>
        </StyledApplicantColumn>

        <StyledApplicantColumn>
          <StyledApplicantRow>
            <RHFTextField name={'externalId'} label={<Trans>Id externe</Trans>} />
          </StyledApplicantRow>
          <StyledApplicantRow>
            <RHFTextField name={'phone'} label={<Trans>Téléphone</Trans>} />
          </StyledApplicantRow>
          {/* @todo Add when groups are down and we can select some */}
          {/*<StyledApplicantRow>*/}
          {/*  <RHFTextField*/}
          {/*    name={'groups'}*/}
          {/*    label={<LabelWithRequired label={<Trans>Groupe(s) lié(s)</Trans>} />}*/}
          {/*  />*/}
          {/*</StyledApplicantRow>*/}
        </StyledApplicantColumn>
      </Box>
    </Box>
  );
}
