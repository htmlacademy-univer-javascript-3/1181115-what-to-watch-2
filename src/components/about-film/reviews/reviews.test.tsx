import { render, screen } from '@testing-library/react';
import { withStore } from '../../../utils/mock-component';
import Reviews, { FilmReview } from './reviews';
import { NameSpace } from '../../../consts';
import { filmInfo, filmReview, generateFilmReviewArr } from '../../../utils/mock-data';
import { changeDateFormat } from '../../../utils/functions/change-date-format/change-date-format';

describe('Component: Reviews', () => {
  const mockReviews = generateFilmReviewArr(9);
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
    expect(screen.getByTestId('reviews-col1')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-col2')).toBeInTheDocument();
    expect(screen.getAllByRole('review').length).toBe(mockReviews.length);
  });
});

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const mockReview = filmReview();

    render(<FilmReview {...mockReview} />);

    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
    expect(screen.getByText(mockReview.rating.toFixed(1))).toBeInTheDocument();
    expect(
      screen.getByText(changeDateFormat(mockReview.date))
    ).toBeInTheDocument();
  });
});

