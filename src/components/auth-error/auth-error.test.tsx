import { render, screen } from '@testing-library/react';
import AuthError from './auth-error';

describe('Component: AuthError', () => {
  it('should render correctly', () => {
    const mockMessage = 'password';
    const expectedText = `Please enter a valid ${mockMessage}`;
    const messageTestId = 'error-message';

    render(<AuthError message={mockMessage} />);

    const messageContainer = screen.getByTestId(messageTestId);

    expect(messageContainer).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
