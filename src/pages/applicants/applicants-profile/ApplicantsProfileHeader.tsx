import { Box, Skeleton } from '@mui/material';
import { Trans } from '@lingui/macro';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { startEditingApplicant } from '@redux/reducers/applicantsReducer';
import CardHeader from '@src/components/cards/CardHeader';
import { useTheme } from '@mui/material/styles';

export default function ApplicantsProfileHeader({ isUpdate = false }: { isUpdate?: boolean }) {
  const { applicantProfileData, applicantProfileLoading } = useAppSelector(
    (state) => state.applicants.applicantProfile
  );
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const navigateToEdit = () => {
    if (applicantProfileData === null) return;
    dispatch(startEditingApplicant());
  };

  const displayName = () => {
    if (!applicantProfileLoading && applicantProfileData !== null) {
      return (
        <>
          <Box component="span" sx={{ textTransform: 'uppercase' }}>
            {applicantProfileData.lastname}
          </Box>{' '}
          {applicantProfileData.firstname}
        </>
      );
    }
    return <Skeleton animation="pulse" variant="text" width="30%" />;
  };

  if (isUpdate) {
    return <CardHeader headerText={displayName()} actions={null} />;
  }

  return (
    <CardHeader
      headerText={displayName()}
      headerColor={theme.palette.secondary.main}
      actions={[
        { action: navigateToEdit, actionText: <Trans>Modifier</Trans>, actionType: 'update' }
      ]}
    />
  );
}
