import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Trans } from '@lingui/macro';
import { User } from '@services/connected-user/interfaces';

interface UserProfileInfosProps {
  user: User;
}

export default function UserProfileInfos({ user }: UserProfileInfosProps) {
  const theme = useTheme();
  const captionStyle = {
    marginY: 0.5,
    ...theme.typography.caption
  };

  return (
    <Box px={[0, 4]} display="flex">
      <Box width="50%">
        <Box
          sx={{
            marginY: 2
          }}
        >
          <Typography sx={captionStyle}>
            <Trans>Nom</Trans>
          </Typography>
          <Typography>{user.lastname}</Typography>
        </Box>

        <Box
          sx={{
            marginY: 2
          }}
        >
          <Typography sx={captionStyle}>
            <Trans>Email</Trans>
          </Typography>
          <Typography sx={theme.typography.body1}>{user.email}</Typography>
        </Box>

        <Box>
          <Typography sx={captionStyle}>
            <Trans>Double authentification</Trans>
          </Typography>
          <Typography>{user.use_double_auth ? <Trans>OUI</Trans> : <Trans>NON</Trans>}</Typography>
        </Box>
      </Box>
      <Box width="50%">
        <Box
          sx={{
            marginY: 2
          }}
        >
          <Typography sx={captionStyle}>
            <Trans>Prénom</Trans>
          </Typography>
          <Typography>{user.firstname}</Typography>
        </Box>

        <Box>
          <Typography sx={captionStyle}>
            <Trans>Login</Trans>
          </Typography>
          <Typography>{user.login}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
