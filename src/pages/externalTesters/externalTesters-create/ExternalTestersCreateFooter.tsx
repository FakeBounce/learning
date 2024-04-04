import { useAppSelector } from '@redux/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import CardFooter from '@src/components/cards/CardFooter';

export default function ExternalTestersCreateFooter() {
  const navigate = useNavigate();
  const { applicantCreateLoading } = useAppSelector((state) => state.applicants.applicantCreate);

  const cancelCreate = () => {
    navigate(PATH_EXTERNAL_TESTERS.root);
  };

  return <CardFooter isLoading={applicantCreateLoading} cancelAction={cancelCreate} />;
}
