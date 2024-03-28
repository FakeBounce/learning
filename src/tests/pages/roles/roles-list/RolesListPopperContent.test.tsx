import { render, screen, cleanup } from '@testProvider';
import RolesListPopperContent from '@src/pages/roles/roles-list/RolesListPopperContent';
import { defaultRole } from '@src/tests/pages/roles/DefaultRole';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('RolesListPopperContent', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders RolesListPopperContent correctly', () => {
    const handleDelete = jest.fn();

    render(
      <RolesListPopperContent
        roleSelected={null}
        handleDelete={handleDelete}
      />
    );

    expect(screen.getByText(/Modifier les utilisateurs/i)).toBeInTheDocument();
    expect(screen.getByText(/Gérer les permissions/i)).toBeInTheDocument();
    //we check if it's not client-admin role to display the delete button
    if (!defaultRole.isClientAdmin) {
      expect(screen.getByText(/Supprimer/i)).toBeInTheDocument();
    }
  });
});
