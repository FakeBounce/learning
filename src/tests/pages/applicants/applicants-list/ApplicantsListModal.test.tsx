import { render, screen, fireEvent, act } from '@testProvider';
import ApplicantsListModal from '@src/pages/applicants/applicants-list/ApplicantsListModal';
import { stateApplicant } from '@src/tests/pages/applicants/DefaultApplicants';
import ApplicantsListMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/applicants/applicants-list/ApplicantsListMock';

describe('ApplicantsListModal', () => {
  it('renders ApplicantsListModal correctly', async () => {
    const cancelModalMock = jest.fn();
    const setIsModalOpenMock = jest.fn();

    render(
      <ApplicantsListModal
        applicantSelected={stateApplicant}
        cancelModal={cancelModalMock}
        isModalOpen={true}
        setIsModalOpen={setIsModalOpenMock}
      />
    );

    expect(screen.getByText(/Êtes-vous sûr de vouloir bloquer l’étudiant/i)).toBeInTheDocument();
    expect(screen.getByText(stateApplicant.firstname)).toBeInTheDocument();
  });

  it('close modal correctly', async () => {
    const cancelModalMock = jest.fn();
    const setIsModalOpenMock = jest.fn();
    render(
      <ApplicantsListModal
        applicantSelected={stateApplicant}
        cancelModal={cancelModalMock}
        isModalOpen={true}
        setIsModalOpen={setIsModalOpenMock}
      />
    );

    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(cancelButton);
    });

    expect(cancelModalMock).toHaveBeenCalled();
  });

  it('toggle block correctly', async () => {
    const cancelModalMock = jest.fn();
    const setIsModalOpenMock = jest.fn();
    setupSuccessAxiosMock();

    render(
      <ApplicantsListModal
        applicantSelected={stateApplicant}
        cancelModal={cancelModalMock}
        isModalOpen={true}
        setIsModalOpen={setIsModalOpenMock}
      />
    );

    const validateButton = screen.getByText(/Valider/i);
    expect(validateButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(validateButton);
    });

    expect(ApplicantsListMock.history.put).toHaveLength(1);
    expect(ApplicantsListMock.history.put[0].url).toBe(`/applicants/${stateApplicant.id}/block`);
  });
});
