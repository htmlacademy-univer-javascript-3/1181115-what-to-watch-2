import { render, screen } from '@testing-library/react';
import { withStore } from '../../../utils/mock-component';
import Reviews from './reviews';
import { NameSpace } from '../../../consts';
import { filmInfo, generateFilmReviewArr } from '../../../utils/mock-data';

describe('Component: Reviews', () => {
  const mockReviews = generateFilmReviewArr(7);
  const mockFilm = filmInfo();

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<Reviews />, {
      [NameSpace.Film]: {
        comments: mockReviews,
        similarFilms: [],
        isLoading: false,
        error: undefined,
        film: mockFilm,
      },
    });

    render(withStoreComponent);
    expect(screen.getByTestId('film-card-reviews')).toBeInTheDocument();
  });

  it('should render num reviews equal array.length', () => {
    const { withStoreComponent } = withStore(<Reviews />, {
      [NameSpace.Film]: {
        comments: mockReviews,
        similarFilms: [],
        isLoading: false,
        error: undefined,
        film: mockFilm,
      },
    });

    render(withStoreComponent);
    expect(screen.getAllByRole('review').length).toBe(mockReviews.length);
  });
});
