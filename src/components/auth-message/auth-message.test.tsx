import { render, screen } from '@testing-library/react';
import AuthMessage from './auth-message';

describe('Component: AuthError', () => {
  it('should render correctly', () => {
    const expectedText = 'We can\'t recognize this email and password combination. Please try again.';

    render(<AuthMessage />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
