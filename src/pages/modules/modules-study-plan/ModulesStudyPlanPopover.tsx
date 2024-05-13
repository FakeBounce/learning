import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import LMSPopover from '@src/components/lms/LMSPopover';

interface ModulesStudyPlanPopoverProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  id: string | undefined;
  open: boolean;
  toggleSubjectModal: () => void;
  toggleContentModal: () => void;
}

export default function ModulesStudyPlanPopover({
  anchorEl,
  handleClose,
  id,
  open,
  toggleSubjectModal,
  toggleContentModal
}: ModulesStudyPlanPopoverProps) {
  const handleToggleSubjectModal = () => {
    toggleSubjectModal();
    handleClose();
  };

  const handleToggleContentModal = () => {
    toggleContentModal();
    handleClose();
  };

  return (
    <LMSPopover id={id} open={open} anchorEl={anchorEl} placement="top-end" onClose={handleClose}>
      <Paper elevation={3} sx={{ borderRadius: 2, minWidth: 160 }}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={handleToggleSubjectModal}>
            <ListItemText primary={<Trans>Un sujet</Trans>} />
          </ListItemButton>
          <ListItemButton onClick={handleToggleContentModal}>
            <ListItemText primary={<Trans>Un contenu</Trans>} />
          </ListItemButton>
        </ListItem>
      </Paper>
    </LMSPopover>
  );
}
