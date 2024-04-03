import { render, screen, fireEvent, act } from '@testProvider';
import ExternalTestersListHeader from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListHeader';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ExternalTestersListHeader', () => {
  it('renders ExternalTestersListHeader correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<ExternalTestersListHeader />);

    expect(screen.getByText(/Testeurs/i)).toBeInTheDocument();

    // Ensure that the "Annuler" button is present
    const createButton = screen.getByText(/Créer/i);
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(PATH_EXTERNAL_TESTERS.add);
  });
});
