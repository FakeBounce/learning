import { render, screen, fireEvent, act, waitFor, cleanup } from '@testProvider';
import UsersBulk from '@src/pages/users/users-bulk/UsersBulk';
import { faultyRowsForUsersBulk, validRowsForUsersBulk } from '@src/tests/pages/users/DefaultUsers';
import UsersBulkMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/users/users-bulk/UsersBulkMock';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('UsersBulk', () => {
  beforeEach(() => {
    // Mock useNavigate
    (navigateMock as jest.Mock).mockReturnValue(jest.fn());

    setupSuccessAxiosMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
    UsersBulkMock.reset();
  });

  it('renders UsersBulk correctly', () => {
    render(<UsersBulk />);

    // Ensure that the "Annuler" button is present
    expect(screen.getByText(/Ajouter des utilisateurs en masse/i)).toBeInTheDocument();
  });

  it('send form correctly', async () => {
    render(<UsersBulk />);

    const csvContent = [
      Object.keys(validRowsForUsersBulk[0]).join(','), // Header row
      ...validRowsForUsersBulk.map((obj) =>
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
      expect(screen.getByText(validRowsForUsersBulk[0].email as string)).toBeInTheDocument();
    });

    act(() => {
      expect(screen.getByText(/Enregistrer/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Enregistrer/i));
    });

    await waitFor(async () => {
      expect(UsersBulkMock.history.post.length).toBe(1);
      expect(UsersBulkMock.history.post[0].data).toContain(validRowsForUsersBulk[0].email);
      expect(UsersBulkMock.history.post[0].data).toContain(validRowsForUsersBulk[1].email);
      expect(UsersBulkMock.history.post[0].data).toContain(validRowsForUsersBulk[2].email);
    });
  });

  it('display an error if no file submitted', async () => {
    render(<UsersBulk />);

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
    render(<UsersBulk />);

    const csvContent = [
      Object.keys(faultyRowsForUsersBulk[0]).join(','), // Header row
      ...faultyRowsForUsersBulk.map((obj) =>
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

    await act(async () => {
      const input = screen.getByTestId('upload-box-input');
      fireEvent.change(input, { target: { files: [file] } });
    });

    await waitFor(async () => {
      expect(screen.getByText(/Liste des utilisateurs invalides/i)).toBeInTheDocument();
      expect(screen.getByText(/Enregistrer/i)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Enregistrer/i));
    });

    await waitFor(async () => {
      expect(screen.getByText(/Aucun utilisateur valide à ajouter/i)).toBeInTheDocument();
    });
  });

  it('remove the file on removeFile call', async () => {
    render(<UsersBulk />);

    const csvContent = [
      Object.keys(validRowsForUsersBulk[0]).join(','), // Header row
      ...validRowsForUsersBulk.map((obj) =>
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

    await act(async () => {
      const input = screen.getByTestId('upload-box-input');
      fireEvent.change(input, { target: { files: [file] } });
    });

    await waitFor(async () => {
      expect(screen.getByText(/SomeFile.csv/i)).toBeInTheDocument();
    });

    const removeButton = screen.getByTestId('upload-box-delete');
    expect(removeButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(removeButton);
    });

    await waitFor(async () => {
      expect(screen.queryByText(/SomeFile.csv/i)).not.toBeInTheDocument();
    });
  });
});
