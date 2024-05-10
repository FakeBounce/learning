import { Trans } from '@lingui/macro';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { Box } from '@mui/material';
import CardFooter from '@src/components/cards/CardFooter';
import ActionButton from '@src/components/lms/ActionButton';
import { cancelEditingModule, startEditingModule } from '@redux/reducers/modulesReducer';
import { ModulesActions } from '@services/modules/interfaces';
import { canDoModuleAction } from '@utils/feature-flag/canDoModuleAction';

export default function ModulesProfileFooter() {
  const { modulesCurrentData, modulesCurrentLoading, modulesCurrentIsEditing } = useAppSelector(
    (state) => state.modules.modulesCurrent
  );
  const dispatch = useAppDispatch();

  const toggleEditMode = () => {
    if (modulesCurrentData === null) {
      return;
    }

    if (modulesCurrentIsEditing) {
      dispatch(cancelEditingModule());
      return;
    } else {
      dispatch(startEditingModule());
      return;
    }
  };

  if (modulesCurrentData === null || !canDoModuleAction(modulesCurrentData, ModulesActions.EDIT)) {
    return <Box display="flex"></Box>;
  }

  if (!modulesCurrentIsEditing) {
    return (
      <Box display="flex">
        <ActionButton onClick={toggleEditMode} loading={modulesCurrentLoading}>
          <Trans>Modifier</Trans>
        </ActionButton>
      </Box>
    );
  }

  return <CardFooter cancelAction={() => toggleEditMode()} isLoading={modulesCurrentLoading} />;
}
