import { render, screen } from '@testing-library/react';
import Genre from './genre';

describe('Component: Genre', () => {
  const mockGenre = 'Darama';

  it('should render correctly', () => {
    const handleBtnOnClick = vi.fn();

    render(
      <Genre genre={mockGenre} activeClass="" onGenreClick={handleBtnOnClick} />
    );

    expect(screen.getByText(mockGenre)).toBeInTheDocument();
  });
});
