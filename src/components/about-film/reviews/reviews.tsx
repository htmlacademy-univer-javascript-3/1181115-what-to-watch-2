import ReviewsCol from './reviews-col/reviews-col';
import { getHalfArray } from '../../../utils/functions/get-half-array/get-half-array';
import { useAppSelector } from '../../../hooks';
import { getComments } from '../../../store/film/selectors';

function Reviews() {
  const comments = useAppSelector(getComments);
  const commentsCol = getHalfArray(comments);

  return (
    <div
      className="film-card__reviews film-card__row"
      data-testid="film-card-reviews"
    >
      <ReviewsCol
        list={comments.filter((_, idx) => idx <= commentsCol)}
      />
      <ReviewsCol
        list={comments.filter((_, idx) => idx > commentsCol)}
      />
    </div>
  );
}

export default Reviews;
