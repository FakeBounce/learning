import { useAppSelector } from '@redux/hooks';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import CardFooter from '@src/components/cards/CardFooter';

export default function OrganizationsCreateFooter() {
  const navigate = useNavigate();

  const { organizationCreateLoading } = useAppSelector(
    (state) => state.organizations.organizationCreate
  );

  const goToOrganizationsList = () => {
    navigate(PATH_ORGANIZATIONS.root);
  };

  return <CardFooter isLoading={organizationCreateLoading} cancelAction={goToOrganizationsList} />;
}
