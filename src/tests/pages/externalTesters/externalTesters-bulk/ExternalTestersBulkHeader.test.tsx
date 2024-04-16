import { render, screen } from '@testProvider';
import ExternalTestersBulkHeader from '@src/pages/externalTesters/externalTesters-bulk/ExternalTestersBulkHeader';

describe('ExternalTestersBulkHeader', () => {
  it('renders ExternalTestersBulkHeader correctly', () => {
    render(<ExternalTestersBulkHeader />);

    expect(screen.getByText('Ajouter des testeurs en masse')).toBeInTheDocument();
  });
});
