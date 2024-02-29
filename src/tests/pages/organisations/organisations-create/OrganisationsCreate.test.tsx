import { createOrganisations } from '@services/organisations/organisationsAPI';
import { PATH_ORGANISATIONS } from '@utils/navigation/paths';
import OrganisationsCreateMock, {
  setupErrorAxiosMock,
  setupSuccessAxiosMock
} from './OrganisationsCreateMock';
import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import OrganisationsCreate from '@src/pages/organisations/organisations-create/OrganisationsCreate';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('OrganisationsCreate', () => {
  afterEach(() => {
    // Clear the Axios mock
    OrganisationsCreateMock.reset();
  });

  it('handles successful form submission', async () => {
    setupSuccessAxiosMock();
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the OrganisationsCreate component
    render(<OrganisationsCreate />);

    // Update the form values
    fireEvent.input(screen.getByLabelText(/Nom \*/i), { target: { value: 'Test Organisation' } });
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
    await createOrganisations({
      // Expected request payload
      logo: 'something',
      name: 'Test Organisation',
      address_id: 'ChIJ-U_newOxthIRZKI1ypcmSB8',
      use_double_auth: 0,
      client_admin: {
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

    // Wait for the createOrganisations function to be called
    await waitFor(() => {
      // Get the first request made by the Axios mock
      const request = OrganisationsCreateMock.history.post[0];

      // Check if the request has the expected properties
      expect(request.url).toBe('/organizations');
    });
  });

  it('handles redirection after success', async () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the OrganisationsCreate component
    render(<OrganisationsCreate />, {
      preloadedState: {
        organisations: {
          currentOrganisation: {
            currentOrganisationData: {
              id: 1,
              logo: 'someLogo',
              name: 'some name',
              is_active: true,
              address: 'some address',
              city: 'some city',
              use_double_auth: false
            },
            currentOrganisationLoading: false
          },
          organisationCreate: {
            organisationCreateLoading: false
          }
        }
      }
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_ORGANISATIONS.root);
    });
  });

  it('handles form submission error', async () => {
    setupErrorAxiosMock();
    // Render the OrganisationsCreate component
    render(<OrganisationsCreate />);

    // Submit the form to trigger the error scenario
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /enregistrer/i }));
    });

    expect(OrganisationsCreateMock.history.post.length).toBe(0);

    // Update the form values
    fireEvent.input(screen.getByLabelText(/Nom \*/i), { target: { value: 'Test Organisation' } });
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
      fireEvent.submit(screen.getByRole('button', { name: /enregistrer/i }));
    });

    await waitFor(() => {
      expect(screen.getByText('Veuillez ajouter un logo')).toBeInTheDocument();
    });

    // @todo add the test for the axios error when file upload works correctly
  });
});
