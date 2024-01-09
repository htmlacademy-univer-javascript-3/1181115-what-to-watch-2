import { render, screen } from '@testing-library/react';
import FilmCardBg from './film-card-bg';

describe('Component: FilmCardBg', () => {
  it('should render correctly', () => {
    const mockData = {
      img: 'https://url-to-image/image.jpg',
      filmTitle: 'The Grand Budapest Hotel',
    };

    render(<FilmCardBg img={mockData.img} filmTitle={mockData.filmTitle} />);

    expect(screen.getByTestId('film-bg-img')).toBeInTheDocument();
  });
});
