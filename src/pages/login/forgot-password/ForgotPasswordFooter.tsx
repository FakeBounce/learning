import ActionButton from '@src/components/lms/ActionButton';
import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import { PATH_AUTH } from '@utils/navigation/paths';
import { useAppSelector } from '@redux/hooks';
import { NavLink } from 'react-router-dom';

export default function ForgotPasswordFooter() {
  const { loading } = useAppSelector((state) => state.connectedUser.forgotPassword);

  return (
    <Box>
      <ActionButton
        fullWidth
        size="large"
        type="submit"
        role="submit"
        loading={loading}
        sx={{ textTransform: 'uppercase' }}
      >
        <Trans>Réinitialiser</Trans>
      </ActionButton>
      <Box
        component={NavLink}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        mt={3}
        fontWeight={'bold'}
        color={'black'}
        to={PATH_AUTH.login}
      >
        <Iconify icon={'material-symbols-light:arrow-back-ios-rounded'} width={17} />
        <Trans>Retour à la connexion</Trans>
      </Box>
    </Box>
  );
}
