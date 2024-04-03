import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { LMSCard } from '@src/components/lms';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PATH_GROUPS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { resetCreatingGroup } from '@redux/reducers/groupsReducer';
import * as Yup from 'yup';
import { t } from '@lingui/macro';
import GroupsCreateHeader from '@src/pages/groups/groups-create/GroupsCreateHeader';
import GroupsCreateFooter from '@src/pages/groups/groups-create/GroupsCreateFooter';
import GroupsUpdateForm from '@src/pages/groups/groups-update/GroupsUpdateForm';
import { createGroup } from '@redux/actions/groupsActions';

export const createGroupSchema = Yup.object().shape({
  name: Yup.string().required(t`Le nom du groupe est requis`),
  description: Yup.string().optional()
});

export const createGroupFormDefaultValues = {
  name: '',
  description: ''
};

export interface CreateGroupForm {
  name: string;
  description?: string;
}

export default function GroupsCreate() {
  const { hasCreated } = useAppSelector((state) => state.groups.groupsCreate);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasCreated) {
      if (getValues().name) {
        navigate(PATH_GROUPS.root);
      } else {
        dispatch(resetCreatingGroup());
      }
    }
  }, [hasCreated]);

  const dispatch = useAppDispatch();
  const methods = useForm({
    resolver: yupResolver(createGroupSchema),
    defaultValues: createGroupFormDefaultValues
  });
  const { handleSubmit, getValues } = methods;

  const onSubmit = async (data: CreateGroupForm) => {
    // @todo - Add users table
    dispatch(createGroup({ name: data.name, description: data.description }));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Box px={[0, 2]} display="flex">
          <LMSCard isPageCard cardCss={{ maxWidth: '100%' }} footer={<GroupsCreateFooter />}>
            <GroupsCreateHeader />
            <GroupsUpdateForm />
          </LMSCard>
        </Box>
      </form>
    </FormProvider>
  );
}
