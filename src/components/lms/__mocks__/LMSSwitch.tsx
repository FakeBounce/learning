import { ChangeEvent } from 'react';
import { SwitchProps } from '@mui/material';

interface LMSSwitchProps extends SwitchProps {
  handleChange: (_: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export default function LMSSwitch({
  handleChange,
  checked,
  name,
  disabled = false
}: LMSSwitchProps) {
  return (
    <input
      type="checkbox"
      onChange={handleChange}
      checked={checked}
      name={name}
      id={name}
      disabled={disabled}
    />
  );
}
