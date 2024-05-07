import { render, screen, fireEvent, act, waitFor } from '@testProvider';
import ApplicantsUpdate from '@src/pages/applicants/applicants-update/ApplicantsUpdate';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { Route, Routes } from 'react-router';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import {
  conflictedApplicant,
  singleApplicant
} from '@src/tests/pages/applicants/DefaultApplicants';
import ApplicantsUpdateMock, {
  setupSuccessAxiosMock,
  setupSuccessAxiosMockForConflicts
} from '@src/tests/pages/applicants/applicants-update/ApplicantsUpdateMock';
import { cleanup } from '@testing-library/react';
import { generatePath } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

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
  customHistory: [generatePath(PATH_APPLICANTS.profile, { applicantId: singleApplicant.id })]
};

describe('ApplicantsUpdate', () => {
  beforeEach(() => {
    setupSuccessAxiosMock();
  });

  afterEach(() => {
    ApplicantsUpdateMock.reset();
    jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
  });

  it('renders ApplicantsUpdate correctly', async () => {
    await act(async () => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsUpdate />} />
        </Routes>,
        applicantUpdateTestConfig
      );
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(singleApplicant.firstname);
      expect(screen.getByRole('textbox', { name: /Email/i })).toHaveValue(singleApplicant.email);
    });
  });

  it('should display a message if submitting without changes', async () => {
    await act(async () => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsUpdate />} />
        </Routes>,
        applicantUpdateTestConfig
      );
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(singleApplicant.firstname);
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(enqueueSnackbar).toHaveBeenCalledWith("Aucune modification n'a été effectuée", {
        variant: 'warning'
      });
    });
  });

  it('should call the correct api with only updated fields', async () => {
    await act(async () => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsUpdate />} />
        </Routes>,
        applicantUpdateTestConfig
      );
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(singleApplicant.firstname);
    });

    // Update the firstname
    const firstnameInput = screen.getByLabelText(/Prénom/i);
    await act(async () => {
      fireEvent.change(firstnameInput, { target: { value: 'UpdatedFirstname' } });
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
    await act(async () => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsUpdate />} />
        </Routes>,
        applicantUpdateTestConfig
      );
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(singleApplicant.firstname);
    });

    const emailInput = screen.getByRole('textbox', { name: /Email/i });

    await act(async () => {
      // Update the email
      fireEvent.change(emailInput, { target: { value: 'UpdatedEmail@test.fr' } });
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

  it('should have conflicts displayed', async () => {
    ApplicantsUpdateMock.reset();
    ApplicantsUpdateMock.resetHistory();
    setupSuccessAxiosMockForConflicts();
    await act(async () => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ApplicantsUpdate />} />
        </Routes>,
        {
          preloadedState: {
            applicants: {
              ...initialApplicantState,
              applicantUpdate: {
                isEditing: true,
                applicantUpdateLoading: false
              }
            }
          },
          customHistory: [
            generatePath(PATH_APPLICANTS.profile, { applicantId: conflictedApplicant.id })
          ]
        }
      );
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(conflictedApplicant.firstname);
    });

    expect(
      screen.getByText(`Nouvelle donnée renseignée : ${conflictedApplicant.conflicts.firstname}`)
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Mettre à jour' })).toHaveLength(2);

    await act(async () => {
      const conflictButtons = screen.getAllByRole('button', { name: 'Mettre à jour' });
      fireEvent.click(conflictButtons[0]);
      fireEvent.click(conflictButtons[1]);
      fireEvent.submit(screen.getByRole('submit'));
    });

    // Wait for form submission to complete
    await waitFor(() => {
      // Check if updateApplicant was called with the expected arguments
      expect(ApplicantsUpdateMock.history.put.length).toBe(1);
      expect(ApplicantsUpdateMock.history.put[0].data).toBe(
        JSON.stringify({
          lastname: conflictedApplicant.conflicts.lastname,
          firstname: conflictedApplicant.conflicts.firstname
        })
      );
    });
  });
});
