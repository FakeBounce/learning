import { render, screen, fireEvent, act, renderHook, waitFor } from '@testProvider';
import OrganizationsCreateForm from '@src/pages/organizations/organizations-create/OrganizationsCreateForm';
import { FormProvider, useForm } from 'react-hook-form';

describe('OrganizationsCreateForm', () => {
  it('renders OrganizationsCreateForm correctly', () => {
    // Mock setImage function
    const setImageMock = jest.fn();

    const methods = renderHook(() => useForm()).result.current;
    // Render the OrganizationsCreateForm component
    render(
      <FormProvider {...methods}>
        <form>
          <OrganizationsCreateForm setImage={setImageMock} />
        </form>
      </FormProvider>
    );

    // Ensure that the form elements are present
    const nameInput = screen.getByLabelText(/Nom \*/i);
    const addressInput = screen.getByLabelText(/Adresse siège social \*/i);
    // Ensure that the last name and first name fields are present
    const adminLastNameInput = screen.getAllByLabelText(/Nom admin client \*/i)[0];
    const adminFirstNameInput = screen.getByLabelText(/Prénom admin client \*/i);
    const loginInput = screen.getByLabelText(/Login \*/i);
    const adminEmailInput = screen.getByLabelText(/Email admin client \*/i);

    expect(nameInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(adminLastNameInput).toBeInTheDocument();
    expect(adminFirstNameInput).toBeInTheDocument();
    expect(loginInput).toBeInTheDocument();
    expect(adminEmailInput).toBeInTheDocument();

    // Ensure that the text 'Téléchargez une photo' is present initially
    const uploadText = screen.queryByText(/Téléchargez une photo/i);
    expect(uploadText).toBeInTheDocument();
  });

  it('handles file upload and calls setImage correctly', async () => {
    // Mock setImage function
    const setImageMock = jest.fn();

    const methods = renderHook(() => useForm()).result.current;
    // Render the OrganizationsCreateForm component
    render(
      <FormProvider {...methods}>
        <form>
          <OrganizationsCreateForm setImage={setImageMock} />
        </form>
      </FormProvider>
    );

    // Ensure that the file input is present and hidden
    const fileInput = screen.getByLabelText(/Téléchargez une photo/i);
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).not.toBeVisible();

    // Mock file for testing
    const file = new File(['(fake image)'], 'test-image.png', { type: 'image/png' });

    // Simulate file upload using dataTransfer
    await act(async () => {
      fireEvent.change(fileInput, {
        target: { files: [file] },
        dataTransfer: { files: [file] }
      });
    });

    // Check if setImage has been called with the correct file
    expect(setImageMock).toHaveBeenCalledWith(file);

    // Ensure that the file input is empty after upload
    await waitFor(() => {
      expect(screen.queryByText(/Téléchargez une photo/i)).toBeNull();
    });

    // Check if the file input contains the uploaded file
    const avatar = screen.getByRole('img');
    expect(avatar.getAttribute('src')).toContain('data:image/png;base64');
  });
});
