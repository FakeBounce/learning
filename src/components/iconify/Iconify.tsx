import { forwardRef, memo, Ref } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';
import { Box } from '@mui/material';

const IconifyComponent = ({ icon, width = 20, sx, ...other }: IconifyProps, ref: any) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
);

const Iconify = forwardRef<Ref<any>, IconifyProps>(IconifyComponent);

interface IconifyProps {
  sx?: object;
  width?: number | string;
  icon: string | IconifyIcon;
}

export default memo(Iconify);
