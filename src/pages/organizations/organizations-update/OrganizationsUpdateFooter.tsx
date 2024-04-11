import { useAppSelector } from '@redux/hooks';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import CardFooter from '@src/components/cards/CardFooter';

export default function OrganizationsUpdateFooter() {
  const navigate = useNavigate();

  const { organizationUpdateLoading } = useAppSelector(
    (state) => state.organizations.organizationUpdate.organizationUpdateLoading
  );

  const navigateToOrganizationsList = () => {
    navigate(PATH_ORGANIZATIONS.root);
  };

  return (
    <CardFooter cancelAction={navigateToOrganizationsList} isLoading={organizationUpdateLoading} />
  );
}
