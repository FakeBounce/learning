import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Trans } from '@lingui/macro';
import { useAppSelector } from '@redux/hooks';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';
import { ApplicantProfileState } from '@services/applicants/interfaces';
import CircledAvatar from '@src/components/lms/CircledAvatar';

const StyledApplicantProfileColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0',
  gap: theme.spacing(2)
}));

const StyledApplicantProfileRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: `0 ${theme.spacing(4)}`
}));

const StyledApplicantProfileTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption
}));

const emptyField = (
  <Box component="span" sx={{ textTransform: 'initial' }}>
    <Trans>Non renseigné</Trans>
  </Box>
);

export default function ApplicantProfileInfos() {
  const { applicantProfileData, applicantProfileLoading }: ApplicantProfileState = useAppSelector(
    (state) => state.applicants.applicantProfile
  );

  if (applicantProfileData === null || applicantProfileLoading) {
    return <ProfileSkeleton rows={4} cols={2} />;
  }

  return (
    <Box display="flex">
      <StyledApplicantProfileColumn>
        <CircledAvatar mx={2}>
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
        <StyledApplicantProfileRow>
          <StyledApplicantProfileTypography>
            <Trans>Nom</Trans>
          </StyledApplicantProfileTypography>
          <Typography sx={{ textTransform: 'uppercase' }}>
            {applicantProfileData.lastname}
          </Typography>
        </StyledApplicantProfileRow>

        <StyledApplicantProfileRow>
          <StyledApplicantProfileTypography>
            <Trans>Prénom</Trans>
          </StyledApplicantProfileTypography>
          <Typography sx={{ textTransform: 'capitalize' }}>
            {applicantProfileData.firstname}
          </Typography>
        </StyledApplicantProfileRow>

        <StyledApplicantProfileRow>
          <StyledApplicantProfileTypography>
            <Trans>Email</Trans>
          </StyledApplicantProfileTypography>
          <Typography sx={{ fontSize: (theme) => theme.typography.body1 }}>
            {applicantProfileData.email}
          </Typography>
        </StyledApplicantProfileRow>

        <StyledApplicantProfileRow>
          <StyledApplicantProfileTypography>
            <Trans>Téléphone</Trans>
          </StyledApplicantProfileTypography>
          <Typography sx={{ fontSize: (theme) => theme.typography.body1 }}>
            {applicantProfileData.phone || emptyField}
          </Typography>
        </StyledApplicantProfileRow>
      </StyledApplicantProfileColumn>
      <StyledApplicantProfileColumn mt={2}>
        <Box display="flex" flexDirection={['column', 'column', 'row']} gap={3}>
          <StyledApplicantProfileRow>
            <StyledApplicantProfileTypography>
              <Trans>Notification App</Trans>
            </StyledApplicantProfileTypography>
            <Typography>
              {applicantProfileData.notifications.app ? <Trans>OUI</Trans> : <Trans>NON</Trans>}
            </Typography>
          </StyledApplicantProfileRow>
          <StyledApplicantProfileRow>
            <StyledApplicantProfileTypography>
              <Trans>Notification SMS</Trans>
            </StyledApplicantProfileTypography>
            <Typography>
              {applicantProfileData.notifications.sms ? <Trans>OUI</Trans> : <Trans>NON</Trans>}
            </Typography>
          </StyledApplicantProfileRow>
          <StyledApplicantProfileRow>
            <StyledApplicantProfileTypography>
              <Trans>Notification Email</Trans>
            </StyledApplicantProfileTypography>
            <Typography>
              {applicantProfileData.notifications.email ? <Trans>OUI</Trans> : <Trans>NON</Trans>}
            </Typography>
          </StyledApplicantProfileRow>
        </Box>

        <StyledApplicantProfileRow>
          <StyledApplicantProfileTypography>
            <Trans>Id externe</Trans>
          </StyledApplicantProfileTypography>
          <Typography sx={{ textTransform: 'uppercase' }}>
            {applicantProfileData.externalId || emptyField}
          </Typography>
        </StyledApplicantProfileRow>

        <StyledApplicantProfileRow>
          <StyledApplicantProfileTypography>
            <Trans>Nom de naissance</Trans>
          </StyledApplicantProfileTypography>
          <Typography sx={{ textTransform: 'uppercase' }}>
            {applicantProfileData.birthName || emptyField}
          </Typography>
        </StyledApplicantProfileRow>

        <StyledApplicantProfileRow>
          <StyledApplicantProfileTypography>
            <Trans>Date de naissance</Trans>
          </StyledApplicantProfileTypography>
          <Typography sx={{ textTransform: 'uppercase' }}>
            {new Date(applicantProfileData.birthDate).toLocaleDateString() || emptyField}
          </Typography>
        </StyledApplicantProfileRow>
        <StyledApplicantProfileRow>
          <StyledApplicantProfileTypography>
            <Trans>Ville</Trans>
          </StyledApplicantProfileTypography>
          <Typography>{applicantProfileData.city || emptyField}</Typography>
        </StyledApplicantProfileRow>
      </StyledApplicantProfileColumn>
    </Box>
  );
}
