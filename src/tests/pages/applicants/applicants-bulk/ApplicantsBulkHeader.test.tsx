import { render, screen } from '@testProvider';
import ApplicantsBulkHeader from '@src/pages/applicants/applicants-bulk/ApplicantsBulkHeader';

describe('ApplicantsBulkHeader', () => {
  it('renders ApplicantsBulkHeader correctly', () => {
    render(<ApplicantsBulkHeader />);

    expect(screen.getByText('Ajouter des étudiants en masse')).toBeInTheDocument();
  });
});
