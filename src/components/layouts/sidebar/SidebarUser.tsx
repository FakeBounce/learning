import theme from '@theme';
import { Box, Stack, Avatar } from '@mui/material';
// ----------------------------------------------------------------------

export default function SidebarUser({ open }: { open: boolean }) {
  if (!open) {
    return (
      <Stack
        sx={{
          py: 3,
          transition: 'padding 0.5s ease'
        }}
      >
        <Box
          sx={{
            height: '5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            transition: 'background-color 0.5s ease'
          }}
        >
          <Avatar alt="Avatar photo" src="/assets/shape_avatar.svg" />
        </Box>
      </Stack>
    );
  }
  return (
    <Stack
      sx={{
        p: 2,
        py: 3,
        transition: 'padding 0.5s ease'
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.grey[300],
          borderRadius: 2,
          height: '5rem',
          display: 'flex',
          transition: 'background-color 0.5s ease'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ml: 2, mr: 2 }}>
          <Avatar alt="Avatar photo" src="/assets/shape_avatar.svg" />
        </Box>
        <Stack py={2} spacing={1}>
          <Box>Nom / Prénom</Box> <Box> Rôle</Box>
        </Stack>
      </Box>
    </Stack>
  );
}
