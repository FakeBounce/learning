import { render, screen, fireEvent, act } from '@testProvider';
import OrganisationsListHeader from '@src/pages/organisations/organisations-list/OrganisationsListHeader';
import { PATH_ORGANISATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('OrganisationsListHeader', () => {
  it('renders OrganisationsListHeader correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the OrganisationsCreateFooter component
    render(<OrganisationsListHeader />);

    expect(screen.getByText(/Organisations/i)).toBeInTheDocument();

    // Ensure that the "Annuler" button is present
    const createButton = screen.getByText(/Créer/i);
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(PATH_ORGANISATIONS.add);
  });
});
