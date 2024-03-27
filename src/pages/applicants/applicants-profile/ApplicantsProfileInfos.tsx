import { Avatar, Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';
import { useAppSelector } from '@redux/hooks';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { ApplicantProfileState } from '@services/applicants/interfaces';
import CircledAvatar from '@src/components/lms/CircledAvatar';
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

export default function ApplicantsProfileInfos() {
  const { applicantProfileData, applicantProfileLoading }: ApplicantProfileState = useAppSelector(
    (state) => state.applicants.applicantProfile
  );

  if (applicantProfileData === null || applicantProfileLoading) {
    return <ProfileSkeleton rows={4} cols={2} />;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} px={2}>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        gap={2}
        alignItems={['flex-start', 'flex-start', 'flex-end']}
        justifyContent={['flex-end', 'flex-end', 'flex-start']}
      >
        <StyledApplicantColumn>
          <CircledAvatar>
            <Avatar
              src={applicantProfileData.profilePicture}
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
        </StyledApplicantColumn>
        <StyledApplicantColumn>
          <Box display="flex" gap={2} alignItems={['flex-start', 'flex-start', 'flex-end']}>
            <StyledApplicantRow>
              <StyledApplicantTypography>
                <Trans>Notification app</Trans>
              </StyledApplicantTypography>
              <Typography>
                {applicantProfileData.notifications?.app === '1' ? (
                  <Trans>OUI</Trans>
                ) : (
                  <Trans>NON</Trans>
                )}
              </Typography>
            </StyledApplicantRow>
            <StyledApplicantRow>
              <StyledApplicantTypography>
                <Trans>Notification SMS</Trans>
              </StyledApplicantTypography>
              <Typography>
                {applicantProfileData.notifications?.sms === '1' ? (
                  <Trans>OUI</Trans>
                ) : (
                  <Trans>NON</Trans>
                )}
              </Typography>
            </StyledApplicantRow>
            <StyledApplicantRow>
              <StyledApplicantTypography>
                <Trans>Notification email</Trans>
              </StyledApplicantTypography>
              <Typography>
                {applicantProfileData.notifications?.email === '1' ? (
                  <Trans>OUI</Trans>
                ) : (
                  <Trans>NON</Trans>
                )}
              </Typography>
            </StyledApplicantRow>
          </Box>

          <StyledApplicantRow>
            <StyledApplicantTypography>
              <Trans>Id externe</Trans>
            </StyledApplicantTypography>
            <Typography sx={{ textTransform: 'uppercase' }}>
              {applicantProfileData.externalId || emptyField}
            </Typography>
          </StyledApplicantRow>
        </StyledApplicantColumn>
      </Box>
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
          <StyledApplicantRow>
            <StyledApplicantTypography>
              <Trans>Date de naissance</Trans>
            </StyledApplicantTypography>
            <Typography sx={{ textTransform: 'uppercase' }}>
              {applicantProfileData.birthDate
                ? new Date(applicantProfileData.birthDate).toLocaleDateString()
                : emptyField}
            </Typography>
          </StyledApplicantRow>
        </StyledApplicantColumn>

        <StyledApplicantColumn>
          <StyledApplicantRow>
            <StyledApplicantTypography>
              <Trans>Nom de naissance</Trans>
            </StyledApplicantTypography>
            <Typography sx={{ textTransform: 'uppercase' }}>
              {applicantProfileData.birthName || emptyField}
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
          <StyledApplicantRow>
            <StyledApplicantTypography>
              <Trans>Ville</Trans>
            </StyledApplicantTypography>
            <Typography>{applicantProfileData.city || emptyField}</Typography>
          </StyledApplicantRow>
        </StyledApplicantColumn>
      </Box>
    </Box>
  );
}