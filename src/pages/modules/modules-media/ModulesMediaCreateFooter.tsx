import { useAppSelector } from '@redux/hooks';
import CardFooter from '@src/components/cards/CardFooter';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { PATH_MODULES } from '@utils/navigation/paths';

export default function ModulesMediaCreateFooter() {
  const { modulesLoading } = useAppSelector((state) => state.modules);
  const navigate = useNavigate();
  const { moduleId } = useParams();

  const handleCancel = () => {
    navigate(generatePath(PATH_MODULES.profile, { moduleId }));
  };

  return <CardFooter cancelAction={handleCancel} isLoading={modulesLoading} />;
}
