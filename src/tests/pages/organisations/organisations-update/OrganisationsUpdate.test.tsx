import { setupSuccessAxiosMock } from '@src/tests/pages/organisations/organisations-update/OrganisationsUpdateMock';
import { render, screen, fireEvent, waitFor, act } from '@testProvider';
import OrganisationsUpdate from '@src/pages/organisations/organisations-update/OrganisationsUpdate';
import { updateOrganisations, getSingleOrganisation } from '@redux/reducers/organisationsReducer';
import { PATH_PARAMETERS } from '@utils/navigation/paths';

describe('OrganisationsUpdate', () => {
  it('renders correctly and handles form submission', async () => {
    setupSuccessAxiosMock();

    render(<OrganisationsUpdate />, {
      preloadedState: {
        organisations: {
          organisationUpdate: {
            organisationUpdateLoading: false
          },
          currentOrganisation: {
            currentOrganisationData: null,
            currentOrganisationLoading: false
          }
        }
      },
      customHistory: [`/${PATH_PARAMETERS.organisations}/update/1`]
    });

    // Check if the "Modifier une organisation" header is rendered
    expect(screen.getByText(/Modifier une organisation/i)).toBeInTheDocument();

    // @Todo : finish test
    // await waitFor(() => {
    //   act(() => {
    //     // Check if the form is rendered with preloaded data
    //     expect(screen.getByLabelText(/Nom \*/i)).toHaveValue('Test Organisation');
    //     expect(screen.getByLabelText(/Adresse siège social \*/i)).toHaveValue('Test Address');
    //   });
    // });


    // // Simulate form submission
    // fireEvent.submit(screen.getByRole('button', { name: /enregistrer/i }));
    //
    // // Wait for form submission to complete
    // await waitFor(() => {
    //   // Check if updateOrganisations and getSingleOrganisation were called with the expected arguments
    //   expect(updateOrganisations).toHaveBeenCalledWith({
    //     id: 1,
    //     name: 'Test Organisation',
    //     address_id: 'ChIJ-U_newOxthIRZKI1ypcmSB8',
    //     logo: 'https://via.placeholder.com/150'
    //   });
    //   expect(getSingleOrganisation).toHaveBeenCalledWith(1);
    // });
    //
    // // Check if the "Annuler" button triggers navigation to the correct path
    // fireEvent.click(screen.getByText(/Annuler/i));
    // // expect(dispatchMock).toHaveBeenCalledWith('/path/to/organisations/root');
  });


  //
  // it('renders correctly with no data and handles form submission with no changes', async () => {
  //   render(<OrganisationsUpdate />);
  //
  //   // Check if the form is rendered with default values
  //   expect(screen.getByLabelText(/Nom \*/i)).toHaveValue('');
  //   expect(screen.getByLabelText(/Adresse siège social \*/i)).toHaveValue('');
  //
  //   // Simulate form submission
  //   fireEvent.submit(screen.getByRole('button', { name: /enregistrer/i }));
  //
  //   // Wait for form submission to complete
  //   await waitFor(() => {
  //     // Check if enqueueSnackbar was called with the expected warning message
  //     expect(screen.getByText("Aucune modification n'a été effectuée")).toBeInTheDocument();
  //   });
  // });
});
