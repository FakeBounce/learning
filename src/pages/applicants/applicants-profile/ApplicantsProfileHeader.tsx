import { Box, Skeleton, Typography } from '@mui/material';
import ActionButton from '@src/components/lms/ActionButton';
import { Trans } from '@lingui/macro';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { startEditingApplicant } from '@redux/reducers/applicantsReducer';

export default function ApplicantsProfileHeader({ isUpdate = false }: { isUpdate?: boolean }) {
  const { applicantProfileData, applicantProfileLoading } = useAppSelector(
    (state) => state.applicants.applicantProfile
  );
  const dispatch = useAppDispatch();

  const navigateToEdit = () => {
    if (applicantProfileData === null) return;
    dispatch(startEditingApplicant());
  };

  const displayName = () => {
    if (!applicantProfileLoading && applicantProfileData !== null) {
      return (
        <Typography
          sx={{
            color: (theme) => theme.palette.secondary.main,
            fontSize: (theme) => theme.typography.h3.fontSize,
            fontWeight: (theme) => theme.typography.fontWeightBold,
            paddingX: 2
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
      {!isUpdate && (
        <ActionButton actionType="update" onClick={navigateToEdit}>
          <Trans>Modifier</Trans>
        </ActionButton>
      )}
    </Box>
  );
}
