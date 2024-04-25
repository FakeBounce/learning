import { Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';
import { useAppSelector } from '@redux/hooks';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { ApplicantProfileState } from '@services/applicants/interfaces';
import { StyledFormRow, StyledFormTypography } from '@src/components/layouts/form/FormStyles';

export default function ApplicantsProfileInfosNotifications() {
  const { applicantProfileData }: ApplicantProfileState = useAppSelector(
    (state) => state.applicants.applicantProfile
  );

  if (applicantProfileData === null) {
    return <ProfileSkeleton rows={1} cols={3} />;
  }

  return (
    <Box display="flex" gap={2} alignItems={['flex-start', 'flex-start', 'flex-end']}>
      <StyledFormRow>
        <StyledFormTypography>
          <Trans>Notification app</Trans>
        </StyledFormTypography>
        <Typography>
          {applicantProfileData.notifications?.app ? <Trans>OUI</Trans> : <Trans>NON</Trans>}
        </Typography>
      </StyledFormRow>
      <StyledFormRow>
        <StyledFormTypography>
          <Trans>Notification SMS</Trans>
        </StyledFormTypography>
        <Typography>
          {applicantProfileData.notifications?.sms ? <Trans>OUI</Trans> : <Trans>NON</Trans>}
        </Typography>
      </StyledFormRow>
      <StyledFormRow>
        <StyledFormTypography>
          <Trans>Notification email</Trans>
        </StyledFormTypography>
        <Typography>
          {applicantProfileData.notifications?.email ? <Trans>OUI</Trans> : <Trans>NON</Trans>}
        </Typography>
      </StyledFormRow>
    </Box>
  );
}
