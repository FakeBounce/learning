import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { ReactNode } from 'react';

const StyledImageDisplayContainer = styled(Box)(({ theme }) => ({
  width: 128,
  height: 128,
  border: `1px dashed ${theme.palette.grey[200]}`,
  borderRadius: theme.shape.customBorderRadius.whole,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const StyledImageDisplayer = styled(Box)(({ theme }) => ({
  width: 112,
  height: 112,
  backgroundColor: theme.palette.grey[200],
  borderRadius: theme.shape.customBorderRadius.whole,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

interface CircledAvatarProps {
  children: ReactNode;
  [key: string]: unknown;
}

export default function CircledAvatar({ children, ...other }: CircledAvatarProps) {
  return (
    <StyledImageDisplayContainer component="label" {...other}>
      <StyledImageDisplayer>{children}</StyledImageDisplayer>
    </StyledImageDisplayContainer>
  );
}
