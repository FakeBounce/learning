import { useAppDispatch } from '@redux/hooks';
import Box from '@mui/material/Box';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { deleteSubjectAction } from '@redux/actions/modulesActions';
import { ModuleCompositionItem } from '@services/modules/interfaces';
import { DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import ModulesStudyPlanSubjectItem from '@src/pages/modules/modules-study-plan/ModulesStudyPlanSubjectItem';
import ModulesStudyPlanSubjectContent from '@src/pages/modules/modules-study-plan/ModulesStudyPlanSubjectContent';

interface ModulesStudyPlanSubjectProps extends DraggableProvided {
  subject: ModuleCompositionItem;
  snapshotDraggable: DraggableStateSnapshot;
  innerRef: (_element?: HTMLElement | null | undefined) => void;
  canEdit?: boolean;
}

export default function ModulesStudyPlanSubject({
  subject,
  snapshotDraggable,
  innerRef,
  canEdit = false,
  ...other
}: ModulesStudyPlanSubjectProps) {
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
    <Box ref={innerRef} {...other.draggableProps} {...other.dragHandleProps}>
      <ModulesStudyPlanSubjectItem
        name={subject.name}
        isDragging={snapshotDraggable.isDragging}
        onDelete={handleDeleteSubject}
        canEdit={canEdit}
      />
      <ModulesStudyPlanSubjectContent
        subject={subject}
        canEdit={canEdit}
        isDragged={snapshotDraggable.isDragging}
      />
    </Box>
  );
}
