import { render, screen, fireEvent } from '@testProvider';
import LoginFooter from '@src/pages/login/LoginFooter';

describe('LoginFooter', () => {
  it('renders LoginFooter with loading state', () => {
    const isLoading = true;
    render(<LoginFooter isLoading={isLoading} />);

    // Ensure that the ActionButton is rendered
    const actionButton = screen.getByRole('submit');
    expect(actionButton).toBeInTheDocument();

    // Ensure that the loading prop is passed correctly
    const loadingContainer = screen.getByRole('progressbar');
    expect(loadingContainer).toBeInTheDocument();

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

    // Ensure that the loading state is not rendered
    const loadingContainer = screen.queryByRole('progressbar'); // Use queryByRole to check absence
    expect(loadingContainer).not.toBeInTheDocument();

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
