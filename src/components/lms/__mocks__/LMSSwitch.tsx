import { ChangeEvent } from 'react';

interface LMSSwitchProps {
  handleChange: (_: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export default function LMSSwitch({ handleChange, checked }: LMSSwitchProps) {
  return <input type="checkbox" onChange={handleChange} checked={checked} />;
}
