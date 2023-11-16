import { Link } from 'react-router-dom';
import { Film } from '../../types';
import { AppRoute } from '../../const';


type FilmCardProps = Film & {
  handleMouseMove: (id : number| null) => void ;
};

function FilmCard(props: FilmCardProps): JSX.Element {
  const {id, filmName, filmImg, handleMouseMove} = props;

  return (
    <article 
      onMouseEnter={()=>handleMouseMove(id)}
      onMouseLeave={()=>handleMouseMove(null)}
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        <img
          src={filmImg}
          alt={filmName}
          width="280"
          height="175"
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
