import { useAppSelector } from '@redux/hooks';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { MouseEvent, useState } from 'react';
import ModulesStudyPlanSubjectModal from '@src/pages/modules/modules-study-plan/ModulesStudyPlanSubjectModal';
import { canDoModuleAction } from '@utils/feature-flag/canDoModuleAction';
import { ModulesActions } from '@services/modules/interfaces';
import ModulesStudyPlanPopover from '@src/pages/modules/modules-study-plan/ModulesStudyPlanPopover';
import ModulesStudyPlanFooter from '@src/pages/modules/modules-study-plan/ModulesStudyPlanFooter';
import ModulesStudyPlanHeader from '@src/pages/modules/modules-study-plan/ModulesStudyPlanHeader';
import ModulesStudyPlanContent from '@src/pages/modules/modules-study-plan/ModulesStudyPlanContent';
import ModulesStudyPlanTitle from '@src/pages/modules/modules-study-plan/ModulesStudyPlanTitle';

export default function ModulesStudyPlan() {
  const { modulesCurrentData } = useAppSelector((state) => state.modules.modulesCurrent);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

  // Popper handlers
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  // Popper handlers
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popper-study-plan' : undefined;

  const canEditPlan =
    modulesCurrentData !== null && canDoModuleAction(modulesCurrentData, ModulesActions.EDIT);

  return (
    <>
      <Paper
        sx={{
          mb: 2,
          minWidth: 245,
          maxWidth: 245,
          borderRadius: (theme) => theme.shape.customBorderRadius.medium,
          borderBottomRightRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
        elevation={10}
      >
        <Box display={'flex'} flexDirection="column" flex={1} alignItems="space-between">
          <ModulesStudyPlanHeader />
          <Box display="flex" flex={1} flexDirection="column" gap={2}>
            <ModulesStudyPlanTitle />
            <ModulesStudyPlanContent />
          </Box>
          {canEditPlan && <ModulesStudyPlanFooter handleClick={handleClick} />}
        </Box>
      </Paper>

      <ModulesStudyPlanPopover
        handleClose={handleClose}
        anchorEl={anchorEl}
        id={id}
        open={open}
        toggleSubjectModal={() => setIsSubjectModalOpen(true)}
        toggleContentModal={() => setIsContentModalOpen(true)}
      />

      <ModulesStudyPlanSubjectModal
        onClose={() => setIsSubjectModalOpen(false)}
        isOpen={canEditPlan && isSubjectModalOpen}
      />
      <ModulesStudyPlanSubjectModal
        onClose={() => setIsContentModalOpen(false)}
        isOpen={canEditPlan && isContentModalOpen}
      />
    </>
  );
}
