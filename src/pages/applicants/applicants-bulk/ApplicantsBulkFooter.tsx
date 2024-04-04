import { useAppSelector } from '@redux/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import CardFooter from '@src/components/cards/CardFooter';

export default function ApplicantsBulkFooter() {
  const navigate = useNavigate();
  const { applicantBulkLoading } = useAppSelector((state) => state.applicants.applicantBulk);

  const cancelCreate = () => {
    navigate(PATH_APPLICANTS.root);
  };

  return <CardFooter isLoading={applicantBulkLoading} cancelAction={cancelCreate} />;
}
