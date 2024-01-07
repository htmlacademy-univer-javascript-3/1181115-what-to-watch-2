import { render, screen } from '@testing-library/react';
import SignInField from './sign-in-field';

describe('Component: SignInField', () => {
  const onChangeHandler = vi.fn();
  const mockData = {
    errorClass: '',
    type: 'email',
    placeholder: 'Email address',
    name: 'user-email',
    id: 'user-email',
    value: '',
    onChangeHandler: onChangeHandler,
    htmlFor: 'user-email',
    label: 'Email address'
  };

  it('should render correct', () => {
    render(
      <SignInField
        {...mockData}
      />
    );

    expect(screen.getByTestId('sign-in-input')).toBeInTheDocument();
    expect(screen.getByText(mockData.label)).toBeInTheDocument();
  });
});
