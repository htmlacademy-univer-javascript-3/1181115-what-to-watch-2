type RatingProps = {
    handleRatingChange: (e:React.ChangeEvent<HTMLInputElement>)=> void,
};


function RatingInput({handleRatingChange} :RatingProps): JSX.Element {
    
  const ratingValues = Array.from({length: 10}, (_, i) => 10 - i);

    return (
        <div className="rating">
        <div className="rating__stars">
            {ratingValues.map((starValue)=>(
                <>
                    <input 
                    className="rating__input"
                    id={`star-${starValue}`}
                    type="radio"
                    name="rating"
                    value={starValue}
                    onChange={handleRatingChange}
                    />
                    <label className="rating__label" htmlFor={`star-${starValue}`}>
                    Rating {starValue}
                    </label>
                </>
            ))}
        </div>
      </div>
    );
}

export default RatingInput;
