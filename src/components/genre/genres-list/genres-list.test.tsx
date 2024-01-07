import { render, screen } from '@testing-library/react';
import { withStore } from '../../../utils/mock-component';
import { NameSpace } from '../../../consts';
import GenresList from './genres-list';
import { generateFilmsArray, promoFilmInfo } from '../../../utils/mock-data';

describe('Component: FilmTabsContainer', () => {
  const mockPromo = promoFilmInfo();
  const mockGenre = 'All genres';
  const mockFilms = generateFilmsArray(7);

  const originalGenres = new Set('');
  mockFilms.map((film) => originalGenres.add(film.genre));


  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <GenresList />,
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
