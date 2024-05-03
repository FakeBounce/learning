import { Avatar, Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';
import { useAppSelector } from '@redux/hooks';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { ApplicantProfileState } from '@services/applicants/interfaces';
import CircledAvatar from '@src/components/lms/CircledAvatar';
import ApplicantsProfileInfosNotifications from '@src/pages/applicants/applicants-profile/ApplicantsProfileInfosNotifications';
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

export default function ApplicantsProfileInfos() {
  const { applicantProfileData, applicantProfileLoading }: ApplicantProfileState = useAppSelector(
    (state) => state.applicants.applicantProfile
  );

  if (applicantProfileData === null || applicantProfileLoading) {
    return <ProfileSkeleton rows={4} cols={2} />;
  }

  return (
    <Box pb={4} display="flex" flexDirection="column" gap={2}>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        gap={2}
        alignItems={['flex-start', 'flex-start', 'flex-end']}
        justifyContent={['flex-end', 'flex-end', 'flex-start']}
      >
        <StyledFormColumn>
          <CircledAvatar>
            <Avatar
              src={applicantProfileData.profilePicture ?? undefined}
              sx={{
                width: '100%',
                height: '100%',
                fontSize: (theme) => theme.typography.h1,
                textTransform: 'uppercase'
              }}
            >
              {applicantProfileData.lastname.charAt(0)}
            </Avatar>
          </CircledAvatar>
        </StyledFormColumn>
        <StyledFormColumn>
          <ApplicantsProfileInfosNotifications />
          <StyledFormRow>
            <StyledFormTypography>
              <Trans>Id externe</Trans>
            </StyledFormTypography>
            <Typography sx={{ textTransform: 'uppercase' }}>
              {applicantProfileData.externalId || emptyField}
            </Typography>
          </StyledFormRow>
        </StyledFormColumn>
      </Box>
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
          <StyledFormRow>
            <StyledFormTypography>
              <Trans>Date de naissance</Trans>
            </StyledFormTypography>
            <Typography sx={{ textTransform: 'uppercase' }}>
              {applicantProfileData.birthDate
                ? new Date(applicantProfileData.birthDate).toLocaleDateString()
                : emptyField}
            </Typography>
          </StyledFormRow>
        </StyledFormColumn>

        <StyledFormColumn>
          <StyledFormRow>
            <StyledFormTypography>
              <Trans>Nom de naissance</Trans>
            </StyledFormTypography>
            <Typography sx={{ textTransform: 'uppercase' }}>
              {applicantProfileData.birthName || emptyField}
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
          <StyledFormRow>
            <StyledFormTypography>
              <Trans>Ville</Trans>
            </StyledFormTypography>
            <Typography>{applicantProfileData.city || emptyField}</Typography>
          </StyledFormRow>
        </StyledFormColumn>
      </Box>
    </Box>
  );
}
