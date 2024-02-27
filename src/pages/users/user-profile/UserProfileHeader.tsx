import { Box, Typography } from '@mui/material';
import ActionButton from '@src/components/lms/ActionButton.tsx';
import { Trans } from '@lingui/macro';
import { useTheme } from '@mui/material/styles';
import { User } from '@services/connected-user/interfaces.ts';
import { useNavigate } from 'react-router-dom';

interface UserProfileHeaderProps {
  user: User;
}
export default function UserProfileHeader({ user }: UserProfileHeaderProps) {
  const theme = useTheme();
  const navigate = useNavigate();

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
        onClick={() => navigate(`/users/edit/${user.id}`)}
      >
        <Trans>Modifier</Trans>
      </ActionButton>
    </Box>
  );
} 