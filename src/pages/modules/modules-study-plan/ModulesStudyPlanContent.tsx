import { useAppDispatch, useAppSelector } from '@redux/hooks';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import {
  ModuleCompositionItem,
  ModuleCompositionItemType,
  ModulesActions
} from '@services/modules/interfaces';
import ModulesStudyPlanSubject from '@src/pages/modules/modules-study-plan/ModulesStudyPlanSubject';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided
} from '@hello-pangea/dnd';
import { moveSubjectAction } from '@redux/actions/modulesActions';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { t } from '@lingui/macro';
import { canDoModuleAction } from '@utils/feature-flag/canDoModuleAction';
import { reorder } from '@utils/helpers/sorters';

export default function ModulesStudyPlanContent() {
  const { modulesCurrentData } = useAppSelector((state) => state.modules.modulesCurrent);
  const [internComposition, setInternComposition] = useState<ModuleCompositionItem[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setInternComposition(modulesCurrentData ? JSON.parse(modulesCurrentData.composition) : []);
  }, [modulesCurrentData]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    /**
     * We need to split the draggableId to get the item id and the item type
     * The draggableId is formatted like this: frontline-subject-1
     *  0: frontline = root
     *  1: type
     *  2: id
     *  3: backline = nested
     *  4: type
     *  5: id
     */
    const splitted = result.draggableId.split('-');
    const itemId = Number(splitted[2]);
    const itemType = splitted[1] as ModuleCompositionItemType;

    const items: ModuleCompositionItem[] = reorder(
      internComposition,
      result.source.index,
      result.destination.index
    );
    setInternComposition(items as ModuleCompositionItem[]);
    handleMoveItem(itemId, itemType, result.destination.index);
  };

  const handleMoveItem = async (
    subjectId: number,
    itemType: ModuleCompositionItemType,
    newPosition: number
  ) => {
    try {
      if (itemType === ModuleCompositionItemType.SUBJECT) {
        await dispatch(moveSubjectAction({ subjectId, newPosition }));
        return;
      }
      throw t`Une erreur est survenue lors du déplacement du sujet`;
    } catch (error) {
      setInternComposition(modulesCurrentData ? JSON.parse(modulesCurrentData.composition) : []);
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetModuleLoading());
    }
  };

  const canEditPlan =
    modulesCurrentData !== null && canDoModuleAction(modulesCurrentData, ModulesActions.EDIT);

  return (
    <Box display="flex" flex={1} flexDirection="column" gap={2} px={1}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              display="flex"
              flex={1}
              flexDirection="column"
            >
              {internComposition.map((subject: ModuleCompositionItem, index) => (
                <Draggable
                  key={`frontline-${subject.id}`}
                  draggableId={`frontline-${subject.type}-${subject.id}`}
                  index={index}
                  isDragDisabled={!canEditPlan}
                >
                  {(providedDraggable, snapshotDraggable) => (
                    <ModulesStudyPlanSubject
                      key={subject.id}
                      subject={subject}
                      snapshotDraggable={snapshotDraggable}
                      innerRef={providedDraggable.innerRef}
                      canDelete={canEditPlan}
                      draggableProps={providedDraggable.draggableProps}
                      dragHandleProps={providedDraggable.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}
