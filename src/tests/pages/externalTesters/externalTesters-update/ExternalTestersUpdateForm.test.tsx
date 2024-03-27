import { render, screen, cleanup, renderHook } from '@testProvider';
import ExternalTestersUpdateForm from '@src/pages/externalTesters/externalTesters-update/ExternalTestersUpdateForm';
import { FormProvider, useForm } from 'react-hook-form';

describe('ExternalTestersUpdateForm', () => {
  const methods = renderHook(() => useForm()).result.current;

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders ExternalTestersUpdateForm correctly', () => {
    render(
      <FormProvider {...methods}>
        <form>
          <ExternalTestersUpdateForm />
        </form>
      </FormProvider>
    );

    expect(screen.getAllByText(/Email/i)).toHaveLength(2);
    expect(screen.getAllByText(/Téléphone/i)).toHaveLength(2);
  });

  it('should display a loader if queries are running', () => {
    render(
      <FormProvider {...methods}>
        <form>
          <ExternalTestersUpdateForm />
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

    expect(screen.queryAllByText(/Email/i)).toHaveLength(0);
    expect(screen.getByTestId('profile-skeleton')).toBeInTheDocument();
  });
});
