import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { LMSCard } from '@src/components/lms';
import { FormProvider, useForm } from 'react-hook-form';
import { PATH_GROUPS } from '@utils/navigation/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { resetGroupsState } from '@redux/reducers/groupsReducer';
import * as Yup from 'yup';
import { t, Trans } from '@lingui/macro';
import GroupsForm from '@src/pages/groups/groups-form/GroupsForm';
import { updateGroupAction } from '@redux/actions/groupsActions';
import CardHeader from '@src/components/cards/CardHeader';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { RootState } from '@redux/store';
import GroupsUpdateFooter from '@src/pages/groups/groups-update/GroupsUpdateFooter';

export const updateGroupSchema = Yup.object().shape({
  name: Yup.string().required(t`Le nom du groupe est requis`),
  description: Yup.string().optional(),
  usersId: Yup.array().of(Yup.number().required()).optional()
});

export const updateGroupFormDefaultValues = {
  name: '',
  description: '',
  usersId: []
};

export interface UpdateGroupForm {
  name: string;
  description?: string;
  usersId?: number[];
}

export default function GroupsUpdate() {
  const [group, setGroup] = useState<UpdateGroupForm>(updateGroupFormDefaultValues);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { groupId } = useParams();
  const { currentGroupData } = useAppSelector((state: RootState) => state.groups.currentGroup);

  const methods = useForm({
    resolver: yupResolver(updateGroupSchema),
    defaultValues: updateGroupFormDefaultValues,
    values: { ...group, description: group.description ?? '' }
  });
  const {
    handleSubmit,
    formState: { dirtyFields }
  } = methods;

  // Update the form if we are on the update page
  useEffect(() => {
    if (currentGroupData?.id !== Number(groupId) && currentGroupData !== null) {
      navigate(PATH_GROUPS.root);
    } else if (currentGroupData === null) {
      navigate(PATH_GROUPS.root);
    }
  }, []);

  useEffect(() => {
    if (currentGroupData) {
      setGroup(currentGroupData);
    }
  }, [currentGroupData]);

  const onSubmit = async (data: UpdateGroupForm) => {
    try {
      const updateGroupRequest: Partial<UpdateGroupForm> = {};

      Object.keys(dirtyFields).forEach((key) => {
        const formKey = key as keyof UpdateGroupForm;
        const value = data[formKey];

        // Ensuring we only assign values that are not undefined
        if (value !== undefined) {
          // Narrowing down the type dynamically and safely using type assertion
          switch (formKey) {
            case 'name':
            case 'description':
              if (typeof value === 'string') {
                updateGroupRequest[formKey] = value;
              }
              break;
            case 'usersId':
              if (Array.isArray(value)) {
                updateGroupRequest[formKey] = value;
              }
              break;
          }
        }
      });

      if (Object.keys(updateGroupRequest).length === 0) {
        enqueueSnackbar(t`Aucune modification n'a été effectuée`, { variant: 'warning' });
        return;
      }

      await dispatch(updateGroupAction({ id: Number(groupId), ...updateGroupRequest }));
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
          header={<CardHeader headerText={<Trans>Modifier un groupe</Trans>} />}
          footer={<GroupsUpdateFooter />}
        >
          <GroupsForm isEditing={true} />
        </LMSCard>
      </form>
    </FormProvider>
  );
}
