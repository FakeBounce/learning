import { FC, ReactNode } from 'react';

interface DialogMockProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DialogMock: FC<DialogMockProps> = (props) => {
  return props.open ? (
    <div>
      <div data-testid="dialog-overlay" onClick={props.onClose} />
      <div data-testid="dialog-content">{props.children}</div>
    </div>
  ) : null;
};

export default DialogMock;
