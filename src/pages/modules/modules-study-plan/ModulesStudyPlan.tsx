import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { MouseEvent, useState } from 'react';
import ModulesStudyPlanSubjectModal from '@src/pages/modules/modules-study-plan/ModulesStudyPlanSubjectModal';
import ModulesStudyPlanPopover from '@src/pages/modules/modules-study-plan/ModulesStudyPlanPopover';
import ModulesStudyPlanFooter from '@src/pages/modules/modules-study-plan/ModulesStudyPlanFooter';
import ModulesStudyPlanHeader from '@src/pages/modules/modules-study-plan/ModulesStudyPlanHeader';
import ModulesStudyPlanContent from '@src/pages/modules/modules-study-plan/ModulesStudyPlanContent';
import ModulesStudyPlanTitle from '@src/pages/modules/modules-study-plan/ModulesStudyPlanTitle';
import { STUDY_PLAN_WIDTH } from '@utils/globalConsts';
import LMSPopover from '@src/components/lms/LMSPopover';

export default function ModulesStudyPlan() {
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

  return (
    <>
      <Paper
        sx={{
          mb: 2,
          minWidth: STUDY_PLAN_WIDTH,
          maxWidth: STUDY_PLAN_WIDTH,
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
          <ModulesStudyPlanFooter handleClick={handleClick} />
        </Box>
      </Paper>

      <LMSPopover id={id} open={open} anchorEl={anchorEl} placement="top-end" onClose={handleClose}>
        <ModulesStudyPlanPopover
          handleClose={handleClose}
          toggleSubjectModal={() => setIsSubjectModalOpen(true)}
          toggleContentModal={() => setIsContentModalOpen(true)}
        />
      </LMSPopover>

      <ModulesStudyPlanSubjectModal
        onClose={() => setIsSubjectModalOpen(false)}
        isOpen={isSubjectModalOpen}
      />
      <ModulesStudyPlanSubjectModal
        onClose={() => setIsContentModalOpen(false)}
        isOpen={isContentModalOpen}
      />
    </>
  );
}
