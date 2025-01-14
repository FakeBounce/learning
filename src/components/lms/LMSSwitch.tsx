import { styled } from '@mui/system';
import { Switch, SwitchProps } from '@mui/material';
import { ChangeEvent } from 'react';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 35,
  height: 19,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 18
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 15,
    height: 15,
    borderRadius: 8
  },
  '& .MuiSwitch-track': {
    borderRadius: 16,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box'
  },
  '& .MuiFormControlLabel-root': {
    margin: 0
  }
}));

interface LMSSwitchProps extends SwitchProps {
  handleChange: (_: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  name: string;
  disabled?: boolean;
}

export default function LMSSwitch({
  handleChange,
  checked,
  disabled = false,
  name
}: LMSSwitchProps) {
  return (
    <AntSwitch
      name={name}
      id={name}
      onChange={handleChange}
      checked={checked}
      disabled={disabled}
    />
  );
}
