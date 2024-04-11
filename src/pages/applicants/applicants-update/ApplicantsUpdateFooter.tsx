import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { cancelEditingApplicant } from '@redux/reducers/applicantsReducer';
import CardFooter from '@src/components/cards/CardFooter';

export default function ApplicantsUpdateFooter() {
  const dispatch = useAppDispatch();

  const { applicantUpdateLoading } = useAppSelector((state) => state.applicants.applicantUpdate);

  const cancelUpdate = () => {
    dispatch(cancelEditingApplicant());
  };

  return <CardFooter isLoading={applicantUpdateLoading} cancelAction={cancelUpdate} />;
}
