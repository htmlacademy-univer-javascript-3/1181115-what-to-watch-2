import { Fragment} from 'react';
import { useAppSelector } from '../../../hooks';
import { processRunTime } from './processRunTime';
import { getCurrentFilm } from '../../../store/selectors/film-selector';


function Details(): JSX.Element | null{
  const fullFilm = useAppSelector(getCurrentFilm);

  return(
    (fullFilm) &&
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{fullFilm.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {
              fullFilm.starring.map((name) =>(
                <Fragment key={name}>
                  {name}<br/>
                </Fragment>
              ))
            }
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{processRunTime(fullFilm.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{fullFilm.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{fullFilm.released}</span>
        </p>
      </div>
    </div>
  );
}

export default Details;
