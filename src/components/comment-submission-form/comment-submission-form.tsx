import { FormEvent, useState } from 'react';
import RatingInput from '../rating-input/rating-input';
import { AddCommentRequest } from '../../types';
import { useAppDispatch } from '../../hooks';
import { addCommentAction } from '../../store/api-actions/api-review-action';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type ReviewFormProps = {
  filmId: string;
}

const defaultReview: AddCommentRequest = {
  filmId: '',
  comment: '',
  rating: 0
};

const COM_LIMITS = {
  min: 50,
  max: 400,
};

function CommentSubmissionForm({filmId} :ReviewFormProps): JSX.Element {

  const [review, setReview] = useState(defaultReview);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleRatingChange(e:React.ChangeEvent<HTMLInputElement>) {
    setError('');
    setReview({
      ...review,
      rating: Number(e.target.value),
    });
  }

  function handleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setError('');
    setReview({
      ...review,
      comment: e.target.value
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (review.rating < 1) {
      setError('Rating is required');
      return;
    }

    if (review.comment.trim().length < COM_LIMITS.min || review.comment.trim().length > COM_LIMITS.max) {
      setError(`Comment must be longer than or equal to ${COM_LIMITS.min} and less than ${COM_LIMITS.min} characters`);
      return;
    }

    setIsSubmitting(true);

    dispatch(addCommentAction({
      filmId: filmId,
      comment: review.comment,
      rating: review.rating,
    }))
      .then(()=>navigate(AppRoute.Film.replace(':id', filmId)))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <RatingInput onRatingChange={handleRatingChange}/>

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={review.comment}
          onChange={handleCommentChange}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={Boolean(error) || isSubmitting}>
            Post
          </button>
        </div>
      </div>
      {error && (
        <div className="add-review__text--error">
          <p>{error}</p>
        </div>
      )}
    </form>
  );
}

export default CommentSubmissionForm;
