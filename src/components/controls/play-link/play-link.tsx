import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

type PlayProps = {
  id: string;
}

function PlayLink({id}: PlayProps): JSX.Element {

  return (
    <Link
      className='btn btn--play film-card__button'
      type='button'
      to={AppRoute.Player.replace(':id', id)}
    >
      <svg viewBox='0 0 19 19' width='19' height='19'>
        <use xlinkHref='#play-s'></use>
      </svg>
      <span>Play</span>
    </Link>
  );
}

export default PlayLink;
