import { render, screen } from '@testing-library/react';
import { withStore } from '../../../utils/mock-component';
import Details from './details';
import { filmInfo } from '../../../utils/mock-data';
import { NameSpace } from '../../../consts';

describe('Component: Details', () => {
  const mockFilm = filmInfo();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Details />,
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

    expect(screen.getByText('Director')).toBeInTheDocument();
    const director = screen.getByTestId('film-card-details-director');
    expect(director.textContent).toBe(mockFilm.director);

    expect(screen.getByText('Starring')).toBeInTheDocument();
    const starring = screen.getByTestId('film-card-details-starring');
    expect(starring.textContent?.split(',')).toEqual(mockFilm.starring);

    expect(screen.getByText('Run Time')).toBeInTheDocument();

    expect(screen.getByText('Genre')).toBeInTheDocument();
    const genre = screen.getByTestId('film-card-details-genre');
    expect(genre.textContent).toBe(mockFilm.genre);

    expect(screen.getByText('Released')).toBeInTheDocument();
    const released = screen.getByTestId('film-card-details-released');
    expect(Number(released.textContent)).toBe(mockFilm.released);
  });
});
