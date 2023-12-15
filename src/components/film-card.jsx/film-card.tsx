import { Link } from 'react-router-dom';
import { Film } from '../../types';
import { AppRoute } from '../../const';
import VideoPreview from '../video-preview/video-preview';


type FilmCardProps = Film & {
  isActive: boolean;
  onMouseMove: (id : number| null) => void ;
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const {id, name, previewImage, previewVideoLink, onMouseMove, isActive} = props;

  return (
    <article
      onMouseEnter={()=>onMouseMove(id)}
      onMouseLeave={()=>onMouseMove(null)}
      className="small-film-card catalog__films-card"
    >
      <Link
        to={AppRoute.Film.replace(':id', id.toString())}
        className="small-film-card__link"
      >
        <div className="small-film-card__image">
          <VideoPreview
            src={previewVideoLink}
            isActive={isActive}
            poster={previewImage}
            name={name}
          />
        </div>
        <h3 className="small-film-card__title">
          {name}
        </h3>
      </Link>
    </article>
  );
}

export default FilmCard;
