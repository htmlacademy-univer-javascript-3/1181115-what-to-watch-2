type OverviewProps = {
  ratingScore: number;
  ratingLevel: string;
  ratingCount: number;
  description: string[];
  director: string;
  starring: string[];
}

const MAX_PEOPLE = 4;

function Overview(props: OverviewProps): JSX.Element {
  const {ratingScore, ratingLevel, ratingCount, description, director, starring} = props;

  return(
    <>
      <div className="film-rating">
        <div className="film-rating__score">{String(ratingScore).replace(/\./g, ',')}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingLevel}</span>
          <span className="film-rating__count">{ratingCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {
          description?.map((paragraph)=>(
            <p key={paragraph.slice(0,10)}>{paragraph}</p>
          ))
        }

        <p className="film-card__director">
          <strong>Director: {director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>
            Starring: {starring.slice(0,MAX_PEOPLE).join(', ')}
            {(starring.length > MAX_PEOPLE) && ' and other'}
          </strong>
        </p>
      </div>
    </>
  );
}

export default Overview;
