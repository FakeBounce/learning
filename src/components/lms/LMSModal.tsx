import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Iconify from '@src/components/iconify/Iconify';
import ActionButton from '@src/components/lms/ActionButton';
import { Trans } from '@lingui/macro';
import { ReactNode } from 'react';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  },
  '& .MuiPaper-root': {
    borderRadius: theme.shape.customBorderRadius.extraLarge,
    padding: theme.spacing(1)
  }
}));

interface LMSModalProps {
  title: ReactNode;
  children: ReactNode;
  open: boolean;
  cancelAction?: () => void;
  validateAction?: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export default function LMSModal({
  title,
  children,
  open,
  onClose,
  validateAction,
  cancelAction,
  isLoading = false
}: LMSModalProps) {
  return (
    <StyledDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <Iconify icon="material-symbols:close" />
      </IconButton>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ gap: 1 }}>
        {cancelAction && (
          <ActionButton actionType="cancel" onClick={cancelAction} loading={isLoading}>
            <Trans>Annuler</Trans>
          </ActionButton>
        )}
        {validateAction && (
          <ActionButton onClick={validateAction} loading={isLoading}>
            <Trans>Valider</Trans>
          </ActionButton>
        )}
      </DialogActions>
    </StyledDialog>
  );
}
