import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { LMSCard } from '@src/components/lms';
import ActionButton from '@src/components/lms/ActionButton';
import { PATH_ORGANISATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

export default function OrganisationsCreate() {
  const navigate = useNavigate();

  return (
    <Box px={[0, 2]} width="100%" sx={{ overflowX: 'hidden' }}>
      <LMSCard isPageCard>
        <Box px={3} height="10vh" display="flex" width="100%" alignItems="center" position="sticky">
          <Typography variant="h5">Organisations</Typography>
          <ActionButton
            sx={{ textTransform: 'none', ml: 2 }}
            onClick={() => {
              navigate(PATH_ORGANISATIONS.add);
            }}
          >
            <Trans>Créer</Trans>
          </ActionButton>
        </Box>
      </LMSCard>
    </Box>
  );
}
