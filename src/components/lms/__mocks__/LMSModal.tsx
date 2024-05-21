import Iconify from '@src/components/iconify/Iconify';
import { Trans } from '@lingui/macro';
import { ReactNode } from 'react';

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
  if (!open) {
    return null;
  }
  return (
    <div>
      <div>{title}</div>
      <button aria-label="close" onClick={onClose}>
        <Iconify icon="material-symbols:close" />
      </button>
      <div>{children}</div>
      <div>
        {cancelAction && (
          <button onClick={cancelAction} disabled={isLoading}>
            <Trans>Annuler</Trans>
          </button>
        )}
        {validateAction && (
          <button onClick={validateAction} type="submit" role="submit" disabled={isLoading}>
            <Trans>Valider</Trans>
          </button>
        )}
      </div>
    </div>
  );
}
