import { useAppDispatch, useAppSelector } from '@redux/hooks';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Iconify from '@src/components/iconify/Iconify';
import { Theme } from '@mui/material/styles';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { deleteQuestionAction } from '@redux/actions/modulesActions';
import { ModuleCompositionItemNested } from '@services/modules/interfaces';
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { PATH_MODULES } from '@utils/navigation/paths';

interface ModulesStudyPlanSubjectProps extends DraggableProvided {
  question: ModuleCompositionItemNested;
  snapshotDraggable: DraggableStateSnapshot;
  innerRef: (_element?: HTMLElement | null | undefined) => void;
  canDelete?: boolean;
}

export default function ModulesStudyPlanQuestion({
  question,
  snapshotDraggable,
  innerRef,
  canDelete = false,
  ...other
}: ModulesStudyPlanSubjectProps) {
  const { modulesLoading } = useAppSelector((state) => state.modules);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { moduleId, questionId } = useParams();

  const handleDeleteSubject = async () => {
    try {
      await dispatch(deleteQuestionAction({ questionId: question.id }));
    } catch (error) {
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetModuleLoading());
    }
  };

  const handleNavigateToDetail = () => {
    navigate(generatePath(PATH_MODULES.questionDetail, { moduleId, questionId: question.id }));
  };

  return (
    <Box py={0.5} ref={innerRef} {...other.draggableProps} {...other.dragHandleProps}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        borderRadius={(theme) => theme.shape.customBorderRadius.extraSmall}
        bgcolor={(theme) =>
          snapshotDraggable.isDragging
            ? theme.palette.primary.lighter
            : questionId && questionId === question.id.toString()
            ? theme.palette.info.lighter
            : theme.palette.secondary.lighter
        }
        borderLeft={(theme) => `4px solid ${theme.palette.secondary.main}`}
      >
        <Box display="flex" gap={1} alignItems="center" onClick={handleNavigateToDetail}>
          <Iconify
            icon={'mingcute:question-fill'}
            width={20}
            sx={{ color: (theme: Theme) => theme.palette.secondary.main }}
          />
          <Typography
            variant="body2"
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: 100,
              '&::before': {
                content: 'attr(title)'
              }
            }}
            title={question.name}
          />
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
    </Box>
  );
}
