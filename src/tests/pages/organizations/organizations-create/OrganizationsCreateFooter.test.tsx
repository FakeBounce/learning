import { render, screen, fireEvent, act } from '@testProvider';
import OrganizationsCreateFooter from '@src/pages/organizations/organizations-create/OrganizationsCreateFooter';
import { useAppSelector } from '@redux/hooks';
import { PATH_ORGANIZATIONS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

jest.mock('@redux/hooks', () => ({
  ...jest.requireActual('@redux/hooks'),
  useAppSelector: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('OrganizationsCreateFooter', () => {
  it('renders OrganizationsCreateFooter correctly', () => {
    // Mock useAppSelector to provide the desired state
    (useAppSelector as jest.Mock).mockReturnValue({
      organizationCreateLoading: false
    });

    // Mock useNavigate
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the OrganizationsCreateFooter component
    render(<OrganizationsCreateFooter />);

    // Ensure that the "Annuler" button is present
    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    // Ensure that the "Enregistrer" button is present
    const saveButton = screen.getByText(/Enregistrer/i);
    expect(saveButton).toBeInTheDocument();
  });

  it('handles button clicks correctly', async () => {
    // Mock useAppSelector to provide the desired state
    (useAppSelector as jest.Mock).mockReturnValue({
      organizationCreateLoading: false
    });

    // Mock useNavigate
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the OrganizationsCreateFooter component
    render(<OrganizationsCreateFooter />);

    // Simulate click on the "Annuler" button
    act(() => {
      fireEvent.click(screen.getByText(/Annuler/i));
    });

    // Ensure that useNavigate has been called with the correct path
    expect(navigateMock).toHaveBeenCalledWith(PATH_ORGANIZATIONS.root);

    // Simulate click on the "Enregistrer" button
    act(() => {
      fireEvent.click(screen.getByText(/Enregistrer/i));
    });
  });
});
