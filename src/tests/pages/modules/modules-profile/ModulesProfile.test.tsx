import { render, screen, waitFor, act, fireEvent, cleanup } from '@testProvider';
import { initialModulesState } from '@redux/reducers/modulesReducer';
import { defaultModule } from '@src/tests/pages/modules/defaultModule';
import ModulesProfile from '@src/pages/modules/modules-profile/ModulesProfile';
import ModulesMock, { modulesSetupSuccessAxiosMock } from '@src/tests/pages/modules/ModulesMock';
import { PATH_ERRORS, PATH_MODULES } from '@utils/navigation/paths';
import { Routes, Route } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ModulesProfile', () => {
  beforeEach(() => {
    modulesSetupSuccessAxiosMock();
  });

  afterEach(() => {
    ModulesMock.reset();
    cleanup();
  });

  it('should render ModulesProfile correctly', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.profile} element={<ModulesProfile />} />
      </Routes>,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesCurrent: {
              modulesCurrentData: null
            }
          }
        },
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: defaultModule.id })]
      }
    );

    await waitFor(() => {
      expect(screen.getByText(defaultModule.title)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Nom du module/i)).toBeDisabled();
  });

  it('should navigate if id is weird', async () => {
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <Routes>
        <Route path={PATH_MODULES.profile} element={<ModulesProfile />} />
      </Routes>,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesCurrent: {
              modulesCurrentData: null
            }
          }
        },
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 'weird-id' })]
      }
    );

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith("Le module n'existe pas", { variant: 'error' });
      expect(navigateMock).toHaveBeenCalledWith(PATH_ERRORS.root);
    });
  });

  it('should update after saving modifications', async () => {
    render(
      <Routes>
        <Route path={PATH_MODULES.profile} element={<ModulesProfile />} />
      </Routes>,
      {
        preloadedState: {
          modules: {
            ...initialModulesState,
            modulesCurrent: {
              modulesCurrentData: null
            }
          }
        },
        customHistory: [generatePath(PATH_MODULES.profile, { moduleId: defaultModule.id })]
      }
    );

    await waitFor(async () => {
      expect(screen.getByText(defaultModule.title)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Nom du module/i)).toBeDisabled();

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /Modifier/i }));
    });

    expect(screen.getByLabelText(/Nom du module/i)).not.toBeDisabled();

    act(() => {
      fireEvent.change(screen.getByLabelText(/Nom du module/i), { target: { value: 'New title' } });
      fireEvent.click(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(ModulesMock.history.put.length).toBe(1);
      expect(ModulesMock.history.put[0].data).toBe(JSON.stringify({ title: 'New title' }));
    });
  });
});
