import { useAppSelector } from '@redux/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH_ROLES } from '@utils/navigation/paths';
import CardFooter from '@src/components/cards/CardFooter';

export default function RolesCreateFooter() {
  const navigate = useNavigate();
  const { rolesCreateLoading } = useAppSelector((state) => state.roles.rolesCreate);

  const cancelCreate = () => {
    navigate(PATH_ROLES.root);
  };

  return <CardFooter isLoading={rolesCreateLoading} cancelAction={cancelCreate} />;
}
