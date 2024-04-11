import { Trans } from '@lingui/macro';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import CardHeader from '@src/components/cards/CardHeader';
import { User } from '@services/users/interfaces';

interface UserProfileHeaderProps {
  user: User;
}
export default function UserProfileHeader({ user }: UserProfileHeaderProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  // @Todo might need to check the permisisons
  return (
    <CardHeader
      headerText={`${user.lastname} ${user.firstname}`}
      headerColor={theme.palette.secondary.main}
      actions={[
        {
          action: () => navigate(`/users/edit/${user.id}`),
          actionText: <Trans>Modifier</Trans>,
          actionType: 'update'
        }
      ]}
    />
  );
}
