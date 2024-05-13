import { useAppSelector } from '@redux/hooks';
import { Trans } from '@lingui/macro';
import Box from '@mui/material/Box';
import ActionButton from '@src/components/lms/ActionButton';
import { MouseEvent } from 'react';

interface ModulesStudyPlanFooterProps {
  handleClick: (_event: MouseEvent<HTMLElement>) => void;
}

export default function ModulesStudyPlanFooter({ handleClick }: ModulesStudyPlanFooterProps) {
  const modulesLoading = useAppSelector((state) => state.modules.modulesLoading);

  return (
    <Box display={'flex'} alignItems={'center'} p={2}>
      <ActionButton actionType="update" onClick={handleClick} loading={modulesLoading}>
        <Trans>Ajouter</Trans>
      </ActionButton>
    </Box>
  );
}
