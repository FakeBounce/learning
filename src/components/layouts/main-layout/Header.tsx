import { Trans } from '@lingui/macro';
import { Box, Chip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HeaderBreadcrumbs from '@src/components/layouts/main-layout/HeaderBreadcrumbs';
import HeaderRightContent from '@src/components/layouts/main-layout/HeaderRightContent';
import { useAppDispatch } from '@redux/hooks';
import { changeOrganizationView } from '@redux/reducers/connectedUserReducer';
import { PATH_DASHBOARD } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOrganizationLogout = () => {
    // @todo We should have an attribute saying the default organisation id for the user instead of plain id
    dispatch(changeOrganizationView({ organizationId: 1 }));
    navigate(PATH_DASHBOARD.root);
  };

  return (
    <>
      <Box
        py={2}
        ml={2}
        px={[0, 2]}
        display="flex"
        justifyContent="space-between"
        boxSizing="border-box"
      >
        <Box display="flex" alignItems="center">
          <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>
            Market Academy
          </Typography>
          <Typography ml={0.5}>
            <Trans>(global)</Trans>
          </Typography>
          <Chip
            sx={{ marginLeft: theme.spacing(2) }}
            label={<Trans>Déconnexion</Trans>}
            onDelete={handleOrganizationLogout}
          />
        </Box>
        <HeaderRightContent />
      </Box>
      <HeaderBreadcrumbs />
    </>
  );
}
