import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Route, Routes } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import ModulesMediaDetailFooter from '@src/pages/modules/modules-media/ModulesMediaDetailFooter';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ModulesMediaCreateFooter', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly and navigate to profile on click', async () => {
    render(
      <Routes>
        <Route
          path={PATH_MODULES.profile}
          element={
            <ModulesMediaDetailFooter
              onTriggerEdit={jest.fn()}
              isEditing={false}
              onCancelEdit={jest.fn()}
            />
          }
        />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 1 })]
      }
    );

    const cancelButton = screen.getByText(/Retour/i);
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelButton);
    });

    await waitFor(async () => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.profile, { moduleId: 1 })
      );
    });
  });

  it('should trigger edit on click', async () => {
    const triggerEditMock = jest.fn();
    render(
      <Routes>
        <Route
          path={PATH_MODULES.profile}
          element={
            <ModulesMediaDetailFooter
              onTriggerEdit={triggerEditMock}
              isEditing={false}
              onCancelEdit={jest.fn()}
            />
          }
        />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 1 })]
      }
    );

    const editButton = screen.getByText(/Modifier/i);
    expect(editButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(editButton);
    });

    await waitFor(async () => {
      expect(triggerEditMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should display a footer if editing', async () => {
    const cancelMock = jest.fn();
    render(
      <Routes>
        <Route
          path={PATH_MODULES.profile}
          element={
            <ModulesMediaDetailFooter
              onTriggerEdit={jest.fn()}
              isEditing={true}
              onCancelEdit={cancelMock}
            />
          }
        />
      </Routes>,
      {
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 1 })]
      }
    );

    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelButton);
    });

    await waitFor(async () => {
      expect(cancelMock).toHaveBeenCalledTimes(1);
    });
  });
});
