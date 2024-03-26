import { Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';

export default function ExternalTestersCreateHeader() {
  return (
    <Box p={2} display="flex" gap={2}>
      <Typography
        sx={{
          fontSize: (theme) => theme.typography.h3.fontSize,
          fontWeight: (theme) => theme.typography.fontWeightBold,
          paddingX: 2
        }}
      >
        <Trans>Ajouter un testeur</Trans>
      </Typography>
    </Box>
  );
}
