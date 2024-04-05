import { Box, Typography } from '@mui/material';
import LostPasswordIllustration from '@src/assets/illustrations/LostPasswordIllustration';
import { Trans } from '@lingui/macro';

export default function ForgotPasswordHeader() {
  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <LostPasswordIllustration
        sx={{
          height: 100,
        }}
      />
      <Typography variant="h4" align="center">
        <Trans>Mot de passe oublié ?</Trans>
      </Typography>
      <Typography mt={4} align="center">
        <Trans>Veuillez renseigner l'adresse mail associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.</Trans>
      </Typography>
    </Box>
  );
}