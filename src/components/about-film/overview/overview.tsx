import { getRatingLevel } from '../../../utils/functions/get-rating-description/get-rating-description';
import { useAppSelector } from '../../../hooks';
import { getFilmDetails } from '../../../store/film/selectors';
import { MAX_PEOPLE } from '../../../consts';


function Overview() {
  const film = useAppSelector(getFilmDetails);

  return (
    <>
      <div className="film-rating" data-testid="film-tab-overview">
        <div className="film-rating__score" data-testid="film-rating-score">
          {film.rating.toFixed(1)}
        </div>
        <p className="film-rating__meta">
          <span className="film-rating__level" data-testid="film-rating-level">
            {getRatingLevel(film.rating)}
          </span>
          <span className="film-rating__count" data-testid="film-rating-count">
            {film.scoresCount} ratings
          </span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>
        <p className="film-card__director">
          <strong data-testid="film-card-director">
            {`Director: ${film.director}`}
          </strong>
        </p>
        <p className="film-card__starring">
          <strong data-testid="film-card-starring">
            Starring: {film.starring.slice(0,MAX_PEOPLE).join(', ')}
            {(film.starring.length > MAX_PEOPLE) && ' and other'}
          </strong>
        </p>
      </div>
    </>
  );
}

export default Overview;
