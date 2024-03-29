import { fireEvent, render, screen } from '@testProvider';
import ForgotPasswordFooter from '@src/pages/login/forgot-password/ForgotPasswordFooter';

describe('ForgotPasswordFooter', () => {
  it('render ForgotPasswordFooter component with loading state', () => {
    const isLoading = true;
    render(<ForgotPasswordFooter isLoading={isLoading}/>);

    // Ensure that the ActionButton is rendered
    const actionButton = screen.getByRole('submit');
    expect(actionButton).toBeInTheDocument();

    // Ensure that the "Réinitialiser" text is present
    const resetText = screen.getByText(/Réinitialiser/i);
    expect(resetText).toBeInTheDocument();
  });

  it('render ForgotPasswordFooter component without loading state', () => {
    const isLoading = false;
    render(<ForgotPasswordFooter isLoading={isLoading}/>);

    // Ensure that the ActionButton is rendered
    const actionButton = screen.getByRole('submit');
    expect(actionButton).toBeInTheDocument();

    // Ensure that the "Réinitialiser" text is present
    const resetText = screen.getByText(/Réinitialiser/i);
    expect(resetText).toBeInTheDocument();
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
        <ForgotPasswordFooter isLoading={isLoading} />
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