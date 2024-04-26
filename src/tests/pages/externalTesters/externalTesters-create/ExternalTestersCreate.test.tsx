import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import ExternalTestersCreate from '@src/pages/externalTesters/externalTesters-create/ExternalTestersCreate';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import ExternalTestersCreateMock, { setupSuccessAxiosMock } from './ExternalTestersCreateMock';
import { PATH_APPLICANTS, PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ExternalTestersCreate', () => {
  afterEach(() => {
    jest.clearAllMocks();
    ExternalTestersCreateMock.reset();
    cleanup();
  });

  it('renders ApplicantsCreate correctly', () => {
    render(<ExternalTestersCreate />);

    expect(screen.getByText('Ajouter un testeur')).toBeInTheDocument();
    expect(screen.getByText('Enregistrer')).toBeInTheDocument();
  });

  it('submit form correctly', async () => {
    setupSuccessAxiosMock();

    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<ExternalTestersCreate />, {
      preloadedState: {
        applicants: {
          ...initialApplicantState,
          applicantCreate: {
            applicantCreateLoading: false
          }
        }
      }
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Prénom/i), { target: { value: 'John' } });
      fireEvent.change(screen.getAllByLabelText(/Nom/i)[0], { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@doe.com' } });
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Enregistrer'));
    });

    await waitFor(() => {
      expect(ExternalTestersCreateMock.history.post).toHaveLength(1);
      expect(ExternalTestersCreateMock.history.post[0].url).toBe(PATH_APPLICANTS.root);
    });

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('Le testeur à bien été enregistré', {
        variant: 'success'
      });
      expect(navigateMock).toHaveBeenCalledWith(PATH_EXTERNAL_TESTERS.root);
    });
  });
});
