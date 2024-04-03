import { render, screen, fireEvent, act } from '@testProvider';
import ExternalTestersListModal from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListModal';
import { stateTester } from '../DefaultTesters';
import ExternalTestersListMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/applicants/applicants-list/ApplicantsListMock';

describe('ExternalTestersListModal', () => {
  it('renders ExternalTestersListModal correctly', async () => {
    const cancelModalMock = jest.fn();
    const setIsModalOpenMock = jest.fn();

    render(
      <ExternalTestersListModal
        applicantSelected={stateTester}
        cancelModal={cancelModalMock}
        isModalOpen={true}
        setIsModalOpen={setIsModalOpenMock}
      />
    );

    expect(screen.getByText(/Êtes-vous sûr de vouloir bloquer le testeur/i)).toBeInTheDocument();
    expect(screen.getByText(stateTester.firstname)).toBeInTheDocument();
  });

  it('close modal correctly', async () => {
    const cancelModalMock = jest.fn();
    const setIsModalOpenMock = jest.fn();
    render(
      <ExternalTestersListModal
        applicantSelected={stateTester}
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
      <ExternalTestersListModal
        applicantSelected={stateTester}
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

    expect(ExternalTestersListMock.history.put).toHaveLength(1);
    expect(ExternalTestersListMock.history.put[0].url).toBe(`/applicants/block/${stateTester.id}`);
  });
});
