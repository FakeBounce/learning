import { useAppDispatch } from '@redux/hooks';
import Box from '@mui/material/Box';
import { enqueueSnackbar } from 'notistack';
import { resetModuleLoading } from '@redux/reducers/modulesReducer';
import { moveMediaAction } from '@redux/actions/modulesActions';
import {
  ModuleCompositionItem,
  ModuleCompositionItemNested,
  ModuleCompositionItemType
} from '@services/modules/interfaces';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult
} from '@hello-pangea/dnd';
import ModulesStudyPlanMedia from '@src/pages/modules/modules-study-plan/ModulesStudyPlanMedia';
import { useEffect, useState } from 'react';
import { reorder } from '@utils/helpers/sorters';
import { t } from '@lingui/macro';

interface ModulesStudyPlanSubjectContentProps {
  subject: ModuleCompositionItem;
  canEdit?: boolean;
  isDragged?: boolean;
}

export default function ModulesStudyPlanSubjectContent({
  subject,
  canEdit = false,
  isDragged = false
}: ModulesStudyPlanSubjectContentProps) {
  const [subjectComposition, setSubjectComposition] = useState<ModuleCompositionItemNested[]>(
    subject.composition
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSubjectComposition(subject.composition);
  }, [subject]);

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

    const items: ModuleCompositionItemNested[] = reorder(
      subjectComposition,
      result.source.index,
      result.destination.index
    );
    setSubjectComposition(items as ModuleCompositionItemNested[]);
    handleMoveItem(itemId, itemType, result.destination.index);
  };

  const handleMoveItem = async (
    itemId: number,
    itemType: ModuleCompositionItemType,
    newPosition: number
  ) => {
    try {
      if (itemType === ModuleCompositionItemType.MEDIA) {
        await dispatch(moveMediaAction({ mediaId: itemId, position: newPosition }));
        return;
      }
      throw t`Une erreur est survenue lors du déplacement du sujet`;
    } catch (error) {
      setSubjectComposition(subject ? subject.composition : []);
      enqueueSnackbar(error as string, { variant: 'error' });
      dispatch(resetModuleLoading());
    }
  };

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`subject-${subject.id}-droppable`}>
          {(provided: DroppableProvided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              display="flex"
              flex={1}
              flexDirection="column"
              pl={2}
              bgcolor={(theme) => (isDragged ? theme.palette.primary.lighter : 'transparent')}
            >
              {subjectComposition.map(
                (compositionItemNested: ModuleCompositionItemNested, index) => (
                  <Draggable
                    key={`backline-${compositionItemNested.type}-${compositionItemNested.id}`}
                    draggableId={`backline-${compositionItemNested.type}-${compositionItemNested.id}`}
                    index={index}
                    isDragDisabled={!canEdit}
                  >
                    {(providedDraggable, snapshotDraggable) => {
                      switch (compositionItemNested.type) {
                        case ModuleCompositionItemType.MEDIA:
                          return (
                            <ModulesStudyPlanMedia
                              key={compositionItemNested.id}
                              media={compositionItemNested}
                              snapshotDraggable={snapshotDraggable}
                              innerRef={providedDraggable.innerRef}
                              canDelete={canEdit}
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
