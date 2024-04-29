import { render, screen, fireEvent, act, renderHook, waitFor } from '@testProvider';
import ModulesCreate from '@src/pages/modules/modules-create/ModulesCreate';
import { useNavigate } from 'react-router-dom';
import { PATH_MODULES } from '@utils/navigation/paths';
import modulesCreateMock, {
  modulesCreateSetupErrorAxiosMock,
  modulesCreateSetupSuccessAxiosMock
} from '@src/tests/pages/modules/modules-create/ModulesCreateMock';
import { ModuleDisplayAnswers } from '@services/modules/interfaces';
import { enqueueSnackbar } from 'notistack';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));
const navigateMock = jest.fn().mockResolvedValueOnce({});

describe('ModulesCreate', () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'dummy-preview-url');
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    modulesCreateMock.reset();
    jest.clearAllMocks();
  });

  it('renders ModulesCreate correctly', async () => {
    await act(async () => {
      render(<ModulesCreate />);
    });

    expect(screen.getByLabelText(/Affichage des réponses/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Recommencer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  it('should return to modules if click on cancel', async () => {
    await act(async () => {
      render(<ModulesCreate />);
    });

    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    expect(navigateMock).toHaveBeenCalledWith(PATH_MODULES.root);
  });

  it('send the form correctly', async () => {
    modulesCreateSetupSuccessAxiosMock();
    await act(async () => {
      render(<ModulesCreate />);
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Nom du module/i), {
        target: { value: 'Module test' }
      });
      fireEvent.change(screen.getByLabelText(/Description/i), {
        target: { value: 'Description test' }
      });
      fireEvent.change(screen.getByLabelText(/Recommencer/i), { target: { value: 2 } });
      fireEvent.change(screen.getByLabelText(/Affichage des réponses/i), {
        target: { value: ModuleDisplayAnswers.AFTER_QUESTION }
      });
    });

    const submitButton = screen.getByText(/Enregistrer/i);
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(modulesCreateMock.history.post.length).toBe(1);
  });

  it('should display an error if something is wrong', async () => {
    modulesCreateSetupErrorAxiosMock();
    await act(async () => {
      render(<ModulesCreate />);
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Nom du module/i), {
        target: { value: 'Module test' }
      });
      fireEvent.change(screen.getByLabelText(/Description/i), {
        target: { value: 'Description test' }
      });
      fireEvent.change(screen.getByLabelText(/Recommencer/i), { target: { value: 2 } });
      fireEvent.change(screen.getByLabelText(/Affichage des réponses/i), {
        target: { value: ModuleDisplayAnswers.AFTER_QUESTION }
      });
    });

    const submitButton = screen.getByText(/Enregistrer/i);
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(modulesCreateMock.history.post.length).toBe(1);
    expect(enqueueSnackbar).toHaveBeenCalledWith(
      'Une erreur est survenue lors de la création du module',
      { variant: 'error' }
    );
  });
});
