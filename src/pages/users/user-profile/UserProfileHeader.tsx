import { Box, Typography } from '@mui/material';
import ActionButton from '@src/components/lms/ActionButton';
import { Trans } from '@lingui/macro';
import { useTheme } from '@mui/material/styles';
import { User } from '@services/connected-user/interfaces';
import { useNavigate } from 'react-router-dom';

interface UserProfileHeaderProps {
  user: User;
}
export default function UserProfileHeader({ user }: UserProfileHeaderProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box p={2} display="flex">
      <Typography
        sx={{
          color: theme.palette.secondary.main,
          fontSize: theme.typography.h3.fontSize,
          fontWeight: theme.typography.fontWeightBold
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
          marginX: 2
        }}
        onClick={() => navigate(`/users/edit/${user.id}`)}
      >
        <Trans>Modifier</Trans>
      </ActionButton>
    </Box>
  );
}
