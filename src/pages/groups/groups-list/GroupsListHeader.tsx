import { Box, Typography } from '@mui/material';
import { Trans } from '@lingui/macro';
import ActionButton from '@src/components/lms/ActionButton';

export default function GroupsListHeader() {
  return(
    <Box px={3} minHeight={"10vh"} display={"flex"} alignItems={"center"} boxSizing={"border-box"}>
      <Typography variant="h4" fontWeight={"normal"}>
        <Trans>Groupes</Trans>
      </Typography>
      <ActionButton
        sx={{ textTransform: 'none', ml: 2 }}
        onClick={() => {
          console.log('Ajouter');
        }}
      >
        <Trans>Ajouter</Trans>
      </ActionButton>
    </Box>
  );
}