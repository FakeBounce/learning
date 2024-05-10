import { render, screen, waitFor, cleanup } from '@testProvider';
import RolesPermissionsFormPermissionType from '@src/pages/roles/roles-permissions/RolesPermissionsFormPermissionType';

describe('RolesPermissionsFormPermissionsActions', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    waitFor(() => {
      render(
        <RolesPermissionsFormPermissionType title={'Some title'}>
          <div>This is a child</div>
        </RolesPermissionsFormPermissionType>
      );
    });

    expect(screen.getByText(/Some title/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a child/i)).toBeInTheDocument();
  });
});
