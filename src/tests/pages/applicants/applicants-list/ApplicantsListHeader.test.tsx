import { render, screen, fireEvent, act, cleanup } from '@testProvider';
import ApplicantsListHeader from '@src/pages/applicants/applicants-list/ApplicantsListHeader';
import { PATH_APPLICANTS } from '@utils/navigation/paths';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router';
import { PermissionTypeEnum } from '@services/permissions/interfaces';
import { FeatureFlagContext } from '@utils/feature-flag/FeatureFlagProvider';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useOutletContext: jest.fn()
}));

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ApplicantsListHeader', () => {
  const mockPageType = PermissionTypeEnum.APPLICANTS;
  const navigateMock = jest.fn().mockResolvedValueOnce({});

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ pageType: mockPageType });

    // Mock useNavigate
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders ApplicantsListHeader correctly', () => {
    render(<ApplicantsListHeader />);

    expect(screen.getByText(/Étudiants/i)).toBeInTheDocument();

    expect(screen.queryByText(/Ajouter/i)).not.toBeInTheDocument();
  });

  it('should have the create button if user has rights', () => {
    render(
      <FeatureFlagContext.Provider
        value={{
          isAuthorizedByPermissionsTo: jest.fn().mockReturnValue(true), // Mock the isAuthorizedByPermissionsTo function
          canSeePage: jest.fn().mockReturnValue(true) // Mock the canSeePage function
        }}
      >
        <ApplicantsListHeader />
      </FeatureFlagContext.Provider>
    );

    expect(screen.getByText(/Étudiants/i)).toBeInTheDocument();

    // Ensure that the "Annuler" button is present
    const createButton = screen.getByText('Ajouter en masse');
    expect(createButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createButton);
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(PATH_APPLICANTS.addBulk);
  });
});
