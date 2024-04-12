import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Trans } from '@lingui/macro';
import { User } from '@services/users/interfaces';
import {
  StyledFormColumn,
  StyledFormRow,
  StyledFormTypography
} from '@src/components/layouts/form/FormStyles';

interface UserProfileInfosProps {
  user: User;
}

export default function UserProfileInfos({ user }: UserProfileInfosProps) {
  const theme = useTheme();

  return (
    <Box display="flex" gap={2} px={4}>
      <StyledFormColumn>
        <StyledFormRow>
          <StyledFormTypography>
            <Trans>Nom</Trans>
          </StyledFormTypography>
          <Typography>{user.lastname}</Typography>
        </StyledFormRow>

        <StyledFormRow>
          <StyledFormTypography>
            <Trans>Email</Trans>
          </StyledFormTypography>
          <Typography sx={theme.typography.body1}>{user.email}</Typography>
        </StyledFormRow>

        <StyledFormRow>
          <StyledFormTypography>
            <Trans>Double authentification</Trans>
          </StyledFormTypography>
          <Typography>{user.useDoubleAuth ? <Trans>OUI</Trans> : <Trans>NON</Trans>}</Typography>
        </StyledFormRow>
      </StyledFormColumn>
      <StyledFormColumn>
        <StyledFormRow>
          <StyledFormTypography>
            <Trans>Prénom</Trans>
          </StyledFormTypography>
          <Typography>{user.firstname}</Typography>
        </StyledFormRow>

        <StyledFormRow>
          <StyledFormTypography>
            <Trans>Login</Trans>
          </StyledFormTypography>
          <Typography>{user.login}</Typography>
        </StyledFormRow>
      </StyledFormColumn>
    </Box>
  );
}
