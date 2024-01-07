import { render, screen } from '@testing-library/react';
import FilmCardDesc from './film-card-desc';

describe('Component: FilmCardDesc', () => {
  it('should render correctly', () => {
    const mockData = {
      title: 'The Grand Budapest Hotel',
      genre: 'Drama',
      year: 2014,
    };

    render(<FilmCardDesc title={mockData.title} genre={mockData.genre} year={mockData.year} />);

    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(mockData.genre)).toBeInTheDocument();
    expect(screen.getByText(mockData.year)).toBeInTheDocument();
  });
});

