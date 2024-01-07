import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Rating from '../rating/rating';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendCommentAction } from '../../store/api-actions';
import { ReviewConsts } from '../../consts';
import {
  getFilmInfo,
  getLoadingStatus,
  getError,
} from '../../store/film/selectors';

function CommentForm() {
  const dispatch = useAppDispatch();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [readOnly, setReadOnly] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean | undefined>(undefined);

  const { id } = useAppSelector(getFilmInfo);
  const isLoading = useAppSelector(getLoadingStatus);
  const error = useAppSelector(getError);

  useEffect(() => {
    if (
      reviewText.length >= ReviewConsts.MinLength &&
      reviewText.length <= ReviewConsts.MaxLength &&
      rating > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [rating, reviewText.length]);

  useEffect(() => {
    if (isLoading) {
      setReadOnly(true);
      setBtnDisabled(true);
    } else {
      setReadOnly(false);
    }
  }, [isLoading]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendCommentAction({ id, comment: reviewText, rating }));

    if (!isLoading && error === undefined) {
      toast.success('The comment has been added successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      setReviewText('');
      setRating(0);
      setIsChecked(false);
    }

    if (error !== undefined) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
      <Rating
        onRatingChange={setRating}
        isChecked={isChecked}
        readOnly={readOnly}
      />
      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={(e) => setReviewText(e.target.value)}
          value={reviewText}
          disabled={readOnly}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={btnDisabled}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
