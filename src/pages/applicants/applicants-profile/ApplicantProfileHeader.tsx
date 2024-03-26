import { Box, Skeleton, Typography } from '@mui/material';
import ActionButton from '@src/components/lms/ActionButton';
import { Trans } from '@lingui/macro';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@redux/hooks';
import { PATH_APPLICANTS } from '@utils/navigation/paths';

export default function ApplicantProfileHeader() {
  const { applicantProfileData, applicantProfileLoading } = useAppSelector(
    (state) => state.applicants.applicantProfile
  );
  const navigate = useNavigate();

  const navigateToEdit = () => {
    if (applicantProfileData === null) return;
    navigate(PATH_APPLICANTS.update.replace(':applicantId', String(applicantProfileData.id)));
  };

  const displayName = () => {
    if (!applicantProfileLoading && applicantProfileData !== null) {
      return (
        <Typography
          sx={{
            color: (theme) => theme.palette.secondary.main,
            fontSize: (theme) => theme.typography.h3.fontSize,
            fontWeight: (theme) => theme.typography.fontWeightBold
          }}
        >
          <Box component="span" sx={{ textTransform: 'uppercase' }}>
            {applicantProfileData.lastname}
          </Box>{' '}
          {applicantProfileData.firstname}
        </Typography>
      );
    }
    return <Skeleton animation="pulse" variant="text" width="30%" />;
  };

  return (
    <Box p={2} display="flex" gap={2}>
      {displayName()}
      <ActionButton actionType="update" onClick={navigateToEdit}>
        <Trans>Modifier</Trans>
      </ActionButton>
    </Box>
  );
}
