import { Trans } from '@lingui/macro';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Iconify from '@src/components/iconify/Iconify';
import { Theme } from '@mui/material/styles';

export default function ModulesStudyPlanHeader() {
  return (
    <Box
      p={1}
      color="white"
      display={'flex'}
      justifyContent={'flex-end'}
      alignItems={'center'}
      gap={2}
      sx={{
        bgcolor: (theme) => theme.palette.secondary.main,
        textAlign: 'center',
        borderTopLeftRadius: (theme) => theme.shape.customBorderRadius.large
      }}
    >
      <Typography variant="subtitle1">Plan d'étude</Typography>
      <IconButton
        sx={{
          bgcolor: 'white',
          color: (theme) => theme.palette.secondary.main,
          borderRadius: (theme) => theme.shape.customBorderRadius.small,
          px: 1,
          py: 0.5,
          gap: 0.5,
          '&:hover': {
            bgcolor: (theme) => theme.palette.secondary.light,
            color: (theme) => theme.palette.secondary.dark
          }
        }}
      >
        <Iconify
          icon="material-symbols:search"
          sx={{ color: (theme: Theme) => theme.palette.secondary.main }}
        />
        <Typography variant="body2" fontWeight={(theme) => theme.typography.h4.fontWeight}>
          <Trans>Voir</Trans>
        </Typography>
      </IconButton>
    </Box>
  );
}
