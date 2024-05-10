import { useNavigate } from 'react-router-dom';
import { PATH_USERS } from '@utils/navigation/paths';
import CardFooter from '@src/components/cards/CardFooter';
import { useAppSelector } from '@redux/hooks';

export default function UserEditFooter() {
  const navigate = useNavigate();
  const { updatedUserLoading } = useAppSelector((state) => state.users.updatedUser);

  return (
    <CardFooter isLoading={updatedUserLoading} cancelAction={() => navigate(PATH_USERS.profile)} />
  );
}
