import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../utils/mock-component';

describe('Component: Footer', () => {
  it('should render correctly and display redirect link', () => {
    const message = '© 2019 What to watch Ltd.';

    const preparedComponent = withHistory(<Footer linkLogo='/' />);

    render(preparedComponent);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});

