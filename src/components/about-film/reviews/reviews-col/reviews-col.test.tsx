import { render, screen } from '@testing-library/react';
import ReviewsCol from './reviews-col';
import { generateFilmReviewArr } from '../../../../utils/mock-data';
import { changeDateFormat } from '../../../../utils/functions/change-date-format/change-date-format';

describe('Component: ReviewsCol', () => {
  it('should render correctly', () => {
    const mockList = generateFilmReviewArr(1);

    render(<ReviewsCol list={mockList} />);
    expect(screen.getByTestId('reviews-col')).toBeInTheDocument();

    expect(screen.getByText(mockList[0].comment)).toBeInTheDocument();
    expect(screen.getByText(mockList[0].rating.toFixed(1))).toBeInTheDocument();
    expect(
      screen.getByText(changeDateFormat(mockList[0].date))
    ).toBeInTheDocument();
  });

  it('should render num reviews equal array.length', () => {
    const mockList = generateFilmReviewArr(7);

    render(<ReviewsCol list={mockList} />);
    expect(screen.getAllByRole('review').length).toBe(mockList.length);
  });
});
