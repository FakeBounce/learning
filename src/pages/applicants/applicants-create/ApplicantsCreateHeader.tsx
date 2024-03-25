import { Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';

export default function ApplicantsCreateHeader() {
  return (
    <Box p={2} display="flex" gap={2}>
      <Typography
        sx={{
          fontSize: (theme) => theme.typography.h3.fontSize,
          fontWeight: (theme) => theme.typography.fontWeightBold,
          paddingX: 2
        }}
      >
        <Trans>Ajouter un étudiant</Trans>
      </Typography>
    </Box>
  );
}
