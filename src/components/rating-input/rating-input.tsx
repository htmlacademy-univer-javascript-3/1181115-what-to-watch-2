import { Fragment } from 'react';


type RatingProps = {
  onRatingChange: (e:React.ChangeEvent<HTMLInputElement>)=> void;
};

function RatingInput({onRatingChange} :RatingProps): JSX.Element {
  const ratingValues = Array.from({length: 10}, (_, i) => 10 - i);

  return (
    <div className="rating">
      <div className="rating__stars">
        {ratingValues.map((starValue)=>(
          <Fragment key={starValue}>
            <input
              className="rating__input"
              id={`star-${starValue}`}
              type="radio"
              name="rating"
              value={starValue}
              onChange={onRatingChange}
            />
            <label className="rating__label" htmlFor={`star-${starValue}`}>
              Rating {starValue}
            </label>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default RatingInput;
