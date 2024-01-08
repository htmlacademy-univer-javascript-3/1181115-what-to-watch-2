import { render, screen } from '@testing-library/react';
import { withStore } from '../utils/mock-component';
import { NameSpace } from '../consts';

import { generateFilmsArray, promoFilmInfo } from '../utils/mock-data';
import GenreList from './genres-list';

describe('Component: FilmTabsContainer', () => {
  const mockPromo = promoFilmInfo();
  const mockGenre = 'All genres';
  const mockFilms = generateFilmsArray(8);

  const originalGenres = new Set('');
  mockFilms.map((film) => originalGenres.add(film.genre));


  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <GenreList genres={[]}/>,
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

    expect(screen.getAllByRole('genre').length).toBe(originalGenres.size + 1);
  });
});
