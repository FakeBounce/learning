import { render, screen, fireEvent, act } from '@testProvider';
import ExternalTestersListHeader from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListHeader';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { useOutletContext } from 'react-router';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ExternalTestersListHeader', () => {
  const mockPageType = PermissionTypeEnum.TESTERS;

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockPageType });
  });

  it('renders ExternalTestersListHeader correctly', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<ExternalTestersListHeader />);

    expect(screen.getByText(/Testeurs/i)).toBeInTheDocument();
  });

  it('display the create button if has correct permission', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true), // Mock the isAuthorizedByPermissionsTo function
          canSeePage: jest.fn().mockReturnValue(true) // Mock the canSeePage function
        }}
      >
        <ExternalTestersListHeader />
      </FeatureFlagContext.Provider>
    );

    // Ensure that the "Annuler" button is present
    const createButton = screen.getByText('Ajouter');
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(PATH_EXTERNAL_TESTERS.add);
  });
});
