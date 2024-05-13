import { useAppSelector } from '@redux/hooks';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

export default function ModulesStudyPlanTitle() {
  const { modulesCurrentData, modulesCurrentLoading } = useAppSelector(
    (state) => state.modules.modulesCurrent
  );

  return (
    <Typography
      variant="h6"
      sx={{
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        px: 2,
        py: 1
      }}
    >
      {modulesCurrentLoading || !modulesCurrentData ? (
        <Skeleton animation="pulse" variant="rectangular" />
      ) : (
        modulesCurrentData.title
      )}
    </Typography>
  );
}
