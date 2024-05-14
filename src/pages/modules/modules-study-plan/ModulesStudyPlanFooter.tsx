import { useAppSelector } from '@redux/hooks';
import { Trans } from '@lingui/macro';
import Box from '@mui/material/Box';
import ActionButton from '@src/components/lms/ActionButton';
import { MouseEvent } from 'react';
import { canDoModuleAction } from '@utils/feature-flag/canDoModuleAction';
import { ModulesActions } from '@services/modules/interfaces';

interface ModulesStudyPlanFooterProps {
  handleClick: (_event: MouseEvent<HTMLElement>) => void;
}

export default function ModulesStudyPlanFooter({ handleClick }: ModulesStudyPlanFooterProps) {
  const {
    modulesLoading,
    modulesCurrent: { modulesCurrentData }
  } = useAppSelector((state) => state.modules);

  const canEditPlan =
    modulesCurrentData !== null && canDoModuleAction(modulesCurrentData, ModulesActions.EDIT);

  if (!canEditPlan) {
    return null;
  }

  return (
    <Box display={'flex'} alignItems={'center'} p={2}>
      <ActionButton actionType="update" onClick={handleClick} loading={modulesLoading}>
        <Trans>Ajouter</Trans>
      </ActionButton>
    </Box>
  );
}
