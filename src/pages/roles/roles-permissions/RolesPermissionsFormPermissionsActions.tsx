import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import RHFSwitch from '@src/components/hook-form/RHFSwitch';

interface RolesPermissionsFormPermissionsActionsProps {
  name: string;
  label: ReactNode;
}

export default function RolesPermissionsFormPermissionsActions({
  name,
  label
}: RolesPermissionsFormPermissionsActionsProps) {
  return (
    <Box display="flex" flex={['10%', '33%', 1]} justifyContent="center" alignItems="center">
      <RHFSwitch centered name={name} label={label} />
    </Box>
  );
}
