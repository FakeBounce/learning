import CardHeader from '@src/components/cards/CardHeader';
import { useAppSelector } from '@redux/hooks';
import { useTheme } from '@mui/material/styles';
import { Skeleton } from '@mui/material';

export default function ModulesProfileHeader() {
  const { modulesCurrentData, modulesCurrentLoading } = useAppSelector(
    (state) => state.modules.modulesCurrent
  );
  const theme = useTheme();

  const displayName = () => {
    if (!modulesCurrentLoading && modulesCurrentData !== null) {
      return modulesCurrentData.title;
    }
    return <Skeleton animation="pulse" variant="text" width="30%" />;
  };

  return <CardHeader headerText={displayName()} headerColor={theme.palette.secondary.main} />;
}
