import { Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';
import { useAppSelector } from '@redux/hooks';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { ApplicantProfileState } from '@services/applicants/interfaces';
import {
  StyledFormColumn,
  StyledFormRow,
  StyledFormTypography
} from '@src/components/layouts/form/FormStyles';

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
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" flexDirection={['column', 'column', 'row']} gap={2}>
        <StyledFormColumn>
          <StyledFormRow>
            <StyledFormTypography>
              <Trans>Nom</Trans>
            </StyledFormTypography>
            <Typography sx={{ textTransform: 'uppercase' }}>
              {applicantProfileData.lastname}
            </Typography>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormTypography>
              <Trans>Prénom</Trans>
            </StyledFormTypography>
            <Typography sx={{ textTransform: 'capitalize' }}>
              {applicantProfileData.firstname}
            </Typography>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormTypography>
              <Trans>Email</Trans>
            </StyledFormTypography>
            <Typography sx={{ fontSize: (theme) => theme.typography.body1 }}>
              {applicantProfileData.email}
            </Typography>
          </StyledFormRow>
        </StyledFormColumn>

        <StyledFormColumn>
          <StyledFormRow>
            <StyledFormTypography>
              <Trans>Id externe</Trans>
            </StyledFormTypography>
            <Typography sx={{ textTransform: 'uppercase' }}>
              {applicantProfileData.externalId || emptyField}
            </Typography>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormTypography>
              <Trans>Téléphone</Trans>
            </StyledFormTypography>
            <Typography sx={{ fontSize: (theme) => theme.typography.body1 }}>
              {applicantProfileData.phone || emptyField}
            </Typography>
          </StyledFormRow>
        </StyledFormColumn>
      </Box>
    </Box>
  );
}
