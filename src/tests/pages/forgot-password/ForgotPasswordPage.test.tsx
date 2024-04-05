import { act, cleanup, fireEvent, render, screen, waitFor } from "@testProvider";
import ForgotPasswordAxiosMock, {
  setupSuccessAxiosMock
} from '@src/tests/pages/forgot-password/ForgotPasswordAxiosMock';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordPage from '@src/pages/login/forgot-password/ForgotPasswordPage';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));


describe('ForgotPasswordPage', () => {
  afterEach(() => {
    ForgotPasswordAxiosMock.reset();
    cleanup();
  });

  it('render ForgotPasswordPage component and submit correctly', async () => {
    setupSuccessAxiosMock();

    //Mock useNavigate
    const navigateMock = jest.fn().mockResolvedValueOnce({});
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    //Render the ForgotPasswordPage component
    render(<ForgotPasswordPage />);

    //Fill out the form
    fireEvent.change(screen.getByLabelText(/Organisation ID/i), { target: { value: 'testorg' } });
    fireEvent.change(screen.getByLabelText(/Adresse mail/i), { target: { value: 'testmail' } });

    //Simulate form submission
    await act(async () => {
      fireEvent.submit(screen.getByRole('submit'));
    });

    await waitFor(() => {
      expect(ForgotPasswordAxiosMock.history.post.length).toBe(1);
      expect(JSON.parse(ForgotPasswordAxiosMock.history.post[0].data)).toStrictEqual({
        organization_uuid: 'testorg',
        email: 'testmail'
      });
    });
  });
});