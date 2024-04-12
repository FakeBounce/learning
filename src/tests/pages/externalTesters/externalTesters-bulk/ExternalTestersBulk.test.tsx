import { render, screen, fireEvent, act, waitFor, cleanup } from '@testProvider';
import ExternalTestersBulk from '@src/pages/externalTesters/externalTesters-bulk/ExternalTestersBulk';
import ApplicantsBulkMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/applicants/applicants-bulk/ApplicantsBulkMock';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { validRowsForApplicantBulk } from '@src/tests/pages/applicants/DefaultApplicants';

// Mock Pagination as it is not relevant for this test
jest.mock('@src/components/table/Pagination', () => jest.fn());

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe(' ExternalTestersBulk', () => {
  beforeEach(() => {
    // Mock useNavigate
    (navigateMock as jest.Mock).mockReturnValue(jest.fn());

    setupSuccessAxiosMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
    ApplicantsBulkMock.reset();
  });

  it('renders  ExternalTestersBulk correctly', () => {
    render(<ExternalTestersBulk />);

    // Ensure that the "Annuler" button is present
    expect(screen.getByText(/Ajouter des testeurs en masse/i)).toBeInTheDocument();
  });

  it('should redirect if already created', () => {
    render(<ExternalTestersBulk />, {
      preloadedState: {
        applicants: {
          ...initialApplicantState,
          applicantBulk: {
            hasCreatedBulk: true
          }
        }
      }
    });

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_APPLICANTS.root);
    });
  });

  it('send form correctly', async () => {
    render(<ExternalTestersBulk />);

    const csvContent = [
      Object.keys(validRowsForApplicantBulk[0]).join(','), // Header row
      ...validRowsForApplicantBulk.map((obj) =>
        Object.values(obj)
          .map((val) => val as string)
          .join(',')
      ) // Data rows
    ].join('\r\n');

    // Mocking fetch and related functions
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(csvContent)
      })
    ) as any;
    global.URL.createObjectURL = jest.fn(() => 'fake-url');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const file = new File([blob], 'SomeFile.csv', { type: 'text/csv' });

    const input = screen.getByTestId('upload-box-input');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(async () => {
      expect(screen.getByText(validRowsForApplicantBulk[0].email as string)).toBeInTheDocument();
    });

    act(() => {
      expect(screen.getByText(/Enregistrer/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Enregistrer/i));
    });

    await waitFor(async () => {
      expect(ApplicantsBulkMock.history.post.length).toBe(1);
      expect(ApplicantsBulkMock.history.post[0].data).toContain(validRowsForApplicantBulk[0].email);
      expect(ApplicantsBulkMock.history.post[0].data).toContain(validRowsForApplicantBulk[1].email);
      expect(ApplicantsBulkMock.history.post[0].data).toContain(validRowsForApplicantBulk[2].email);
    });
  });

  it('display an error if no file submitted', async () => {
    render(<ExternalTestersBulk />);

    // Mocking fetch and related functions
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('')
      })
    ) as any;
    global.URL.createObjectURL = jest.fn(() => 'fake-url');

    await act(async () => {
      expect(screen.getByText(/Enregistrer/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Enregistrer/i));
    });

    await waitFor(async () => {
      expect(screen.getByText(/Veuillez sélectionner un fichier/i)).toBeInTheDocument();
    });
  });

  it('display an error if all rows of csv are faulty', async () => {
    render(<ExternalTestersBulk />);

    const csvContent = [
      Object.keys(validRowsForApplicantBulk[0]).join(','), // Header row
      ...validRowsForApplicantBulk.map((obj) =>
        Object.values(obj)
          .map((val) => `"${val}"`)
          .join(',')
      ) // Data rows
    ].join('\r\n');

    // Mocking fetch and related functions
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(csvContent)
      })
    ) as any;
    global.URL.createObjectURL = jest.fn(() => 'fake-url');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const file = new File([blob], 'SomeFile.csv', { type: 'text/csv' });

    const input = screen.getByTestId('upload-box-input');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(async () => {
      expect(screen.getByText(/Liste des testeurs invalides/i)).toBeInTheDocument();
    });

    act(() => {
      expect(screen.getByText(/Enregistrer/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Enregistrer/i));
    });

    await waitFor(async () => {
      expect(screen.getByText(/Aucun testeur valide à ajouter/i)).toBeInTheDocument();
    });
  });

  it('remove the file on removeFile call', async () => {
    render(<ExternalTestersBulk />);

    const csvContent = [
      Object.keys(validRowsForApplicantBulk[0]).join(','), // Header row
      ...validRowsForApplicantBulk.map((obj) =>
        Object.values(obj)
          .map((val) => `"${val}"`)
          .join(',')
      ) // Data rows
    ].join('\r\n');

    // Mocking fetch and related functions
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(csvContent)
      })
    ) as any;
    global.URL.createObjectURL = jest.fn(() => 'fake-url');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const file = new File([blob], 'SomeFile.csv', { type: 'text/csv' });

    const input = screen.getByTestId('upload-box-input');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(async () => {
      expect(screen.getByText(/SomeFile.csv/i)).toBeInTheDocument();
    });

    await act(async () => {
      const removeButton = screen.getByTestId('upload-box-delete');
      expect(removeButton).toBeInTheDocument();
      fireEvent.click(removeButton);
    });

    await waitFor(async () => {
      expect(screen.queryByText(/SomeFile.csv/i)).not.toBeInTheDocument();
    });
  });
});
