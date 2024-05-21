import { render, screen, fireEvent, act, waitFor, cleanup } from '@testProvider';
import ExternalTestersUpdate from '@src/pages/externalTesters/externalTesters-update/ExternalTestersUpdate';
import { initialApplicantState } from '@redux/reducers/applicantsReducer';
import { Route, Routes } from 'react-router';
import { PATH_APPLICANTS, PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { conflictedTester, singleTester } from '../DefaultTesters';
import ExternalTestersUpdateMock, {
  setupSuccessAxiosMock,
  setupSuccessAxiosMockForConflicts
} from '@src/tests/pages/externalTesters/externalTesters-update/ExternalTestersUpdateMock';
import { generatePath } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

jest.mock('@src/pages/applicants/applicants-profile/ApplicantsProfileHeader', () => jest.fn());

const externalTesterUpdateTestConfig = {
  preloadedState: {
    applicants: {
      ...initialApplicantState,
      applicantUpdate: {
        isEditing: true,
        applicantUpdateLoading: false
      }
    }
  },
  customHistory: [generatePath(PATH_EXTERNAL_TESTERS.profile, { applicantId: singleTester.id })]
};

describe('ExternalTestersUpdate', () => {
  beforeEach(() => {
    setupSuccessAxiosMock();
  });

  afterEach(() => {
    jest.clearAllMocks();
    ExternalTestersUpdateMock.reset();
    cleanup();
  });

  it('renders ExternalTestersUpdate correctly', async () => {
    act(() => {
      render(
        <Routes>
          <Route path={PATH_EXTERNAL_TESTERS.profile} element={<ExternalTestersUpdate />} />
        </Routes>,
        externalTesterUpdateTestConfig
      );
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(singleTester.firstname);
      expect(screen.getByLabelText(/Email/i)).toHaveValue(singleTester.email);
    });
  });

  it('should display a message if submitting without changes', async () => {
    act(() => {
      render(
        <Routes>
          <Route path={PATH_EXTERNAL_TESTERS.profile} element={<ExternalTestersUpdate />} />
        </Routes>,
        externalTesterUpdateTestConfig
      );
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(singleTester.firstname);
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
    act(() => {
      render(
        <Routes>
          <Route path={PATH_EXTERNAL_TESTERS.profile} element={<ExternalTestersUpdate />} />
        </Routes>,
        externalTesterUpdateTestConfig
      );
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(singleTester.firstname);
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
      expect(ExternalTestersUpdateMock.history.put.length).toBe(1);
      expect(ExternalTestersUpdateMock.history.put[0].data).toBe(
        JSON.stringify({
          firstname: 'UpdatedFirstname'
        })
      );
    });
  });

  it('should call the prevent user if email is changed', async () => {
    act(() => {
      render(
        <Routes>
          <Route path={PATH_EXTERNAL_TESTERS.profile} element={<ExternalTestersUpdate />} />
        </Routes>,
        externalTesterUpdateTestConfig
      );
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(singleTester.firstname);
    });

    // Update the email
    const emailInput = screen.getByLabelText(/Email/i);

    // Simulate form submission
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'UpdatedEmail@test.fr' } });
      fireEvent.submit(screen.getByRole('submit'));
    });

    // A modal should be displayed
    await waitFor(() => {
      expect(ExternalTestersUpdateMock.history.put.length).toBe(0);
      expect(screen.getByText(/Vous avez modifier les champs suivants :/i)).toBeInTheDocument();
    });

    // Confirm the modal
    await act(async () => {
      fireEvent.click(screen.getByText(/Valider/i));
    });

    // Wait for form submission to complete
    await waitFor(() => {
      // Check if updateApplicant was called with the expected arguments
      expect(ExternalTestersUpdateMock.history.put.length).toBe(1);
      expect(ExternalTestersUpdateMock.history.put[0].data).toBe(
        JSON.stringify({
          email: 'UpdatedEmail@test.fr'
        })
      );
    });
  });

  it('should have conflicts displayed', async () => {
    ExternalTestersUpdateMock.reset();
    ExternalTestersUpdateMock.resetHistory();
    setupSuccessAxiosMockForConflicts();
    await act(async () => {
      render(
        <Routes>
          <Route path={PATH_APPLICANTS.profile} element={<ExternalTestersUpdate />} />
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
            generatePath(PATH_APPLICANTS.profile, { applicantId: conflictedTester.id })
          ]
        }
      );
    });

    await waitFor(() => {
      // Check if the form is rendered with preloaded data
      expect(screen.getByLabelText(/Prénom/i)).toHaveValue(conflictedTester.firstname);
    });

    expect(
      screen.getByText(`Nouvelle donnée renseignée : ${conflictedTester.conflicts.firstname}`)
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
      expect(ExternalTestersUpdateMock.history.put.length).toBe(1);
      expect(ExternalTestersUpdateMock.history.put[0].data).toBe(
        JSON.stringify({
          lastname: conflictedTester.conflicts.lastname,
          firstname: conflictedTester.conflicts.firstname
        })
      );
    });
  });
});
