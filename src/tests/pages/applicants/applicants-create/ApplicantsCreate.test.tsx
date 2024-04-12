import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import ApplicantsCreate from '@src/pages/applicants/applicants-create/ApplicantsCreate';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import ApplicantsCreateMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/applicants/applicants-create/ApplicantsCreateMock';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

// Mock the fileValidator function
jest.mock('@utils/helpers/validators', () => ({
  verifyFileForUpload: () => jest.fn().mockResolvedValue(true)
}));

describe('ApplicantsCreate', () => {
  afterEach(() => {
    jest.clearAllMocks();
    ApplicantsCreateMock.reset();
    cleanup();
  });

  it('renders ApplicantsCreate correctly', () => {
    render(<ApplicantsCreate />);

    expect(screen.getByText('Ajouter un étudiant')).toBeInTheDocument();
    expect(screen.getByText('Enregistrer')).toBeInTheDocument();
    expect(screen.getByText('Téléchargez une photo')).toBeInTheDocument();
  });

  it('submit form correctly', async () => {
    setupSuccessAxiosMock();

    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<ApplicantsCreate />, {
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
      fireEvent.change(screen.getByLabelText(/Date de naissance/i), {
        target: { value: '01/01/1990' }
      });
    });

    const fileInput = screen.getByTestId('file-upload');
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Enregistrer'));
    });

    await waitFor(() => {
      expect(ApplicantsCreateMock.history.post).toHaveLength(1);
      expect(ApplicantsCreateMock.history.post[0].url).toBe(PATH_APPLICANTS.root);
    });

    await waitFor(() => {
      expect(screen.getByText(/L'étudiant à bien été enregistré/i)).toBeInTheDocument();
      expect(navigateMock).toHaveBeenCalledWith(PATH_APPLICANTS.root);
    });
  });
});
