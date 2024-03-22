import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledApplicantColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0',
  gap: theme.spacing(3),
  padding: `0 ${theme.spacing(2)}`
}));

export const StyledApplicantRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5)
}));

export const StyledApplicantTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption
}));
