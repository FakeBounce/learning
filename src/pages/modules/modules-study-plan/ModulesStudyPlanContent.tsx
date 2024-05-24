import { useAppDispatch, useAppSelector } from '@redux/hooks';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import {
  Module,
  ModuleCompositionItem,
  ModuleCompositionItemNested,
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
import {
  moveMediaAction,
  moveQuestionAction,
  moveSubjectAction
} from '@redux/actions/modulesActions';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { t } from '@lingui/macro';
import { canDoModuleAction } from '@utils/feature-flag/canDoModuleAction';
import { reorder } from '@utils/helpers/sorters';
import ModulesStudyPlanMedia from '@src/pages/modules/modules-study-plan/ModulesStudyPlanMedia';
import ModulesStudyPlanQuestion from '@src/pages/modules/modules-study-plan/ModulesStudyPlanQuestion';

export default function ModulesStudyPlanContent() {
  const { modulesCurrentData }: { modulesCurrentData: Module } = useAppSelector(
    (state) => state.modules.modulesCurrent
  );
  const [internComposition, setInternComposition] = useState<
    (ModuleCompositionItem | ModuleCompositionItemNested)[]
  >([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setInternComposition(modulesCurrentData ? modulesCurrentData.composition : []);
  }, [modulesCurrentData]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }
    /**
     * We need to split the draggableId to get the item id and the item type
     * The draggableId is formatted like this: frontline-subject-1
     *  0: frontline = root / backline = nested
     *  1: type
     *  2: id
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
    itemId: number,
    itemType: ModuleCompositionItemType,
    newPosition: number
  ) => {
    try {
      switch (itemType) {
        case ModuleCompositionItemType.SUBJECT:
          await dispatch(moveSubjectAction({ subjectId: itemId, newPosition }));
          return;
        case ModuleCompositionItemType.MEDIA:
          await dispatch(moveMediaAction({ mediaId: itemId, position: newPosition }));
          return;
        case ModuleCompositionItemType.QUESTION:
          await dispatch(moveQuestionAction({ questionId: itemId, newPosition }));
          return;
        default:
          throw t`Une erreur est survenue lors du déplacement`;
      }
    } catch (error) {
      setInternComposition(modulesCurrentData ? modulesCurrentData.composition : []);
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
              gap={1}
            >
              {internComposition.map(
                (compositionItem: ModuleCompositionItem | ModuleCompositionItemNested, index) => (
                  <Draggable
                    key={`frontline-${compositionItem.type}-${compositionItem.id}`}
                    draggableId={`frontline-${compositionItem.type}-${compositionItem.id}`}
                    index={index}
                    isDragDisabled={!canEditPlan}
                  >
                    {(providedDraggable, snapshotDraggable) => {
                      switch (compositionItem.type) {
                        case ModuleCompositionItemType.SUBJECT:
                          return (
                            <ModulesStudyPlanSubject
                              key={compositionItem.id}
                              subject={compositionItem as ModuleCompositionItem}
                              snapshotDraggable={snapshotDraggable}
                              innerRef={providedDraggable.innerRef}
                              canEdit={canEditPlan}
                              draggableProps={providedDraggable.draggableProps}
                              dragHandleProps={providedDraggable.dragHandleProps}
                            />
                          );
                        case ModuleCompositionItemType.MEDIA:
                          return (
                            <ModulesStudyPlanMedia
                              key={compositionItem.id}
                              media={compositionItem}
                              snapshotDraggable={snapshotDraggable}
                              innerRef={providedDraggable.innerRef}
                              canDelete={canEditPlan}
                              draggableProps={providedDraggable.draggableProps}
                              dragHandleProps={providedDraggable.dragHandleProps}
                            />
                          );
                        case ModuleCompositionItemType.QUESTION:
                          return (
                            <ModulesStudyPlanQuestion
                              key={compositionItem.id}
                              question={compositionItem}
                              snapshotDraggable={snapshotDraggable}
                              innerRef={providedDraggable.innerRef}
                              canDelete={canEditPlan}
                              draggableProps={providedDraggable.draggableProps}
                              dragHandleProps={providedDraggable.dragHandleProps}
                            />
                          );
                        default:
                          return null;
                      }
                    }}
                  </Draggable>
                )
              )}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}
