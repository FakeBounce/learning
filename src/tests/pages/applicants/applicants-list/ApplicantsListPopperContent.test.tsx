import { render, screen, fireEvent, act, cleanup } from '@testProvider';
import ApplicantsListPopperContent from '@src/pages/applicants/applicants-list/ApplicantsListPopperContent';
import { defaultApplicant } from '../DefaultApplicants';
import { useNavigate } from 'react-router-dom';
import { PATH_APPLICANTS } from '@utils/navigation/paths';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ApplicantsListPopperContent', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders ApplicantsListPopperContent correctly', () => {
    const handleToggleBlockMock = jest.fn();

    render(
      <ApplicantsListPopperContent
        handleToggleBlock={handleToggleBlockMock}
        applicantSelected={null}
      />
    );

    expect(screen.getByText(/Profil/i)).toBeInTheDocument();
    expect(screen.getByText(/Mettre à jour/i)).toBeInTheDocument();
    expect(screen.getByText(/Débloquer/i)).toBeInTheDocument();
  });

  it('renders ApplicantsListPopperContent correctly with applicant', () => {
    const handleToggleBlockMock = jest.fn();

    render(
      <ApplicantsListPopperContent
        handleToggleBlock={handleToggleBlockMock}
        applicantSelected={defaultApplicant}
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
      <ApplicantsListPopperContent
        handleToggleBlock={handleToggleBlockMock}
        applicantSelected={defaultApplicant}
      />
    );

    act(() => {
      fireEvent.click(screen.getByText(/Mettre à jour/i));
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(
      `${PATH_APPLICANTS.root}/update/${defaultApplicant.id}`
    );
  });

  it("doesn't navigate if no applicant", () => {
    // Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    const handleToggleBlockMock = jest.fn();

    render(
      <ApplicantsListPopperContent
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
      <ApplicantsListPopperContent
        handleToggleBlock={handleToggleBlockMock}
        applicantSelected={defaultApplicant}
      />
    );

    act(() => {
      fireEvent.click(screen.getByText(/Profil/i));
    });

    // Check if the navigate function has been called
    expect(navigateMock).toHaveBeenCalledWith(
      PATH_APPLICANTS.profile.replace(':applicantId', defaultApplicant.id.toString())
    );
  });

  // @TODO: Test the toggleBlock when we do the confirmation modal as logic might change
});
