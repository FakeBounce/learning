import CardHeader from '@src/components/cards/CardHeader';
import { useAppSelector } from '@redux/hooks';
import { useTheme } from '@mui/material/styles';
import { Skeleton } from '@mui/material';

export default function ModulesProfileHeader() {
  const {
    modulesLoading,
    modulesCurrent: { modulesCurrentData }
  } = useAppSelector((state) => state.modules);
  const theme = useTheme();

  const displayName = () => {
    if (!modulesLoading && modulesCurrentData !== null) {
      return modulesCurrentData.title;
    }
    return <Skeleton animation="pulse" variant="text" width="30%" />;
  };

  return <CardHeader headerText={displayName()} headerColor={theme.palette.secondary.main} />;
}
