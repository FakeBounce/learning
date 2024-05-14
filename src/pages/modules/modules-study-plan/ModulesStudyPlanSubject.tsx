import { useAppDispatch, useAppSelector } from '@redux/hooks';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Iconify from '@src/components/iconify/Iconify';
import { Theme } from '@mui/material/styles';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { deleteSubjectAction } from '@redux/actions/modulesActions';
import { ModuleCompositionItem } from '@services/modules/interfaces';
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';

interface ModulesStudyPlanSubjectProps extends DraggableProvided {
  subject: ModuleCompositionItem;
  snapshotDraggable: DraggableStateSnapshot;
  innerRef: (_element?: HTMLElement | null | undefined) => void;
  canDelete?: boolean;
}

export default function ModulesStudyPlanSubject({
  subject,
  snapshotDraggable,
  innerRef,
  canDelete = false,
  ...other
}: ModulesStudyPlanSubjectProps) {
  const { modulesLoading } = useAppSelector((state) => state.modules);
  const dispatch = useAppDispatch();

  const handleDeleteSubject = async () => {
    try {
      await dispatch(deleteSubjectAction({ subjectId: subject.id }));
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetModuleLoading());
    }
  };

  return (
    <Box
      ref={innerRef}
      {...other.draggableProps}
      {...other.dragHandleProps}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      my={0.5}
      borderRadius={(theme) => theme.shape.customBorderRadius.extraSmall}
      bgcolor={(theme) =>
        snapshotDraggable.isDragging
          ? theme.palette.primary.lighter
          : theme.palette.secondary.lighter
      }
      borderLeft={(theme) => `4px solid ${theme.palette.secondary.main}`}
    >
      <Box display="flex" gap={1}>
        <Iconify
          icon="material-symbols:folder"
          width={20}
          sx={{ color: (theme: Theme) => theme.palette.secondary.main }}
        />
        <Typography
          variant="body2"
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: 100
          }}
        >
          {subject.name}
        </Typography>
      </Box>
      {canDelete && (
        <IconButton onClick={handleDeleteSubject} sx={{ p: 0 }} disabled={modulesLoading}>
          <Iconify
            icon="material-symbols:close"
            sx={{ color: (theme: Theme) => theme.palette.secondary.main }}
          />
        </IconButton>
      )}
    </Box>
  );
}
