import { render, screen, fireEvent } from '@testProvider';
import LoginFooter from '@src/pages/login/LoginFooter';

describe('LoginFooter', () => {
  it('renders LoginFooter with loading state', () => {
    const isLoading = true;
    render(<LoginFooter isLoading={isLoading} />);

    // Ensure that the ActionButton is rendered
    const actionButton = screen.getByRole('submit');
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toBeDisabled();

    // Ensure that the "Se connecter" text is present
    const seConnecterText = screen.getByText(/Se connecter/i);
    expect(seConnecterText).toBeInTheDocument();
  });

  it('renders LoginFooter without loading state', () => {
    const isLoading = false;
    render(<LoginFooter isLoading={isLoading} />);

    // Ensure that the ActionButton is rendered
    const actionButton = screen.getByRole('submit');
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).not.toBeDisabled();

    // Ensure that the "Se connecter" text is present
    const seConnecterText = screen.getByText(/Se connecter/i);
    expect(seConnecterText).toBeInTheDocument();
  });

  it('handles click events', () => {
    const isLoading = false;
    const onSubmitMock = jest.fn();
    render(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitMock();
        }}
      >
        <LoginFooter isLoading={isLoading} />
      </form>
    );

    // Ensure that the ActionButton is rendered
    const actionButton = screen.getByRole('submit');
    expect(actionButton).toBeInTheDocument();

    // Simulate a click event
    fireEvent.click(actionButton);

    // Ensure that the onClick handler is called
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });
});
