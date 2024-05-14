import { Trans } from '@lingui/macro';
import { ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';

interface ModulesStudyPlanPopoverProps {
  handleClose: () => void;
  toggleSubjectModal: () => void;
  toggleContentModal: () => void;
}

export default function ModulesStudyPlanPopover({
  handleClose,
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
  );
}
