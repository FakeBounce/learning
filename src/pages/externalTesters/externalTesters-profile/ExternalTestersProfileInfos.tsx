import { Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';
import { useAppSelector } from '@redux/hooks';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { ApplicantProfileState } from '@services/applicants/interfaces';
import {
  StyledApplicantColumn,
  StyledApplicantRow,
  StyledApplicantTypography
} from '@src/pages/applicants/ApplicantsStyles';

const emptyField = (
  <Box component="span" sx={{ textTransform: 'initial' }}>
    <Trans>Non renseigné</Trans>
  </Box>
);

export default function ExternalTestersProfileInfos() {
  const { applicantProfileData, applicantProfileLoading }: ApplicantProfileState = useAppSelector(
    (state) => state.applicants.applicantProfile
  );

  if (applicantProfileData === null || applicantProfileLoading) {
    return <ProfileSkeleton rows={4} cols={2} />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} px={2}>
      <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2}>
        <StyledApplicantColumn>
          <StyledApplicantRow>
            <StyledApplicantTypography>
              <Trans>Nom</Trans>
            </StyledApplicantTypography>
            <Typography sx={{ textTransform: 'uppercase' }}>
              {applicantProfileData.lastname}
            </Typography>
          </StyledApplicantRow>

          <StyledApplicantRow>
            <StyledApplicantTypography>
              <Trans>Prénom</Trans>
            </StyledApplicantTypography>
            <Typography sx={{ textTransform: 'capitalize' }}>
              {applicantProfileData.firstname}
            </Typography>
          </StyledApplicantRow>

          <StyledApplicantRow>
            <StyledApplicantTypography>
              <Trans>Email</Trans>
            </StyledApplicantTypography>
            <Typography sx={{ fontSize: (theme) => theme.typography.body1 }}>
              {applicantProfileData.email}
            </Typography>
          </StyledApplicantRow>
        </StyledApplicantColumn>

        <StyledApplicantColumn>
          <StyledApplicantRow>
            <StyledApplicantTypography>
              <Trans>Id externe</Trans>
            </StyledApplicantTypography>
            <Typography sx={{ textTransform: 'uppercase' }}>
              {applicantProfileData.externalId || emptyField}
            </Typography>
          </StyledApplicantRow>
          <StyledApplicantRow>
            <StyledApplicantTypography>
              <Trans>Téléphone</Trans>
            </StyledApplicantTypography>
            <Typography sx={{ fontSize: (theme) => theme.typography.body1 }}>
              {applicantProfileData.phone || emptyField}
            </Typography>
          </StyledApplicantRow>
        </StyledApplicantColumn>
      </Box>
    </Box>
  );
}
