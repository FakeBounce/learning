import { Trans } from '@lingui/macro';
import ActionButton from '@src/components/lms/ActionButton';

// ----------------------------------------------------------------------

export default function LoginFooter({ isLoading }: { isLoading: boolean }) {
  return (
    <ActionButton
      fullWidth
      size="large"
      type="submit"
      loading={isLoading}
      sx={{ textTransform: 'uppercase' }}
    >
      <Trans>Se connecter</Trans>
    </ActionButton>
  );
}
