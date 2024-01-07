import React from 'react';
import { getRatingDescription } from '../../../utils/functions/get-rating-description/get-rating-description';
import { useAppSelector } from '../../../hooks';
import { getFilmInfo } from '../../../store/film/selectors';

function Overview() {
  const film = useAppSelector(getFilmInfo);

  return (
    <>
      <div className="film-rating" data-testid="film-tab-overview">
        <div className="film-rating__score" data-testid="film-rating-score">
          {film.rating.toFixed(1)}
        </div>
        <p className="film-rating__meta">
          <span className="film-rating__level" data-testid="film-rating-level">
            {getRatingDescription(film.rating)}
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
            Starring:
            {film.starring
              .filter((_, idx) => idx < film.starring.length - 1)
              .map((fio) => (
                <React.Fragment key={fio}> {fio},</React.Fragment>
              ))}
            {film.starring
              .filter((_, idx) => idx === film.starring.length - 1)
              .map((fio) => (
                <React.Fragment key={fio}> {fio}</React.Fragment>
              ))}
          </strong>
        </p>
      </div>
    </>
  );
}

export default Overview;
