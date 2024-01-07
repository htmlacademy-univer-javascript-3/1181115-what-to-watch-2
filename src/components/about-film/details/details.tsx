import React from 'react';
import { useAppSelector } from '../../../hooks';
import { getFilmInfo } from '../../../store/film/selectors';

function Details() {
  const film = useAppSelector(getFilmInfo);

  return (
    <div className="film-card__text film-card__row" data-testid='film-tab-details'>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value" data-testid='film-card-details-director'>{film.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value" data-testid='film-card-details-starring'>
            {
              film.starring
                .filter((_, idx) => idx < film.starring.length - 1)
                .map((star) => <React.Fragment key={`details-starring${star}`}>{star},<br/></React.Fragment>)
            }
            {
              film.starring
                .filter((_, idx) => idx === film.starring.length - 1)
                .map((star) => <React.Fragment key={`details-starring${star}`}>{star}</React.Fragment>)
            }
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">
            {`${Math.floor(film.runTime / 60)}h ${film.runTime % 60}m`}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value" data-testid='film-card-details-genre'>
            {film.genre}
          </span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value" data-testid='film-card-details-released'>
            {film.released}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Details;
