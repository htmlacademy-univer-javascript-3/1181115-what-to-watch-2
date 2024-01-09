import { render, screen } from '@testing-library/react';
import FilmPoster from './film-poster';

describe('Component: FilmPoster', () => {
  it('should render correctly', () => {
    const mockData = {
      img: 'https://url-to-image/image.jpg',
      filmTitle: 'The Grand Budapest Hotel',
    };

    render(<FilmPoster imgSrc={mockData.img} imgTitle={mockData.filmTitle} />);
    expect(screen.getByAltText(mockData.filmTitle)).toBeInTheDocument();
  });
});

