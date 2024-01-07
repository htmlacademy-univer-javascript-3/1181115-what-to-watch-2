import { RatingStarProps } from '../../types/types';

function RatingStar({ id, onRatingChange, isChecked, readOnly }: RatingStarProps) {
  return (
    <>
      <input
        className="rating__input"
        id={`star-${id}`}
        type="radio"
        name="rating"
        value={id}
        onChange={(e) => onRatingChange(Number(e.target.value))}
        checked={isChecked}
        disabled={readOnly}
        data-testid="rating-star"
      />
      <label className="rating__label" htmlFor={`star-${id}`}>
        Rating {id}
      </label>
    </>
  );
}

export default RatingStar;
