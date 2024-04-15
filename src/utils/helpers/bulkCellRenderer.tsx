import { GridRenderCellParams } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { Trans } from '@lingui/macro';

export const BulkCellRenderer = (cell: GridRenderCellParams) => {
  if (cell.value === 'MD') {
    return (
      <Typography color="error">
        <Trans>Information obligatoire</Trans>
      </Typography>
    );
  }
  if (cell.value === 'IF') {
    return (
      <Typography color="error">
        <Trans>Format incorrect</Trans>
      </Typography>
    );
  }
  return <Typography>{cell.value}</Typography>;
};
