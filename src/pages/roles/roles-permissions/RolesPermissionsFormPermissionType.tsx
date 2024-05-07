import { ReactNode } from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface RolesPermissionsFormPermissionTypeProps {
  title: ReactNode;
  children: ReactNode;
}

export default function RolesPermissionsFormPermissionType({
  title,
  children
}: RolesPermissionsFormPermissionTypeProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        padding: 1,
        paddingX: 4
      }}
    >
      <Box display="flex" flex={1} gap={[2, 4, 8]}>
        <Typography variant="h6" display="flex" alignItems="center" flex={[1, 2, 2]}>
          {title}
        </Typography>
        <Box
          display="flex"
          flex={['1 1 0', '4 1 0', '8 1 0']}
          gap={[2, 2, 4]}
          flexDirection={['column', 'column', 'row']}
          flexWrap="wrap"
        >
          {children}
        </Box>
      </Box>
    </Paper>
  );
}
