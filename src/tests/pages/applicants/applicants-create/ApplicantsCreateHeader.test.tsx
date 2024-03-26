import { render, screen } from '@testProvider';
import ApplicantsCreateHeader from '@src/pages/applicants/applicants-create/ApplicantsCreateHeader';

describe('ApplicantsCreateHeader', () => {
  it('renders ApplicantsCreateHeader correctly', () => {
    render(<ApplicantsCreateHeader />);

    expect(screen.getByText('Ajouter un étudiant')).toBeInTheDocument();
  });
});
