import { useNavigate } from 'react-router-dom';
import { render, screen, act, fireEvent } from '@testProvider';
import GroupsListHeader from '@src/pages/groups/groups-list/GroupsListHeader';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));
describe('GroupsListHeader', () => {
  it('should render GroupsListHeader correctly', () => {
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<GroupsListHeader />);

    expect(screen.getByText(/Groupes/i)).toBeInTheDocument();

    //Ensure that the "Ajouter" button is present
    const createButton = screen.getByText(/Ajouter/i);
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    //@TODO: Check if the navigate function has been called when create view is ready
    //expect(navigateMock).toHaveBeenCalledWith(PATH_GROUPS.add);
  });
});