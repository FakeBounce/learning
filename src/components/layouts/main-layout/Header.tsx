import { Trans } from '@lingui/macro';
import { Box, Chip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import HeaderBreadcrumbs from '@src/components/layouts/main-layout/HeaderBreadcrumbs';
import HeaderRightContent from '@src/components/layouts/main-layout/HeaderRightContent';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { changeOrganizationView } from '@redux/actions/connectedUserActions';
import { PATH_DASHBOARD } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

export default function Header() {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.connectedUser.mainOrganization);
  const { currentOrganization, isSuperAdmin } = useAppSelector((state) => state.connectedUser.user);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOrganizationLogout = async () => {
    try {
      await dispatch(changeOrganizationView({ organizationId: id }));
      navigate(PATH_DASHBOARD.root);
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
    }
  };

  return (
    <>
      <Box
        p={2}
        ml={2}
        gap={2}
        display="flex"
        flexDirection={['column', 'row']}
        justifyContent={['center', 'space-between']}
        alignItems={['center', 'center']}
        boxSizing="border-box"
      >
        {currentOrganization && (
          <Box display="flex" alignItems="center">
            <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>
              {currentOrganization.name}
            </Typography>
            {currentOrganization.isMain && (
              <Typography ml={0.5}>
                <Trans>(global)</Trans>
              </Typography>
            )}
            {!currentOrganization.isMain && isSuperAdmin && (
              <Chip
                sx={{ marginLeft: theme.spacing(2) }}
                label={<Trans>Déconnexion</Trans>}
                onDelete={handleOrganizationLogout}
              />
            )}
          </Box>
        )}

        <HeaderRightContent />
      </Box>
      <HeaderBreadcrumbs />
    </>
  );
}
