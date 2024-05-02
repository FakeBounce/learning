import { Box, Typography } from '@mui/material';
import { memo, ReactNode } from 'react';
import ActionButton from '@src/components/lms/ActionButton';

interface CardHeaderActionProps {
  action: () => void | VoidFunction;
  actionType?: 'cancel' | 'update' | 'action';
  actionText: ReactNode;
}

interface CardHeaderProps {
  headerText: ReactNode;
  headerColor?: string;
  actions?: CardHeaderActionProps[] | null;
}

function CardHeader({ headerText, headerColor, actions = null }: CardHeaderProps) {
  return (
    <Box
      display="flex"
      gap={2}
      flexDirection={[actions && actions.length > 1 ? 'column' : 'row', 'row']}
    >
      <Typography
        sx={{
          fontSize: (theme) => theme.typography.h3.fontSize,
          fontWeight: (theme) => theme.typography.fontWeightBold,
          color: (theme) => headerColor ?? theme.palette.grey[800]
        }}
      >
        {headerText}
      </Typography>
      {actions && (
        <Box display="flex" gap={2}>
          {actions.map((action, index) => (
            <ActionButton
              key={index}
              actionType={action.actionType ?? 'action'}
              sx={{ textTransform: 'none' }}
              onClick={action.action}
            >
              {action.actionText}
            </ActionButton>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default memo(CardHeader);
