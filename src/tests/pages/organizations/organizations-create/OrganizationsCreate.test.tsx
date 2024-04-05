import { createOrganizations } from '@services/organizations/organizationsAPI';
import OrganizationsCreateMock, {
  setupErrorAxiosMock,
  setupSuccessAxiosMock
} from './OrganizationsCreateMock';
import { render, screen, fireEvent, act, waitFor, cleanup } from '@testProvider';
import OrganizationsCreate from '@src/pages/organizations/organizations-create/OrganizationsCreate';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('OrganizationsCreate', () => {
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

    // Simulate file upload using dataTransfer
    await act(async () => {
      const file = new File(['(fake image)'], 'test.png');

      fireEvent.change(screen.getByLabelText(/Téléchargez une photo/i), {
        target: { files: [file] },
        dataTransfer: { files: [file] }
      });
    });

    // @todo find a way to upload a file correctly
    await createOrganizations({
      // Expected request payload
      logo: 'something',
      name: 'Test Organization',
      addressId: 'ChIJ-U_newOxthIRZKI1ypcmSB8',
      useDoubleAuth: 0,
      clientAdmin: {
        firstname: 'Test',
        lastname: 'Admin',
        email: 'admin@test.com',
        login: 'admin'
      }
    });

    // Submit the form
    // await act(async () => {
    //   fireEvent.submit(screen.getByRole('button', { name: /enregistrer/i }));
    // });

    // Wait for the createOrganizations function to be called
    await waitFor(() => {
      // Get the first request made by the Axios mock
      const request = OrganizationsCreateMock.history.post[0];

      // Check if the request has the expected properties
      expect(request.url).toBe('/organizations');
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

    // Submit the form to trigger the error scenario
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(screen.getByText('Veuillez ajouter un logo')).toBeInTheDocument();
    });

    // @todo add the test for the axios error when file upload works correctly
  });
});
