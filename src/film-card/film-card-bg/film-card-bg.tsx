import { FilmCardBgProps } from '../../types/types';

function FilmCardBg({img, filmTitle}:FilmCardBgProps){
  return (
    <div className="film-card__bg">
      <img data-testid='film-bg-img' src={img} alt={filmTitle} />
    </div>
  );
}

export default FilmCardBg;
