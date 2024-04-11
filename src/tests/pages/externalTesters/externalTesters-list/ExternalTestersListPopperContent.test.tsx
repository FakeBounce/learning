import { render, screen, fireEvent, act, cleanup } from '@testProvider';
import ExternalTestersListPopperContent from '@src/pages/externalTesters/externalTesters-list/ExternalTestersListPopperContent';
import { stateTester } from '../DefaultTesters';
import { generatePath, useNavigate } from 'react-router-dom';
import { PATH_EXTERNAL_TESTERS } from '@utils/navigation/paths';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ExternalTestersListPopperContent', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders ExternalTestersListPopperContent correctly', () => {
    const handleToggleBlockMock = jest.fn();

    render(
      <ExternalTestersListPopperContent
        handleToggleBlock={handleToggleBlockMock}
        applicantSelected={null}
      />
    );

    expect(screen.getByText(/Profil/i)).toBeInTheDocument();
    expect(screen.getByText(/Mettre à jour/i)).toBeInTheDocument();
    expect(screen.getByText(/Débloquer/i)).toBeInTheDocument();
  });

  it('renders ApplicantsListPopperContent correctly with tester', () => {
    const handleToggleBlockMock = jest.fn();

    render(
      <ExternalTestersListPopperContent
        handleToggleBlock={handleToggleBlockMock}
        applicantSelected={stateTester}
      />
    );

    expect(screen.getByText(/Bloquer/i)).toBeInTheDocument();
  });

  it('navigate on Mettre a jour click', () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const handleToggleBlockMock = jest.fn();

    render(
      <ExternalTestersListPopperContent
        handleToggleBlock={handleToggleBlockMock}
        applicantSelected={stateTester}
      />
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
      <ExternalTestersListPopperContent
        handleToggleBlock={handleToggleBlockMock}
        applicantSelected={null}
      />
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
      <ExternalTestersListPopperContent
        handleToggleBlock={handleToggleBlockMock}
        applicantSelected={stateTester}
      />
    );

    act(() => {
      fireEvent.click(screen.getByText(/Profil/i));
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(
      generatePath(PATH_EXTERNAL_TESTERS.profile, { applicantId: stateTester.id.toString() })
    );
  });
});
