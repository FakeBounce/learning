import { render, screen, waitFor, act, fireEvent, cleanup } from '@testProvider';
import {
  defaultMediaAudio,
  defaultMediaDocument,
  defaultMediaImage,
  defaultMediaVideo
} from '@src/tests/pages/modules/defaultModule';
import { generatePath, useNavigate } from 'react-router-dom';
import ModulesStudyPlanMedia from '@src/pages/modules/modules-study-plan/ModulesStudyPlanMedia';
import { Route, Routes } from 'react-router';
import { PATH_MODULES } from '@utils/navigation/paths';
import ModulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ModulesStudyPlanMedia', () => {
  const navigateMock = jest.fn().mockResolvedValueOnce({});

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    modulesSetupSuccessAxiosMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
    ModulesMock.reset();
  });

  it('should render ModulesStudyPlanMedia correctly', async () => {
    render(
      <Routes>
        <Route
          path={PATH_MODULES.profile}
          element={
            <ModulesStudyPlanMedia
              media={defaultMediaImage}
              snapshotDraggable={{ isDragging: false } as any}
              innerRef={() => {}}
              canDelete={false}
              draggableProps={{} as any}
              dragHandleProps={{} as any}
            />
          }
        />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 1 })]
      }
    );

    await waitFor(() => {
      expect(screen.getByText(defaultMediaImage.name)).toBeInTheDocument();

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  it('should call delete of the media', async () => {
    render(
      <Routes>
        <Route
          path={PATH_MODULES.profile}
          element={
            <ModulesStudyPlanMedia
              media={defaultMediaImage}
              snapshotDraggable={{ isDragging: false } as any}
              innerRef={() => {}}
              canDelete={true}
              draggableProps={{} as any}
              dragHandleProps={{} as any}
            />
          }
        />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 1 })]
      }
    );

    await waitFor(() => {
      expect(screen.getByText(defaultMediaImage.name)).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      expect(ModulesMock.history.delete).toHaveLength(1);
      expect(ModulesMock.history.delete[0].url).toBe(`/media/${defaultMediaImage.id}`);
    });
  });

  it('should call navigate to detail of the media (image)', async () => {
    render(
      <Routes>
        <Route
          path={PATH_MODULES.profile}
          element={
            <ModulesStudyPlanMedia
              media={defaultMediaImage}
              snapshotDraggable={{ isDragging: false } as any}
              innerRef={() => {}}
              canDelete={false}
              draggableProps={{} as any}
              dragHandleProps={{} as any}
            />
          }
        />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 1 })]
      }
    );

    await waitFor(() => {
      expect(screen.getByText(defaultMediaImage.name)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText(defaultMediaImage.name));
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.imageDetail, { moduleId: 1, imageId: defaultMediaImage.id })
      );
    });
  });

  it('should call navigate to detail of the media (video)', async () => {
    render(
      <Routes>
        <Route
          path={PATH_MODULES.profile}
          element={
            <ModulesStudyPlanMedia
              media={defaultMediaVideo}
              snapshotDraggable={{ isDragging: false } as any}
              innerRef={() => {}}
              canDelete={false}
              draggableProps={{} as any}
              dragHandleProps={{} as any}
            />
          }
        />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 1 })]
      }
    );

    await waitFor(() => {
      expect(screen.getByText(defaultMediaVideo.name)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText(defaultMediaVideo.name));
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.videoDetail, { moduleId: 1, videoId: defaultMediaVideo.id })
      );
    });
  });

  it('should call navigate to detail of the media (audio)', async () => {
    render(
      <Routes>
        <Route
          path={PATH_MODULES.profile}
          element={
            <ModulesStudyPlanMedia
              media={defaultMediaAudio}
              snapshotDraggable={{ isDragging: false } as any}
              innerRef={() => {}}
              canDelete={false}
              draggableProps={{} as any}
              dragHandleProps={{} as any}
            />
          }
        />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 1 })]
      }
    );

    await waitFor(() => {
      expect(screen.getByText(defaultMediaAudio.name)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText(defaultMediaAudio.name));
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.audioDetail, { moduleId: 1, audioId: defaultMediaAudio.id })
      );
    });
  });

  it('should call navigate to detail of the media (document)', async () => {
    render(
      <Routes>
        <Route
          path={PATH_MODULES.profile}
          element={
            <ModulesStudyPlanMedia
              media={defaultMediaDocument}
              snapshotDraggable={{ isDragging: false } as any}
              innerRef={() => {}}
              canDelete={false}
              draggableProps={{} as any}
              dragHandleProps={{} as any}
            />
          }
        />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 1 })]
      }
    );

    await waitFor(() => {
      expect(screen.getByText(defaultMediaDocument.name)).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText(defaultMediaDocument.name));
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.documentDetail, {
          moduleId: 1,
          documentId: defaultMediaDocument.id
        })
      );
    });
  });
});
