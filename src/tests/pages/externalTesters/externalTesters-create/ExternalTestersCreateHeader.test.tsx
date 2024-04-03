import { render, screen } from '@testProvider';
import ExternalTestersCreateHeader from '@src/pages/externalTesters/externalTesters-create/ExternalTestersCreateHeader';

describe('ExternalTestersCreateHeader', () => {
  it('renders ExternalTestersCreateHeader correctly', () => {
    render(<ExternalTestersCreateHeader />);

    expect(screen.getByText('Ajouter un testeur')).toBeInTheDocument();
  });
});
