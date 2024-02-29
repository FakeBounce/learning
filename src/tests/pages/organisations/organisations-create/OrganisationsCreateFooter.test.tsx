import { render, screen, fireEvent } from '@testProvider';
import OrganisationsCreateFooter from '@src/pages/organisations/organisations-create/OrganisationsCreateFooter';
import { useAppSelector } from '@redux/hooks';
import { PATH_ORGANISATIONS } from '@utils/navigation/paths';
import { act } from 'react-dom/test-utils';
import { useNavigate } from 'react-router-dom';

jest.mock('@redux/hooks', () => ({
  ...jest.requireActual('@redux/hooks'),
  useAppSelector: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('OrganisationsCreateFooter', () => {
  it('renders OrganisationsCreateFooter correctly', () => {
    // Mock useAppSelector to provide the desired state
    (useAppSelector as jest.Mock).mockReturnValue({
      organisationCreateLoading: false
    });

    // Mock useNavigate
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the OrganisationsCreateFooter component
    render(<OrganisationsCreateFooter />);

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
      organisationCreateLoading: false
    });

    // Mock useNavigate
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    // Render the OrganisationsCreateFooter component
    render(<OrganisationsCreateFooter />);

    // Simulate click on the "Annuler" button
    act(() => {
      fireEvent.click(screen.getByText(/Annuler/i));
    });

    // Ensure that useNavigate has been called with the correct path
    expect(navigateMock).toHaveBeenCalledWith(PATH_ORGANISATIONS.root);

    // Simulate click on the "Enregistrer" button
    act(() => {
      fireEvent.click(screen.getByText(/Enregistrer/i));
    });
  });
});
