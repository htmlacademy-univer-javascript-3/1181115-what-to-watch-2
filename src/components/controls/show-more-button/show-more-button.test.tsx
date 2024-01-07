import { render, screen } from '@testing-library/react';
import ShowMoreButton from './show-more-button';

describe('Component: ShowMoreButton', () => {
  it('should render correct', () => {
    const handleShowMoreClick = vi.fn();

    render(<ShowMoreButton onShowMoreClick={handleShowMoreClick}/>);
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
