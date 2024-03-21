import { FC, ReactNode } from 'react';
import { Button } from '@mui/material';

interface ActionButtonMockProps {
  actionType: string;
  children: ReactNode;
  loading: boolean;
}

const ActionButtonMock: FC<ActionButtonMockProps> = ({
  children,
  actionType,
  loading,
  ...rest
}) => {
  return (
    <Button data-testid="action-button-content" {...rest}>
      {children}
    </Button>
  );
};

export default ActionButtonMock;
