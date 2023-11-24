import { Link } from 'react-router-dom';
import { Film } from '../../types';
import { AppRoute } from '../../const';
import VideoPreview from '../video-preview/video-preview';


type FilmCardProps = Film & {
  isActive: boolean;
  onMouseMove: (id : number| null) => void ;
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const {id, filmName, filmImg, onMouseMove, isActive} = props;

  return (
    <article
      onMouseEnter={()=>onMouseMove(id)}
      onMouseLeave={()=>onMouseMove(null)}
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        <VideoPreview
          src="https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm"
          isActive={isActive}
          poster={filmImg}
          name={filmName}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={AppRoute.Film.replace(':id', id.toString())}
        >
          {filmName}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
