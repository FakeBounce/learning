import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import ActionButton from '@src/components/lms/ActionButton';
import { memo } from 'react';

interface CardFooterProps {
  isLoading: boolean;
  cancelAction: () => void;
}

function CardFooter({ isLoading, cancelAction }: CardFooterProps) {
  return (
    <Box display="flex" gap={2}>
      <ActionButton actionType="cancel" loading={isLoading} onClick={cancelAction}>
        <Trans>Annuler</Trans>
      </ActionButton>
      <ActionButton type="submit" role="submit" loading={isLoading}>
        <Trans>Enregistrer</Trans>
      </ActionButton>
    </Box>
  );
}

export default memo(CardFooter);
