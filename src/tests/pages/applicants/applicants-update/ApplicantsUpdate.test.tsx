import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import ApplicantsUpdate from '@src/pages/applicants/applicants-update/ApplicantsUpdate';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { Route, Routes } from 'react-router';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { singleApplicant } from '@src/tests/pages/applicants/DefaultApplicants';
import ApplicantsUpdateMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/applicants/applicants-update/ApplicantsUpdateMock';
import { cleanup } from '@testing-library/react';

const applicantUpdateTestConfig = {
  preloadedState: {
    applicants: {
      ...initialApplicantState,
      applicantUpdate: {
        isEditing: true,
        applicantUpdateLoading: false
      }
    }
  },
  customHistory: [PATH_APPLICANTS.profile.replace(':applicantId', String(singleApplicant.id))]
};

describe('ApplicantsUpdate', () => {
  beforeEach(() => {
    setupSuccessAxiosMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
    ApplicantsUpdateMock.reset();
    cleanup();
  });

  it('renders ApplicantsUpdate correctly', async () => {
    await act(() => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsUpdate />} />
        </Routes>,
        applicantUpdateTestConfig
      );
    });

    await act(() => {
      waitFor(() => {
        expect(screen.getByLabelText(/Prénom/i)).toHaveValue(
          singleApplicant.current_values.firstname
        );
        expect(screen.getByLabelText(/Email/i)).toHaveValue(singleApplicant.email);
      });
    });
  });

  it('should display a message if submitting without changes', async () => {
    await act(() => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsUpdate />} />
        </Routes>,
        applicantUpdateTestConfig
      );
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(
        singleApplicant.current_values.firstname
      );
    });

    await act(async () => {
      await waitFor(async () => {
        fireEvent.submit(screen.getByRole('submit'));
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/Aucune modification n'a été effectuée/i)).toBeInTheDocument();
    });
  });

  it('should call the correct api with only updated fields', async () => {
    await act(() => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsUpdate />} />
        </Routes>,
        applicantUpdateTestConfig
      );
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(
        singleApplicant.current_values.firstname
      );
    });

    // Update the firstname
    const firstnameInput = screen.getByLabelText(/Prénom/i);
    fireEvent.change(firstnameInput, { target: { value: 'UpdatedFirstname' } });

    // Simulate form submission
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    // Wait for form submission to complete
    await waitFor(() => {
      // Check if updateApplicant was called with the expected arguments
      expect(ApplicantsUpdateMock.history.put.length).toBe(1);
      expect(ApplicantsUpdateMock.history.put[0].data).toBe(
        JSON.stringify({
          firstname: 'UpdatedFirstname'
        })
      );
    });
  });

  it('should call the prevent user if email is changed', async () => {
    await act(() => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsUpdate />} />
        </Routes>,
        applicantUpdateTestConfig
      );
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(
        singleApplicant.current_values.firstname
      );
    });

    // Update the email
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'UpdatedEmail@test.fr' } });

    // Simulate form submission
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    // A modal should be displayed
    await waitFor(() => {
      expect(ApplicantsUpdateMock.history.put.length).toBe(0);
      expect(screen.getByText(/Vous avez modifier les champs suivants :/i)).toBeInTheDocument();
    });

    // Confirm the modal
    await act(async () => {
      fireEvent.click(screen.getByText(/Valider/i));
    });

    // Wait for form submission to complete
    await waitFor(() => {
      // Check if updateApplicant was called with the expected arguments
      expect(ApplicantsUpdateMock.history.put.length).toBe(1);
      expect(ApplicantsUpdateMock.history.put[0].data).toBe(
        JSON.stringify({
          email: 'UpdatedEmail@test.fr'
        })
      );
    });
  });
});