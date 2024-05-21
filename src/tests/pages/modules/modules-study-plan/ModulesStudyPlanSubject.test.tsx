import { render, screen, waitFor, cleanup, fireEvent, act } from '@testProvider';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import { defaultCompositionItem } from '@src/tests/pages/modules/defaultModule';
import ModulesStudyPlanSubject from '@src/pages/modules/modules-study-plan/ModulesStudyPlanSubject';
import modulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import { DraggableStateSnapshot } from '@hello-pangea/dnd';

describe('ModulesStudyPlanSubject', () => {
  beforeEach(() => {
    modulesSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    modulesMock.reset();
    jest.clearAllMocks();
  });

  it('should render ModulesStudyPlanSubject correctly', async () => {
    render(
      <ModulesStudyPlanSubject
        subject={defaultCompositionItem}
        snapshotDraggable={
          {
            isDragging: false,
            draggingOver: null
          } as DraggableStateSnapshot
        }
        innerRef={() => {}}
        draggableProps={{} as any}
        canEdit={false}
        dragHandleProps={{} as any}
      />,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesLoading: false
          }
        }
      }
    );

    await waitFor(() => {
      expect(screen.getByText(defaultCompositionItem.name)).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  it('should have delete button disabled if loading', async () => {
    render(
      <ModulesStudyPlanSubject
        subject={defaultCompositionItem}
        snapshotDraggable={
          {
            isDragging: false,
            draggingOver: null
          } as DraggableStateSnapshot
        }
        innerRef={() => {}}
        draggableProps={{} as any}
        canEdit={true}
        dragHandleProps={{} as any}
      />,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesLoading: true
          }
        }
      }
    );

    await waitFor(() => {
      expect(screen.getByText(defaultCompositionItem.name)).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  it('should call delete if called', async () => {
    render(
      <ModulesStudyPlanSubject
        subject={defaultCompositionItem}
        snapshotDraggable={
          {
            isDragging: false,
            draggingOver: null
          } as DraggableStateSnapshot
        }
        innerRef={() => {}}
        draggableProps={{} as any}
        canEdit={true}
        dragHandleProps={{} as any}
      />
    );

    const deleteButton = screen.getByRole('button');
    await waitFor(() => {
      expect(deleteButton).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(modulesMock.history.delete).toHaveLength(1);
      expect(modulesMock.history.delete[0].url).toBe(`/subjects/${defaultCompositionItem.id}`);
    });
  });
});
