import { useAppSelector } from '@redux/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH_GROUPS } from '@utils/navigation/paths';
import CardFooter from '@src/components/cards/CardFooter';

export default function GroupsCreateFooter() {
  const navigate = useNavigate();
  const { groupsCreateLoading } = useAppSelector((state) => state.groups.groupsCreate);

  const cancelCreate = () => {
    navigate(PATH_GROUPS.root);
  };

  return <CardFooter isLoading={groupsCreateLoading} cancelAction={cancelCreate} />;
}
