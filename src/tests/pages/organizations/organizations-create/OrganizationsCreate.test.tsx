import OrganizationsCreateMock, {
  setupErrorAxiosMock,
  setupSuccessAxiosMock
} from './OrganizationsCreateMock';
import { render, screen, fireEvent, act, waitFor, cleanup } from '@testProvider';
import OrganizationsCreate from '@src/pages/organizations/organizations-create/OrganizationsCreate';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

// Mocking form-data to pass images in the form
jest.mock('form-data', () => {
  return function () {
    return {
      append: jest.fn()
    };
  };
});

describe('OrganizationsCreate', () => {
  beforeEach(() => {
    // Clear the Axios mock
    OrganizationsCreateMock.reset();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clear the Axios mock
    OrganizationsCreateMock.reset();
    cleanup();
  });

  it('handles successful form submission', async () => {
    setupSuccessAxiosMock();
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the OrganizationsCreate component
    render(<OrganizationsCreate />);

    await act(async () => {
      // Update the form values
      fireEvent.input(screen.getByLabelText(/Nom \*/i), { target: { value: 'Test Organization' } });
      fireEvent.input(screen.getByLabelText(/Adresse siège social \*/i), {
        target: { value: 'Test Address' }
      });
      fireEvent.input(screen.getAllByLabelText(/Nom admin client \*/i)[0], {
        target: { value: 'Admin' }
      });
      fireEvent.input(screen.getByLabelText(/Prénom admin client \*/i), {
        target: { value: 'Test' }
      });
      fireEvent.input(screen.getByLabelText(/Login \*/i), { target: { value: 'admin' } });
      fireEvent.input(screen.getByLabelText(/Email admin client \*/i), {
        target: { value: 'admin@test.com' }
      });
    });

    // Simulate file upload using dataTransfer
    await act(async () => {
      const file = new File(['(fake image)'], 'test.png');

      fireEvent.change(screen.getByLabelText(/Téléchargez une photo/i), {
        target: { files: [file] },
        dataTransfer: { files: [file] }
      });
    });

    // Submit the form
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    // Wait for the createOrganizations function to be called
    await waitFor(() => {
      // Get the first request made by the Axios mock
      expect(OrganizationsCreateMock.history.post.length).toBe(1);
      expect(OrganizationsCreateMock.history.post[0].url).toBe('/organizations');
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_ORGANIZATIONS.root);
    });
  });

  it('handles form submission error', async () => {
    setupErrorAxiosMock();
    // Render the OrganizationsCreate component
    render(<OrganizationsCreate />);

    // Submit the form to trigger the error scenario
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    expect(OrganizationsCreateMock.history.post.length).toBe(0);

    await act(async () => {
      // Update the form values
      fireEvent.input(screen.getByLabelText(/Nom \*/i), { target: { value: 'Test Organization' } });
      fireEvent.input(screen.getByLabelText(/Adresse siège social \*/i), {
        target: { value: 'Test Address' }
      });
      fireEvent.input(screen.getAllByLabelText(/Nom admin client \*/i)[0], {
        target: { value: 'Admin' }
      });
      fireEvent.input(screen.getByLabelText(/Prénom admin client \*/i), {
        target: { value: 'Test' }
      });
      fireEvent.input(screen.getByLabelText(/Login \*/i), { target: { value: 'admin' } });
      fireEvent.input(screen.getByLabelText(/Email admin client \*/i), {
        target: { value: 'admin@test.com' }
      });
    });

    // Submit the form to trigger the error scenario
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith('Veuillez ajouter un logo', {
        variant: 'error'
      });
    });
  });
});
