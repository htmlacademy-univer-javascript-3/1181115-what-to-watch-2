import * as dayjs from 'dayjs';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { UserComment } from '../../../types';
import { useParams } from 'react-router-dom';
import { fetchUsersCommentsAction } from '../../../store/api-actions/api-review-action';
import { getIsCommentsLoading, getUserComments } from '../../../store/selectors/review-selector';


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

function ReviewsBlock(): JSX.Element | null {
  const reviews = useAppSelector(getUserComments);
  const isCommentsLoading = useAppSelector(getIsCommentsLoading);
  const dispatch = useAppDispatch();

  const { id = '' } = useParams();


  useEffect(()=>{
    dispatch(fetchUsersCommentsAction(id));
  },[id, dispatch]);

  const maxReviewNumber = Math.ceil(reviews.length / MAX_COL);

  return(
    (isCommentsLoading) ? null :
      (
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
      )
  );
}

export default ReviewsBlock;
