import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@redux/hooks';
import { LMSCard } from '@src/components/lms';
import { FormProvider, useForm } from 'react-hook-form';
import { PATH_GROUPS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { resetGroupsState } from '@redux/reducers/groupsReducer';
import * as Yup from 'yup';
import { t, Trans } from '@lingui/macro';
import GroupsCreateFooter from '@src/pages/groups/groups-create/GroupsCreateFooter';
import GroupsForm from '@src/pages/groups/GroupsForm';
import { createGroup } from '@redux/actions/groupsActions';
import CardHeader from '@src/components/cards/CardHeader';
import { enqueueSnackbar } from 'notistack';

export const createGroupSchema = Yup.object().shape({
  name: Yup.string().required(t`Le nom du groupe est requis`),
  description: Yup.string().optional(),
  usersId: Yup.array().of(Yup.number().required()).optional()
});

export const createGroupFormDefaultValues = {
  name: '',
  description: '',
  usersId: []
};

export interface CreateGroupForm {
  name: string;
  description?: string;
  usersId?: number[];
}

export default function GroupsCreate() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: yupResolver(createGroupSchema),
    defaultValues: createGroupFormDefaultValues
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: CreateGroupForm) => {
    try {
      const createGroupRequest = {
        name: data.name
      } as CreateGroupForm;

      if (data.description && data.description !== '') {
        createGroupRequest.description = data.description;
      }

      if (data.usersId && data.usersId.length > 0) {
        createGroupRequest.usersId = data.usersId;
      }

      await dispatch(createGroup(createGroupRequest));
      navigate(PATH_GROUPS.root);
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetGroupsState());
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }} noValidate>
        <LMSCard
          isPageCard
          contentPadding={0}
          header={<CardHeader headerText={<Trans>Ajouter un groupe</Trans>} />}
          footer={<GroupsCreateFooter />}
        >
          <GroupsForm />
        </LMSCard>
      </form>
    </FormProvider>
  );
}
