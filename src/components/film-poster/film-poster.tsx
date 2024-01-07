import { FilmPosterProps } from '../../types/types';

function FilmPoster({imgSrc, imgTitle, classes}:FilmPosterProps){
  return (
    <div className={`film-card__poster ${classes ? classes : ''}`}>
      <img src={imgSrc} alt={imgTitle} width="218" height="327" />
    </div>
  );
}

export default FilmPoster;
