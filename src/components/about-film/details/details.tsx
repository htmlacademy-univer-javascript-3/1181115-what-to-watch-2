import { Fragment} from 'react';


type DetailsProps = {
  director: string;
  starring: string[];
  runTime: string;
  genre: string;
  filmReleaseDate: number;
}

function Details(props: DetailsProps): JSX.Element{
  const { director, starring, runTime, genre, filmReleaseDate} = props;

  return(
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {
              starring.map((name) =>(
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
          <span className="film-card__details-value">{runTime}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{filmReleaseDate}</span>
        </p>
      </div>
    </div>
  );
}

export default Details;
