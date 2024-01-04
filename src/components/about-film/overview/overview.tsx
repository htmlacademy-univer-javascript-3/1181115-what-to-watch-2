import { v4 as uuid } from 'uuid';
import { useAppSelector } from '../../../hooks';
import { processRatingLevel } from './processRatingLevel';
import { getCurrentFilm } from '../../../store/selectors/film-selector';


const MAX_PEOPLE = 4;

function Overview(): JSX.Element | null {
  const fullFilm = useAppSelector(getCurrentFilm);

  const descriptionText = fullFilm?.description.split('\n').map((d:string) => ({id: uuid(), paragraph: d}));

  return(
    (fullFilm) &&
    <>
      <div className="film-rating">
        <div className="film-rating__score">{fullFilm.rating.toFixed(1).replace(/\./g, ',')}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{processRatingLevel(fullFilm.rating)}</span>
          <span className="film-rating__count">{fullFilm.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {
          descriptionText?.map((text)=>(
            <p key={text.id}>{text.paragraph}</p>
          ))
        }

        <p className="film-card__director">
          <strong>Director: {fullFilm.director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>
            Starring: {fullFilm.starring.slice(0,MAX_PEOPLE).join(', ')}
            {(fullFilm.starring.length > MAX_PEOPLE) && ' and other'}
          </strong>
        </p>
      </div>
    </>
  );
}

export default Overview;
