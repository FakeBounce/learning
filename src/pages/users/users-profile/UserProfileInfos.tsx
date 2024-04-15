import { Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';
import { User } from '@services/users/interfaces';
import {
  StyledFormColumn,
  StyledFormRow,
  StyledFormTypography
} from '@src/components/layouts/form/FormStyles';
import { useAppSelector } from '@redux/hooks';
import { ProfileSkeleton } from '@src/components/skeletons/ProfileSkeleton';

export default function UserProfileInfos() {
  const {
    singleUserData,
    singleUserLoading
  }: { singleUserData: User; singleUserLoading: boolean } = useAppSelector(
    (state) => state.users.singleUser
  );

  if (singleUserLoading || !singleUserData) {
    return <ProfileSkeleton rows={3} cols={2} />;
  }

  return (
    <Box display="flex" gap={2} px={4}>
      <StyledFormColumn>
        <StyledFormRow>
          <StyledFormTypography>
            <Trans>Nom</Trans>
          </StyledFormTypography>
          <Typography>{singleUserData.lastname}</Typography>
        </StyledFormRow>

        <StyledFormRow>
          <StyledFormTypography>
            <Trans>Email</Trans>
          </StyledFormTypography>
          <Typography sx={(theme) => theme.typography.body1}>{singleUserData.email}</Typography>
        </StyledFormRow>

        <StyledFormRow>
          <StyledFormTypography>
            <Trans>Double authentification</Trans>
          </StyledFormTypography>
          <Typography>
            {singleUserData.useDoubleAuth ? <Trans>OUI</Trans> : <Trans>NON</Trans>}
          </Typography>
        </StyledFormRow>
      </StyledFormColumn>
      <StyledFormColumn>
        <StyledFormRow>
          <StyledFormTypography>
            <Trans>Prénom</Trans>
          </StyledFormTypography>
          <Typography>{singleUserData.firstname}</Typography>
        </StyledFormRow>

        <StyledFormRow>
          <StyledFormTypography>
            <Trans>Login</Trans>
          </StyledFormTypography>
          <Typography>{singleUserData.login}</Typography>
        </StyledFormRow>
      </StyledFormColumn>
    </Box>
  );
}
