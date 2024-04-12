import { useAppSelector } from '@redux/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import CardFooter from '@src/components/cards/CardFooter';

export default function ExternalTestersBulkFooter() {
  const navigate = useNavigate();
  const { applicantBulkLoading } = useAppSelector((state) => state.applicants.applicantBulk);

  const cancelCreate = () => {
    navigate(PATH_EXTERNAL_TESTERS.root);
  };

  return <CardFooter isLoading={applicantBulkLoading} cancelAction={cancelCreate} />;
}
