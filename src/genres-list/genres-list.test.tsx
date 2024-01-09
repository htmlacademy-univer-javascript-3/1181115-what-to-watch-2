import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import GenresList from './genres-list';
import { withStore } from '../utils/mock-component';
import { NameSpace } from '../consts';
import { generateFilmsArray, promoFilmInfo } from '../utils/mock-data';


describe('Component: GenresList', () => {
  const mockGenres = ['Comedy', 'Drama'];
  const mockPromo = promoFilmInfo();
  const mockGenre = 'All genres';
  const mockFilms = generateFilmsArray(7);

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <GenresList genres={mockGenres}/>,
      {
        [NameSpace.Films]: {
          films: mockFilms,
          genre: mockGenre,
          isLoading: false,
          promoFilm: mockPromo
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getAllByRole('genre').length).toBe(mockGenres.length + 1);
  });
});
