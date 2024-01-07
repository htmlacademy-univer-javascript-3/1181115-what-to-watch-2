import { PropsList, LoadableComment } from '../../../../types/types';
import { changeDateFormat } from '../../../../utils/functions/change-date-format/change-date-format';

function ReviewsCol({ list }: PropsList<LoadableComment>) {
  return (
    <div className="film-card__reviews-col" data-testid="reviews-col">
      {list.map((comment) => (
        <div className="review" key={comment.id} role="review">
          <blockquote className="review__quote">
            <p className="review__text">{comment.comment}</p>

            <footer className="review__details">
              <cite className="review__author">{comment.user}</cite>
              <time
                className="review__date"
                dateTime={changeDateFormat(comment.date)}
              >
                {changeDateFormat(comment.date)}
              </time>
            </footer>
          </blockquote>

          <div className="review__rating">{comment.rating.toFixed(1)}</div>
        </div>
      ))}
    </div>
  );
}

export default ReviewsCol;
