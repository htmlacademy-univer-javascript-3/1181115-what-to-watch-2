import { render, screen } from '@testing-library/react';
import LoadingBlock from './loading-block';


describe('Component: LoadingBlock', () => {
  it('should render correctly', () => {
    render(<LoadingBlock />);
    expect(screen.getByRole('loading-block')).toBeInTheDocument();
  });
});
