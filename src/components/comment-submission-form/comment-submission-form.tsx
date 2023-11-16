import { useState } from 'react';
import RatingInput from '../rating-input/rating-input';


function CommentSubmissionForm(): JSX.Element {

  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });

  function handleRatingChange(e:React.ChangeEvent<HTMLInputElement>) {

    setReview({
      ...review,
      rating: Number(e.target.value),
    });
  }

  function handleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {

    setReview({
      ...review,
      comment: e.target.value
    });
  }


  return (
    <form action="#" className="add-review__form">
      <RatingInput handleRatingChange={handleRatingChange}/>

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
          <button className="add-review__btn" type="submit">
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default CommentSubmissionForm;
