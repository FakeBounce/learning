import { render, screen, fireEvent, act, cleanup } from '@testProvider';
import ApplicantsUpdateModal from '@src/pages/applicants/applicants-update/ApplicantsUpdateModal';

describe('ApplicantsUpdateModal', () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders ApplicantsUpdateModal correctly', () => {
    render(
      <ApplicantsUpdateModal
        fieldsUpdated={[]}
        onClose={onCloseMock}
        isOpen={true}
        onConfirm={onConfirmMock}
      />
    );

    expect(screen.getByText(/Modification du profil/i)).toBeInTheDocument();
  });

  it('should display email and id if given in fields updated', () => {
    render(
      <ApplicantsUpdateModal
        fieldsUpdated={['email', 'externalId']}
        onClose={onCloseMock}
        isOpen={true}
        onConfirm={onConfirmMock}
      />
    );

    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Identifiant externe/i)).toBeInTheDocument();
  });

  it('should call confirm on submit click', () => {
    render(
      <ApplicantsUpdateModal
        fieldsUpdated={['email', 'externalId']}
        onClose={onCloseMock}
        isOpen={true}
        onConfirm={onConfirmMock}
      />
    );

    const submitButton = screen.getByText(/Valider/i);
    expect(submitButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(submitButton);
    });

    expect(onConfirmMock).toHaveBeenCalled();
  });

  it('should call close on cancel click', () => {
    render(
      <ApplicantsUpdateModal
        fieldsUpdated={['email', 'externalId']}
        onClose={onCloseMock}
        isOpen={true}
        onConfirm={onConfirmMock}
      />
    );

    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelButton);
    });

    expect(onCloseMock).toHaveBeenCalled();
  });
});
