import * as dayjs from 'dayjs';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchUsersComments } from '../../../store/api-actions/api-comment-actions';
import { UserComment } from '../../../types';
import { useLocation } from 'react-router-dom';


const MAX_COL = 2;

function FilmReview({ date, user, comment, rating}: UserComment): JSX.Element{
  return(
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user}</cite>
          <time className="review__date" dateTime={date}>
            {dayjs(date).format('MMMM D, YYYY')}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating.toFixed(1).replace(/\./g, ',')}</div>
    </div>
  );
}

function ReviewsBlock(): JSX.Element {
  const reviews = useAppSelector((state)=>state.reviews.userComments);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const currentFilmId = location.pathname.slice(7);

  useEffect(()=>{
    dispatch(fetchUsersComments(currentFilmId));
  },[]);

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
