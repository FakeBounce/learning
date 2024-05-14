import { render, screen, act, waitFor } from '@testProvider';
import UsersBulkContent from '@src/pages/users/users-bulk/UsersBulkContent';
import { faultyRowsForUsersBulk, validRowsForUsersBulk } from '@src/tests/pages/users/DefaultUsers';

describe('UsersBulkContent', () => {
  it('renders UsersBulkContent correctly', () => {
    const handleDropAvatar = jest.fn();
    const removeFile = jest.fn();
    render(
      <UsersBulkContent
        validRows={[]}
        faultyRows={[]}
        fileError={null}
        fileUploaded={null}
        handleDropAvatar={handleDropAvatar}
        removeFile={removeFile}
      />
    );

    // Ensure that the "Annuler" button is present
    expect(screen.getByText(/Sélectionnez un fichier/i)).toBeInTheDocument();
  });

  it('should display errors', async () => {
    const handleDropAvatar = jest.fn();
    const removeFile = jest.fn();
    render(
      <UsersBulkContent
        validRows={[]}
        faultyRows={[]}
        fileError={'A classic error'}
        fileUploaded={null}
        handleDropAvatar={handleDropAvatar}
        removeFile={removeFile}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/A classic error/i)).toBeInTheDocument();
    });
  });

  it('should display valid rows correctly', async () => {
    const handleDropAvatar = jest.fn();
    const removeFile = jest.fn();

    const file = new File([''], 'SomeFile.csv', { type: 'text/csv' });

    await act(async () => {
      render(
        <UsersBulkContent
          validRows={validRowsForUsersBulk}
          faultyRows={[]}
          fileError={null}
          fileUploaded={file}
          handleDropAvatar={handleDropAvatar}
          removeFile={removeFile}
        />
      );
    });

    act(() => {
      waitFor(() => {
        expect(screen.getByText(validRowsForUsersBulk[0].email as string)).toBeInTheDocument();
        expect(screen.getByText(file.name as string)).toBeInTheDocument();
      });
    });
  });

  it('should display faulty rows correctly', async () => {
    const handleDropAvatar = jest.fn();
    const removeFile = jest.fn();

    const file = new File([''], 'SomeFile.csv', { type: 'text/csv' });
    render(
      <UsersBulkContent
        validRows={[]}
        faultyRows={faultyRowsForUsersBulk}
        fileError={null}
        fileUploaded={file}
        handleDropAvatar={handleDropAvatar}
        removeFile={removeFile}
      />
    );

    await act(async () => {
      await waitFor(async () => {
        expect(screen.getByText(faultyRowsForUsersBulk[0].email as string)).toBeInTheDocument();
      });
    });
  });

  it('should display a text when there are both faulty and valid rows', async () => {
    const handleDropAvatar = jest.fn();
    const removeFile = jest.fn();

    const file = new File([''], 'SomeFile.csv', { type: 'text/csv' });
    render(
      <UsersBulkContent
        validRows={validRowsForUsersBulk}
        faultyRows={faultyRowsForUsersBulk}
        fileError={null}
        fileUploaded={file}
        handleDropAvatar={handleDropAvatar}
        removeFile={removeFile}
      />
    );

    await act(async () => {
      await waitFor(async () => {
        expect(screen.getByText(/Liste des utilisateurs valides/i)).toBeInTheDocument();
      });
    });
  });
});
