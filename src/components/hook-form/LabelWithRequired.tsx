import { memo, ReactNode } from 'react';

const LabelWithRequired = ({ label, name }: { label: ReactNode; name: string }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <span className="MuiFormLabel-asterisk"> *</span>
  </>
);

export default memo(LabelWithRequired);
