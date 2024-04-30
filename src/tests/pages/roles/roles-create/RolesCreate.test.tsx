import { render, screen, act, fireEvent, cleanup, waitFor } from '@testProvider';
import RolesCreate from '@src/pages/roles/roles-create/RolesCreate';
import { useNavigate } from 'react-router-dom';
import { PATH_ROLES } from '@utils/navigation/paths';
import rolesMock, { rolesSetupSuccessAxiosMock } from '@src/tests/pages/roles/RolesMock';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('RolesCreate', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    rolesSetupSuccessAxiosMock();
  });

  afterEach(() => {
    cleanup();
    rolesMock.reset();
  });

  it('should render correctly', () => {
    act(() => {
      render(<RolesCreate />);
    });

    const title = screen.getByText(/Ajouter un rôle/i);
    expect(title).toBeInTheDocument();
  });

  it('should send form data correctly', async () => {
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    await act(async () => {
      render(<RolesCreate />);
    });

    const nameInput = screen.getByLabelText(/Nom du rôle/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const submitButton = screen.getByRole('submit');

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Test rôle' } });
      fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    });

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(rolesMock.history.post.length).toBeGreaterThanOrEqual(2);

      let found = false;
      rolesMock.history.post.forEach((req) => {
        if (req.url === '/roles') {
          found = true;
          expect(req.data).toBe(
            JSON.stringify({
              name: 'Test rôle',
              description: 'Test Description'
            })
          );
        }
      });

      expect(found).toBe(true);
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(PATH_ROLES.root);
    });
  });
});
