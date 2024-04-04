import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledFormColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0',
  gap: theme.spacing(3)
}));

export const StyledFormRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5)
}));

export const StyledFormTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption
}));
