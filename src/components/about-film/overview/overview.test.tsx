import { render, screen } from '@testing-library/react';
import { withStore } from '../../../utils/mock-component';
import Overview from './overview';
import { filmInfo } from '../../../utils/mock-data';
import { NameSpace } from '../../../consts';
import { getRatingDescription } from '../../../utils/functions/get-rating-description/get-rating-description';

describe('Component: Overview', () => {
  const mockFilm = filmInfo();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Overview />, {
      [NameSpace.Film]: {
        comments: [],
        similarFilms: [],
        isLoading: false,
        error: undefined,
        film: mockFilm,
      },
    });

    render(withStoreComponent);

    const score = screen.getByTestId('film-rating-score');
    expect(Number(score.textContent)).toBe(mockFilm.rating);

    const level = screen.getByTestId('film-rating-level');
    expect(level.textContent).toEqual(getRatingDescription(mockFilm.rating));

    const count = screen.getByTestId('film-rating-count');
    expect(count.textContent).toBe(`${mockFilm.scoresCount} ratings`);

    const director = screen.getByTestId('film-card-director');
    expect(director.textContent).toBe(`Director: ${mockFilm.director}`);

    const starring = screen.getByTestId('film-card-starring');
    expect(starring.textContent?.split(':')[1].split(',').length).toBe(
      mockFilm.starring.length
    );
  });
});
