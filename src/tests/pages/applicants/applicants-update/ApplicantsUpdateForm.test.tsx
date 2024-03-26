import { render, screen, waitFor, cleanup, renderHook } from '@testProvider';
import ApplicantsUpdateForm from '@src/pages/applicants/applicants-update/ApplicantsUpdateForm';
import { FormProvider, useForm } from 'react-hook-form';

describe('ApplicantsUpdateForm', () => {
  const setImageMock = jest.fn();
  const methods = renderHook(() => useForm()).result.current;

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders ApplicantsUpdateForm correctly', () => {
    render(
      <FormProvider {...methods}>
        <form>
          <ApplicantsUpdateForm image={''} setImage={setImageMock} />
        </form>
      </FormProvider>
    );

    expect(screen.getByText(/Notifications app/i)).toBeInTheDocument();
    expect(screen.getByText(/Notifications SMS/i)).toBeInTheDocument();
    expect(screen.getByText(/Notifications email/i)).toBeInTheDocument();
  });

  it('should have the correct image', () => {
    render(
      <FormProvider {...methods}>
        <form>
          <ApplicantsUpdateForm image={'SomeImage'} setImage={setImageMock} />
        </form>
      </FormProvider>
    );

    // Check if the image is displayed
    waitFor(() => {
      const avatar = screen.getByRole('img');
      expect(avatar.getAttribute('src')).toContain('SomeImage');
    });
  });

  it('should display a loader if queries are running', () => {
    render(
      <FormProvider {...methods}>
        <form>
          <ApplicantsUpdateForm image={'SomeImage'} setImage={setImageMock} />
        </form>
      </FormProvider>,
      {
        preloadedState: {
          applicants: {
            applicantProfile: {
              applicantProfileLoading: true
            }
          }
        }
      }
    );

    expect(screen.queryByText(/Notifications app/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('profile-skeleton')).toBeInTheDocument();
  });
});
