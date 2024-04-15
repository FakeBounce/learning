import { useAppSelector } from '@redux/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH_USERS } from '@utils/navigation/paths';
import CardFooter from '@src/components/cards/CardFooter';

export default function UsersBulkFooter() {
  const navigate = useNavigate();
  const { usersBulkLoading } = useAppSelector((state) => state.users.usersBulk);

  const cancelCreate = () => {
    navigate(PATH_USERS.root);
  };

  return <CardFooter isLoading={usersBulkLoading} cancelAction={cancelCreate} />;
}
