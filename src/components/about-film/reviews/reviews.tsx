import { useAppSelector } from '../../../hooks';
import { getComments } from '../../../store/film/selectors';
import { UserComment } from '../../../types/types';
import { changeDateFormat } from '../../../utils/functions/change-date-format/change-date-format';


const MAX_COL = 2;

export function FilmReview({ date, user, comment, rating}: UserComment): JSX.Element{
  return(
    <div className="review" role="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user}</cite>
          <time className="review__date" dateTime={date}>
            {changeDateFormat(date)}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating.toFixed(1)}</div>
    </div>
  );
}

function Reviews() {
  const reviews = useAppSelector(getComments);
  const maxReviewNumber = Math.ceil(reviews.length / MAX_COL);

  return (
    <div
      className="film-card__reviews film-card__row"
      data-testid="film-card-reviews"
    >
      <div className="film-card__reviews-col" data-testid="reviews-col1">
        {
          reviews?.slice(0, maxReviewNumber).map((review)=>(
            <FilmReview key={review.id} {...review}/>
          ))
        }
      </div>
      <div className="film-card__reviews-col" data-testid="reviews-col2">
        {
          reviews?.slice(maxReviewNumber).map((review)=>(
            <FilmReview key={review.id} {...review} />
          ))
        }
      </div>
    </div>
  );
}

export default Reviews;
