import { render, screen, fireEvent, act } from '@testProvider';
import ApplicantsListHeader from '@src/pages/applicants/applicants-list/ApplicantsListHeader';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ApplicantsListHeader', () => {
  it('renders ApplicantsListHeader correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<ApplicantsListHeader />);

    expect(screen.getByText(/Étudiants/i)).toBeInTheDocument();

    // Ensure that the "Annuler" button is present
    const createButton = screen.getByText(/Créer/i);
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(PATH_APPLICANTS.add);
  });
});
