import { Review } from '../../../types';


type ReviewsBlockProps = {
  reviews: Review[];
}

const MAX_COL = 2;

function FilmReview(review:Review): JSX.Element{
  const date = new Date(review.date);
  return(
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.text}</p>

        <footer className="review__details">
          <cite className="review__author">{review.author}</cite>
          <time className="review__date" dateTime={review.date}>
            {date.toLocaleString('en', { month: 'long' })}&nbsp;
            {date.toLocaleString('en', { day: 'numeric' })},&nbsp;
            {date.toLocaleString('en', { year: 'numeric' })}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{String(review.ratingScore).replace(/\./g, ',')}</div>
    </div>
  );
}

function ReviewsBlock(props: ReviewsBlockProps): JSX.Element {
  const {reviews} = props;

  const maxReviewNumber = Math.ceil(reviews.length / MAX_COL);

  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col" >
        {
          reviews?.slice(0, maxReviewNumber).map((review)=>(
            <FilmReview key={review.id} {...review}/>
          ))
        }
      </div>
      <div className="film-card__reviews-col" >
        {
          reviews?.slice(maxReviewNumber).map((review)=>(
            <FilmReview key={review.id} {...review} />
          ))
        }
      </div>
    </div>
  );
}

export default ReviewsBlock;