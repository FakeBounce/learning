import { render, screen, fireEvent, act } from '@testProvider';
import OrganizationsListHeader from '@src/pages/organizations/organizations-list/OrganizationsListHeader';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('OrganizationsListHeader', () => {
  it('renders OrganizationsListHeader correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<OrganizationsListHeader />);

    expect(screen.getByText(/Organisations/i)).toBeInTheDocument();

    // Ensure that the "Annuler" button is present
    const createButton = screen.getByText(/Ajouter/i);
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(PATH_ORGANIZATIONS.add);
  });
});
