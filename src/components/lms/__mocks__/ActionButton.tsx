import { ReactNode } from 'react';
import { LoadingButtonProps } from '@mui/lab';

interface ActionButtonProps extends LoadingButtonProps {
  children: ReactNode;
  actionType?: 'action' | 'cancel' | 'update';
  sx?: Record<string, any>;
}
export default function ActionButton({
  children,
  loading,
  role = 'button',
  type = 'button',
  disabled,
  onClick
}: ActionButtonProps) {
  return (
    <button disabled={loading || disabled} role={role} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
