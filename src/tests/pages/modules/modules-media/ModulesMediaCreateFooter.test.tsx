import { render, screen, act, fireEvent, waitFor, cleanup } from '@testProvider';
import ModulesMediaCreateFooter from '@src/pages/modules/modules-media/ModulesMediaCreateFooter';
import { PATH_MODULES } from '@utils/navigation/paths';
import { Route, Routes } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';

const navigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('ModulesMediaCreateFooter', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    act(() => {
      render(
        <Routes>
          <Route path={PATH_MODULES.profile} element={<ModulesMediaCreateFooter />} />
        </Routes>,
        {
          customHistory: [generatePath(PATH_MODULES.profile, { moduleId: 1 })]
        }
      );
    });

    const cancelButton = screen.getByText(/Annuler/i);
    expect(cancelButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(cancelButton);
    });

    waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(
        generatePath(PATH_MODULES.profile, { moduleId: 1 })
      );
    });
  });
});
