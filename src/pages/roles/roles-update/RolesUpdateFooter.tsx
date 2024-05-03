import { useAppSelector } from '@redux/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH_ROLES } from '@utils/navigation/paths';
import CardFooter from '@src/components/cards/CardFooter';

export default function RolesUpdateFooter() {
  const navigate = useNavigate();
  const { rolesUpdateLoading } = useAppSelector((state) => state.roles.rolesUpdate);

  const cancelCreate = () => {
    navigate(PATH_ROLES.root);
  };

  return <CardFooter isLoading={rolesUpdateLoading} cancelAction={cancelCreate} />;
}
