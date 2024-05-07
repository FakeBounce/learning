import { render, screen, fireEvent, act, cleanup } from '@testProvider';
import ExternalTestersListPopperContent from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListPopperContent';
import { stateTester } from '../DefaultTesters';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { useOutletContext } from 'react-router';
import { PermissionEnum, PermissionTypeEnum } from '@services/permissions/interfaces';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

describe('ExternalTestersListPopperContent', () => {
  const mockupPageType = PermissionTypeEnum.TESTERS;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockupPageType });
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders ExternalTestersListPopperContent correctly', () => {
    const handleToggleBlockMock = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ExternalTestersListPopperContent
          handleToggleBlock={handleToggleBlockMock}
          applicantSelected={null}
        />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Profil/i)).toBeInTheDocument();
    expect(screen.getByText(/Mettre à jour/i)).toBeInTheDocument();
    expect(screen.getByText(/Débloquer/i)).toBeInTheDocument();
  });

  it('renders ApplicantsListPopperContent correctly with tester', () => {
    const handleToggleBlockMock = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ExternalTestersListPopperContent
          handleToggleBlock={handleToggleBlockMock}
          applicantSelected={stateTester}
        />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Bloquer/i)).toBeInTheDocument();
  });

  it('navigate on Mettre a jour click', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const handleToggleBlockMock = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ExternalTestersListPopperContent
          handleToggleBlock={handleToggleBlockMock}
          applicantSelected={stateTester}
        />
      </FeatureFlagContext.Provider>
    );

    act(() => {
      fireEvent.click(screen.getByText(/Mettre à jour/i));
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(
      generatePath(PATH_EXTERNAL_TESTERS.profile, { applicantId: stateTester.id.toString() })
    );
  });

  it("doesn't navigate if no tester", () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const handleToggleBlockMock = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ExternalTestersListPopperContent
          handleToggleBlock={handleToggleBlockMock}
          applicantSelected={null}
        />
      </FeatureFlagContext.Provider>
    );

    act(() => {
      fireEvent.click(screen.getByText(/Mettre à jour/i));
    });

    // Check if the navigate function has been called
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('navigate on Profil click', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const handleToggleBlockMock = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ExternalTestersListPopperContent
          handleToggleBlock={handleToggleBlockMock}
          applicantSelected={stateTester}
        />
      </FeatureFlagContext.Provider>
    );

    act(() => {
      fireEvent.click(screen.getByText(/Profil/i));
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(
      generatePath(PATH_EXTERNAL_TESTERS.profile, { applicantId: stateTester.id.toString() })
    );
  });

  it('renders ApplicantsListPopperContent without update permissions', () => {
    const handleToggleBlockMock = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockImplementation((pageType, permission) => {
            return pageType === mockupPageType && permission === PermissionEnum.BLOCK_UNBLOCK;
          }),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ExternalTestersListPopperContent
          handleToggleBlock={handleToggleBlockMock}
          applicantSelected={stateTester}
        />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Bloquer/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mettre à jour/i)).not.toBeInTheDocument();
  });
  it('renders ApplicantsListPopperContent without block permissions', () => {
    const handleToggleBlockMock = jest.fn();

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockImplementation((pageType, permission) => {
            return pageType === mockupPageType && permission === PermissionEnum.UPDATE;
          }),
          canSeePage: jest.fn().mockReturnValue(true)
        }}
      >
        <ExternalTestersListPopperContent
          handleToggleBlock={handleToggleBlockMock}
          applicantSelected={stateTester}
        />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Mettre à jour/i)).toBeInTheDocument();
    expect(screen.queryByText(/Bloquer/i)).not.toBeInTheDocument();
  });
});
