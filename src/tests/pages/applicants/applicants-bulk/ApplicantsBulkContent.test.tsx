import { render, screen, act, waitFor } from '@testProvider';
import ApplicantsBulkContent from '@src/pages/applicants/applicants-bulk/ApplicantsBulkContent';
import {
  faultyRowsForApplicantBulk,
  validRowsForApplicantBulk
} from '@src/tests/pages/applicants/DefaultApplicants';

describe('ApplicantsBulkContent', () => {
  it('renders ApplicantsBulkContent correctly', () => {
    const handleDropAvatar = jest.fn();
    const removeFile = jest.fn();
    render(
      <ApplicantsBulkContent
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

  it('should display errors', () => {
    const handleDropAvatar = jest.fn();
    const removeFile = jest.fn();
    render(
      <ApplicantsBulkContent
        validRows={[]}
        faultyRows={[]}
        fileError={'A classic error'}
        fileUploaded={null}
        handleDropAvatar={handleDropAvatar}
        removeFile={removeFile}
      />
    );

    waitFor(() => {
      expect(screen.getByText(/A classic error/i)).toBeInTheDocument();
    });
  });

  it('should display valid rows correctly', async () => {
    const handleDropAvatar = jest.fn();
    const removeFile = jest.fn();

    const file = new File([''], 'SomeFile.csv', { type: 'text/csv' });

    await act(async () => {
      render(
        <ApplicantsBulkContent
          validRows={validRowsForApplicantBulk}
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
        expect(screen.getByText(validRowsForApplicantBulk[0].email as string)).toBeInTheDocument();
        expect(screen.getByText(file.name as string)).toBeInTheDocument();
      });
    });
  });

  it('should display faulty rows correctly', async () => {
    const handleDropAvatar = jest.fn();
    const removeFile = jest.fn();

    const file = new File([''], 'SomeFile.csv', { type: 'text/csv' });
    render(
      <ApplicantsBulkContent
        validRows={[]}
        faultyRows={faultyRowsForApplicantBulk}
        fileError={null}
        fileUploaded={file}
        handleDropAvatar={handleDropAvatar}
        removeFile={removeFile}
      />
    );

    await act(async () => {
      await waitFor(async () => {
        expect(screen.getByText(faultyRowsForApplicantBulk[0].email as string)).toBeInTheDocument();
      });
    });
  });

  it('should display a text when there are both faulty and valid rows', async () => {
    const handleDropAvatar = jest.fn();
    const removeFile = jest.fn();

    const file = new File([''], 'SomeFile.csv', { type: 'text/csv' });
    render(
      <ApplicantsBulkContent
        validRows={validRowsForApplicantBulk}
        faultyRows={faultyRowsForApplicantBulk}
        fileError={null}
        fileUploaded={file}
        handleDropAvatar={handleDropAvatar}
        removeFile={removeFile}
      />
    );

    await act(async () => {
      await waitFor(async () => {
        expect(screen.getByText(/Liste des étudiants valides/i)).toBeInTheDocument();
      });
    });
  });
});
