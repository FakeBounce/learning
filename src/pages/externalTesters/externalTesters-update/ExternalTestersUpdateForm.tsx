import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { RHFTextField } from '@src/components/hook-form';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { useAppSelector } from '@redux/hooks';
import { ApplicantProfileState } from '@services/applicants/interfaces';

import { StyledFormColumn, StyledFormRow } from '@src/components/layouts/form/FormStyles';

export default function ExternalTestersUpdateForm() {
  const { applicantProfileLoading }: ApplicantProfileState = useAppSelector(
    (state) => state.applicants.applicantProfile
  );

  if (applicantProfileLoading) {
    return <ProfileSkeleton rows={1} cols={2} />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2}>
        <StyledFormColumn>
          <StyledFormRow>
            <RHFTextField name={'lastname'} label={<Trans>Nom</Trans>} required />
          </StyledFormRow>
          <StyledFormRow>
            <RHFTextField name={'firstname'} label={<Trans>Prénom</Trans>} required />
          </StyledFormRow>

          <StyledFormRow>
            <RHFTextField name={'email'} label={<Trans>Email</Trans>} required />
          </StyledFormRow>
        </StyledFormColumn>

        <StyledFormColumn>
          <StyledFormRow>
            <RHFTextField name={'externalId'} label={<Trans>Id externe</Trans>} />
          </StyledFormRow>
          <StyledFormRow>
            <RHFTextField name={'phone'} label={<Trans>Téléphone</Trans>} />
          </StyledFormRow>
          {/* @todo Add when groups are down and we can select some */}
          {/*<StyledFormRow>*/}
          {/*  <RHFTextField*/}
          {/*    name={'groups'}*/}
          {/*    label={<Trans>Groupe(s) lié(s)</Trans>} required*/}
          {/*  />*/}
          {/*</StyledFormRow>*/}
        </StyledFormColumn>
      </Box>
    </Box>
  );
}
