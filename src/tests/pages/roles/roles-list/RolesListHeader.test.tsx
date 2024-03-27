// Mock useNavigate
import { useNavigate } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testProvider';
import RolesListHeader from '@src/pages/organizations/organizations-list/OrganizationsListHeader';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('RolesListHeader', () => {
  it('renders RolesListHeader correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<RolesListHeader />);

    expect(screen.getByText(/Rôles/i)).toBeInTheDocument();

    // Ensure that the "Ajouter" button is present
    const createButton = screen.getByText(/Ajouter/i);
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(PATH_ORGANIZATIONS.add);
  });
});