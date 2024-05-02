import { useAppSelector } from '@redux/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH_GROUPS } from '@utils/navigation/paths';
import CardFooter from '@src/components/cards/CardFooter';

export default function GroupsUpdateFooter() {
  const navigate = useNavigate();
  const { groupsUpdateLoading } = useAppSelector((state) => state.groups.groupsUpdate);

  const cancelCreate = () => {
    navigate(PATH_GROUPS.root);
  };

  return <CardFooter isLoading={groupsUpdateLoading} cancelAction={cancelCreate} />;
}
