import { Box, Typography } from '@mui/material';
import ActionButton from '@src/components/lms/ActionButton.tsx';
import { Trans } from '@lingui/macro';
import { useTheme } from '@mui/material/styles';
import { User } from '@services/connected-user/interfaces.ts';

interface UserProfileHeaderProps {
  user: User;
}
export default function UserProfileHeader({ user }: UserProfileHeaderProps) {
  const theme = useTheme();

  return (
    <Box p={2} display='flex'>
      <Typography
        sx={{
          color: theme.palette.secondary.main,
          fontWeight: 'bold',
          fontSize: 24,
        }}
      >
        {user.lastname} {user.firstname}
      </Typography>
      <ActionButton
        sx={{
          bgcolor: theme.palette.secondary.main,
          '&:hover': {
            bgcolor: theme.palette.secondary.dark
          },
          marginX: 2,
        }}
      >
        <Trans>Modifier</Trans>
      </ActionButton>
    </Box>
  );
} 