import { useNavigate } from 'react-router-dom';
import { act, fireEvent, render, screen } from '@testProvider';
import RolesListHeader from '@src/pages/roles/roles-list/RolesListHeader';

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

    //@TODO: Check if the navigate function has been called when create view is ready
    //expect(navigateMock).toHaveBeenCalledWith(PATH_ROLES.add);
  });
});