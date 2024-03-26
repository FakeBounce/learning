import { ReactNode } from 'react';

const LabelWithRequired = ({ label }: { label: ReactNode }) => (
  <>
    {label}
    <span className="MuiFormLabel-asterisk"> *</span>
  </>
);

export default LabelWithRequired;
