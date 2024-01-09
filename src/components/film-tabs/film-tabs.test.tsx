import { render, screen } from '@testing-library/react';
import FilmTabs from './film-tabs';
import { withStore } from '../../utils/mock-component';
import { NameSpace } from '../../consts';
import { filmInfo } from '../../utils/mock-data';

describe('Component: FilmTabs', () => {
  const mockFilm = filmInfo();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <FilmTabs />,
      {
        [NameSpace.Film]: {
          comments: [],
          similarFilms: [],
          isLoading: false,
          error: undefined,
          film: mockFilm,
        },
      }
    );

    render(withStoreComponent);

    expect(screen.getByTestId('film-card-nav')).toBeInTheDocument();
    expect(screen.getByTestId('film-tab-overview')).toBeInTheDocument();
  });
});
