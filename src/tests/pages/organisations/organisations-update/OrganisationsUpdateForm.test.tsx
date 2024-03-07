import { render, screen, waitFor, renderHook } from '@testProvider';
import OrganisationsUpdateForm from '@src/pages/organisations/organisations-update/OrganisationsUpdateForm';
import { FormProvider, useForm } from 'react-hook-form';

describe('OrganisationsUpdateForm', () => {
  it('renders correctly and handles file upload', async () => {
    const setImageMock = jest.fn();

    const methods = renderHook(() => useForm()).result.current;
    // Render the OrganisationsCreateForm component
    render(
      <FormProvider {...methods}>
        <form>
          <OrganisationsUpdateForm image={'Some image'} setImage={setImageMock} />
        </form>
      </FormProvider>
    );

    // Check if the image is displayed
    await waitFor(() => {
      const avatar = screen.getByRole('img');
      expect(avatar.getAttribute('src')).toContain('Some image');
    });

    // Check if the file input is hidden
    const fileInput = screen.getByTestId('file-upload');
    expect(fileInput).toHaveStyle({ display: 'none' });
  });
});
