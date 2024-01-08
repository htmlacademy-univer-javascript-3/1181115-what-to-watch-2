import { Fragment } from 'react';
import { useAppSelector } from '../../../hooks';
import { getFilmDetails } from '../../../store/film/selectors';
import { processFilmDuration } from '../../../utils/functions/process-film-duration/process-film-duration';

function Details() {
  const film = useAppSelector(getFilmDetails);

  return (
    <div className="film-card__text film-card__row" data-testid='film-tab-details'>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value" data-testid='about-film-details-director'>{film.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value" data-testid='about-film-details-starring'>
            {
              film.starring.map((name, id) =>(
                id < (film.starring.length - 1) ?
                  <Fragment key={name}>
                    {name},<br/>
                  </Fragment>
                  :
                  <Fragment key={name}>
                    {name}
                  </Fragment>
              ))
            }
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">
            {processFilmDuration(film.runTime)}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value" data-testid='about-film-details-genre'>
            {film.genre}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value" data-testid='about-film-details-released'>
            {film.released}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Details;
