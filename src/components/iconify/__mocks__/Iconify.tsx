import { FC } from 'react';

interface IconifyProps {
  sx?: object;
  width?: number | string;
  icon: string;
}

const MockIconify: FC<IconifyProps> = ({ icon, width = 20, sx = {} }: IconifyProps) => (
  <span style={{ width, height: width, ...sx }}>{icon}</span>
);

export default MockIconify;
