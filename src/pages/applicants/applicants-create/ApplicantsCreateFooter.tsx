import { useAppSelector } from '@redux/hooks';
import { useNavigate } from 'react-router-dom';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import CardFooter from '@src/components/cards/CardFooter';

export default function ApplicantsCreateFooter() {
  const navigate = useNavigate();
  const { applicantCreateLoading } = useAppSelector((state) => state.applicants.applicantCreate);

  const cancelCreate = () => {
    navigate(PATH_APPLICANTS.root);
  };

  return <CardFooter isLoading={applicantCreateLoading} cancelAction={cancelCreate} />;
}
