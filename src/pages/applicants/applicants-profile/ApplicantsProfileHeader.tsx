import { Box, Skeleton } from '@mui/material';
import { Trans } from '@lingui/macro';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { startEditingApplicant } from '@redux/reducers/applicantsReducer';
import CardHeader from '@src/components/cards/CardHeader';
import { useTheme } from '@mui/material/styles';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';
import { useContext } from 'react';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

export default function ApplicantsProfileHeader({ isUpdate = false }: { isUpdate?: boolean }) {
  const {
    applicantProfile: { applicantProfileData, applicantProfileLoading },
    applicantUpdate: { isEditing }
  } = useAppSelector((state) => state.applicants);
  const { pageType }: { pageType: PermissionTypeEnum } = useOutletContext();
  const { isAuthorizedByPermissionsTo } = useContext(FeatureFlagContext);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const navigateToEdit = () => {
    if (applicantProfileData === null) {
      return;
    }
    dispatch(startEditingApplicant());
  };

  const applicantHeaderActions = () => {
    const canUpdateApplicant = isAuthorizedByPermissionsTo(pageType, PermissionEnum.UPDATE);
    if (canUpdateApplicant) {
      return [
        {
          action: navigateToEdit,
          actionText: <Trans>Modifier</Trans>,
          actionType: 'update' as const
        }
      ];
    }
    return null;
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

  if (isUpdate || isEditing) {
    return <CardHeader headerText={displayName()} actions={null} />;
  }

  return (
    <CardHeader
      headerText={displayName()}
      headerColor={theme.palette.secondary.main}
      actions={applicantHeaderActions()}
    />
  );
}
