import { render, screen, waitFor, renderHook } from '@testProvider';
import OrganizationsUpdateForm from '@src/pages/organizations/organizations-update/OrganizationsUpdateForm';
import { FormProvider, useForm } from 'react-hook-form';

describe('OrganizationsUpdateForm', () => {
  it('renders correctly and handles file upload', async () => {
    const setImageMock = jest.fn();

    const methods = renderHook(() => useForm()).result.current;
    // Render the OrganizationsCreateForm component
    render(
      <FormProvider {...methods}>
        <form>
          <OrganizationsUpdateForm image={'Some image'} setImage={setImageMock} />
        </form>
      </FormProvider>,
      {
        preloadedState: {
          organizations: {
            currentOrganization: {
              currentOrganizationData: {
                id: 1,
                name: 'Organization name',
                email: ''
              }
            }
          }
        }
      }
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
